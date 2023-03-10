const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5000",
     "http://localhost:3000",
  ],
  credentials: true,
})
);
mongoose.set('strictQuery', false);

// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.use("/auth", require("./routers/userRouter"));
app.use("/product", require("./routers/productRouter"));
app.use("/order", require("./routers/orderRouter"));
app.use("/cart", require("./routers/cartRouter"));
app.use("/mail", require("./routers/contactus"));
app.use("/admin", require("./routers/adminRouter"));
app.use("/gallerys", require("./routers/galleryRouter"));

const path=require("path");
app.use(express.static('client/build'));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve('client','build','index.html'));
});
