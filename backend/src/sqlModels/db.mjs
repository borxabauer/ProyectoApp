import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./Muebles.db', (err) => {
    if (err) {
        throw err.message;
    }
    console.log('Connected to database.');
});

db.run (`
  CREATE TABLE
        IF NOT EXISTS
        productos(
            id_producto INTEGER PRIMARY KEY,
            nombre_producto TEXT NOT NULL
        )

`);

db.run (`
   CREATE TABLE
        IF NOT EXISTS
        secciones(
            id_seccion INTEGER PRIMARY KEY ,
            nombre_seccion TEXT NOT NULL,
            id_producto INTEGER 

         )

`);

db.run (`
   CREATE TABLE
        IF NOT EXISTS
        items(
          id_item INTEGER PRIMARY KEY,
          id_seccion INTEGER NOT NULL ,
          descripcion VARCHAR(200) NOT NULL,
          precio INTEGER(10),
          nombre_item VARCHAR(45) NOT NULL,
          imagen STRING

        )

 `);

 db.run (`
    CREATE TABLE
         IF NOT EXISTS
         cliente(
             id_item INTEGER PRIMARY KEY,
             documento_identificacion INTEGER(8) NOT NULL,
             nombre_cliente VARCHAR(30) NOT NULL,
             primer_apellido VARCHAR(30) NOT NULL,
             segundo_apellido VARCHAR(30) NOT NULL,
             correo_electronico VARCHAR(30) NOT NULL,
             codigo_postal INTEGER (10) NOT NULL,
             pais VARCHAR (20) NOT NULL,
             telefono_movil INTEGER(20) NOT NULL,
             metodo_pago 
             
             
        )
 
 `);


 

 db.run (`
    CREATE TABLE
        IF NOT EXISTS
        carrito(
            id_compra INTEGER PRIMARY KEY,
            id_item INTEGER (8) NOT NULL,
            cantidad INTEGER(10) NOT NULL
            
        )
 
 `);



 db.run (`
    CREATE TABLE
         IF NOT EXISTS
         factura(
             id_compra INTEGER PRIMARY KEY,
             documento_identificacion INTEGER(8) NOT NULL,
             id_factura INTEGER (8) NOT NULL,
             fecha_factura DATE

         )
 
 
 
 `)


 export default db;