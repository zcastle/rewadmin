Ext.define('rewadmin.view.almacen.GridKardex' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.gridkardex',
    border: false,
    //store: 'GuiaDetalle',
    columns: [{
        text: 'Ln',
        xtype: 'rownumberer'
    },{
        text: 'Insumo',
        dataIndex: 'producto_name',
        flex: 1
    },{
        text: 'Unidad',
        dataIndex: 'unidad_name',
        name: 'actionUnidad',
        width: 100
    },{
        text: 'T. Doc.',
        width: 100
    },{
        text: 'Nu. Doc.',
        width: 100
    },{
        text: 'T. Operacion',
        width: 200
    },{
        text: 'Cantidad',
        dataIndex: 'cantidad',
        width: 60
    },{
        text: 'Valor Unitario',
        dataIndex: 'unitario',
        align: 'right',
        width: 75,
        renderer: Ext.util.Format.numberRenderer(rewadmin.AppGlobals.FORMA_NUMBER)
    }],
    tbar: [{
        xtype: 'textfield',
        fieldLabel: 'Insumo',
        labelWidth: 60,
        width: 300
    },{
        xtype: 'button',
        text: 'Buscar'
    },{
        xtype: 'combobox',
        //name: 'tipo_documento_id',
        fieldLabel: 'U. Medida',
        labelWidth: 60,
        emptyText: 'Seleccionar',
        //store: 'TipoDocumento',
        valueField: 'id',
        displayField: 'nombre',
        queryMode: 'local',
        editable: false//,
        //flex: 1
    },{
        xtype: 'combobox',
        //name: 'tipo_documento_id',
        fieldLabel: 'Almacen',
        labelWidth: 60,
        emptyText: 'Seleccionar',
        //store: 'TipoDocumento',
        valueField: 'id',
        displayField: 'nombre',
        queryMode: 'local',
        editable: false//,
        //flex: 1
    }]
});