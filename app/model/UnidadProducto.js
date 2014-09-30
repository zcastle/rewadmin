Ext.define('rewadmin.model.UnidadProducto', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre', {name: 'cantidad', type: 'float'}],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'unidad/producto',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});