Ext.define('rewadmin.model.Unidad', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'mayor', 'cantidad', 'menor'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'unidad',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});