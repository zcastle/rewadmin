Ext.define('rewadmin.model.GuiaCabecera', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'fecha', 
    {name: 'tipo_documento_id', type: 'int'}, {name: 'tipo_documento_name', persist: false}, 'serie', 'numero', 
    {name: 'tipo_operacion_id', type: 'int'}, {name: 'tipo_operacion_name', persist: false}, 
    {name: 'cliente_id', type: 'int'}, {name: 'cliente_ruc', persist: false}, {name: 'cliente_name', persist: false}, 'documento_relacionado',
    {name: 'base', type: 'float', defaultValue: 0}, {name: 'isc', type: 'float', defaultValue: 0}, 
    {name: 'dscto', type: 'float', defaultValue: 0}, {name: 'igv', type: 'float', defaultValue: 0},
    {name: 'total', type: 'float', defaultValue: 0}, 'usuario_id', 'almacen_id', 'observacion',
    {name: 'procesado', persist: false}
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'guia/cabecera',
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