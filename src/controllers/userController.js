const fs = require('fs');
const path = require('path');
const bcryptjs = require("bcryptjs");

const usersJson = fs.readFileSync(path.join(__dirname,"../data/user.json"),"utf-8");
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
            if(userToLogin){
                const isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(isOkPassword){
                    //delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if(typeof req.body.remember_user !== 'undefined') {
                        res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
                    }
                    return res.redirect('/user/profile');
                }else{
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
}

module.exports = userController;