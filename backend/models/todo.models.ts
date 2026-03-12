import { model, Schema, Types } from "mongoose";

interface ITodos {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodos>(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Todos = model<ITodos>("Todos", todoSchema);

export default Todos;
