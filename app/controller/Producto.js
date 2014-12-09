Ext.define('rewadmin.controller.Producto', {
    extend: 'Ext.app.Controller',
    models: ['Producto'],
    stores: ['Producto', 'Grupo', 'Categoria', 'Destino', 'Receta', 'Almacen', 'UnidadProducto', 'Unidad', 'UnidadType'],
    refs: [{
		ref: 'form',
		selector: '#frmProductos'
	},{
		ref: 'grid',
		selector: 'gridproductos'
	},{
		ref: 'txtBuscar',
		selector: 'gridproductos textfield[name=txtBuscar]'
	},{
		ref: 'cboCategorias',
		selector: 'gridproductos combobox[name=cboCategorias]'
	},{
		ref: 'cboGrupos',
		selector: 'gridproductos combobox[name=cboGrupo]'
	},{
		ref: 'gridReceta',
		selector: 'winproductos grid'
	}],
    init: function() {
		this.control({
			'gridproductos': {
				render: this.onGridRendered,
				itemdblclick: this.onGridItemDblClick/*,
				cellclick: this.onGridCellClick*/
			},
			'gridproductos textfield[name=txtBuscar]': {
				keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
			},
			'gridproductos button': {
				click: this.onGridButtonClick
			},
			'gridproductos combobox': {
				select: this.onComboboxSelect
			},
			'winproductos': {
				afterlayout: this.onWinAfterLayout,
				close: this.onWinClose
			},
			'winproductos grid': {
				itemdblclick: this.onGridRecetaItemDblClick
			},
			'winproductos button': {
				click: this.onWinButtonClick
			},
			/*'winproductobuscar': {
				render: this.onWinBuscarRender
			},*/
			'wininsumo': {
				render: this.onWinInsumo
			}
		});
	},
	onGridRendered: function() {
		this.getProductoStore().load();
		this.getGrupoStore().load();
		this.getCategoriaStore().load();
		this.getDestinoStore().load();
	},
	showForm: function(record) {
		var win = Ext.widget('winproductos');
		this.getForm().loadRecord(record);
		this.getRecetaStore().removeAll();
		win.show();
	},
	onWinBuscar: function() {
		var winBuscar = Ext.widget('winproductobuscar');
		var btnAceptar = winBuscar.down('button[name=btnAceptar]');
        var gridBuscar = winBuscar.down('grid');
        gridBuscar.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.btnAgregarOk(record);
                    winBuscar.close();
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
        gridBuscar.addListener('itemdblclick', function(grid, record){
            this.btnAgregarOk(record);
            winBuscar.close();
        }, this);
        btnAceptar.addListener('click', function(){
            var record = gridBuscar.getSelectionModel().selected.items[0];
            this.btnAgregarOk(record);
            winBuscar.close();
        }, this);
        winBuscar.show();
	},
	onWinInsumo: function(win) {
		this.getAlmacenStore().load();
		var form = win.down('form');
		var btnAceptar = win.down('button[name=btnAceptar]');
		var btnCancelar = win.down('button[name=btnCancelar]');
		var cboUnidad = win.down('combobox[name=unidad_id]');
		var cboUnidadType = win.down('combobox[name=unidad_type]');
		var txtCantidad = win.down('numberfield[name=cantidad]');
		var lblTotal = win.down('displayfield[name=total]');
		var lblCosto = win.down('displayfield[name=costo]');

		this.getUnidadStore().load({
			callback: function() {
				var record = this.getUnidadStore().getById(cboUnidad.getValue());
				this.setTipoUnidad(cboUnidadType, record);
				this.chageCostoTotal(form, cboUnidadType, lblCosto, lblTotal, txtCantidad, 1)
			},
			scope: this
		});

		btnAceptar.addListener('click', function(){
            var values = form.getValues();
            values.costo = lblCosto.getValue();
			var insumo = form.getRecord();
			values.almacen_name = form.down('combobox[name=almacen_id]').getRawValue();
			values.unidad_id = form.down('combobox[name=unidad_id]').getValue();
			values.unidad_name = form.down('combobox[name=unidad_type]').getRawValue();
			var type = this.getUnidadTypeStore().getById(form.down('combobox[name=unidad_type]').getValue());
			values.unidad_type = type.get('tipo');
			insumo.set(values);
			//console.log(insumo);
			if(!insumo.get('id')){
				this.getRecetaStore().add(insumo);
			}
			if (insumo.get('producto_id')) {
				//console.log(insumo.get('producto_id'));
				insumo.save({
					callback: function(record, operation, success) {
						if(success) {
							//console.log(record);
							insumo = record;
							win.close();
						} else {
							Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ha ocurrido algun error al guardar la receta');
						}
					},
					scope: this
				});
			} else {
				win.close();
			}
        }, this);
		btnCancelar.addListener('click', function(){
            win.close();
        }, this);
        //Pierde el foco
        txtCantidad.addListener('blur', function(txt){
            this.chageCostoTotal(form, cboUnidadType, lblCosto, lblTotal, txt, txt.getValue())
        }, this);
        cboUnidad.addListener('select', function(cbo, record){
            this.setTipoUnidad(cboUnidadType, record[0]);
			this.chageCostoTotal(form, cboUnidadType, lblCosto, lblTotal, txtCantidad, 1)
        }, this);
        cboUnidadType.addListener('select', function(cbo, record){
            this.chageCostoTotal(form, cboUnidadType, lblCosto, lblTotal, txtCantidad, record[0].get('cantidad'))
        }, this);
	},
	setTipoUnidad: function(cboUnidadType, record) {
		cboUnidadType.getStore().removeAll();
		cboUnidadType.getStore().add({
        	id: 1,
        	tipo: 'mayor',
        	nombre: record.get('mayor'),
        	cantidad: 1
        });
        if(record.get('cantidad')>0){
            cboUnidadType.getStore().add({
            	id: 2,
            	tipo: 'menor',
            	nombre: record.get('menor'),
            	cantidad: record.get('cantidad')
            });
        }
        cboUnidadType.setValue(1);
	},
	chageCostoTotal: function(form, cboUnidadType, lblCosto, lblTotal, txtCantidad, cantidad){
		var producto = form.getRecord();
		if(cboUnidadType.getValue()==1){
			lblCosto.setValue(producto.get('costo'));
		} else {
			var record = this.getUnidadTypeStore().getById(2);
			lblCosto.setValue(producto.get('costo')/record.get('cantidad'));
		}
        lblTotal.setValue(lblCosto.getValue()*txtCantidad.getValue());
	},
	onWinAfterLayout: function() {
		this.getForm().down('[name=codigo]').focus();
	},
	onWinClose: function() {
		//this.getProductoStore().load();
		this.buscar();
	},
	onKeyPressTxtBuscar: function(text, key){
        if(key.getKey()==key.ENTER && text.getValue().length>0){
			this.buscar();
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
    	var grid = this.getGrid();
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            //this.quitarBusqueda();
            this.buscar();
        } else if(key.getKey() == key.DOWN) {
        	var rowIndex = grid.store.indexOf(grid.getSelectionModel().selected.items[0]);
        	grid.getSelectionModel().select(rowIndex+1);
        	grid.getView().focus();
        }
    },
    buscar: function() {
    	text = this.getTxtBuscar().getValue() || null;
    	categoria_id = this.getCboCategorias().getValue() || 0;
    	grupo_id = this.getCboGrupos().getValue() || 0;
    	//console.log('text: '+text+' categoria_id: '+categoria_id+' grupo_id: '+grupo_id);
    	//return;
    	var urlOriginal = this.getProductoStore().proxy.url;
		//this.getProductoStore().proxy.url = urlOriginal+'/buscar/'+text+'/'+categoria_id+'/'+grupo_id;
		this.getProductoStore().load({
			url: urlOriginal+'/buscar/'+text+'/'+categoria_id+'/'+grupo_id,
		    callback: function(records, operation, success) {
		    	this.getProductoStore().proxy.url = urlOriginal;
		        this.getGrid().getSelectionModel().select(0);
		    },
		    scope: this
		});
    },
    quitarBusqueda: function(){
    	this.getProductoStore().load({
		    scope: this,
		    callback: function(records, operation, success) {
		        this.getGrid().getSelectionModel().select(0);
		    }
		});
    },
	onGridButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnNuevo':
				this.showForm(Ext.create('rewadmin.model.Producto', {
					'grupo_id': rewadmin.AppGlobals.GRUPO_ID_DEFAULT,
					'categoria_id': rewadmin.AppGlobals.CATEGORIA_ID_DEFAULT,
					'destino_id': rewadmin.AppGlobals.DESTINO_ID_DEFAULT,
					'centrocosto_id': rewadmin.AppGlobals.USUARIO.get('centrocosto_id'),
					'usuario_id': rewadmin.AppGlobals.USUARIO.get('id'),
					'stock_min': 0,
					'stock_max': 0,
					'igv': 'S',
					'serv': 'S'
				}));
				break;
			case 'btnEditar':
				var record = this.getGrid().getSelectionModel().selected.items[0]
				if(record!=undefined){
					this.onGridItemDblClick(this.getGrid(), record);
				}
				break;
			case 'btnRemover':
				var record = this.getGrid().getSelectionModel().selected.items[0]
				if(record!=undefined){
					Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Estas seguro de querer remover al producto: <span style=color:red; font-weidth: bold>' + record.get('nombre') + '</span>?', function(btn){
		                if(btn=='yes'){
		                	this.getProductoStore().remove(record);
		                    record.destroy();
		                }
		            }, this);
				}
				break;
			case 'btnBorrarTxt':
				this.getTxtBuscar().setValue('');
				this.buscar();
				break;
			case 'btnBorrarCboCategorias':
				this.getCboCategorias().clearValue();
				this.buscar();
				break;
			case 'btnBorrarCboGrupo':
				this.getCboGrupos().clearValue();
				this.buscar();
				break;
		}
	},
	onComboboxSelect: function(cbo, record){
		this.buscar();
	},
	onGridItemDblClick: function(grid, record) {
		var urlOriginal = this.getRecetaStore().proxy.url;
		var urlNew = urlOriginal+'/'+record.get('id');
		this.getRecetaStore().proxy.url = urlNew;
		this.getRecetaStore().load({
		    scope: this,
		    callback: function(records, operation, success) {
		        this.getRecetaStore().proxy.url = urlOriginal;
		    }
		});
		this.showForm(record);
	},
	onGridRecetaItemDblClick: function(grid, record){
		console.log(record);
		var winInsumo = Ext.widget('wininsumo');
		winInsumo.down('form').loadRecord(record);
		winInsumo.show();
	},
	/*onGridCellClick: function(grid, td, columnIndex, record) {
		var columna = grid.up('grid').columns[columnIndex].name;
        var nombre = record.get('nombre');
        if(columna == 'actionEditar') {
            this.onGridItemDblClick(grid, record);
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Estas seguro de querer remover al producto: <span style=color:red; font-weidth: bold>' + nombre + '</span>?', function(btn){
                if(btn=='yes'){
                	this.getProductoStore().remove(record);
                    record.destroy();
                }
            }, this);
        }
	},*/
	onWinButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnGuardar':
				this.guardar(btn);
				break;
			case 'btnGuardarNuevo':
				this.guardar(btn, true);
				break;
			case 'btnCancelar':
				btn.up('window').close();
				break;
			case 'btnAgregar':
				this.onWinBuscar();
				break;
			case 'btnEditar':
				var record = this.getGridReceta().getSelectionModel().selected.items[0]
				if(record!=undefined){
					this.onGridRecetaItemDblClick(this.getGridReceta(), record);
				}
				break;
			case 'btnRemover':
				var record = this.getGridReceta().getSelectionModel().selected.items[0]
				if(record!=undefined){
					Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Estas seguro de querer remover la receta: <span style=color:red; font-weidth: bold>' + record.get('insumo_name') + '</span>?', function(btn){
		                if(btn=='yes'){
		                	this.getRecetaStore().remove(record);
		                	if(record.get('id')){
			                    record.destroy();
			                }
		                }
		            }, this);
				}
				break;
		}
	},
	btnAgregarOk: function(producto) {
		var values = this.getForm().getValues();
		this.getUnidadProductoStore().load({url:rewadmin.AppGlobals.HOST+'unidad/producto/'+producto.get('id')});
		var winInsumo = Ext.widget('wininsumo');
		winInsumo.down('form').loadRecord(Ext.create('rewadmin.model.Receta', {
			'producto_id': values.id,
			'insumo_id': producto.get('id'),
			'insumo_name': producto.get('nombre'),
			'cantidad': 0,
			'unidad_id': producto.get('unidad_id'),
			'costo': producto.get('costo'),
			'total': 0,
			'almacen_id': rewadmin.AppGlobals.ALMACEN_ID_DEFAULT
		}));
		winInsumo.show();
	},
	guardar: function(btn, nuevo){
		nuevo = nuevo || false;
		if (this.getForm().isValid()) {
			var values = this.getForm().getValues();
			var record = this.getForm().getRecord();
		    record.set(values);
    		Ext.MessageBox.confirm(
				rewadmin.AppGlobals.TITULO_MENSAJE,
				'Esta seguro de querer Guardar el producto?', 
				function(res) {
					if(res=='yes') {
					    this.getForm().setLoading(true);
					    record.save({
							callback: function(record, operation, success) {
								this.getForm().setLoading(false);
								if(success) {
									var obj = Ext.decode(operation.response.responseText);
									if(!obj.error) {
										this.getRecetaStore().each(function(row){
											//console.log(row.get('id'));
											if(!row.get('id')){
												row.save({
													callback: function() {
														if(!success) {
															Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ha ocurrido algun error al guardar la receta');
														}
													},
													scope: this
												});
											}
										})
										if(!nuevo){
											btn.up('window').close();
										} else {
											this.getForm().loadRecord(Ext.create('rewadmin.model.Producto', {
												'grupo_id': values.grupo_id,
												'categoria_id': values.categoria_id,
												'destino_id': rewadmin.AppGlobals.DESTINO_ID_DEFAULT,
												'centrocosto_id': rewadmin.AppGlobals.USUARIO.get('centrocosto_id'),
												'usuario_id': rewadmin.AppGlobals.USUARIO.get('id'),
												'stock_min': 0,
												'stock_max': 0,
												'igv': 'S',
												'serv': 'S'
											}));
											this.getRecetaStore().removeAll();
										}
							        } else {
							        	Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, obj.message, function(){
							        		this.getForm().down('[name=codigo]').focus();
							        	}, this);
							        }
								}
							},
							scope: this
						});
					}
				},
				this
			);
		} else {
			Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ingrese todos los datos');
		}
	}
});
