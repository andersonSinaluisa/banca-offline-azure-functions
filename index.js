const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Credenciales básicas (cámbialas por valores seguros)
const BASIC_AUTH_USER = "tu_usuario";
const BASIC_AUTH_PASS = "tu_contraseña";

// Middleware para analizar JSON
app.use(bodyParser.json());

// Middleware de autenticación básica
const basicAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ success: false, message: "Autenticación requerida" });
    }

    // Decodificar credenciales
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    // Verificar credenciales
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASS) {
        return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    next();
};

// Ruta del webhook con autenticación
app.post("/webhooks/infobip", basicAuth, (req, res) => {
    console.log("Mensaje recibido de Infobip:", req.body);

    // Procesar el mensaje
    res.json({ success: true });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
