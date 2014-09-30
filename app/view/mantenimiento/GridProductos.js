Ext.define('rewadmin.view.mantenimiento.GridProductos' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.gridproductos',
    store: 'Producto',
    columns: [{
        header: 'Codigo',    
        dataIndex: 'codigo',   
        width: 70
    },{
        header: 'Producto',
        dataIndex: 'nombre',
        flex: 1
    },{
        header: 'Precio Venta',
        dataIndex: 'precio',
        align: 'right',
        width: 80,
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    },{
        header: 'Categoria',
        dataIndex: 'categoria_name',
        width: 200
    },{
        header: 'Grupo',
        dataIndex: 'grupo_name',
        width: 100
    }/*,{
        xtype: 'actioncolumn',
        name: 'actionEditar',
        width: 20,
        menuDisabled: true,
        items: [{
            icon: 'resources/images/editar-16x16.png',
            tooltip: 'Editar',
            iconCls: 'mousepointer'
        }]
    },{
        xtype: 'actioncolumn',
        name: 'actionRemover',
        width: 20,
        menuDisabled: true,
        items: [{
            icon: 'resources/images/remove.gif',
            tooltip: 'Remover',
            iconCls: 'mousepointer'
        }]
    }*/],
    tbar: [{
        xtype: 'container',
        flex: 1,
        layout: 'hbox',
        /*style: {
            'padding-left': '5px',
            'padding-bottom': '2px'
        },*/
        items: [{
            xtype: 'textfield',
            name: 'txtBuscar',
            fieldLabel: 'Buscar',
            labelWidth: 45,
            enableKeyEvents: true,
            flex: 1
        },{
            xtype: "combobox",
            name: "cboCategorias", 
            fieldLabel: "Categoria",
            emptyText: 'Seleccionar',
            store: 'Categoria',
            valueField: 'id',
            displayField: 'nombre',
            queryMode: 'local',
            editable: false,
            labelWidth: 55,
            width: 250,
            style: 'margin-left: 5px;'
        },{
            xtype: "combobox",
            name: "cboGrupo",
            fieldLabel: "Grupo",
            emptyText: 'Seleccionar',
            store: 'Grupo',
            valueField: 'id',
            displayField: 'nombre',
            queryMode: 'local',
            editable: false,
            labelWidth: 55,
            width: 250,
            style: 'margin-left: 5px;'
        },{
            xtype: 'button',
            iconCls: 'ico-limpiar-small'
        }]
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Producto',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: 'Productos: {0} - {1} de {2}',
        emptyMsg: "No hay productos para mostrar",
        items:[
        '-', {
            text: 'Nuevo',
            name: 'btnNuevo',
            baseCls: 'rew-btn',
            cls: 'btn-nuevo'
        },{
            text: 'Editar',
            name: 'btnEditar',
            baseCls: 'rew-btn',
            cls: 'btn-editar'
        },{
            text: 'Remover',
            name: 'btnRemover',
            baseCls: 'rew-btn',
            cls: 'btn-remover'
        }]
    }]
});