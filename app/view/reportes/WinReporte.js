Ext.define('rewadmin.view.reportes.WinReporte', {
    extend: 'Ext.container.Container',
    alias: 'widget.winreporte',
    defaults: {
        xtype: 'form',
        collapsible: true,
        collapsed: true,
        frame: true,
        border: false,
        layout: 'hbox',
        defaults: {
            labelWidth: 30,
            allowBlank: false
        }
    },
    items: [{
        title: 'Reporte por Meses',
        name: 'frmMeses',
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Inicio',
            name: 'fe_ini_month',
            store: 'Meses',
            displayField: 'name',
            valueField: 'num',
            queryMode: 'local',
            emptyText: 'Month',
            forceSelection: true,
            width: 111
        },{
            xtype: 'numberfield',
            name: 'fe_ini_year',
            value: new Date().getFullYear(),
            maxValue: new Date().getFullYear(),
            margins: '0 0 0 3',
            width: 52
        },{
            xtype: 'combobox',
            fieldLabel: 'Fin',
            name: 'fe_fin_month',
            store: 'Meses',
            displayField: 'name',
            valueField: 'num',
            queryMode: 'local',
            emptyText: 'Month',
            forceSelection: true,
            margins: '0 0 0 3',
            labelWidth: 20,
            width: 101
        },{
            xtype: 'numberfield',
            name: 'fe_fin_year',
            value: new Date().getFullYear(),
            maxValue: new Date().getFullYear(),
            margins: '0 0 0 3',
            width: 52
        },{
            xtype: 'button',
            name: 'btnVerMeses',
            text: 'Ver',
            action: 'ver',
            margins: '0 0 0 5',
            width: 55
        },{
            xtype: 'button',
            name: 'btnVerMeses',
            text: 'Excel',
            margins: '0 0 0 5',
            width: 55
        }]
    },{
        title: 'Reporte por Rango de Fechas',
        name: 'frmRangoFechas',
        items: [{
            xtype: 'datefield',
            fieldLabel: 'Inicio',
            name: 'fe_ini',
            itemId: 'startdt',
            emptyText: 'Inicio',
            flex: 1//,
            //vtype: 'daterange',
            //endDateField: 'enddt'
        },{
            xtype: 'datefield',
            fieldLabel: 'Fin',
            name: 'fe_fin',
            itemId: 'enddt',
            emptyText: 'Fin',
            margins: '0 0 0 5',
            flex: 1//,
            //vtype: 'daterange',
            //startDateField: 'startdt'
        },{
            xtype: 'button',
            name: 'btnVerRangoFechas',
            text: 'Ver',
            action: 'ver',
            margins: '0 0 0 5',
            width: 55
        },{
            xtype: 'button',
            name: 'btnVerRangoFechas',
            text: 'Excel',
            margins: '0 0 0 5',
            width: 55
        }]
    },{
        xtype: 'panel',
        title: 'Reporte por Dias de Trabajo',
        collapsible: false,
        collapsed: false,
        layout: {
            type: 'vbox',
            align : 'stretch',
            pack  : 'start'
        },
        items: [{
            xtype: 'form',
            name: 'frmDiasTrabajo',
            layout: 'hbox',
            frame: true,
            defaults: {
                allowBlank: false,
                labelWidth: 30
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Inicio',
                name: 'dia_ini',
                emptyText: 'Inicio',
                flex: 1
            },{
                xtype: 'numberfield',
                fieldLabel: 'Fin',
                name: 'dia_fin',
                emptyText: 'Fin',
                margins: '0 0 0 5',
                flex: 1
            },{
                xtype: 'button',
                name: 'btnVerDiasTrabajo',
                text: 'Ver',
                action: 'ver',
                margins: '0 0 0 5',
                width: 55
            },{
                xtype: 'button',
                name: 'btnVerDiasTrabajo',
                text: 'Excel',
                margins: '0 0 0 5',
                width: 55
            }]
        },{
            xtype: 'grid',
            height: 280,
            store: 'DiasTrabajo',
            margins: '3 0 0 0',
            columns: [{
                header: 'Dia',
                dataIndex: 'dia',
                width: 80
            },{
                header: 'Fecha Inicio',
                dataIndex: 'fe_ini',
                flex: 1
            },{
                header: 'Fecha Fin',
                dataIndex: 'fe_fin',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'DiasTrabajo',
                dock: 'bottom'
            }]
        }]
    }]
});