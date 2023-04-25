import mongoose from "mongoose";

interface Iuser {
  name: string;
  detail: string;
}

interface gameModel extends Iuser, mongoose.Document {}

const gameSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
  },
  detail: {
    type: String,
  },
});

export default mongoose.model<gameModel>("game", gameSchema);
