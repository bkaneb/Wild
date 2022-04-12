import mongoose from "mongoose";

const {Schema} = mongoose;

interface User {
  name: string;
  city: string;
  skills: {
    title: string;
    votes: number;
  }[];
}

// créaction table(document)
const WilderSchema = new Schema<User>({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

export default mongoose.model("wilder", WilderSchema);