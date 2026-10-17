import jwt from "jsonwebtoken";

export function decodeBasicToken(request) {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new Error("Falta la cabecera Authorization.");
    }

    const [authType, encodedCredentials, ...extra] = authorization.split(" ");
    if (authType !== "Basic" || !encodedCredentials || extra.length > 0) {
        throw new Error("La cabecera Authorization no contiene credenciales Basic válidas.");
    }

    const credentials = Buffer.from(encodedCredentials, "base64").toString("utf8");
    const separator = credentials.indexOf(":");
    if (separator < 1) {
        throw new Error("Las credenciales Basic no son válidas.");
    }
    return [credentials.slice(0, separator), credentials.slice(separator + 1)];
}

export function createAccessToken(level) {
    return jwt.sign({ level }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export function authMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const [scheme, token, ...extra] = authorization ? authorization.split(" ") : [];
        if (scheme !== "Bearer" || !token || extra.length > 0) {
            return res.sendStatus(401);
        }
        const { level } = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.level = level;
        return next();
    } catch {
        return res.sendStatus(401);
    }
}