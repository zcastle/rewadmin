Ext.define('rewadmin.controller.Login', {
    extend: 'Ext.app.Controller',
    models: ['Usuario'],
    stores: ['Usuario'],
    refs: [{
        ref: 'Viewport',
        selector: 'viewport'
    }],
    init: function() {
		this.control({
			'loginView': {
				render: this.onViewportRendered
			},
			'loginView button': {
				click: this.onButtonClick
			},
			'loginView textfield': {
				keypress: this.onTextfieldKeypress
			}
		});
	},
	onButtonClick: function() {
		var frmLogin = Ext.getCmp('frmLogin'), txtUsuario = Ext.getCmp('txtUsuario'), txtClave = Ext.getCmp('txtClave');
		if (frmLogin.isValid()) {
			var existe = false;
			this.getUsuarioStore().each(function(record) {
				if (Ext.Object.equals(record.get('usuario'), txtUsuario.getValue())) {
					existe = true;
					var clave = Ext.util.MD5(txtClave.getValue());
					if (Ext.Object.equals(record.get('clave'), clave)) {
						rewadmin.AppGlobals.USUARIO = record;
						this.getViewport().getLayout().setActiveItem(1);
					} else {
						Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'La contraseña no coincide');
					}
				}
			}, this);
			if(!existe) {
				Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'El usuario no existe');
			}
		} else {
			Ext.Msg.alert(rewadmin.AppGlobals.TITULO_MENSAJE, 'Ingrese su Usuario y Clave');
		}
	},
	onViewportRendered: function() {
		this.getUsuarioStore().load();
	},
	onTextfieldKeypress: function(view, event) {
		if(event.getKey() == event.ENTER) {
			switch(view.id) {
				case 'txtUsuario':
					Ext.getCmp('txtClave').focus();
					break
				case 'txtClave':
					this.onButtonClick();
					break;
			}
		}
	}
});
