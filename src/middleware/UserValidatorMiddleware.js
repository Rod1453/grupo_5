const { body } = require('express-validator');
const db = require('../../database/models');

const uniqueEmailValidator = async (email) => {
    const usuario = await db.User.findOne({ email });
    if (usuario) {
        return Promise.reject('El correo electrónico ya está en uso');
    }
};

const validations = [
    body("nombre")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("apellido")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("email")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail()
        .isEmail().withMessage("debe ingresar un email valido")
        .custom(uniqueEmailValidator),
    body("password")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres"),
    body("confirmPassword")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
        .custom((value, { req }) => value === req.body.password).withMessage("las contraseñas no coinciden."),
];

module.exports = validations;