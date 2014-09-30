Ext.define('rewadmin.view.reportes.WinReporteVentas', {
    extend: 'Ext.window.Window',
    alias: 'widget.winreporteventas',
    title: 'Reporte de Ventas',
    border: false,
    modal: true,
    resizable: false,
    width: 465,
    items: {
        xtype: 'winreporte'
    }
});