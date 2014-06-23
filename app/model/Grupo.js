Ext.define('rewadmin.model.Grupo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
    'nombre'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'grupo',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});