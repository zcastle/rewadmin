Ext.define('rewadmin.view.LoginView', {
    extend: 'Ext.form.Panel',    
    alias: 'widget.loginView',
    id: 'frmLogin',
    width: 350,
    border: false,
    bodyStyle: "background: transparent; border-radius: 5px; padding: 10px;",
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    defaults: {
        //labelAlign: 'top',
        width: '100%',
        enableKeyEvents: true,
        allowBlank: false
    },
    items: [{
        xtype: 'image',
        margin: '0 0 20',
        src: 'resources/images/logo-250x47.png',
        width: 250,
        height: 47
    },{
        xtype: 'textfield',
        id: 'txtUsuario',
        emptyText: 'Usuario',
        height: 30
        //cls: 'field-login'
        //fieldStyle: 'border-top: 0; border-right: 0; border-left: 0; margin-top: 10px; margin-bottom: 10px; height: 30px !important'
        /*
        fieldStyle: {
            'border-top': '0',
            'border-right': '0',
            'border-left': '0',
            'margin-top': '10px',
            'margin-bottom': '10px',
            'height': '30px !important'
        }
        */
    },{
        xtype: 'textfield',
        id: 'txtClave',
        inputType: 'password',
        emptyText: 'Clave',
        height: 30
        //fieldStyle: 'border-top: 0; border-right: 0; border-left: 0;'
    },{
        xtype: 'button',
        text: 'Ingresar',
        //width: 100,
        baseCls: 'rew-btn',
        cls: 'btn-nuevo'
    }]
});