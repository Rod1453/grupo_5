const { body } = require('express-validator');
const path = require('path');

const validations = [
    body("titulo")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail()
        .isLength({ min: 5 }).withMessage("el titulo debe almenos tenes 5 caracteres."),
    body("autor")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("editorial")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("paginas")
        .notEmpty().withMessage("Este campo no puede estar vacio.")
        .isInt({ min:10 }).withMessage("El número de páginas debe ser mayor a 0."),
    body("idioma")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("tipo_tapa")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("tematica")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
    body("stock")
        .notEmpty().withMessage("Este campo no puede estar vacio.")
        .isInt({ min:1 }).withMessage("Este campo debe contener un número entero mayor a 0."),
    body("precio")
        .notEmpty().withMessage("Este campo no puede estar vacio.")
        .isFloat({ min:1 }).withMessage("Este campo debe contener un número."),
    body("lanzamiento")
        .notEmpty().withMessage("Este campo no puede estar vacio."),
        //.isDate().withMessage("Este campo debe ser una fecha valida."),
    body("sinopsis")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail()
        .isLength({ min: 20 }).withMessage("la sinopsis debe tener al menos 20 caracteres"),
    body("portada").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg",".jpeg", ".png", ".gif"];
        
        if (!file) {
            throw new Error("Tienes que subir una imagen.");
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                    ", "
                    )}`
                );
            }
        }
        
        return true;
    }),
];

module.exports = validations;