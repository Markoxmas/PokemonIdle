import express from "express";
import routes from "./routes/basicRoute";

const app = express();
const port = 3001;

// Use the routes defined in routes.ts
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
