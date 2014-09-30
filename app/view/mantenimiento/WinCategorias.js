Ext.define("rewadmin.view.mantenimiento.WinCategorias", {
    extend: 'Ext.window.Window',
    alias : 'widget.wincategorias',
    title: 'Categorias',
    modal: true,
    resizable: false,
    width: 350,
    layout: 'fit',
    border: false,
    items: {
        xtype: 'form',
        frame: true,
        border: false,
        layout: 'form',
        fieldDefaults: {
        	allowBlank: false,
	        labelWidth: 50,
	        flex: 1
        },
        items: [{
        	xtype: 'hiddenfield',
        	name: 'id'
        },{
        	xtype: 'combobox',
        	fieldLabel: 'Grupo',
        	name: 'grupo_id',
        	store: 'Grupo',
	        valueField: 'id',
	        displayField: 'nombre',
	        queryDelay: 250,
	        queryMode: 'local',
	        editable: false
        },{
        	xtype: 'textfield',
        	fieldLabel: 'Nombre',
        	name: 'nombre',
        	selectOnFocus: true
        },{
        	xtype: 'container',
            layout: 'hbox',
			fieldDefaults: {
				allowBlank: false,
				labelWidth: 50
			},
        	items: [{
        		xtype: 'combobox',
        		fieldLabel: 'Destino',
        		name: 'destino_id',
        		emptyText: 'Seleccionar',
        		store: 'Destino',
		        valueField: 'id',
		        displayField: 'nombre',
		        queryMode: 'local',
		        editable: false,
		        flex: 1
        	},{
        		xtype: 'container',
        		flex: 0,
        		width: 5
        	},{
        		xtype: 'numberfield',
        		fieldLabel: 'Orden',
        		name: 'orden',
        		minValue: 0,
        		value: 0,
        		flex: 1
        	}]
        }],
        buttons: [{
            text: 'Guardar',
            name: 'btnGuardar',
            baseCls: 'rew-btn',
            cls: 'btn-aceptar'
        }, {
            text: 'Cancelar',
            name: 'btnCancelar',
            baseCls: 'rew-btn',
            cls: 'btn-cancelar'
        }]
    }
});