Ext.define('rewadmin.model.GuiaDetalle', {
    extend: 'Ext.data.Model',
    fields: [
    {name: 'id', type: 'int', useNull: true},
    'guia_id', 'producto_id', {name: 'producto_codigo', persist: false}, 
    {name: 'producto_name', persist: false}, 'cantidad', 'unidad_id', 'unidad_type', 
    {name: 'unidad_name', persist: false}, {name: 'unidad_cantidad', persist: false}, 
    {name: 'unitario', type: 'float'},
    {name: 'base', type: 'float'}, {name: 'dscto', type: 'float'}, {name: 'neto', type: 'float'},
    {name: 'igv', type: 'float'}, {name: 'isc', type: 'float'}, {name: 'total', type: 'float'},
    'almacen_id', 'afecto'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'guia/detalle',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});