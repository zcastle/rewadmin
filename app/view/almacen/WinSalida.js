Ext.define('rewadmin.view.almacen.WinSalida', {
    extend: 'Ext.window.Window',
    alias: 'widget.winsalida',
    title: 'Salida x dias de trabajo',
    border: false,
    modal: true,
    resizable: false,
    width: 460,
    items: [{
        xtype: 'grid',
        height: 280,
        store: 'DiasTrabajo',
        margins: '3 0 0 0',
        columns: [{
            header: 'Dia',
            dataIndex: 'dia',
            width: 80
        },{
            header: 'Fecha Inicio',
            dataIndex: 'fe_ini',
            flex: 1
        },{
            header: 'Fecha Fin',
            dataIndex: 'fe_fin',
            flex: 1
        },{
            header: 'Procesado',
            dataIndex: 'procesado',
            width: 80
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: 'DiasTrabajo',
            dock: 'bottom',
            items:[
            '-', {
                text: 'Procesar',
                name: 'btnProcesar',
                baseCls: 'rew-btn-medium',
                cls: 'btn-nuevo'
            },{
                text: 'Salir',
                name: 'btnSalir',
                baseCls: 'rew-btn-medium',
                cls: 'btn-remover'
            }]
        }]
    }]
});