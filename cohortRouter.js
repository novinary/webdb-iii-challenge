const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("./knexfile").development;

const db = knex(knexConfig);

//endpoints
// This route will return an array of all cohorts.
router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohort");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// This route will return the cohort with the matching id.
router.get("/:id", async (req, res) => {
  try {
    const cohort = await db("cohort")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// return all students for the cohort with the specified id.
router.get("/:id/students", async (req, res) => {
  try {
    const students = await db("students").where({ cohort_id: req.params.id });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// This route should save a new cohort to the database.
router.post("/", async (req, res) => {
  try {
    const [id] = await db("cohort").insert(req.body);
    const cohort = await db("cohort")
      .where({ id })
      .first();
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// This route will update the cohort with the matching id using information sent in the body of the request.
router.put("/", async (req, res) => {
  try {
    const count = await db("cohort")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const cohort = await db("cohort")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// This route should delete the specified cohort.
router.delete("/", async (req, res) => {
  try {
    const count = await db("cohort")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).json("Deleted!");
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
