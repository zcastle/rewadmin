Ext.define('rewadmin.AppGlobals', {
    singleton: true,
    //HOST: 'http://192.168.1.6:2385/',
    HOST: 'http://192.168.0.12/rewservices/',
    //HOST: 'http://pos.openbusiness.pe/services/',
    //HOST: 'http://10.10.10.20:2385/index.php/',
    //HOST: 'http://services.openbusiness.pe/',
    DEBUG: false,
    IGV: 18,
    TIPO_CAMBIO_COMPRA: 2.65,
    TIPO_CAMBIO_VENTA: 2.60,
    CIA: '06',
    NOMBRE_COMERCIAL: 'DOGIA',
    RAZON_SOCIAL: 'EMPRESA SA',
    CO_USUARIO: 'ADMIN',
    ROL_ACTIVO: 'ADMIN',
    USUARIO: null,
    DECIMALES: 4,
    FORMA_NUMBER: '0,000.00',
    FORMA_NUMBER_4: '0,000.0000',
    NOTA_PIE: 'REWAdmin -> Gestion De Almacenes -> Desarrollado por openbusiness.pe [v2.5.2]',
    TITULO_MENSAJE: 'Mensaje de Sistema',
    HOLO_GREEN_DARK: 0xff669900,
    PAGE_SIZE: 25,
    GRUPO_ID_DEFAULT: 1,
    DESTINO_ID_DEFAULT: 1,
    TIPO_DOCUMENTO_ID_DEFAULT: 2,
    TIPO_OPERACION_ID_DEFAULT: 2,
    CATEGORIA_ID_DEFAULT: 153,
    ALMACEN_ID_DEFAULT: 1,
    HTTP_USER: 'ADMIN-WEB',
    REPORTE_VENTAS: Array('Reporte de Ventas', 'ventas'),
    REPORTE_FAMILIAS: Array('Reporte de Ventas X Familias', 'familias'),
    REPORTE: null
});