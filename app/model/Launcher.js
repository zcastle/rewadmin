Ext.define('rewadmin.model.Launcher', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'titulo', 'accion', 'imagen'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'launcher',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});