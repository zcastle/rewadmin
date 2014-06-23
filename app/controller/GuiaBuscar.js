Ext.define('rewadmin.controller.GuiaBuscar', {
    extend: 'Ext.app.Controller',
    stores: ['GuiaBuscar'],
    init: function() {
		this.control({
			'winguiabuscar': {
				render: this.onWinRendered
			},
			'winguiabuscar button[name=btnCancelar]': {
				click: this.onButtonClick
			},
			'winguiabuscar textfield[name=txtBuscar]': {
				keypress: this.onKeyPressTxtBuscar,
                keyup: this.onKeyUpTxtBuscar
			}
		});
	},
	onWinRendered: function(win) {
		var grid = win.down('grid');
		var text = win.down('textfield');
		this.getGuiaBuscarStore().load({
		    scope: this,
		    callback: function(records, operation, success) {
		        grid.getSelectionModel().select(0);
		        text.focus();
		    }
		});
		grid.getView().on('viewready', function(grd){
            var maps = new Ext.util.KeyMap(grd.getEl(), [{
                key: Ext.EventObject.INSERT,
                fn: function(){
                    text.focus();
                },
                scope: this
            }]);
            grd.keys = maps;
        }, this);
	},
	onButtonClick: function(btn) {
		btn.up('window').close();
	},
	onKeyPressTxtBuscar: function(text, key){
        if(key.getKey()==key.ENTER && text.getValue().length>0){
    		var win = text.up('window');
			var urlOriginal = this.getGuiaBuscarStore().proxy.url;
			var urlNew = urlOriginal+'/buscar/'+text.getValue();
			this.getGuiaBuscarStore().proxy.url = urlNew;
			this.getGuiaBuscarStore().load({
			    scope: this,
			    callback: function(records, operation, success) {
			        win.down('grid').getSelectionModel().select(0);
			        this.getGuiaBuscarStore().proxy.url = urlOriginal;
			    }
			});
        }
    },
    onKeyUpTxtBuscar: function(text, key) {
    	var grid = text.up('window').down('grid');
        if((key.getKey() == key.BACKSPACE || key.getKey() == key.DELETE) && text.getValue().length == 0){
            this.getGuiaBuscarStore().load({
			    scope: this,
			    callback: function(records, operation, success) {
			        grid.getSelectionModel().select(0);
			    }
			});
        } else if(key.getKey() == key.DOWN) {
        	var rowIndex = grid.store.indexOf(grid.getSelectionModel().selected.items[0]);
        	grid.getSelectionModel().select(rowIndex+1);
        	grid.getView().focus();
        }
    }
});
