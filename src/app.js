const express = require("express");
const app = express();
const mainRoute = require("./routes/mainRoute");
const userRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => console.log("servidor escuchando en el puerto 3000"));

app.use(mainRoute);

app.use(userRoute);

app.use('/products',productRoute);