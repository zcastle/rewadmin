Ext.define("rewadmin.view.almacen.WinUnidadesBuscar", {
    extend: 'Ext.window.Window',
    alias : 'widget.winunidadesbuscar',
    title: 'Buscar Unidad',
    modal: true,
    resizable: false,
    width: 400,
    layout: 'fit',
    border: false,
    items: {
        xtype: 'grid',
        height: 200,
        store: 'UnidadBuscar',
        columns: [{
            text: 'Mayor',
            dataIndex: 'mayor',
            flex: 1
        },{
            text: 'Cantidad',
            dataIndex: 'cantidad',
            width: 90
        },{
            text: 'Menor',
            dataIndex: 'menor',
            flex: 1
        }],
        buttons: [{
            text: 'Aceptar',
            name: 'btnAceptar',
            baseCls: 'rew-btn',
            cls: 'btn-aceptar'
        }, {
            text: 'Cancelar',
            name: 'btnCancelar',
            baseCls: 'rew-btn',
            cls: 'btn-cancelar'
        }]
    }
});