Ext.define('rewadmin.controller.Categoria', {
    extend: 'Ext.app.Controller',
    models: ['Categoria'],
    stores: ['Categoria', 'Grupo', 'Destino'],
    init: function() {
		this.control({
			'gridcategorias': {
				render: this.onGridRendered,
				itemdblclick: this.onGridItemDblClick,
				cellclick: this.onGridCellClick
			},
			'gridcategorias button': {
				click: this.onGridButtonClick
			},
			'wincategorias': {
				afterrender: this.onWinAfterRender,
				show: this.onWinShow
			},
			'wincategorias button': {
				click: this.onWinButtonClick
			}
		});
	},
	onGridRendered: function() {
		this.getCategoriaStore().load();
		this.getGrupoStore().load();
		this.getDestinoStore().load();
	},
	onGridButtonClick: function(btn) {
		switch(btn.name) {
			case 'btnNuevo':
				Ext.widget('wincategorias').show(btn);
				break;
		}
	},
	onGridItemDblClick: function(grid, record) {
		var win = Ext.widget('wincategorias');
		var form = win.down('form');
		form.loadRecord(record);
		win.show(grid);
	},
	onGridCellClick: function(grid, td, columnIndex, record) {
		var columna = grid.up('grid').columns[columnIndex].name;
        var nombre = record.get('nombre');
        if(columna == 'actionEditar') {
            this.onGridItemDblClick(grid, record);
        } else if(columna == 'actionRemover') {
            Ext.Msg.confirm(rewadmin.AppGlobals.TITULO_MENSAJE, 'Estas seguro de querer remover el elemento: <span style=color:red; font-weidth: bold>' + nombre + '</span>?', function(btn){
                if(btn=='yes'){
                    record.destroy();
                    this.getCategoriaStore().remove(record);
                }
            }, this);
        }
	},
	onWinAfterRender: function(win) {
		//if (win.down('hiddenfield[name=id]').getValue()=='') {
			//win.down('combobox[name=grupo_id]').setValue(rewadmin.AppGlobals.GRUPO_ID_DEFAULT);
			//win.down('combobox[name=destino_id]').setValue(rewadmin.AppGlobals.DESTINO_ID_DEFAULT);
		//}
	},
	onWinShow: function(win) {
		//win.down('textfield[name=nombre]').focus();
	},
	onWinButtonClick: function(btn) {
		//console.log(btn.id);
		switch(btn.name) {
			case 'btnGuardar':
				this.guardar(btn);
				break;
			case 'btnCancelar':
				btn.up('window').close();
				break;
		}
	},
	guardar: function(btn){
		var form = btn.up('window').down('form'); //Ext.getCmp('form');
		if (form.isValid()) {
			var values = form.getValues();
			if (values.id) {
				Ext.MessageBox.confirm(
					rewadmin.AppGlobals.TITULO_MENSAJE,
					'Esta seguro de querer editar el elemento?', 
					function(b) {
						if(b=='yes') {
							form.setLoading(true);
							var record = form.getRecord();
							record.set(values);
							record.save({
							    success: function(a, operation) {
							    	this.getCategoriaStore().load();
									btn.up('window').close();
							    },
							    callback: function(records, operation, success) {
							    	form.setLoading(false);
							    	if (!success) {
										btn.up('window').close();
							    	}
							    },
							    scope: this
							});
						}
					},
					this
				);
			} else {
				Ext.MessageBox.confirm(
					rewadmin.AppGlobals.TITULO_MENSAJE,
					'Esta seguro de querer guardar el elemento?', 
					function(b) {
						if(b=='yes') {
							form.setLoading(true);
							Ext.create('rewadmin.model.Categoria', values).save({
							    success: function(a, operation) {
							    	console.log('success');
							    	this.getCategoriaStore().load();
									btn.up('window').close();
							    },
							    callback: function(records, operation, success) {
							    	console.log('callback');
							    	form.setLoading(false);
							    	if (!success) {
										btn.up('window').close();
							    	}
							    },
							    scope: this
							});
						}
					},
					this
				);
			}
		} else {
			Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ingrese todos los datos');
		}
	}
});
