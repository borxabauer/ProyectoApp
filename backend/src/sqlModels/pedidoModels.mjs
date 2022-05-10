export const pedidos = [];

export const getOnePedidosSQL = `SELECT id_item,cantidad FROM pedidos WHERE id_pedido=?`;

export const getAllPedidosSQL = `SELECT id_pedido,id_item,cantidad FROM pedidos`;

export const postPedidosSQL = `INSERT INTO pedidos(id_pedido,id_item,cantidad) VALUES (?,?,?)`;

export const putPedidosSQL = `UPDATE pedidos SET cantidad = ? WHERE id_pedido =?`;

export const deletePedidosSQL = `DELETE FROM pedidos where id_pedido=?`;