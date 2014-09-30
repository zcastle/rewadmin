Ext.define('rewadmin.store.Meses', {
    extend: 'Ext.data.Store',
    fields: ['name', 'num'],
    data: (function() {
            var data = [];
            Ext.Array.forEach(Ext.Date.monthNames, function(name, i) {
                data[i] = {name: name, num: i + 1};
            });
            return data;
        }
    )()
});