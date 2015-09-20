Ext.define('rewadmin.Application', {
    name: 'rewadmin',

    extend: 'Ext.app.Application',

    views: [
        'Main',
        'LoginView',
        'Dashboard',
        'mantenimiento.GridProductos',
        'mantenimiento.WinProductos',
        'mantenimiento.GridCategorias',
        'mantenimiento.WinCategorias',
        'mantenimiento.WinInsumo',
        'almacen.GridGuia',
        'almacen.WinProductoBuscar',
        'almacen.WinUnidadesBuscar',
        'almacen.WinGuiaBuscar',
        'almacen.WinSalida',
        'almacen.GridKardex',
        //'produccion.GridOrdenProduccion',
        'reportes.WinReporte',
        'reportes.WinReporteVentas'
    ],

    controllers: [
        'Dashboard',
        'Main',
        'Login',
        'Producto',
        'Categoria',
        'Guia',
        //'OrdenProduccion',
        'Salida',
        'ProductoBuscar',
        'UnidadBuscar',
        'GuiaBuscar',
        'reportes.WinReporte',
        'reportes.WinReporteVentas'
    ],

    stores: [
        // TODO: add stores here
    ],

    requires:[
        'rewadmin.AppGlobals',
        'Ext.layout.container.Fit',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',
        'Ext.layout.container.Form',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Hidden',
        'Ext.form.field.Date',
        'Ext.form.FieldContainer',
        'Ext.tab.Panel',
        'Ext.data.proxy.Rest',
        'Ext.view.View',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.RowNumberer',
        'Ext.container.ButtonGroup',
        'Ext.data.Store',
        'Ext.chart.Chart',
        'Ext.chart.series.Column',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ]
});

Ext.onReady(function() {
    (Ext.defer(function() {
        var hideMask = function () {
            Ext.get('loading').remove();
            Ext.fly('loading-mask').animate({
                opacity: 0,
                remove: true
            });
        };
        Ext.defer(hideMask, 250);
    },500));

    Ext.apply(Ext.form.field.VTypes, {
        IPAddress:  function(v) {
            return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
        },
        IPAddressText: 'Debe ser una direccion IP',
        IPAddressMask: /[\d\.]/i
    });

    Ext.apply(Ext.form.field.VTypes, {
        RUC:  function(v) {
            return /^[-+]?\d*\.?\d*$/i.test(v);
        },
        RUCText: 'Solo RUC',
        RUCMask: /[\-\+0-9.]/
    });
});