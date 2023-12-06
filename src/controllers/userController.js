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
        if (resultValidations.errors.length > 0) {
            res.render("users/login", {
                errors: resultValidations.mapped(),
                oldData: req.body,
            });
        } else {
            try{

                const userToLogin = await db.User.findOne({where: {
                    email: req.body.email
                }});
                //const userToLogin = users.find(user => user.email == req.body.email);
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
            }catch(error){
                console.log(error);
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
                // id: users[users.length - 1].id + 1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                categoria: "Comprador",
                imagen: "images.png"
            }

            req.session.userLogged = user;
            db.User.create({...user})
            .then(result => {
                res.redirect('/user/profile')})
            .catch(error => {
                console.log(error);
            })

            //users.push(user);
            ////fs.writeFileSync(usersFilePath, JSON.stringify(users));
            //req.session.userLogged = user;
            //res.redirect('/user/profile');
        }
    },
    update: async(req,res) => {
        try {
            const resultValidations = validationResult(req);
            const user = await db.User.findByPk(req.body.id);
            if (!resultValidations.isEmpty()) {
                console.log(resultValidations.errors)
                res.render("users/userEdit", {
                    errors: resultValidations.mapped(),
                    oldData: req.body,
                    oldImage: user.imagen,
                    oldEmail: user.email
                });
            } else{
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

                await db.User.update({...user},{
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
    // update: (req, res) => {
    //     const resultValidations = validationResult(req);
    //     let index = users.findIndex(function (user) {
    //         return user.id == req.body.id;
    //     })
    //     if (!resultValidations.isEmpty()) {
    //         console.log(resultValidations.errors)
    //         res.render("users/userEdit", {
    //             errors: resultValidations.mapped(),
    //             oldData: req.body,
    //             oldImage: users[index].imagen,
    //             oldEmail: users[index].email
    //         });
    //     } else {
    //         let user = {
    //             id: users[index].id,
    //             nombre: req.body.nombre,
    //             apellido: req.body.apellido,
    //             email: users[index].email,
    //             categoria: users[index].categoria,
    //         }
    //         if (req.body.password)
    //             user.password = bcryptjs.hashSync(req.body.password, 10);
    //         else
    //             user.password = users[index].password;
    //         if (req.file)
    //             user.imagen = "/img/users/" + req.file.filename;
    //         else
    //             user.imagen = users[index].imagen;
    //         //users[index] = user;
    //         //fs.writeFileSync(usersFilePath, JSON.stringify(users));
    //         req.session.userLogged = user;
    //         res.redirect('/user/profile');
    //     }
    // },
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