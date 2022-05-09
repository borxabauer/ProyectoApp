export const productos = [];


export const getAllProductosSQL = `SELECT id_producto, name_producto FROM productos`;

export const postProductosSQL =  `INSERT INTO productos(id_producto, name_producto) VALUES (?,?)`;

export const putProductosSQL = `UPDATE productos SET name_producto = "${request.body.name_producto}"  WHERE id = "${request.body.id_producto}"`;

export const deleteProductosSQL =  `DELETE FROM productos WHERE id_producto =`+request.body.id_producto;