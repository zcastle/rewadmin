Ext.define("rewadmin.view.almacen.WinGuiaBuscar", {
    extend: 'Ext.window.Window',
    alias : 'widget.winguiabuscar',
    title: 'Buscar Guia',
    modal: true,
    resizable: false,
    width: 700,
    layout: 'fit',
    border: false,
    items: {
        xtype: 'grid',
        height: 300,
        store: 'GuiaBuscar',
        columns: [{
            text: 'Fecha',
            dataIndex: 'fecha',
            width: 70
        },{
            text: 'Documento',
            dataIndex: 'tipo_documento_name',
            width: 70
        },{
            text: 'Numero',
            width: 90,
            renderer: function(val, cellIndex, record) {
                return record.get('serie')+'-'+record.get('numero');
            }
        },{
            text: 'Operacion',
            dataIndex: 'tipo_operacion_name',
            width: 100
        },{
            text: 'Proveedor',
            dataIndex: 'cliente_proveedor_name',
            flex: 1
        },{
            text: 'Procesado',
            dataIndex: 'procesado',
            width: 70
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