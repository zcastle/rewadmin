Ext.define('rewadmin.model.Receta', {
    extend: 'Ext.data.Model',
    fields: [
    {name: 'id', type: 'int', useNull: true},
    {name: 'producto_id', type: 'int'}, 
    {name: 'insumo_id', type: 'int'}, 
    {name: 'insumo_name', persist: false}, 
    {name: 'cantidad', type: 'float'}, 
    {name: 'unidad_id', type: 'int'}, 
    'unidad_type', 
    {name: 'unidad_name', persist: false},
    {name: 'costo', type: 'float', persist: false}, 
    {name: 'total', type: 'float', persist: false}, 
    'almacen_id', 
    {name: 'almacen_name', persist: false}
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'producto/receta',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'count'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});