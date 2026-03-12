import { Request, Response } from "express";
import { Types } from "mongoose";
import Todos from "../../models/todo.models";

// Get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todos.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};

// Add a new todo
export const addTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    console.log(title, "title");

    await Todos.create({ title });
    // console.log(newTodo, "newtodos");
    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add todo", error });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id || !Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });
    await Todos.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};
