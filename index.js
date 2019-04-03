const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile').development;

const db = knex(knexConfig);

const server = express();

server.use(express.json());


//endpoints 
server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db('cohort');
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/api/cohorts/:id', async (req, res) => {
    try {
        const cohort = await db('cohort').where({ id: req.params.id }).first();
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
    try {
        const students = await db('students').where({ cohort_id: req.params.id });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.post('/api/cohorts', async (req, res) => {
    try {
        const [id] = await db('cohort').insert(req.body);
        const cohort = await db('cohort').where({ id }).first();
        res.status(201).json(cohort);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohort').where({ id: req.params.id }).update(req.body);
        if (count > 0) {
            const cohort = await db('cohort').where({ id: req.params.id }).first();
            res.status(200).json(cohort);
        } else {
            res.status(404).json({ message: 'Records not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

server.delete('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohort').where({ id: req.params.id }).del();
        if (count > 0) {
            res.status(204).json('Deleted!');
        } else {
            res.status(404).json({ message: 'Records not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

const port = process.env.PORT || 4400;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));