export const secciones = [];

export const getAllSeccionesSQL = `SELECT id_seccion, name_seccion,id_producto FROM secciones`;

export const postSeccionesSQL =  `INSERT INTO secciones(id_seccion, name_seccion) VALUES (?, ?)`;

export const putSeccionesSQL =  `UPDATE secciones SET name_seccion = "${request.body.name_seccion}"  WHERE id_seccion = "${request.body.id_seccion}"`;

export const deleteSeccionesSQL = `DELETE FROM productos WHERE id_producto =`+request.body.id_producto;