Ext.define('rewadmin.view.Dashboard', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard',
    border: false,
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    id: 'dashboard',
    items: [{
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'label',
            cls: 'resumen-ventas',
            html: 'Resumen de Ventas'
        },{
            xtype: 'button',
            name: 'recargar',
            cls: 'resumen-ventas-small',
            html: 'Recargar'
        }]
    },{
        xtype: 'dataview',
        store: 'Resumen',
        tpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="resumen">',
                  '<div class="venta">S/. {pedido:this.formatNumer}</div>',
                  '<div class="cc">{centrocosto_name}</div>',
                  '<div class="mas">...</div>',
                '</div>',
            '</tpl>',
            {
                formatNumer: function(item) {
                    return Ext.util.Format.number(item, '0.00');
                }
            }
        ),
        itemSelector: ''
    },{
        xtype: 'label',
        cls: 'resumen-ventas',
        html: 'Esta Semana'
    },{
        xtype: 'chart',
        //id: 'seismeses',
        //theme: 'Green',
        height: 300,
        store: 'ResumenSemana',
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
            title: 'Ventas',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['centrocosto_name'],
            title: 'Centro de Costo'
        }],
        series: [{
            type: 'column',
            axis: 'bottom',
            highlight: true,
            xField: 'centrocosto_name',
            yField: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
                renderer: function(val,text,record,series) {
                    return series.yField.substring(0, 3)+' '+Ext.util.Format.number(val, '0.00');
                },
                orientation: 'vertical',
                color: '#fff'
            }
        }]
    }]
});