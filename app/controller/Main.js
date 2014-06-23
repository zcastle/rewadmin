Ext.define('rewadmin.controller.Main', {
    extend: 'Ext.app.Controller',
    stores: ['Launcher'],
    init: function() {
		this.control({
			'viewport': {
				render: this.onViewportRendered,
				afterrender: this.onAfterRendered
			},
			'app-main':{
				beforeactivate: this.onBeforeActivateRender
			},
			'app-main dataview[id=images-view]': {
				itemclick: this.onDataviewItemclick
			},
			'app-main menuitem': {
				click: this.onClickMenuItem
			}
		});
	},
	onViewportRendered: function() {
	},
	onBeforeActivateRender: function() {
		//console.log(rewadmin.AppGlobals.USUARIO.get('rol_id'));
		var tbInicio = Ext.getCmp('tbInicio');
		var tbSalir = Ext.getCmp('tbSalir');
		tbSalir.add({
            iconCls: 'ico-menu-salir',
            menu: [{
                text: 'Cerrar Sesion'
            }]
        });
		this.getLauncherStore().load({
			id: rewadmin.AppGlobals.USUARIO.get('rol_id'),
			callback: function(records, operation, success) {
				var menu = Ext.create('Ext.menu.Menu');
				Ext.Array.forEach(records, function(record) {
					menu.add({
						text: record.get('titulo'),
						action: record.get('accion')
					})
				});
				tbInicio.add({
					iconCls: 'ico-menu-inicio',
					menu: menu
				});
			},
			scope: this
		})
	},
	onAfterRendered: function(viewport) {
		console.log('Sistema iniciado');
		console.log('Debug is '+rewadmin.AppGlobals.DEBUG);
		if (rewadmin.AppGlobals.DEBUG) {
			rewadmin.AppGlobals.USUARIO = Ext.create('rewadmin.model.Usuario', {
				id: 99,
				nombres: 'Administrador',
				apellidos: '',
				usuario: 'root',
				ubigeo_id: 1394,
				centrocosto_id: 1,
				rol_id: 1
			});
			viewport.getLayout().setActiveItem(1);
		}
		//this.addTab('Guias', 'gridguia');
		this.addTab('Productos', 'gridproductos');
		//this.addTab('Categorias', 'gridcategorias');
	},
	onDataviewItemclick: function(view, record) {
		this.addTab(record.get('titulo'), record.get('accion'));
	},
	addTab: function(titulo, accion) {
		var mainTabs = Ext.getCmp('TabMain');
		for (i = 0; i <= mainTabs.items.getCount()-1; i++) {
            if(mainTabs.items.get(i).title==titulo){
                mainTabs.setActiveTab(mainTabs.items.get(i));
                return;
            }
        }
		mainTabs.add({
			id: accion,
			title: titulo,
			layout: 'fit',
			items: Ext.widget(accion),
			closable: true
		}).show();
		//mainTabs.setActiveTab(accion);
	},
	onClickMenuItem: function(item) {
		this.addTab(item.text, item.action);
	}
});