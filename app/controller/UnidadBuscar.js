Ext.define('rewadmin.controller.UnidadBuscar', {
    extend: 'Ext.app.Controller',
    stores: ['UnidadBuscar'],
    init: function() {
		this.control({
			'winunidadesbuscar': {
				render: this.onWinRendered
			},
			'winunidadesbuscar button[name=btnCancelar]': {
				click: this.onButtonClick
			}
		});
	},
	onWinRendered: function(win) {
		var grid = win.down('grid');
		this.getUnidadBuscarStore().load({
		    scope: this,
		    callback: function(records, operation, success) {
		        grid.getSelectionModel().select(0);
		    }
		});
	},
	onButtonClick: function(btn) {
		btn.up('window').close();
	}
});
