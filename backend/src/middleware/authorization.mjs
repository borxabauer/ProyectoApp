import { users } from "../sqlModels/usersModels.mjs"


export function decodeBasicToken(request) {
    const [ authType, b64token ] = request.headers.authorization.split(" ")
    const tokenBuffer = new Buffer.from(b64token, "base64")
    const token = tokenBuffer.toString()
    return token.split(":")
}

export function authMiddleware (req, res, next) {
    try {
        const [ method, token ] = req.headers.authorization.split(" ")
        const { level } = jwt.verify(token,secret)
        res.locals.level = level // Paso el user name para uso en los controllers
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}