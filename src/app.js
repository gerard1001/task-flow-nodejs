import bodyParser from "body-parser";
import express from "express";
import db from "./database/models";
import routes from "./routes";
import { errorHandler } from "./helpers/multer.helper";

const app = express();
const port = process.env.PORT || 4040;

app.use("/image", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome To Task Flow API",
  });
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.info(
        `Server is running on PORT http://localhost:${process.env.PORT}/api/v1/`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
