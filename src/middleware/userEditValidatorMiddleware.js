const { body } = require('express-validator');
const path = require('path');

const validations = [
    body("nombre")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 2}).withMessage("el nombre debe tener al menos 2 caracteres"),
    body("apellido")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 2}).withMessage("el apellido debe tener al menos 2 caracteres"),
    body("password")
    .optional({ checkFalsy: true }).isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
    .bail().matches("^(?=.*[A-Z].+)(?=.*[!@#$&*])(?=.*[0-9].+)(?=.*[a-z].+).{8,}$").withMessage("la contraseña debe tener min,may,num y un cartacter especial"),
    body("confirmPassword").if(body('password').notEmpty())
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
        .bail().matches("^(?=.*[A-Z].+)(?=.*[!@#$&*])(?=.*[0-9].+)(?=.*[a-z].+).{8,}$").withMessage("la contraseña debe tener min,may,num y un cartacter especial")
        .custom((value, { req }) => value === req.body.password).withMessage("las contraseñas no coinciden."),
    body("imagen").custom((value, { req }) => {
        let file = req.file;
        let extensiones = [".jpg", ".jpeg", ".png", ".gif"];
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!extensiones.includes(fileExtension))
                throw new Error(`Solo se permiten ${extensiones.join("-")}`);
            return true;
        }
        return true;
    })
];

module.exports = validations;