
// Schema Añadir Producto

export const newProductoSchema = {
    $id: "/productos/new",
    type: "object",
    properties: {
        id_producto: {
            description: "Producto unique identificator",
            type: "integer",
            minimum: 0 

    },
        nombre_producto: {
            description: "Producto description",
            type: "string"
        }
    },
    required: ["id_producto", "nombre_producto"],
    additionalProperties: false
}

// Schema Modificar Producto

export const productoSchema = {
    $id: "/productos",
    type: "object",
    properties: {
        id_producto: {
            description: "Producto unique identificator",
            type: "integer",
            minimum: 0
        },
        nombre_producto: {
            description: "Producto description",
            type: "string"
        }
        
    },
    required: ["id_producto", "nombre_producto"],
    additionalProperties: false
}

// Schema Eliminar Producto

export const deleteProductoSchema = {
    $id: "/productos/delete",
    type: "object",
    properties: {
        id_producto: {
            description: "Producto unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    required: ["id_producto"],
    additionalProperties: false
}