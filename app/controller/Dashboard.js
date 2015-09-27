Ext.define('rewadmin.controller.Dashboard', {
    extend: 'Ext.app.Controller',
    stores: ['Resumen', 'ResumenSemana'],
    init: function() {
		this.control({
			'dashboard': {
				render: this.onViewportRendered
			},
			'dashboard chart': {
				afterrender: this.onChartAfterRendered
			},
			'dashboard button[name=recargar]': {
				click: this.onRecargar
			}
		});
	},
	onViewportRendered: function() {
		this.getResumenStore().load();
		this.getResumenSemanaStore().load();
	},
	onChartAfterRendered: function(seismeses) {
		//var seismeses = Ext.getCmp('seismeses');
		//var ini_mes = Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.MONTH, 5), 'n');
		//var fin_mes = parseInt(ini_mes) + 6;
		//var meses = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		//seismeses.axes.items[0].fields=[];
		//seismeses.series.items[0].yField=[];
		//var mes;
		//for (var i=ini_mes; i<fin_mes; i++) {
			//mes = meses[i-1];
			//seismeses.axes.items[0].fields.push(mes);
			//seismeses.series.items[0].yField.push(mes);
		//};
		//console.log(seismeses.axes.items[0].fields);
		//console.log(seismeses.series.items[0].yField);
		//console.log(seismeses);
	},
	onRecargar: function() {
		this.getResumenStore().load();
		this.getResumenSemanaStore().load();
	}
});
