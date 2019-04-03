const express = require("express");
const helmet = require("helmet");
const cohortRouter = require("./cohortRouter");
const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/cohorts", cohortRouter);

const port = process.env.PORT || 4400;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
