const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const EntryRouter = require("./routes/create/entry");
const port = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", EntryRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
