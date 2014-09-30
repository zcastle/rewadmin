Ext.define('rewadmin.model.DiasTrabajo', {
    extend: 'Ext.data.Model',
    fields: ['dia','fe_ini','fe_fin','procesado'],
    proxy: {
        type: 'rest',
        url: rewadmin.AppGlobals.HOST+'venta/dias',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'count'
        }
    }
});