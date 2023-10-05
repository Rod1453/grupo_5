const express = require("express");
const app = express();
const mainRoute = require("./routes/mainRoute");
const userRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");

const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware");

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

app.listen(3000, () => console.log("servidor escuchando en el puerto 3000"));

app.use(mainRoute);

app.use('/user',userRoute);

app.use('/products',productRoute);