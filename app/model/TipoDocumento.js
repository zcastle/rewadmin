Ext.define('rewadmin.model.TipoDocumento', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'codigo', 'nombre'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'tipo_documento',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});