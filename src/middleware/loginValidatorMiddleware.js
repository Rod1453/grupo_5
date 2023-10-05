const { body } = require('express-validator');

const validations = [
    body("email")
        .notEmpty().withMessage("El email es requerido.")
        .isEmail().withMessage("Email invalido."),
    body("password")
        .notEmpty().withMessage("La contraseña es requerida.")
];

module.exports = validations;