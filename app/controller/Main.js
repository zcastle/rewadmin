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
			},
			'app-main buttongroup > button': {
				click: this.onClickButtonMenu
			},
			'app-main button[name=btn-collapse]': {
				click: this.onClickButtonCollapse
			},
			'#menumain': {
				beforeexpand: this.onBeforeExpandMenu
			},
			'#TabMain': {
				tabchange: this.onTabChange
			}
		});
	},
	onViewportRendered: function() {
	},
	onBeforeActivateRender: function() {
		//console.log(rewadmin.AppGlobals.USUARIO.get('rol_id'));
		/*var tbInicio = Ext.getCmp('tbInicio');
		var tbSalir = Ext.getCmp('tbSalir');
		tbSalir.add({
            iconCls: 'ico-menu-salir',
            menu: [{
                text: 'Cerrar Sesion'
            }]
        });
		/*this.getLauncherStore().load({
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
		})*/
	},
	onAfterRendered: function(viewport) {
		console.log('Sistema iniciado');
		console.log('Debug is '+rewadmin.AppGlobals.DEBUG);
		if (rewadmin.AppGlobals.DEBUG) {
			rewadmin.AppGlobals.USUARIO = Ext.create('rewadmin.model.Usuario', {
				id: 99,
				nombres: 'ADMINISTRADOR',
				apellidos: '',
				usuario: 'admin',
				ubigeo_id: 1394,
				centrocosto_id: 1,
				rol_id: 1
			});
			viewport.getLayout().setActiveItem(1);
			//this.addTab('Guias', 'gridguia');
			//this.addTab('Productos', 'gridproductos');
			//this.addTab('Categorias', 'gridcategorias');
			//Ext.widget('winreporteventas').show();
			this.addTab('Guia de Produccion', 'gridordenproduccion');
		}
	},
	onDataviewItemclick: function(view, record) {
		this.addTab(record.get('titulo'), record.get('accion'));
	},
	addTabFromUrl: function(titulo, url) {
		var mainTabs = Ext.getCmp('TabMain');
		mainTabs.add({
			//id: accion,
			title: titulo,
			layout: 'fit',
			plain: true,
	        items: {
	            xtype: 'component',
	            autoEl: {
	                tag: 'iframe',
	                headers: { 'Content-Type': 'application/pdf' },
	                src: url
	            }
	        },
			closable: true
		}).show();
	},
	addTab: function(titulo, accion) {
		var mainTabs = Ext.getCmp('TabMain');
		for (i = 0; i <= mainTabs.items.getCount()-1; i++) {
            if(mainTabs.items.get(i).title==titulo){
                mainTabs.setActiveTab(mainTabs.items.get(i));
                return;
            }
        }
        Ext.getCmp('titulo').setText(titulo);
		mainTabs.add({
			//id: accion,
			title: titulo,
			layout: 'fit',
			items: Ext.widget(accion),
			closable: true
		}).show();
		//mainTabs.setActiveTab(accion);
	},
	onClickMenuItem: function(item) {
		if(item.action){
			if(item.action.substr(0, 3)=='win') {
				//console.log(item.tag);
				switch(item.tag) {
					case 'ventas':
						rewadmin.AppGlobals.REPORTE = rewadmin.AppGlobals.REPORTE_VENTAS;
						break;
					case 'familias':
						rewadmin.AppGlobals.REPORTE = rewadmin.AppGlobals.REPORTE_FAMILIAS;
						break;
				}
				Ext.widget(item.action).show();
			} else {
				this.addTab(item.text, item.action);
			}
		}
	},
	onClickButtonMenu: function(btn) {
		//this.addTab(btn.text, btn.action);
		Ext.getCmp('TabMain').removeAll(true);
		Ext.getCmp('TabMain').add({xtype: btn.action});
	},
	onClickButtonCollapse: function() {
		var menuMain = Ext.getCmp('menumain');
		if(!menuMain.getCollapsed()){
			menuMain.collapse();
			menuMain.setTitle('M E N U');
		}
	},
	onBeforeExpandMenu: function() {
		var menuMain = Ext.getCmp('menumain');
		menuMain.getHeader().hide();
	},
	onTabChange: function(tabPanel, newCard){
		Ext.getCmp('titulo').setText(newCard.title);
	}
});