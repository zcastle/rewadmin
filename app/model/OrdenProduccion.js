Ext.define('rewadmin.model.OrdenProduccion', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'fechahora', 'estado', 'usuario_id','observacion'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'produccion',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});