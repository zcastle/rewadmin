Ext.define('rewadmin.controller.reportes.WinReporte', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'MainView',
        selector: 'winreporte'
    }],
    stores: ['Meses', 'DiasTrabajo'],
    init: function() {
        this.control({
            'winreporte': {
                render: this.onRendered
            },
            'winreporte grid': {
                itemclick: this.onItemClickGridDias
            }
        });
    },
    onRendered: function() {
        this.getDiasTrabajoStore().load();
    },
    onItemClickGridDias: function(Grid, record){
        var dia = record.get('dia');
        this.getMainView().down('numberfield[name=dia_ini]').setValue(dia);
        this.getMainView().down('numberfield[name=dia_fin]').setValue(dia);
    }
});