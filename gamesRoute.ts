import { Router } from "express";

import { createGames } from "./gameController";

const gamerouter = Router();

gamerouter.route("/createuser").post(createGames);

export default gamerouter;
