
const db = require('../../../database/models');

const userApiController = {
    list:async (req, res) => {//Listar todos los usuarios
        try {
            users = await db.User.findAll();
            if(users.length > 0){
                users = users.map(user => {
                    return {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        email: user.email,
                        detail: "http://localhost:3000/api/users/"+user.id
                    }
                });
                return res.status(200).json({
                    count: users.length,
                    users: users
                });
            }else{
                res.status(404).json({error: "Sin usuarios."});
            }
        } catch (error) {
            console.error("Error al consultar usuarios", error);
            res.status(500).json({ error: "Error al consultar usuarios." });
        }
    },
    show:async (req, res) => {
        try {
            user = await db.User.findByPk(req.params.id);
            if(user){
                user = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    imagen: "http://localhost:3000/img/users/"+user.imagen
                };
                return res.status(200).json({
                    user: user,
                    status: 200
                });
            }else{
                res.status(404).json({error: "Usuario no encontrado."})
            }
        } catch (error) {
            console.error("Error al consultar un usuario", error);
            res.status(500).json({ error: "Error al consultar un usuario." });
        }
    },
    count:async function(req,res){
        try {
           const count = await db.User.count();
            if(count > 0){
                res.status(200).json({
                    count: count
                });
            }else{
                res.status(404).json({error: "Sin usuarios."});
            }
        } catch (error) {
            console.error("Error al consultar usuarios", error);
            res.status(500).json({ error: "Error al consultar usuarios." });
        }
    },
    lastUser:async (req, res) => {
        try {
            user = await db.User.findOne({
                order: [ [ 'id', 'desc' ]],
                });
            if(user){
                user = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    imagen: "http://localhost:3000/img/users/"+user.imagen
                };
                return res.status(200).json({
                    user: user,
                    status: 200
                });
            }else{
                res.status(404).json({error: "Usuario no encontrado."})
            }
        } catch (error) {
            console.error("Error al consultar un usuario", error);
            res.status(500).json({ error: "Error al consultar un usuario." });
        }
    }
}

module.exports = userApiController;