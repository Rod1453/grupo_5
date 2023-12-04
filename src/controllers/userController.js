const fs = require('fs');
const path = require('path');
const bcryptjs = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/user.json");
const usersJson = fs.readFileSync(usersFilePath, "utf-8");
const users = JSON.parse(usersJson);

const { validationResult } = require("express-validator");

const userController = {
    register: (req, res) => {
        res.render('users/register');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        const resultValidations = validationResult(req);
        if (resultValidations.errors.length > 0) {
            res.render("users/login", {
                errors: resultValidations.mapped(),
                oldData: req.body,
            });
        } else {
            const userToLogin = users.find(user => user.email == req.body.email);
            if (userToLogin) {
                const isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if (isOkPassword) {
                    //delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if (typeof req.body.remember_user !== 'undefined') {
                        res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
                    }
                    return res.redirect('/user/profile');
                } else {
                    return res.render("users/login", {
                        errors: {
                            password: {
                                msg: "La contraseña es incorrecta."
                            }
                        },
                        email: userToLogin.email
                    });
                }
            }
        }
        return res.render("users/login", {
            errors: {
                email: {
                    msg: "No se encuentra este email."
                }
            }
        });
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
    save: (req, res) => {
        const resultValidations = validationResult(req);
        if (!resultValidations.isEmpty()) {
            res.render("users/register", {
                errors: resultValidations.mapped(),
                oldData: req.body,
            });
        } else {
            let user = {
                id: users[users.length - 1].id + 1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                categoria: "comprador",
                imagen: "/img/images.png"
            }
            users.push(user);
            //fs.writeFileSync(usersFilePath, JSON.stringify(users));
            req.session.userLogged = user;
            res.redirect('/user/profile');
        }
    },
    update: (req, res) => {
        const resultValidations = validationResult(req);
        let index = users.findIndex(function (user) {
            return user.id == req.body.id;
        })
        if (!resultValidations.isEmpty()) {
            console.log(resultValidations.errors)
            res.render("users/userEdit", {
                errors: resultValidations.mapped(),
                oldData: req.body,
                oldImage: users[index].imagen,
                oldEmail: users[index].email
            });
        } else {
            let user = {
                id: users[index].id,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: users[index].email,
                categoria: users[index].categoria,
            }
            if (req.body.password)
                user.password = bcryptjs.hashSync(req.body.password, 10);
            else
                user.password = users[index].password;
            if (req.file)
                user.imagen = "/img/users/" + req.file.filename;
            else
                user.imagen = users[index].imagen;
            //users[index] = user;
            //fs.writeFileSync(usersFilePath, JSON.stringify(users));
            req.session.userLogged = user;
            res.redirect('/user/profile');
        }
    },
    edit: function (req, res) {
        const id = req.params.id;
        //const user = users.find((user) => user.id == id);
        //res.render("users/userEdit", { user: user });
        res.render("users/userEdit", { user: req.session.userLogged });
    },
    delete: function (req, res) {
        // por hacer
    }
}

module.exports = userController;