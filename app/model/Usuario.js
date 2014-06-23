Ext.define('rewadmin.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
    'nombres', 'apellidos', 'dni', 'telefono', 'direccion', 
    'ubigeo_id', {name: 'ubigeo_name', persist: false}, 
    'usuario', 'clave', 'eliminado', 
    'rol_id', {name: 'rol_name', persist: false},
    'centrocosto_id', {name: 'centrocosto_name', persist: false},
    {name: 'empresa_id', persist: false}, {name: 'empresa_name', persist: false},
    {name: 'modulos', persist: false}
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'usuario',
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