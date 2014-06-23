Ext.define("rewadmin.view.mantenimiento.WinInsumo", {
    extend: 'Ext.window.Window',
    alias : 'widget.wininsumo',
    title: 'Insumo',
    modal: true,
    resizable: false,
    width: 300,
    layout: 'fit',
    border: false,
    items: {
        xtype: 'form',
        frame: true,
        border: false,
        layout: 'form',
        fieldDefaults: {
        	allowBlank: false,
	        labelWidth: 70,
	        flex: 1
        },
        items: [{
        	xtype: 'hiddenfield',
        	name: 'id'
        },{
        	xtype: 'displayfield',
        	fieldLabel: 'Nombre',
        	name: 'insumo_name',
        	selectOnFocus: true
        },{
            xtype: 'container',
            layout: 'hbox',
            fieldDefaults: {
                allowBlank: false,
                labelWidth: 70
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Cantidad',
                name: 'cantidad',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
            },{
                xtype: 'container',
                flex: 0,
                width: 5
            },{
                xtype: 'combobox',
                name: 'unidad_type',
                emptyText: 'Seleccionar',
                store: 'UnidadProducto',
                valueField: 'id',
                displayField: 'nombre',
                queryMode: 'local',
                editable: false
            }]
        },{
            xtype: 'combobox',
            fieldLabel: 'Almacen',
            name: 'almacen_id',
            emptyText: 'Seleccionar',
            store: 'Almacen',
            valueField: 'id',
            displayField: 'nombre',
            queryMode: 'local',
            editable: false
        },{
            xtype: 'displayfield',
            fieldLabel: 'Costo',
            name: 'costo',
            renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER_4)
        },{
            xtype: 'displayfield',
            fieldLabel: 'Total',
            name: 'total',
            renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER_4)
            /*renderer: function(val, item) {
                var cantidad = item.up('form').down('numberfield[name=cantidad]').getValue();
                var costo = item.up('form').down('displayfield[name=costo]').getValue();
                console.log(cantidad);
                console.log(costo);
                return Ext.util.Format.number(cantidad*costo, rewadmin.AppGlobals.FORMA_NUMBER_4);
            }*/
        }],
        buttons: [{
        	text: 'Aceptar',
        	name: 'btnAceptar',
        	iconCls: 'ico-aceptar-medium',
            scale: 'medium'
        }, {
        	text: 'Cancelar',
        	name: 'btnCancelar',
        	iconCls: 'ico-cancelar-medium',
            scale: 'medium'
        }]
    }
});