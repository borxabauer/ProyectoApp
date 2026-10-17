export const userSchema = {
    $id: "/users/new",
    type: "object",
    properties: {
        username: {
            description: "Nombre de usuario único",
            type: "string"
        },
        password: {
            description: "Contraseña de la cuenta",
            type: "string"
        },
        accessLevel: {
            description: "Nivel de acceso",
            type: "integer",
            minimum: 0
        },
    },
    additionalProperties: false,
    required: ["username", "password"]
};

export const updateUserSchema = {
    ...userSchema,
    $id: "/users/update",
    properties: {
        ...userSchema.properties,
        id: {
            description: "Identificador de la cuenta",
            type: "integer",
            minimum: 1
        },
    },
    required: ["id", "username", "password"]
};

export const deleteUserSchema = {
    $id: "/users/delete",
    type: "object",
    properties: {
        id: {
            description: "Identificador de la cuenta",
            type: "integer",
            minimum: 1
        },
    },
    additionalProperties: false,
    required: ["id"]
};