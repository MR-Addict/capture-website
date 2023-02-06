import "module-alias/register";

import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import { validateForm, getOptions, takeScreenshot } from "@/lib";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async (req: Request, res: Response) => {
  const start = Date.now();

  const error = validateForm(req.body);
  if (error) return res.json({ status: false, message: "Invalid request body!" });

  const options = getOptions(req.body);
  const base64 = await takeScreenshot(req.body.url, options);
  if (!base64) return res.json({ status: false, message: "Failed to capture your page!" });

  const runtime = (Date.now() - start) / 1000 + "s";
  return res.json({ status: true, data: { url: req.body.url, type: req.body.type, runtime, base64 } });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
