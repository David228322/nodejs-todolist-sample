var Todos = require('../models/todoModel');

module.exports = function(app) {
    app.get('/api/setupTodos', async function(req, res) {
        var sampleTodos = [
            {
                username: 'john_doe',
                todo: 'Complete task 1',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'jane_doe',
                todo: 'Complete task 2',
                isDone: true,
                hasAttachment: true
            },
            {
                username: 'alice_smith',
                todo: 'Finish project',
                isDone: false,
                hasAttachment: true
            },
            {
                username: 'bob_jackson',
                todo: 'Read a book',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'charlie_brown',
                todo: 'Go for a run',
                isDone: true,
                hasAttachment: false
            }
        ];

        try {
            const results = await Todos.create(sampleTodos);
            console.log(results);
            console.log('I was called after successfully creating new entities');
            res.json(results);
        } catch (error) {
            console.error('Error creating entities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};