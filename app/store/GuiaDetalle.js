Ext.define('rewadmin.store.GuiaDetalle', {
    extend: 'Ext.data.Store',
    model: 'rewadmin.model.GuiaDetalle',
    listeners: {
    	datachanged: function(store) {
    		var base = 0, dscto = 0, neto = 0, igv = 0, isc = 0, total = 0;
			var container = Ext.getCmp('totales');
	    	store.each(function(item, index, length){
	    		base += item.get('base');
	    		dscto += item.get('dscto');
	    		neto += item.get('neto');
	    		igv += item.get('igv');
	    		isc += item.get('isc');
	    		total += item.get('total');
	    	});
	    	container.down('displayfield[name=totales-base]').setValue(base);
	    	container.down('displayfield[name=totales-dscto]').setValue(dscto);
	    	container.down('displayfield[name=totales-neto]').setValue(neto);
	    	container.down('displayfield[name=totales-igv]').setValue(igv);
	    	container.down('displayfield[name=totales-isc]').setValue(isc);
	    	container.down('displayfield[name=totales-total]').setValue(total);
    	}
    }
});