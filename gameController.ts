import { Request, Response } from "express";
import gameModel from "./gameModel";

export const getGames = async (req: Request, res: Response) => {
  try {
    const get1User = await gameModel.find();
    return res.status(200).json({
      message: "Succeffully gotten all games",
      date: get1User,
    });
  } catch (error) {
    console.log("An Error Occured In getGames", error);
  }
};

export const createGames = async (req: Request, res: Response) => {
  try {
    const { name, detail } = req.body;

    const create = await gameModel.create({ name, detail });
    return res.status(200).json({
      message: "Succeffully create game",
      date: create,
    });
  } catch (error) {
    console.log("An Error Occured In createGames", error);
  }
};
