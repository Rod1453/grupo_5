const fs = require('fs');
const path = require('path');

const usersJson = fs.readFileSync(path.join(__dirname,"../data/user.json"),"utf-8");
const users = JSON.parse(usersJson);

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    getUser:(req,res) =>{
        const user = users.find(item => item.id == req.params.id);
        res.render('users/UserDetails',{user: user});
    }
}

module.exports = userController;