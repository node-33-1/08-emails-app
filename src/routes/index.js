const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const sendEmail = require('../utils/sendEmail');

// colocar las rutas aquí
router.post("/emails", catchError(async(req, res) => {
    await sendEmail({
        to: "andres.mendoza@academlo.com",
        subject: "Correo desde node :D",
        // text: "esto es un correo desde node :D"
        html: `
            <h1>Hello world</h1>
            <p>lorem ipsu dolor</p>
        `,
    });
    return res.json({ message: "Enviando email" });
}));

router.post("/emails/contact", catchError(async (req, res) => {
    const { name, email, phone, message } = req.body;
    await sendEmail({
        to: "andres.mendoza@academlo.com",
        subject: "Mensaje del portafolio!",
        html: `
            <h1>!${name} te escribió desde tu portafolio!</h1>
            <p>${message}</p>
            <ul>
                <li><b>Email: </b>${email}</li>
                <li><b>Phone: </b>${phone}</li>
            </ul>
        `,
    })
    return res.json({ name, email, phone, message });
}));

module.exports = router;