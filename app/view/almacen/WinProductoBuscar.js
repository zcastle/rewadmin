Ext.define("rewadmin.view.almacen.WinProductoBuscar", {
    extend: 'Ext.window.Window',
    alias : 'widget.winproductobuscar',
    title: 'Buscar Producto',
    modal: true,
    resizable: false,
    width: 500,
    layout: 'fit',
    border: false,
    items: {
        xtype: 'grid',
        height: 300,
        store: 'ProductoBuscar',
        columns: [{
            text: 'Codigo',
            dataIndex: 'codigo',
            width: 70
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1
        },{
            text: 'Costo',
            dataIndex: 'costo',
            width: 90
        },{
            text: 'Afecto',
            dataIndex: 'igv',
            width: 40
        }],
        tbar: [{
            xtype: 'textfield',
            name: 'txtBuscar',
            enableKeyEvents: true,
            fieldLabel: 'Buscar',
            labelWidth: 40,
            flex: 1
        }],
        buttons: [{
        	text: 'Aceptar',
        	name: 'btnAceptar',
        	iconCls: 'ico-aceptar-medium',
            scale: 'medium'
        }, {
        	text: 'Cancelar',
        	name: 'btnCancelar',
        	iconCls: 'ico-cancelar-medium',
            scale: 'medium'
        }]
    }
});