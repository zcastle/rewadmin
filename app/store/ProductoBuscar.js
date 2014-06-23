Ext.define('rewadmin.store.ProductoBuscar', {
    extend: 'Ext.data.Store',
    model: 'rewadmin.model.Producto',
    pageSize: rewadmin.AppGlobals.PAGE_SIZE
});