


// Schema Añadir Seccion

export const newSeccionSchema = {
    $id: "/secciones/new",
    type: "object",
    properties: {
        id_seccion: {
            description: "Seccion unique identificator",
            type: "integer",
            minimum: 0 

    },
        nombre_seccion: {
            description: "Seccion description",
            type: "string"
     },

       
        id_producto:{
            description: "Seccion unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    required: ["id_seccion", "nombre_seccion", "id_producto"],
    additionalProperties: false
}



// Schema Modificar Seccion

export const seccionSchema = {
    $id: "/secciones",
    type: "object",
    properties: {
        id_seccion: {
            description: "Seccion unique identificator",
            type: "integer",
            minimum: 0
        },
        nombre_seccion: {
            description: "Seccion description",
            type: "string"
        },
        id_producto:{
            description: "Seccion unique identificator",
            type: "integer",
            minimum:0
        }
        
    },
    required: ["id_seccion", "nombre_seccion"],
    additionalProperties: false
}


// Schema Eliminar Seccion

export const deleteSeccionSchema = {
    $id: "/secciones/delete",
    type: "object",
    properties: {
        id_seccion: {
            description: "Seccion unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    required: ["id_seccion"],
    additionalProperties: false
}
