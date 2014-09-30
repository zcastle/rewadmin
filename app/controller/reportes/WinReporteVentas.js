Ext.define('rewadmin.controller.reportes.WinReporteVentas', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'MainView',
        selector: 'winreporteventas'
    }],
    init: function() {
        this.control({
            'winreporteventas': {
                render: this.onRendered
            },
            'winreporteventas button[name=btnVerMeses]': {
                click: this.onClickVerMeses
            },
            'winreporteventas button[name=btnVerRangoFechas]': {
                click: this.onClickVerRangoFechas
            },
            'winreporteventas button[name=btnVerDiasTrabajo]': {
                click: this.onClickVerDiasTrabajo
            }
        });
    },
    onRendered: function(view) {
        view.setTitle(rewadmin.AppGlobals.REPORTE[0]);
    },
    onClickVerMeses: function(button){
        var form = button.up('window').down('form[name=frmMeses]').getForm();
        if(form.isValid()){
            var fe_ini_month = this.getMainView().down('combobox[name=fe_ini_month]').getValue();
            var fe_ini_year = this.getMainView().down('numberfield[name=fe_ini_year]').getValue();
            var fe_fin_month = this.getMainView().down('combobox[name=fe_fin_month]').getValue();
            var fe_fin_year = this.getMainView().down('numberfield[name=fe_fin_year]').getValue();
            if(fe_fin_year < fe_ini_year){
                Ext.Msg.alert('Atencion','El año de Fin debe ser mayor al aÃ±o de Inicio');
                return;
            }else if(fe_fin_month < fe_ini_month){
                Ext.Msg.alert('Atencion','El mes de Fin debe ser mayor al mes de Inicio');
                return;
            }
            if(button.action=='ver'){
                this.getApplication().getController('Main').addTabFromUrl('Reporte Meses', rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+fe_ini_month+'/'+fe_ini_year+'/'+fe_fin_month+'/'+fe_fin_year);
            }else{
                window.open(rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+fe_ini_month+'/'+fe_ini_year+'/'+fe_fin_month+'/'+fe_fin_year+'/true', '_blank');
            }
            this.getMainView().close();
        }
    },
    onClickVerRangoFechas: function(button){
        var form = button.up('window').down('form[name=frmRangoFechas]').getForm();
        if(form.isValid()){
            var fe_ini = this.getMainView().down('datefield[name=fe_ini]').getRawValue();
            var fe_fin = this.getMainView().down('datefield[name=fe_fin]').getRawValue();
            if(fe_fin < fe_ini){
                Ext.Msg.alert('Atencion','El año de Fin debe ser mayor al año de Inicio');
                return;
            }
            if(button.action=='ver'){
                this.getApplication().getController('Main').addTabFromUrl('Reporte Fechas', rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+fe_ini+'/'+fe_fin);
            }else{
                window.open(rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+fe_ini+'/'+fe_fin+'/true', '_blank');
            }
            this.getMainView().close();
        }
    },
    onClickVerDiasTrabajo: function(button){
        var form = button.up('window').down('form[name=frmDiasTrabajo]').getForm();
        if(form.isValid()){
            var dia_ini = form.getValues().dia_ini;
            var dia_fin = form.getValues().dia_fin;
            if(dia_fin < dia_ini){
                Ext.Msg.alert('Atencion','El dia Final no debe ser menor al dia de Inicio');
                return;
            }
            if(button.action=='ver'){
                this.getApplication().getController('Main').addTabFromUrl('Reporte Dias', rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+dia_ini+'/'+dia_fin);
            }else{
                window.open(rewadmin.AppGlobals.HOST+'reporte/'+rewadmin.AppGlobals.REPORTE[1]+'/'+dia_ini+'/'+dia_fin+'/true', '_blank');
            }
            this.getMainView().close();
        }
    }
});