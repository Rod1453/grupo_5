const fs = require('fs');
const path = require('path');
const bcryptjs = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/user.json");
const usersJson = fs.readFileSync(usersFilePath, "utf-8");
const users = JSON.parse(usersJson);

const { validationResult } = require("express-validator");

const db = require('../../database/models');

const userController = {
    register: (req, res) => {
        res.render('users/register');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: async (req, res) => {
        const resultValidations = validationResult(req);
        if (!resultValidations.isEmpty())
            return res.render("users/login", {
                errors: resultValidations.mapped(),
                oldData: req.body,
            });
        const user = await db.User.findOne({ where: { email: req.body.email } });
        if (!user || !bcryptjs.compareSync(req.body.password, user.password))
            return res.render("users/login", {
                errors: {
                    sesion: {
                        msg: "El usuario o contraseña es incorrecto"
                    }
                },
            });
        req.session.userLogged = user;
        if (typeof req.body.remember_user !== 'undefined') {
            res.cookie("email", req.body.email, { maxAge: 3600 * 1000 });
        }
        return res.redirect('/user/profile');
    },
    profile: (req, res) => {
        return res.render("users/profile", {
            user: req.session.userLogged,
        });
    },
    logout: (req, res) => {
        res.clearCookie("email");
        req.session.destroy();
        res.redirect("/");
    },
    save: async (req, res) => {
        const resultValidations = validationResult(req);
        if (!resultValidations.isEmpty())
            return res.render("users/register", {
                errors: resultValidations.mapped(),
                oldData: req.body,
            });
        let user = await db.User.findOne({ where: { email: req.body.email } });
        if (user)
            return res.render("users/register", {
                errors: {
                    email: {
                        msg: "el email ya se encuentra en uso, prueba otro"
                    }
                },
                oldData: req.body
            });
        user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            categoria: "Comprador",
            imagen: "images.png"
        }
        db.User.create({ ...user })
            .then(result => {
                req.session.userLogged = result.dataValues;
                if (typeof req.body.remember_user !== 'undefined') {
                    res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
                }
                return res.redirect('/products');
            })
            .catch(error => {
                console.log(error);
            })
    },
    update: async (req, res) => {
        try {
            const resultValidations = validationResult(req);
            const user = await db.User.findByPk(req.body.id);
            if (!resultValidations.isEmpty()) {
                res.render("users/userEdit", {
                    errors: resultValidations.mapped(),
                    oldData: req.body,
                    oldImage: user.imagen,
                    oldEmail: user.email
                });
            } else {
                const usuario = await db.User.findByPk(req.body.id);
                let user = {
                    id: usuario.id,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: usuario.email,
                    categoria: usuario.categoria,
                }
                if (req.body.password)
                    user.password = bcryptjs.hashSync(req.body.password, 10);
                else
                    user.password = usuario.password;
                if (req.file)
                    user.imagen = req.file.filename;
                else
                    user.imagen = usuario.imagen;

                await db.User.update({ ...user }, {
                    where: {
                        id: user.id
                    }
                })
                //users[index] = user;
                //fs.writeFileSync(usersFilePath, JSON.stringify(users));
                req.session.userLogged = user;
                res.redirect('/user/profile');
            }
        } catch (error) {
            console.log(error);
        }
    },
    edit: function (req, res) {
        const id = req.params.id;
        //const user = users.find((user) => user.id == id);
        //res.render("users/userEdit", { user: user });
        res.render("users/userEdit", { user: req.session.userLogged });
    },
    delete: function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(res.redirect("/products"))
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = userController;