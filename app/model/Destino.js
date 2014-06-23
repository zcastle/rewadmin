Ext.define('rewadmin.model.Destino', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
    'nombre',
    'destino'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'destino',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});