Ext.define('rewadmin.controller.Producto', {
    extend: 'Ext.app.Controller',
    models: ['Producto'],
    stores: ['Producto', 'Grupo', 'Categoria', 'Destino', 'Receta', 'Almacen', 'UnidadProducto'],
    refs: [{
		ref: 'form',
		selector: '#frmProductos'
	}],
    init: function() {
		this.control({
			'gridproductos': {
				render: this.onGridRendered,
				itemdblclick: this.onGridItemDblClick,
				cellclick: this.onGridCellClick
			},
			'gridproductos button': {
				click: this.onGridButtonClick
			},
			'winproductos': {
				afterlayout: this.onWinAfterLayout,
				close: this.onWinClose
			},
			'winproductos button': {
				click: this.onWinButtonClick
			},
			'winproductobuscar': {
				render: this.onWinBuscarRender
			},
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
		win.show();
	},
	onWinBuscarRender: function(win) {
		var btnAceptar = win.down('button[name=btnAceptar]');
        var gridBuscar = win.down('grid');
        gridBuscar.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.ENTER,
                fn: function(){
                    var record = grd.getSelectionModel().selected.items[0];
                    this.btnAgregarOk(record);
                    win.close();
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
        gridBuscar.addListener('itemdblclick', function(grid, record){
            this.btnAgregarOk(record);
            win.close();
        }, this);
        btnAceptar.addListener('click', function(){
            var record = this.getGrid().getSelectionModel().selected.items[0];
            this.btnAgregarOk(record);
            win.close();
        }, this);
	},
	onWinInsumo: function(win) {
		this.getAlmacenStore().load();
		var btnAceptar = win.down('button[name=btnAceptar]');
		var btnCancelar = win.down('button[name=btnCancelar]');
		var cboUnidad = win.down('combobox[name=unidad_type]');
		var txtCantidad = win.down('numberfield[name=cantidad]');
		var lblTotal = win.down('displayfield[name=total]');
		var lblCosto = win.down('displayfield[name=costo]');
		btnAceptar.addListener('click', function(){
            var form = win.down('form');
            var values = form.getValues();
            values.costo = lblCosto.getValue();
			var insumo = form.getRecord();
			values.almacen_name = form.down('combobox[name=almacen_id]').getRawValue();
			values.unidad_name = form.down('combobox[name=unidad_type]').getRawValue();
			insumo.set(values);
			this.getRecetaStore().add(insumo);
			console.log(insumo.get('producto_id'));
			if (insumo.get('producto_id')) {
				insumo.save({
					callback: function(record, operation, success) {
						if(success) {
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
        txtCantidad.addListener('blur', function(txt){
            var producto = win.down('form').getRecord();
            var unidad = this.getUnidadProductoStore().getById(cboUnidad.getValue());
            lblCosto.setValue(producto.get('costo')/unidad.get('cantidad'));
            lblTotal.setValue(lblCosto.getValue()*txt.getValue());
        }, this);
        cboUnidad.addListener('afterrender', function(cbo){
            cbo.setValue('mayor');
        }, this);
        cboUnidad.addListener('select', function(cbo, record){
        	var producto = win.down('form').getRecord();
            lblCosto.setValue(producto.get('costo')/record[0].get('cantidad'));
            lblTotal.setValue(lblCosto.getValue()*txtCantidad.getValue());
        }, this);
	},
	onWinAfterLayout: function() {
		this.getForm().down('[name=codigo]').focus();
	},
	onWinClose: function() {
		this.getProductoStore().load();
	},
	onGridButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnNuevo':
				this.showForm(Ext.create('rewadmin.model.Producto', {
					'grupo_id': rewadmin.AppGlobals.GRUPO_ID_DEFAULT,
					'categoria_id': 91,
					'destino_id': rewadmin.AppGlobals.DESTINO_ID_DEFAULT,
					'centrocosto_id': rewadmin.AppGlobals.USUARIO.get('centrocosto_id'),
					'usuario_id': rewadmin.AppGlobals.USUARIO.get('id'),
					'stock_min': 0,
					'stock_max': 0,
					'igv': 'S',
					'serv': 'S'
				}));
				break;
		}
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
	onGridCellClick: function(grid, td, columnIndex, record) {
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
	},
	onWinButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnGuardar':
				this.guardar(btn);
				break;
			case 'btnCancelar':
				btn.up('window').close();
				break;
			case 'btnAgregar':
				Ext.widget('winproductobuscar').show();
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
	guardar: function(btn){
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
										btn.up('window').close();
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
