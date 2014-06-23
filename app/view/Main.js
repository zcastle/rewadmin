Ext.define('rewadmin.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    layout: {
        type: 'border'
    },
    items: [{
        region: 'north',
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            style: 'font-size: 1.5em; color: #fff;'
        },
        items: [{
            xtype: 'label',
            style: 'background:url(favicon.png) no-repeat left center; padding-left: 25px; font-size: 1.8em; color: #ff4444;',
            text: rewadmin.AppGlobals.NOMBRE_COMERCIAL
        },{
            xtype: 'toolbar',
            border: false,
            id: 'tbInicio'
        },{
            border: false,
            flex: 1
        },{
            xtype: 'label',
            style: 'font-size: 1.8em; color: #ff4444;',
            text: 'Usuario'
        },{
            xtype: 'toolbar',
            border: false,
            id: 'tbSalir'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        id: 'TabMain',
        tabPosition: 'bottom',
        items:[{
            //title: 'Inicio',
            xtype: 'panel',
            iconCls: 'ico-menu-inicio-medium',
            items: [{
                xtype: 'dataview',
                id: 'images-view',
                style: 'padding: 15px;',
                store: 'Launcher',
                tpl: [
                    '<tpl for=".">',
                        '<div class="thumb-wrap" id="{titulo:stripTags}">',
                            '<div class="thumb"><img src="resources/images/launcher/{imagen}"></div>',
                            '<span>{titulo:htmlEncode}</span>',
                        '</div>',
                    '</tpl>',
                    '<div class="x-clear"></div>'
                ],
                height: 310,
                trackOver: true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.thumb-wrap'
            }]
        }]
    }]
});