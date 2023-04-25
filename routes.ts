import { Router } from "express";
import {
  deletAllModel,
  verifiyUser,
  registerUser,
  loginUser,
  getOneUser,
} from "./userController";

const router = Router();

router.route("/createuser").post(registerUser);
router.route("/deleteallmodel").delete(deletAllModel);
router.route("/getallcompany").get(loginUser);
router.route("/verifyuser/:id").patch(verifiyUser);
router.route("/getoneuser/:id").get(getOneUser);

export default router;
