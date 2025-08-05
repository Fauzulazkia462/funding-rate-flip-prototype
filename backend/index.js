const express = require("express");
const cors = require("cors");

const { readExcelAndCheck } = require("./service");

const app = express();
app.use(cors());

app.get("/alerts", (req, res) => {
    const alerts = readExcelAndCheck();
    res.json(alerts);
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});