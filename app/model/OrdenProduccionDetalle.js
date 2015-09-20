Ext.define('rewadmin.model.OrdenProduccionDetalle', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'orden_produccion_id', 'producto_id', 'cantidad', 'unidad_id'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'produccion/detalle',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});