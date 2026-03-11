import { Request, Response } from "express";
import prisma from "../prismaClient";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  const newTodo = await prisma.todo.create({
    data: { text },
  });
  res.json(newTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.json({ message: "Todo deleted" });
};
