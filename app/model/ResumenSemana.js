Ext.define('rewadmin.model.ResumenSemana', {
    extend: 'Ext.data.Model',
    fields: [
    'id',
    'centrocosto_name',
    'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'
    ],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'venta/anio/cia/1',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});