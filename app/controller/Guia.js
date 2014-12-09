Ext.define('rewadmin.controller.Guia', {
    extend: 'Ext.app.Controller',
    models: ['GuiaCabecera', 'GuiaDetalle', 'Cliente'],
    stores: ['GuiaDetalle', 'TipoDocumento', 'TipoOperacion', 'Almacen'],
    refs: [{
		ref: 'Viewport',
		selector: 'viewport'
	},{
		ref: 'form',
		selector: '#frmCabeceraGuia'
	},{
		ref: 'grid',
		selector: 'gridguia'
	}],
	rowEditing: null,
    init: function() {
		this.control({
			'gridguia': {
				render: this.onGridRendered,
				afterrender: this.onGridAfterRender,
				cellclick: this.onGridCellClick,
				cellkeydown: this.onCellKeyDown,
				celldblclick: this.onCellDblClick,
				afterlayout: this.onGridAfterlayout
			},
			'gridguia [action=onEditorKeydown]': {
				keydown: this.onKeyDown
			},
			'gridguia button': {
				click: this.onGridButtonClick
			},
			'gridguia textfield[name=txtRuc]': {
				keypress: this.onKeyPressTxtRuc
			}
		});
	},
	bloquear: function(action) {
		this.getForm().query('.field, .button').forEach(function(c){
			c.setDisabled(action);
		});
	},
	saveDetalle: function(recordSelected) {
    	recordSelected.save({
			callback: function(record, operation, success) {
				if(success) {
					recordSelected = record;
				} else {
					Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ha ocurrido algun error al guardar el detalle');
				}
			},
			scope: this
		});
    },
	onGridRendered: function(grid) {
		//console.log(this.getRowEditing());
		this.getTipoDocumentoStore().load();
		this.getTipoOperacionStore().load();
		this.getAlmacenStore().load();
		this.rowEditing = grid.getPlugin('rowEditing');
		this.rowEditing.addListener('beforeedit', function(){
			if(this.getGrid().down('[name=btnProcesar]').isDisabled()) return false;
        }, this);
		this.getViewport().getEl().addKeyMap({
		    binding: [{
		        key: Ext.EventObject.INSERT,
		        fn:  function(){
		        	if(this.getForm().isValid()) {
		        		var values = this.getForm().getValues();
		        		var record = this.getForm().getRecord();
		        		record.set(values);
		        		if (this.getForm().down('datefield').isDisabled()) {
		        			this.insertaLinea(values.id);
		        		} else {
		        			record.save({
								callback: function(record, operation, success) {
									if(success) {
										this.getForm().loadRecord(record);
										this.insertaLinea(record.get('id'));
									} else {
										Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ha ocurrido algun error al guardar la cabecera');
									}
								},
								scope: this
							});
		        		}
				    } else {
				    	this.getForm().down('[name=serie]').focus();
				    }
		        },
		        scope: this
		    },{
		    	key: Ext.EventObject.DELETE,
		    	fn: function(keyCode, e) {
		    		var selected = grid.getSelectionModel().selected.items[0];
		    		if (selected==undefined) return;
		    		Ext.MessageBox.confirm(
						rewadmin.AppGlobals.TITULO_MENSAJE,
						'Esta seguro de querer quitar el elemento?', 
						function(res) {
							if(res=='yes') {
								this.removeItem(selected);
							}
						},
						this
					);
		        },
		        scope: this
		    }]
		});
	},
	insertaLinea: function(id) {
		this.bloquear(true);
		var lastRecord = Ext.create('rewadmin.model.GuiaDetalle');
    	this.getGuiaDetalleStore().each( function(record){
    		lastRecord = record;
    	}, this);
    	if(lastRecord.get('producto_codigo')!='' || this.getGuiaDetalleStore().count()==0) {
        	this.getGuiaDetalleStore().add(Ext.create('rewadmin.model.GuiaDetalle', {'guia_id': id}));
        	this.rowEditing.startEdit(this.getGuiaDetalleStore().count()-1, 1);
        }
	},
	onGridAfterRender: function() {
		this.getForm().loadRecord(Ext.create('rewadmin.model.GuiaCabecera', {
			'fecha': new Date(),
			'tipo_documento_id': rewadmin.AppGlobals.TIPO_DOCUMENTO_ID_DEFAULT,
			'tipo_operacion_id': rewadmin.AppGlobals.TIPO_OPERACION_ID_DEFAULT,
			'almacen_id': rewadmin.AppGlobals.ALMACEN_ID_DEFAULT,
			'usuario_id': rewadmin.AppGlobals.USUARIO.get('id')
		}));
		this.getForm().down('[name=serie]').focus();
	},
	onGridAfterlayout: function() {
		this.getForm().down('[name=serie]').focus();
	},
	onGridButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnNuevo':
				this.bloquear(false);
				var values = this.getForm().getValues();
				if(values.id) {
					Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Esta seguro de querer iniciar una nueva guia?', function(res){
		                if(res=='yes'){
		                    this.btnNuevoOk();
		                } else {
		                	this.bloquear(true);
		                }
		            }, this);
				} else {
					this.btnNuevoOk();
				}
				break;
			case 'btnEditar':
				this.bloquear(false);
				this.getGuiaDetalleStore().each(function(item, index, length){
		    		if(!item.get('id')) {
		    			this.getGuiaDetalleStore().remove(item);
		    		}
		    	}, this);
				this.getGrid().down('textfield[name=serie]').focus();
				break;
			case 'btnBuscar':
				this.buscarGuia(btn);
				break;
			case 'btnProcesar':
				this.btnProcesarOk()
				break;
		}
	},
	btnNuevoOk: function() {
		this.getForm().getForm().reset();
		this.getGuiaDetalleStore().loadData([], false);
		this.onGridAfterRender();
		this.bloquear(false);
		this.setProcesado(false);
	},
	onGridCellClick: function(tb, td, cellIndex, record) {
		var columna = tb.up('grid').columns[cellIndex].name;
        var nombre = record.get('nombre');
        if(columna == 'actionRemover') {
        	if(this.getGrid().down('[name=btnProcesar]').isDisabled()) return;
            Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Esta seguro de querer quitar el elemento?', function(res){
                if(res=='yes'){
                    this.removeItem(record);
                }
            }, this);
        }
	},
	removeItem: function(selected) {
		//var rowIndex = this.grid.store.indexOf(selected);
		this.getGuiaDetalleStore().remove(selected);
		selected.destroy();
	},
	onCellKeyDown: function(tb, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var columna = tb.up('grid').columns[cellIndex].name;
		if (e.getKey()==Ext.EventObject.ENTER && columna == 'actionUnidad') {
			this.callUnidad();
		}
	},
	onCellDblClick: function(tb, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var columna = tb.up('grid').columns[cellIndex].name;
		if (columna == 'actionUnidad') {
			this.callUnidad();
    	}
	},
	callUnidad: function() {
		if(this.getGrid().down('[name=btnProcesar]').isDisabled()) return;
        var recordSelected = this.getGrid().getSelectionModel().selected.items[0];
        var win = Ext.widget('winunidadesbuscar');
        var btnAceptar = win.down('button[name=btnAceptar]');
        var gridBuscar = win.down('grid');
        gridBuscar.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.setUnidad(recordSelected, record, win, this.getGrid());
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
        gridBuscar.addListener('itemdblclick', function(grid, record){
            this.setUnidad(recordSelected, record, win, grid);
        }, this);
        btnAceptar.addListener('click', function(){
            var record = gridBuscar.getSelectionModel().selected.items[0];
            this.setUnidad(recordSelected, record, win, this.getGrid());
        }, this);
        win.show();
	},
	setUnidad: function(recordSelected, record, winBuscar, grid) {
        Ext.create('Ext.menu.Menu', {
            items: [{
                text: record.get('mayor'),
                handler: function() {
                    recordSelected.set('unidad_id', record.get('id'));
                    recordSelected.set('unidad_name', record.get('mayor'));
                    recordSelected.set('unidad_type', 'mayor');
                    recordSelected.set('unidad_cantidad', 1);
                    this.saveDetalle(recordSelected);
                    winBuscar.close();
                    //grid.el.focus();
                },
                scope: this
            },{
                text: record.get('menor')+'x'+record.get('cantidad'),
                handler: function() {
                    recordSelected.set('unidad_id', record.get('id'));
                    recordSelected.set('unidad_name', record.get('mayor'));
                    recordSelected.set('unidad_type', 'menor');
                    recordSelected.set('unidad_cantidad', record.get('cantidad'));
                    this.saveDetalle(recordSelected);
                    winBuscar.close();
                    //grid.el.focus();
                },
                scope: this
            }]
        }).show();
    },
	onKeyDown: function(text, e) {
		if (e.getKey()==Ext.EventObject.ENTER) {
			switch(text.name) {
				case 'txtCodigo':
					this.onTxtCodigo(text);
					break;
				case 'txtCantidad':
					this.onTxtCantidad(text);
					break;
				case 'txtUnitario':
					this.onTxtUnitario(text);
					break;
			}
		}
	},
	calculoInicial: function(recordSelected, record) {
		recordSelected.set('producto_id', record.get('id'));
        recordSelected.set('producto_codigo', record.get('codigo'));
        recordSelected.set('producto_name', record.get('nombre'));
        var base = record.get('costo');
        var igv = 0.0;
        var total = base;
        if(record.get('igv')=='S') {
            base = base / ((rewadmin.AppGlobals.IGV/100)+1);
            igv = base * (rewadmin.AppGlobals.IGV/100);
        }
        recordSelected.set('unitario', total);
        recordSelected.set('base', base);
        recordSelected.set('neto', base);
        recordSelected.set('igv', igv);
        recordSelected.set('total', total);
        recordSelected.set('afecto', record.get('igv'));
        if(recordSelected.get('cantidad')=='') {
            recordSelected.set('cantidad', 1);
        }
        //
        var Unidad = Ext.ModelManager.getModel('rewadmin.model.Unidad');
        Unidad.load('producto/'+record.get('id'), {
            callback: function(record, operation, success) {
                if(success) {
                    recordSelected.set('unidad_name', record.get('mayor'));
                    recordSelected.set('unidad_id', record.get('id'));
                }
            },
            scope: this
        });
        //
        this.saveDetalle(recordSelected);
        //
        this.rowEditing.startEdit(recordSelected, 3);
    },
    calcular: function(recordSelected) {
    	var base = recordSelected.get('unitario')*recordSelected.get('cantidad');
        var igv = 0.0;
        var total = base;
        if(recordSelected.get('afecto')=='S') {
            base = base / ((rewadmin.AppGlobals.IGV/100)+1);
            igv = base * (rewadmin.AppGlobals.IGV/100);
        }
        recordSelected.set('base', base);
        recordSelected.set('neto', base);
        recordSelected.set('igv', igv);
        recordSelected.set('total', total);
        this.saveDetalle(recordSelected);
    },
	onTxtCodigo: function(text) {
        var value = text.getValue();
        var recordSelected = this.getGrid().getSelectionModel().selected.items[0];
        if(recordSelected==undefined) {
        	this.getGrid().getSelectionModel().select(this.getGuiaDetalleStore().count()-1);
        	recordSelected = this.getGrid().getSelectionModel().selected.items[0];
        }
        var Producto = Ext.ModelManager.getModel('rewadmin.model.Producto');
        if(value=='') {
            var winBuscar = Ext.widget('winproductobuscar');
            var btnAceptar = winBuscar.down('button[name=btnAceptar]');
            var gridBuscar = winBuscar.down('grid');
            gridBuscar.getView().on('viewready', function(grd){
                var maps = new Ext.util.KeyMap(grd.getEl(), [{
                    key: Ext.EventObject.ENTER,
                    fn: function(){
                        var record = grd.getSelectionModel().selected.items[0];
                        this.calculoInicial(recordSelected, record);
                        winBuscar.close();
                    },
                    scope: this
                }]);
                grd.keys = maps;
            }, this);
            gridBuscar.addListener('itemdblclick', function(grid, record){
                this.calculoInicial(recordSelected, record);
                winBuscar.close();
            }, this);
            btnAceptar.addListener('click', function(){
                var record = this.getGrid().getSelectionModel().selected.items[0];
                this.calculoInicial(recordSelected, record);
                winBuscar.close();
            }, this);
            winBuscar.show();
        } else {
        	this.getGrid().setLoading('Buscando');
            Producto.load('codigo/'+value, {
                callback: function(record, operation, success) {
                	this.getGrid().setLoading(false);
                    if(success) {
                        this.calculoInicial(recordSelected, record);
                    } else {
                        Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Codigo no encontrado');
                    }
                },
                scope: this
            });
        }
	},
	onTxtCantidad: function(text) {
		if(text.getValue()=='' || text.getValue()==null) text.setValue('1');
        var recordSelected = this.getGrid().getSelectionModel().selected.items[0];
        recordSelected.set('cantidad', text.getValue());
        this.calcular(recordSelected);
        this.rowEditing.startEdit(recordSelected, 5);
	},
	onTxtUnitario: function(text) {
		if(text.getValue()=='' || text.getValue()==null) text.setValue('0');
        var recordSelected = this.getGrid().getSelectionModel().selected.items[0];
        recordSelected.set('unitario', text.getValue());
        this.calcular(recordSelected);
	},
	onKeyPressTxtRuc: function(text, e) {
		if(e.getKey()==e.ENTER && text.getValue()!=null){
			if(new String(text.getValue()).length>=11) {
				var Proveedor = Ext.ModelManager.getModel('rewadmin.model.Cliente');
				Proveedor.load('ruc/'+text.getValue(), {
				    success: function(proveedor) {
				        //var form = text.up('form');
				        this.getForm().down('[name=txtComercial]').setValue(proveedor.get('nombre'));
				        this.getForm().down('[name=cliente_id]').setValue(proveedor.get('id'));
				    },
				    failure: function() {
				    	Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'RUC no encontrado');
				    },
				    scope: this
				});
			}
        }
	},
	buscarGuia: function(btn) {
		var win = Ext.widget('winguiabuscar');
		var gridBuscar = win.down('grid');
		var btnAceptar = win.down('button[name=btnAceptar]');
		gridBuscar.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.buscarGuiaOk(record, win);
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
        gridBuscar.addListener('itemdblclick', function(grid, record){
            this.buscarGuiaOk(record, win);
        }, this);
        btnAceptar.addListener('click', function(){
            var record = gridBuscar.getSelectionModel().selected.items[0];
            this.buscarGuiaOk(record, win);
        }, this);
		win.show();
	},
	buscarGuiaOk: function(record, win) {
		this.getForm().loadRecord(record);
		this.bloquear(true);
		this.setProcesado(record.get('procesado'));
		var urlOriginal = this.getGuiaDetalleStore().proxy.url;
		var urlNew = urlOriginal+'/'+record.get('id');
		this.getGuiaDetalleStore().proxy.url = urlNew;
		this.getGuiaDetalleStore().load({
		    scope: this,
		    callback: function(records, operation, success) {
		        this.getGuiaDetalleStore().proxy.url = urlOriginal;
		        win.close();
		    }
		});
	},
	btnProcesarOk: function() {
		var id = this.getForm().getRecord().get('id');
		if(!id) return;
		Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Esta seguro de querer procesar la guia?', function(res){
            if(res=='yes'){
            	Ext.getBody().mask('Procesando...');
				Ext.Ajax.request({
				    url: rewadmin.AppGlobals.HOST+'guia/procesar/'+id,
				    success: function(response){
				        var text = response.responseText;
				        console.log(text);
				        this.setProcesado(true);
				    },
				    callback: function() {
				    	Ext.getBody().unmask();
				    },
				    scope: this
				});
            }
        }, this);
	},
	setProcesado: function(b) {
		this.getGrid().down('[name=btnProcesar]').setDisabled(b);
		this.getGrid().down('[name=btnEditar]').setDisabled(b);
	}
});
