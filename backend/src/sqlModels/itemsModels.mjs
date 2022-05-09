export const items = [];


export const getAllItemsSQL = `SELECT id_item,id_seccion,descripcion,precio,nombre_item,imagen FROM items`;

export const postItemsSQL =  `INSERT INTO items(id_item,id_seccion,description,precio,nombre_item,imagen) VALUES (?,?,?,?,?,?)`;

export const putItemsSQL = `UPDATE items SET name_item = "${request.body.name_item}"  WHERE id = "${request.body.id_item}"`;

export const deleteItemsSQL =  `DELETE FROM items WHERE id_item =`+request.body.id_item;
