import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT;
const PORT2 = process.env.PORT2;

app.listen(PORT, () => {
  console.log(`Back End Running on http://localhost:${PORT}`);
  console.log(`Front End Running on http://localhost:${PORT2}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});