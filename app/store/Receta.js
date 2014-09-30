Ext.define('rewadmin.store.Receta', {
    extend: 'Ext.data.Store',
    model: 'rewadmin.model.Receta',
    listeners: {
    	datachanged: function(store) {
    		var total = 0;
			var totalInsumos = Ext.getCmp('totalInsumos');
	    	store.each(function(item, index, length){
	    		total += item.get('cantidad')*item.get('costo');
	    	});
	    	totalInsumos.setValue(total);
    	}
    }
});