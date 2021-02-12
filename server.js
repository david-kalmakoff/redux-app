'use strict';

// External dependencies
// ==============================
const express = require('express');
const bodyParser = require("body-parser");

// server variables
// ==============================
const app = express();
const hostname = 'localhost';
const port = 3001;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const randomString = (n, r = '') => {
    while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    return r;
};

let data = [{
        id: randomString(20),
        text: 'test1',
        isCompleted: false,
    },
    {
        id: randomString(20),
        text: 'test2',
        isCompleted: true,
    }
];

app.post('/todo', (req, res) => {
    const { body } = req;
    const newTodo = {
        id: randomString(20),
        text: body.text,
        isCompleted: false,
    }
    data.push(newTodo)
    res.status(200).json(newTodo);
});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            const todo = data[i];
            data.splice(i, 1);
            res.status(200).json(todo);
        }
    }
});

app.post('/todo/:id/completed', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data[i].isCompleted = true;
            const todo = data[i];
            res.status(200).json(todo);
        }
    }
});

app.get('/todo', (req, res) => {
    res.status(200).json(data);
});

// GET port listening
// ******************************
app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));