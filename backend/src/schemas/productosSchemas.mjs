
// Schema Añadir Producto

export const newProductoSchema = {
    $id_producto: "/productos",
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
    additionalProperties: false
}

// Schema Modificar Producto

export const productoSchema = {
    $id_producto: "/productos",
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
    additionalProperties: false
}

// Schema Eliminar Producto

export const deleteProductoSchema = {
    $id_producto: "/productos",
    type: "object",
    properties: {
        id_producto: {
            description: "Producto unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    additionalProperties: false
}