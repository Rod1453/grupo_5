const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    }
}

module.exports = userController;