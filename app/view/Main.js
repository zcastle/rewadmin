Ext.define('rewadmin.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'container',
        id: 'header',
        layout: 'border',
        border: false,
        height: 40,
        items: [{
            region: 'west',
            xtype: 'button',
            width: 150,
            cls: 'cia',
            text: 'DOGIA'
        },{
            region: 'center',
            xtype: 'button',
            id: 'titulo',
            cls: 'titulo',
            text: 'INICIO'
        },{
            region: 'east',
            xtype: 'button',
            width: 150,
            cls: 'usuario',
            text: 'USUARIO'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        id: 'TabMain',
        border: false,
        layout: 'fit',
        defaults: {
            border: false
        },
        tabBar: {
            layout: {
                pack: 'end'
            }
        },
        tabPosition: 'bottom',
        items:[{
            xtype: 'dashboard',
            autoScroll: true,
            title: 'Inicio'
            //iconCls: 'ico-menu-inicio-medium',
        }]
    },{
        region: 'west',
        id: 'menumain',
        width: 150,
        layout: 'vbox',
        //collapsed : false,
        //collapsible: true,
        border: false,
        items: [{
            xtype: 'button',
            name: 'btn-collapse',
            text: 'M E N U',
            width: 150,
            border: false,
            cls: 'btn-collapse',
            iconCls: 'ico-menu',
            iconAlign: 'right'
        }/*,{
            xtype: 'button',
            width: 150,
            border: false,
            cls: 'cia',
            text: 'DOGIA'
        }*/,{
            xtype: 'menu',
            width: 150,
            //id: 'menumain',
            baseCls: 'menumain',
            floating: false,
            items: [{
                text: 'Mantenimiento',
                iconCls: 'ico-menu',
                menu: [{
                    text: 'Productos',
                    action: 'gridproductos'
                },{
                    text: 'Categorias',
                    action: 'gridcategorias'
                },{
                    text: 'Proveedores'
                },{
                    text: 'Clientes'
                }]
            },{
                text: 'Almacenes',
                iconCls: 'ico-menu',
                menu: [{
                    text: 'Guias',
                    action: 'gridguia'
                },{
                    text: 'Salida x dias de trabajo',
                    action: 'winsalida',
                },{
                    text: 'Kardex'
                }]
            },{
                text: 'Reportes',
                iconCls: 'ico-menu',
                menu: [{
                    text: 'Ventas',
                    action: 'winreporteventas',
                    tag: 'ventas'
                },{
                    text: 'Ventas x Productos',
                    action: 'winreporteventas',
                    tag: 'familias'
                },{
                    text: 'Documentos Anuladas'
                }]
            },{
                text: 'Usuarios',
                iconCls: 'ico-menu'
            }]
        },{
            xtype: 'tbfill',
            width: 150,
            style: {
                background: '#666'
            }
        },{
            xtype: 'button',
            border: false,
            width: 150,
            cls: 'ob',
            text: 'openbusiness.pe'
        }]
    }]
});