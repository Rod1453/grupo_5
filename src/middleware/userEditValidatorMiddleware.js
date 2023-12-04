const { body } = require('express-validator');

const validations = [
    body("nombre")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("apellido")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("password").optional({checkFalsy: true}).isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres"),
    body("confirmPassword").if(body('password').notEmpty())
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail().isLength({ min: 8, max: 25 }).withMessage("la contraseña debe tener al menos 8 caracteres")
        .custom((value, { req }) => value === req.body.password).withMessage("las contraseñas no coinciden."),
    body("image").custom((value, { req }) => {
        let file = req.image;
        let acceptedExtensions = [".jpg", ".png"];
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(
                    `solo se pueden subir archivos ${acceptedExtensions.join(
                        ", "
                    )}`
                );
            }
        }
        return true;
    }),
];

module.exports = validations;