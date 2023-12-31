const express = require("express");
const app = express();
const mainRoute = require("./routes/mainRoute");
const userRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cart");
const cors = require('cors')

//Apis
const apiProductRoute = require("./routes/api/productApiRoute");
const apiUserRoute = require("./routes/api/userApiRoute");

const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware");

const methodOverride = require('method-override');

app.use(
    session({
      secret: "Hi, i have a secret",
      resave: false,
      saveUninitialized: false,
    })
);
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

let corsOptions = {
  origin:"*"
}
app.use(cors(corsOptions))

app.listen(3000, () => console.log("servidor escuchando en el puerto 3000"));

app.use(mainRoute);

app.use('/user',userRoute);

app.use('/products',productRoute);

app.use('/orders',orderRoute);

app.use('/carts',cartRoute);

//Apis
app.use('/api/products', apiProductRoute);

app.use('/api/users', apiUserRoute);

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});