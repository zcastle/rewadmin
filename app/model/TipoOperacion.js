Ext.define('rewadmin.model.TipoOperacion', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'codigo', 'nombre', 'tipo'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'tipo_operacion',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});