Ext.define('rewadmin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    //alias: 'widget.viewport',
    requires:[
        'rewadmin.view.LoginView',
        'rewadmin.view.Main'
    ],
    layout: {
        type: 'card'
    },
    items: [{
        layout: 'border',
        border: false,
        bodyStyle: 'background-image: url(resources/images/background.jpg)',
        defaults: {
            border: false,
            bodyStyle: 'background: transparent;'
        },
        items: [{
            region: 'center',
            layout: 'border',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'loginView'
            }]
        },{
            region: 'south',
            layout: 'hbox',
            items: [{
                border: false,
                flex: 1
            },{
                xtype: 'image',
                src: 'resources/images/logo-250x47.png',
                width: 250,
                height: 47,
                padding: '0 5 5 0'
            }]
        }]
    },{
        xtype: 'app-main',
    }]
});
