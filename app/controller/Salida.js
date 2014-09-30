Ext.define('rewadmin.controller.Salida', {
    extend: 'Ext.app.Controller',
    stores: ['DiasTrabajo'],
    init: function() {
		this.control({
			'winsalida': {
				render: this.onWinRendered
			}
		});
	},
	onWinRendered: function(win) {
		this.getDiasTrabajoStore().load();
	}
});
