export const pedidos = [];

export const getOnePedidosSQL = `SELECT id_item,cantidad FROM pedido WHERE id_pedido=?`;

export const getAllPedidosSQL = `SELECT id_pedido,id_item,cantidad FROM pedido`;

export const postPedidosSQL = `INSERT INTO pedido(id_pedido,id_item,cantidad) VALUES (?,?,?)`;

export const putPedidosSQL = `UPDATE pedido SET cantidad = ? WHERE id_pedido =?`;

export const deletePedidosSQL = `DELETE FROM pedido where id_pedido=?`;