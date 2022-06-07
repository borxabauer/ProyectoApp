// Schema Añadir Items

export const newItemsSchema = {
    $id_item: "/items",
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
              minimun:0
    },

           description:{
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
    additionalProperties: false
}

// Schema Modificar Items

export const itemsSchema = {
    $id_item: "/items",
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
              minimun:0
    },

           description:{
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
    additionalProperties: false
}

// Schema Eliminar Item

export const deleteItemSchema = {
    $id_item: "/items",
    type: "object",
    properties: {
        id_item: {
            description: "Item unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    additionalProperties: false
}