const Todos = require('../models/todoModel');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/todo', function (req, res) {
        Todos.find()
            .then(function (todos, err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: err});
                } else {
                    console.log(todos);
                    res.json(todos);
                }
            });
    });

    app.get('/api/todo/:id', function (req, res) {
        Todos.findById({_id: req.params.id}).then(function (todos, err) {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            } else {
                console.log(todos);
                res.json(todos);
            }
        });
    });

    app.post('/api/todo', function (req, res) {
        if (req.body.id) {
            Todos.findByIdAndUpdate(
                req.body.id,
                {
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                }
            )
                .then(function (todo) {
                    // The updated todo is available here
                    res.json(todo);
                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } else {
            var newTodo = new Todos({
                username: 'Test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });

            newTodo.save()
                .then(function () {
                    res.send('Success');
                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        }
    });

    app.delete('/api/todo', function (req, res) {
        Todos.findByIdAndDelete(req.body.id)
            .then(function () {
                res.send('success');
            })
            .catch(function (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    });
};
