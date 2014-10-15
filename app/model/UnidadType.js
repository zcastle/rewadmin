Ext.define('rewadmin.model.UnidadType', {
    extend: 'Ext.data.Model',
    fields: ['id', 'tipo', 'nombre', {name: 'cantidad', type: 'float'}]
});