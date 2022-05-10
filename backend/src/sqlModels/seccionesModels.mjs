export const secciones = [];

export const getOneSeccionesIdSQL = `SELECT nombre_seccion,id_producto FROM secciones WHERE id_seccion=?`;

export const getAllSeccionesSQL = `SELECT id_seccion, nombre_seccion,id_producto FROM secciones`;

export const postSeccionesSQL =  `INSERT INTO secciones(id_seccion, nombre_seccion,id_producto) VALUES (?,?,?)`;

export const putSeccionesSQL =  `UPDATE secciones SET nombre_seccion = ? WHERE id_seccion = ?`;

export const deleteSeccionesSQL = `DELETE FROM secciones WHERE id_seccion = ?`;