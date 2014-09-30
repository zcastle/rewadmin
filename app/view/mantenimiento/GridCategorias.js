Ext.define('rewadmin.view.mantenimiento.GridCategorias' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.gridcategorias',
    border: false,
    store: 'Categoria',
    columns: [{
        header: 'Producto',
        dataIndex: 'nombre',
        flex: 1
    },{
        header: 'Grupo',
        dataIndex: 'grupo_name',
        width: 200
    },{
        header: 'Destino',
        dataIndex: 'destino_name',
        width: 100
    },{
        header: 'Orden',
        dataIndex: 'orden',
        width: 50
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
        items: [{
            xtype: 'textfield',
            name: 'txtBuscar',
            fieldLabel: 'Buscar',
            labelWidth: 45,
            enableKeyEvents: true,
            flex: 1
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
            xtype: "combobox",
            name: "cboDestinos", 
            fieldLabel: "Destino",
            emptyText: 'Seleccionar',
            store: 'Destino',
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
        store: 'Categoria',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "No hay elementos para mostrar",
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