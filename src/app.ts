import express, { Request, Response } from "express";
const app = express();

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running!");
});

export default app;
