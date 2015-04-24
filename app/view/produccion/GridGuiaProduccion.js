Ext.define('rewadmin.view.produccion.GridGuiaProduccion', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.gridguiaproduccion',
    border: false,
    selType: 'cellmodel', //'rowmodel'
    store: 'GuiaDetalle',
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
        text: 'Valor Unitario',
        dataIndex: 'unitario',
        align: 'right',
        width: 75,
        editor: {
            xtype: 'numberfield',
            name: 'txtUnitario',
            allowBlank: false,
            minValue: 0,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enableKeyEvents: true,
            action: 'onEditorKeydown'
        },
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'Base',
        dataIndex: 'base',
        align: 'right',
        width: 90,
        editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 0,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false
        },
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'Dscto',
        dataIndex: 'dscto',
        align: 'right',
        width: 80,
        editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 0,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false
        },
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'Neto',
        dataIndex: 'neto',
        align: 'right',
        width: 90,
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'IGV',
        dataIndex: 'igv',
        align: 'right',
        width: 80,
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'ISC',
        dataIndex: 'isc',
        align: 'right',
        width: 80,
        editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 0,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false
        },
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        text: 'Total',
        dataIndex: 'total',
        align: 'right',
        width: 90,
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
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
        xtype: 'container',
        flex: 1,
        layout: 'hbox',
        items: [{
            xtype: 'form',
            id: 'frmCabeceraGuia',
            frame: true,
            border: false,
            style: 'border: 0;',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack : 'start'
            },
            defaults: {
                xtype: 'container',
                defaults: {
                    allowBlank: false,
                    labelWidth: 90
                }
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'id'
            },{
                xtype: 'hiddenfield',
                name: 'usuario_id'
            },{
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack : 'start'
                },
                defaultType: 'textfield',
                items: [{
                    xtype: 'container',
                    style: 'margin-bottom: 5px;',
                    layout: 'hbox',
                    defaults: {
                        allowBlank: false,
                        labelWidth: 70
                    },
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Fecha',
                        name: 'fecha',
                        maxValue: new Date(),
                        width: 165
                    },{
                        xtype: 'container',
                        width: 5
                    },{
                        xtype: 'combobox',
                        name: 'tipo_documento_id',
                        fieldLabel: 'T. Documento',
                        labelWidth: 80,
                        emptyText: 'Seleccionar',
                        store: 'TipoDocumento',
                        valueField: 'id',
                        displayField: 'nombre',
                        queryMode: 'local',
                        editable: false,
                        flex: 1
                    }]
                },{
                    xtype: 'container',
                    style: 'margin-bottom: 5px;',
                    layout: 'hbox',
                    defaults: {
                        allowBlank: false,
                        labelWidth: 70
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'serie',
                        fieldLabel: 'Nu. Serie',
                        emptyText: 'Serie',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        width: 165
                    },{
                        xtype: 'container',
                        width: 5
                    },{
                        xtype: 'numberfield',
                        name: 'numero',
                        fieldLabel: 'Nu. Documento',
                        labelWidth: 80,
                        emptyText: 'Numero',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        flex: 1
                    }]
                },{
                    xtype: 'combobox',
                    name: 'tipo_operacion_id',
                    labelWidth: 70,
                    fieldLabel: 'T. Operacion',
                    emptyText: 'Seleccionar',
                    store: 'TipoOperacion',
                    valueField: 'id',
                    displayField: 'nombre',
                    queryMode: 'local',
                    editable: false
                }]
            },{
                width: 5
            },{
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack : 'start'
                },
                defaultType: 'textfield',
                items: [{
                    xtype: 'container',
                    style: 'margin-bottom: 5px;',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Proveedor',
                        labelWidth: 70,
                        name: 'txtRuc',
                        emptyText: 'RUC',
                        enableKeyEvents: true,
                        width: 165,
                        //vtype: 'RUC',
                        maskRe : /^[0-9]$/,
                        maxLength: 11
                    },{
                        xtype: 'container',
                        width: 5
                    },{
                        xtype: 'displayfield',
                        name: 'txtComercial',
                        style: {
                            border: '1px solid #ccc'
                        },
                        flex: 1
                    },{
                        xtype: 'hiddenfield',
                        name: 'cliente_id'
                    },{
                        xtype: 'button',
                        text: '+',
                        name: 'btnNuevoProveedor',
                        baseCls: 'rew-btn-small',
                        cls: 'btn-nuevo'
                    }]
                },{
                    xtype: 'combobox',
                    name: 'almacen_id',
                    allowBlank: true,
                    labelWidth: 70,
                    fieldLabel: 'Almacen',
                    emptyText: 'Seleccionar',
                    store: 'Almacen',
                    valueField: 'id',
                    displayField: 'nombre',
                    queryMode: 'local',
                    editable: false
                },{
                    xtype: 'textfield',
                    labelWidth: 70,
                    allowBlank: true,
                    name: 'documento_relacionado',
                    fieldLabel: 'Relacionado',
                    emptyText: 'Serie - Numero',
                    flex: 1
                }]
            },{
                width: 5
            },{
                xtype: 'textareafield',
                name: 'observacion',
                flex: 1,
                emptyText: 'Observacion'

            }]
        }]
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
    },{
        xtype: 'container',
        id: 'totales',
        layout: 'hbox',
        baseCls: 'totales',
        defaults: {
            width: 120,
            labelWidth: 40,
            renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
        },
        items: [{
            xtype: 'displayfield',
            name: 'totales-base',
            fieldLabel: 'BASE',
            value: '0.00'
        },{
            xtype: 'displayfield',
            name: 'totales-dscto',
            fieldLabel: 'DSCTO',
            value: '0.00'
        },{
            xtype: 'displayfield',
            name: 'totales-neto',
            fieldLabel: 'NETO',
            value: '0.00'
        },{
            xtype: 'displayfield',
            name: 'totales-igv',
            fieldLabel: 'IGV',
            value: '0.00'
        },{
            xtype: 'displayfield',
            name: 'totales-isc',
            fieldLabel: 'ISC',
            value: '0.00'
        },{
            xtype: 'displayfield',
            name: 'totales-total',
            fieldLabel: 'TOTAL',
            value: '0.00'
        }]
    }]
});