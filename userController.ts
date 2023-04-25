import { Request, Response } from "express";
import userModel from "./userModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const token = crypto.randomBytes(64).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = await userModel.create({
      email,
      password: hash,
      confirmPassword: hash,
      token,
    });

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Missing (email, password, confirmPassword) in request",
      });
    }
    if (createUser) {
      return res.status(200).json({
        message: "company created succefully",
        data: createUser,
      });
    }
  } catch (error) {
    console.log("An Error Occured In registerUser", error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const getAllUser = await userModel.find();
    return res.status(200).json({
      message: "Succeffully gotten all data",
      date: getAllUser,
    });
  } catch (error) {
    console.log("An Error Occured In getAllUser", error);
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getUser = await userModel.findOne({ email });

    const pass = await bcrypt.compare(password, getUser?.password!);
    if (getUser) {
      if (pass) {
        if (getUser.verified && getUser.token === "") {
          const assessToken = jwt.sign(
            {
              id: getUser?._id,
            },
            "assessTokenSecreat",
            { expiresIn: "25s" }
          );

          return res.status(200).json({
            message: "success",
            data: getUser,
          });
        } else {
        }
      }
    }

    return res.status(200).json({
      message: "Succeffully gotten all data",
      date: getUser,
    });
  } catch (error) {
    console.log("An Error Occured In getAllUser", error);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const get1User = await userModel.findById(req.params.id);
    return res.status(200).json({
      message: "Succeffully gotten one data",
      date: get1User,
    });
  } catch (error) {
    console.log("An Error Occured In getOneUser", error);
  }
};

export const verifiyUser = async (req: Request, res: Response) => {
  try {
    const verifyUser = await userModel.findByIdAndUpdate(req.params.id, {
      verified: true,
      token: "",
    });
    return res.status(200).json({
      message: "Succeffully updated data",
      date: verifyUser,
    });
  } catch (error) {
    console.log("An Error Occured In verifiyUser", error);
  }
};

export const deletAllModel = async (req: Request, res: Response) => {
  try {
    const deleteAllModel = await userModel.deleteMany();
    return res.status(200).json({
      message:
        "Succeffully deleted all Data " +
        `(
        ${deletAllModel.length}
      )`,
    });
  } catch (error) {
    console.log("An Error Occured In deletAllModel", error);
  }
};
