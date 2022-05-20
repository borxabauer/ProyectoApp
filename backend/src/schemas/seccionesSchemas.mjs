


// Schema Añadir Seccion

export const newSeccionSchema = {
    $id_seccion: "/secciones",
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
    additionalProperties: false
}



// Schema Modificar Seccion

export const seccionSchema = {
    $id_seccion: "/secciones",
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
    additionalProperties: false
}


// Schema Eliminar Seccion

export const deleteSeccionSchema = {
    $id_seccion: "/secciones",
    type: "object",
    properties: {
        id_seccion: {
            description: "Seccion unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    additionalProperties: false
}

