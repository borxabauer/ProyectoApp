export const productos = [];

export const getOneProductosIdSQL = `SELECT nombre_producto FROM productos WHERE id_producto=?`;

export const getAllProductosSQL = `SELECT id_producto, nombre_producto FROM productos`;

export const postProductosSQL =  `INSERT INTO productos(id_producto, nombre_producto) VALUES (?,?)`;

export const putProductosSQL = `UPDATE productos SET nombre_producto = ?  WHERE id_producto = ?`;

export const deleteProductosSQL =  `DELETE FROM productos WHERE id_producto =?`;