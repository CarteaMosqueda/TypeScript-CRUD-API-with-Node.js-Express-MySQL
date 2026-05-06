import express, { Request, Response } from "express";

const app = express();

app.use(express.json());



app.get("/", (req: Request, res: Response) => {
 res.status(201).json({ message: "User Created" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});