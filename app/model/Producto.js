Ext.define('rewadmin.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [
    {name: 'id', type: 'int', useNull: true},
    {name: 'centrocosto_id', type: 'int'}, 
    {name: 'centrocosto_name', persist: false},
    {name: 'grupo_id', type: 'int'}, 
    {name: 'grupo_name', persist: false},
    {name: 'categoria_id', type: 'int'}, 
    {name: 'categoria_name', persist: false},
    'nombre', 
    'codigo', 
    {name: 'precio', type: 'float'}, 
    'igv', 
    'serv', 
    {name: 'orden', type: 'int'}, 
    {name: 'eliminado', defaultValue: 'N'},
    {name: 'destino_id', type: 'int'}, 
    {name: 'destino_name', persist: false},
    'stock_min', 
    'stock_max', 
    {name: 'costo', type: 'float'}, 
    {name: 'costop', type: 'float', defaultValue: 0}, 
    'foto',
    {name: 'unidad_id', persist: false}
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'producto',
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
        }/*,
        headers: {
            user: rewadmin.AppGlobals.HTTP_USER
        }*/
    }
});