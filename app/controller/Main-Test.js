Ext.define('rewadmin.controller.Main-Test', {
    extend: 'Ext.app.Controller',
    models: ['Usuario'],
    stores: ['Usuario'],
    init: function() {
		this.control({
			'viewport': {
				render: this.onViewPortRendered
			},
			'viewport button': {
				click: this.onButtonClick
			}
		});
	},
	onButtonClick: function() {
		console.log('onButtonClick');
		console.log(this.getUsuarioStore().getAt(1));
		var record = this.getUsuarioStore().getAt(1);
		record.set('nombres', 'JC');
        record.save();
	},
	onViewPortRendered: function() {
		console.log('onViewPortRendered rendered');
		//GET /usuario
		this.getUsuarioStore().load({
			callback: function(records, operation, success) {
				Ext.Array.forEach(records, function(record) {
					//console.log('/usuario ' + record.get('id') + ' ' + record.get('nombres'));
					//record.set('nombres', 'Khan Noonien Singh');
        			//record.save();
				});
			}
		});

		//GET /usuario/id
		/*this.getUsuarioStore().load({
			id: 2,
			callback: function(records, operation, success) {
				Ext.Array.forEach(records, function(record) {
					//console.log('/usuario/id ' + record.get('id') + ' ' + record.get('nombres'));
				});
			}
		});*/

		//GET /usuario/id
		/*this.getUsuarioModel().load(1, {
		    success: function(user) {
		        //console.log('/usuario/id ' + user.getId() + ' ' + user.get('nombres'));
		    }
		});*/

		//POST /usuario otraopcion
		/*this.getUsuarioStore().add({
			nombres: 'Jimbert',
			apellidos: 'Castillo',
			usuario: 'jcjcjcj',
			ubigeo_id: 1394,
			centrocosto_id: 1,
			eliminado: 'N',
			rol_id: 1
		});
		this.getUsuarioStore().sync();*/
	
		//POST /usuario ok
		/*var user = Ext.create('rewadmin.model.Usuario', {
			nombres: 'j23',
			apellidos: 'Castillo',
			usuario: 'jcastillo',
			ubigeo_id: 1394,
			centrocosto_id: 1,
			eliminado: 'N',
			rol_id: 1
		});
		user.save();*/

		//PUT /usuario/id
		/*this.getUsuarioModel().load(2, {
		    success: function(user) {
		        //console.log('/usuario/id ' + user.getId() + ' ' + user.get('nombres'));
		        user.set('nombres', 'Khan Noonien Singh');
        		user.save();
		    }
		});*/

		//DELETE /usuario/id
		/*this.getUsuarioModel().load(6, {
		    success: function(user) {
		        //console.log('/usuario/id ' + user.getId() + ' ' + user.get('nombres'));
        		user.destroy();
		    }
		});*/
	}
});
