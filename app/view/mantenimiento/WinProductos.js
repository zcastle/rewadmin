Ext.define("rewadmin.view.mantenimiento.WinProductos", {
    extend: 'Ext.window.Window',
    alias : 'widget.winproductos',
    title: 'Productos',
    modal: true,
    resizable: false,
    //closable: false,
    width: 900,
    layout: 'fit',
    items: {
        xtype: 'form',
        id: 'frmProductos',
        frame: true,
        border: false,
        bodyPadding: 5,
        layout: {
		    type: 'hbox',
		    align: 'stretch',
		    pack : 'start'
		},
        defaults: {
        	border: false
        },
        items: [{
        	width: 350,
        	xtype: 'container',
        	layout: {
			    type: 'vbox',
			    align: 'stretch',
			    pack : 'start'
			},
        	defaults: {
	        	//labelAlign: 'top',
	        	allowBlank: false,
	        	labelWidth: 80
	        },
        	defaultType: 'textfield',
	        items: [{
	        	xtype: 'hiddenfield',
	        	name: 'id'
	        },{
	        	xtype: 'hiddenfield',
	        	name: 'usuario_id'
	        },{
	        	xtype: 'hiddenfield',
	        	name: 'centrocosto_id'
	        },{
	        	xtype: 'combobox',
	        	fieldLabel: 'Grupo',
	        	name: 'grupo_id',
	        	store: 'Grupo',
		        valueField: 'id',
		        displayField: 'nombre',
		        queryMode: 'local',
		        editable: false
	        },{
	        	xtype: 'combobox',
	        	fieldLabel: 'Categoria',
	        	name: 'categoria_id',
	        	emptyText: 'Seleccionar',
	        	store: 'Categoria',
		        valueField: 'id',
		        displayField: 'nombre',
		        queryMode: 'local',
		        editable: false
	        },{
	        	fieldLabel: 'Codigo',
	        	name: 'codigo',
	        	width: 100
	        },{
	        	fieldLabel: 'Producto',
	        	name: 'nombre'
	        },{
	        	xtype: 'container',
	        	layout: {
				    type: 'hbox',
				    align: 'stretch',
				    pack : 'start'
				},
				style: 'margin-bottom: 5px;',
				defaults: {
					flex: 1,
					allowBlank: false,
	        		labelWidth: 80,
	        		minValue: 0,
	        		value: 0,
		            hideTrigger: true,
		            keyNavEnabled: false,
		            mouseWheelEnabled: false
				},
        		defaultType: 'numberfield',
	        	items: [{
	        		fieldLabel: 'Precio Costo',
	        		name: 'costo'
	        	},{
	        		xtype: 'container',
	        		flex: 0,
	        		width: 2
	        	},{
	        		fieldLabel: 'Precio Venta',
	        		name: 'precio'
	        	}]
	        },{
	        	xtype: 'container',
	        	layout: {
				    type: 'hbox',
				    align: 'stretch',
				    pack : 'start'
				},
				style: 'margin-bottom: 5px;',
				defaults: {
					flex: 1,
					allowBlank: false,
	        		labelWidth: 80,
	        		minValue: 0,
	        		value: 0,
		            hideTrigger: true,
		            keyNavEnabled: false,
		            mouseWheelEnabled: false
				},
        		defaultType: 'numberfield',
	        	items: [{
	        		fieldLabel: 'Stock Minimo',
	        		name: 'stock_min'
	        	},{
	        		xtype: 'container',
	        		flex: 0,
	        		width: 2
	        	},{
	        		fieldLabel: 'Stock Maximo',
	        		name: 'stock_max'
	        	}]
	        },{
	        	xtype: 'container',
	        	layout: {
				    type: 'hbox',
				    align: 'stretch',
				    pack : 'start'
				},
				style: 'margin-bottom: 5px;',
				defaults: {
					flex: 1,
					allowBlank: false,
	        		labelWidth: 80
				},
	        	items: [{
	        		xtype: 'combobox',
	        		fieldLabel: 'Destino',
	        		name: 'destino_id',
	        		emptyText: 'Seleccionar',
	        		store: 'Destino',
			        valueField: 'id',
			        displayField: 'nombre',
			        queryMode: 'local',
			        editable: false
	        	},{
	        		xtype: 'container',
	        		flex: 0,
	        		width: 2
	        	},{
	        		xtype: 'textfield',
	        		fieldLabel: 'Orden',
	        		name: 'orden',
	        		maskRe : /^[0-9]$/,
	        		value: 0
	        	}]
	        },{
	        	xtype: 'container',
	        	layout: {
				    type: 'hbox',
				    align: 'stretch',
				    pack : 'start'
				},
				style: 'margin-bottom: 5px;',
				defaults: {
					flex: 1,
					allowBlank: false,
	        		labelWidth: 80
				},
	        	items: [{
		        	xtype: 'checkboxfield',
		        	fieldLabel: 'IGV',
		        	name: 'igv',
		        	inputValue: 'S',
		        	uncheckedValue: 'N',
		        	checked: true
		        },{
	        		xtype: 'container',
	        		flex: 0,
	        		width: 2
	        	},{
		        	xtype: 'checkboxfield',
		        	fieldLabel: 'Servicio',
		        	name: 'serv',
		        	inputValue: 'S',
		        	uncheckedValue: 'N',
		        	checked: true
		        }]
	        }]
        },{
        	xtype: 'container',
        	width: 5
        },{
        	flex: 1,
        	xtype: 'grid',
        	store: 'Receta',
        	border: true,
        	columns: [{
		        text: 'Ln',
		        xtype: 'rownumberer'
		    },{
		        header: 'Insumo',
		        dataIndex: 'insumo_name',
		        flex: 1
		    },{
		        header: 'Cantidad',
		        dataIndex: 'cantidad',
		        align: 'right',
		        width: 60
		    },{
		    	header: 'U. Medida',
		        dataIndex: 'unidad_name',
		        width: 70
		    },{
		        header: 'Costo',
		        dataIndex: 'costo',
		        align: 'right',
		        width: 60,
		        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER_4)
		    },{
		        header: 'Total',
		        align: 'right',
		        width: 60,
		        renderer: function(val, td, record, index) {
		        	return Ext.util.Format.number(record.get('cantidad')*record.get('costo'), rewadmin.AppGlobals.FORMA_NUMBER_4)
		        }
		    },{
		        header: 'Almacen',
		        dataIndex: 'almacen_name',
		        width: 70
		    }],
		    bbar: [{
	            text: 'Agregar',
	            name: 'btnAgregar',
	            iconCls: 'ico-agregar-small'
	        },{
	            text: 'Editar',
	            name: 'btnEditar',
	            iconCls: 'ico-editar-small'
	        },{
	            text: 'Remover',
	            name: 'btnRemover',
	            iconCls: 'ico-remover-small'
	        },{
	        	xtype: 'container',
	        	flex: 1
	        },{
	            xtype: 'displayfield',
	            id: 'totalInsumos',
	            fieldLabel: 'Costo Total',
	            value: '0.00',
	            style: {
		            textAlign: 'right'
		        },
		        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
	        }]
        }],
        buttons: [{
        	text: 'Guardar',
        	name: 'btnGuardar',
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