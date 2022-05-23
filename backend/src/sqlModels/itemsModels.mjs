export const items = [];

export const getOneItemsByIdSQL = `SELECT id_seccion,descripcion,precio,nombre_item,imagen FROM items WHERE id_item = ?`;

export const getItemForASeccionIdSQL= `SELECT id_item,id_seccion,descripcion,precio,nombre_item,imagen FROM items WHERE id_seccion= ?`;

export const getAllItemsSQL = `SELECT id_item,id_seccion,descripcion,precio,nombre_item,imagen FROM items`;

export const postItemsSQL =  `INSERT INTO items(id_item,id_seccion,descripcion,precio,nombre_item,imagen) VALUES (?,?,?,?,?,?)`;

export const putItemsSQL = `UPDATE items SET nombre_item = ? ,descripcion=?,precio=?,imagen=?,id_seccion=? WHERE id_item = ?`;

export const deleteItemsSQL =  `DELETE FROM items WHERE id_item =?`;
