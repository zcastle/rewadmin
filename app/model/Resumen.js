Ext.define('rewadmin.model.Resumen', {
    extend: 'Ext.data.Model',
    fields: [
    'id',
    'centrocosto_name',
    'pedido'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'pedido/resumen/cia/1',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});