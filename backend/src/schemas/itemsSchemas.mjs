// Schema Añadir Items

export const newItemsSchema = {
    $id: "/items/new",
    type: "object",
    properties: {
        id_item: {
            description: "Item unique identificator",
            type: "integer",
            minimum: 0 

    },

          id_seccion:{
              description: "Seccion unique identificator",
              type:"integer",
              minimum: 0
    },

           descripcion:{
              description: "item description",
              type: "string"
    },
           
            precio: {
               description: "item descrption",
               type:"integer",
               minimum: 0
    },

            nombre_item: {
               description: "item description",
               type: "string"
     },  
            imagen:{
               description: "image identifier",
               type: "string"
            },
    },
    required: ["id_item", "id_seccion", "descripcion", "precio", "nombre_item", "imagen"],
    additionalProperties: false
}

// Schema Modificar Items

export const itemsSchema = {
    $id: "/items",
    type: "object",
    properties: {
        id_item: {
            description: "Item unique identificator",
            type: "integer",
            minimum: 0 

    },

          id_seccion:{
              description: "Seccion unique identificator",
              type:"integer",
              minimum: 0
    },

           descripcion:{
              description: "item description",
              type: "string"
    },
           
            precio: {
               description: "item descrption",
               type:"integer",
               minimum: 0
    },

            nombre_item: {
               description: "item description",
               type: "string"
     },  
            imagen:{
               description: " imagen identificator",
               type: "string"
            
        },
    },
    required: ["id_item", "id_seccion", "descripcion", "precio", "nombre_item", "imagen"],
    additionalProperties: false
}

// Schema Eliminar Item

export const deleteItemSchema = {
    $id: "/items/delete",
    type: "object",
    properties: {
        id_item: {
            description: "Item unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    required: ["id_item"],
    additionalProperties: false
}