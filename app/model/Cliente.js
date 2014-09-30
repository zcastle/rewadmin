Ext.define('rewadmin.model.Cliente', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
    'ruc', 'nombre', 'comercial', 'direccion', 'ubigeo_id', 'telefono', 'tipo', 'eliminado'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'cliente',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});