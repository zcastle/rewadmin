Ext.define('rewadmin.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [
    {name: 'id', type: 'int', useNull: true},
    'nombre',
    {name: 'grupo_id', type: 'int'}, {name: 'grupo_name', persist: false},
    'orden',
    {name: 'destino_id', type: 'int'}, {name: 'destino_name', persist: false}
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'categoria',
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