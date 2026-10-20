// Small document-style layer over Supabase so the app can say
// db.doc('flowers/x').set({...}) and db.collection('purchases').where(...).onSnapshot(cb).
// Each collection maps to one Postgres table; app keys are mapped to column names.
(function () {
  const T = {
    flowers:    { table: 'stock_flowers', keys: ['tier','group','variety','color','length','supplier','bunch','verified','sell','spot','active','src','grade','alias','demo','created'],
                  cols: { group: 'grp', created: 'created_ms' }, num: ['sell','created'] },
    settings:   { table: 'stock_settings', keys: ['days','share1','prices'], cols: {}, num: ['share1'] },
    invoices:   { table: 'stock_invoices', keys: ['supplier','supplierFull','no','date','due','wk','day','asset','fileName','currency','lines','flowersTotal','feesTotal','total','manual','demo','created'],
                  cols: { supplierFull: 'supplier_full', no: 'invoice_no', date: 'invoice_date', due: 'due_date', fileName: 'file_name', flowersTotal: 'flowers_total', feesTotal: 'fees_total', created: 'created_ms' },
                  num: ['flowersTotal','feesTotal','total','created'] },
    purchases:  { table: 'stock_purchases', keys: ['wk','day','fid','stems','bunches','ppStem','total','inv','line','supplier','demo'],
                  cols: { fid: 'flower_id', ppStem: 'pp_stem', inv: 'invoice_id' }, num: ['ppStem','total'] },
    countlines: { table: 'stock_countlines', keys: ['wk','fid','entries','at','demo'], cols: { fid: 'flower_id', at: 'at_ms' }, num: ['at'] },
    countmeta:  { table: 'stock_countmeta', keys: ['saved','at','demo'], cols: { at: 'at_ms' }, num: ['at'] },
    orders:     { table: 'stock_orders', keys: ['wk','day','items','at','demo'], cols: { at: 'at_ms' }, num: ['at'] }
  };
  const col = (m, k) => m.cols[k] || k;
  function toRow(m, data) {
    const r = {};
    for (const k of m.keys) if (k in data && data[k] !== undefined) r[col(m, k)] = data[k];
    if ('alias' in r && !Array.isArray(r.alias)) r.alias = [];
    return r;
  }
  function fromRow(m, row) {
    const d = {};
    for (const k of m.keys) {
      let v = row[col(m, k)];
      if (v != null && m.num.includes(k)) v = Number(v);
      if (v !== undefined) d[k] = v;
    }
    return d;
  }
  const snap = (m, rows) => ({
    docs: rows.map(r => ({ id: r.id, exists: true, data: () => fromRow(m, r) })),
    size: rows.length, empty: !rows.length
  });
  const err = e => ({ code: e?.code === '42501' ? 'not_granted' : (e?.code || 'unavailable'), message: e?.message || String(e) });

  window.makeDb = function (sb) {
    const listeners = {}; // table -> Set(fn)
    const channels = {};
    function listen(table, fn) {
      (listeners[table] = listeners[table] || new Set()).add(fn);
      if (!channels[table]) {
        channels[table] = sb.channel('rt-' + table)
          .on('postgres_changes', { event: '*', schema: 'public', table }, () => listeners[table].forEach(f => f()))
          .subscribe();
      }
      return () => listeners[table].delete(fn);
    }
    function debounce(fn, ms) { let t; return () => { clearTimeout(t); t = setTimeout(fn, ms); }; }

    function query(name, filters = [], order = null, lim = null) {
      const m = T[name];
      if (!m) throw new Error('Unknown collection ' + name);
      const q = {
        where(f, op, v) { return query(name, filters.concat([[f, op, v]]), order, lim); },
        orderBy(f, dir) { return query(name, filters, [f, dir || 'asc'], lim); },
        limit(n) { return query(name, filters, order, n); },
        async get() {
          let r = sb.from(m.table).select('*');
          for (const [f, op, v] of filters) {
            const c = col(m, f);
            r = op === '>=' ? r.gte(c, v) : op === '<=' ? r.lte(c, v) : op === '>' ? r.gt(c, v) : op === '<' ? r.lt(c, v) : op === '!=' ? r.neq(c, v) : r.eq(c, v);
          }
          if (order) r = r.order(col(m, order[0]), { ascending: order[1] !== 'desc' });
          r = r.limit(lim || 5000);
          const { data, error } = await r;
          if (error) throw err(error);
          return snap(m, data || []);
        },
        onSnapshot(next, onError) {
          let alive = true;
          const run = () => q.get().then(s => alive && next(s)).catch(e => alive && onError && onError(e));
          run();
          const off = listen(m.table, debounce(run, 250));
          return () => { alive = false; off(); };
        }
      };
      return q;
    }

    function doc(path) {
      const [name, id] = path.split('/');
      const m = T[name];
      if (!m) throw new Error('Unknown collection ' + name);
      return {
        id, path,
        async get() {
          const { data, error } = await sb.from(m.table).select('*').eq('id', id).maybeSingle();
          if (error) throw err(error);
          return { id, exists: !!data, data: () => (data ? fromRow(m, data) : undefined) };
        },
        async set(data) {
          const { error } = await sb.from(m.table).upsert(Object.assign({ id }, toRow(m, data)));
          if (error) throw err(error);
        },
        async update(data) {
          const { error } = await sb.from(m.table).update(toRow(m, data)).eq('id', id);
          if (error) throw err(error);
        },
        async delete() {
          const { error } = await sb.from(m.table).delete().eq('id', id);
          if (error) throw err(error);
        },
        onSnapshot(next, onError) {
          let alive = true;
          const self = this;
          const run = () => self.get().then(s => alive && next(s)).catch(e => alive && onError && onError(e));
          run();
          const off = listen(m.table, debounce(run, 250));
          return () => { alive = false; off(); };
        }
      };
    }
    return { doc, collection: name => query(name) };
  };
})();
