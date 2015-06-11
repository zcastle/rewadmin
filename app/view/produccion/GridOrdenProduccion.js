Ext.define('rewadmin.view.produccion.GridOrdenProduccion', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.gridordenproduccion',
    border: false,
    selType: 'cellmodel',
    store: 'OrdenProduccionDetalle',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            pluginId: 'rowEditing',
            clicksToEdit: 2
        })
    ],
    columns: [{
        text: 'Ln',
        xtype: 'rownumberer'
    },{
        text: 'Codigo',    
        dataIndex: 'producto_codigo',   
        width: 60,
        editor: {
            name: 'txtCodigo',
            enableKeyEvents: true,
            action: 'onEditorKeydown'
        }
    },{
        text: 'Insumo',
        dataIndex: 'producto_name',
        flex: 1
    },{
        text: 'Cantidad',
        dataIndex: 'cantidad',
        width: 60,
        editor: {
            xtype: 'numberfield',
            name: 'txtCantidad',
            minValue: 0,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enableKeyEvents: true,
            action: 'onEditorKeydown'
        }
    },{
        text: 'Unidad',
        dataIndex: 'unidad_name',
        name: 'actionUnidad',
        width: 100
    },{
        xtype: 'actioncolumn',
        name: 'actionRemover',
        width: 20,
        menuDisabled: true,
        items: [{
            icon: 'resources/images/remove.gif',
            tooltip: 'Remover',
            iconCls: 'mousepointer'
        }]
    }],
    tbar: [{
        xtype: 'form',
        id: 'frmCabeceraGuiaProduccion',
        frame: true,
        border: false,
        style: 'border: 0;',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch',
            pack : 'start'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'hiddenfield',
            name: 'usuario_id'
        },{
            xtype: 'datefield',
            fieldLabel: 'Fecha Entrega',
            labelWidth: 90,
            name: 'fechahora',
            maxValue: new Date(),
            allowBlank: false,
            width: 280
        },{
            xtype: 'container',
            width: 3
        },{
            xtype: 'textfield',
            name: 'observacion',
            flex: 1,
            emptyText: 'Observacion'
        }]
    },{
        name: 'btnAgregar',
        text: 'Agregar',
        baseCls: 'rew-btn',
        cls: 'btn-nuevo'
    },{
        name: 'btnEliminar',
        text: 'Eliminar',
        baseCls: 'rew-btn',
        cls: 'btn-procesar'
    }],
    bbar: [{
        text: 'Nuevo',
        name: 'btnNuevo',
        baseCls: 'rew-btn',
        cls: 'btn-nuevo'
    },{
        text: 'Editar',
        name: 'btnEditar',
        baseCls: 'rew-btn',
        cls: 'btn-editar'
    },{
        text: 'Buscar',
        name: 'btnBuscar',
        baseCls: 'rew-btn',
        cls: 'btn-buscar'
    },{
        text: 'Procesar',
        name: 'btnProcesar',
        baseCls: 'rew-btn',
        cls: 'btn-procesar'
    }]
});