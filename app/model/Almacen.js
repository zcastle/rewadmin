Ext.define('rewadmin.model.Almacen', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'codigo', 'nombre', 'centrocosto_id', {name: 'centrocosto_name', persist: false}],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'almacen',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});