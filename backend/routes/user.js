import express from "express";
import multer from "multer";
import { UserModel } from "../model/User.js";
import bcrypt from "bcrypt";

const upload = multer();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await UserModel.find();
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await UserModel.findOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/", upload.single(), async (req, res) => {
  try {
    const input = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, 6);

    const newUser = new UserModel({ ...input, password: hashedPassword });
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/login", upload.single(), async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await UserModel.findOne({ username });

    if (!userExist) {
      res.status(404).send({ error: "Username doesnt exist" });
      return;
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      res.send({ error: "wrong pass" });
      return;
    }
    res.send({ login: userExist });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
