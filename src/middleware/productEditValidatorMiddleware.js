const { body } = require('express-validator');

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
        // .isDate().withMessage("Este campo debe ser un año valido."),
    body("sinopsis")
        .notEmpty().withMessage("Este campo no puede estar vacio.").bail()
        .isLength({ min: 20 }).withMessage("la sinopsis debe tener al menos 20 caracteres"),
];

module.exports = validations;