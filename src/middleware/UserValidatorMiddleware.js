const { body } = require('express-validator');

const validations = [
    body("nombre").notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 2 }).withMessage("el nombre debe tener al menos 2 caracteres"),
    body("apellido").notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 2 }).withMessage("el apellido debe tener al menos 2 caracteres"),
    body("email")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail()
        .isEmail().withMessage("debe ingresar un email valido"),
    body("password")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
        .bail().matches("^(?=.*[A-Z].+)(?=.*[!@#$&*])(?=.*[0-9].+)(?=.*[a-z].+).{8,}$").withMessage("la contraseña debe tener min,may,num y un cartacter especial"),
    body("confirmPassword")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
        .bail().matches("^(?=.*[A-Z].+)(?=.*[!@#$&*])(?=.*[0-9].+)(?=.*[a-z].+).{8,}$").withMessage("la contraseña debe tener min,may,num y un cartacter especial")
        .custom((value, { req }) => value === req.body.password).withMessage("las contraseñas no coinciden."),
];

module.exports = validations;