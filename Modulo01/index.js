const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 3000;
const users = ['Filipe', 'Sotin', 'Pontin'];

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));


server.use((req, res, next) => {
	console.time("Request");
	console.log(`Metodo: ${req.method}, URL: ${req.url} `);

	next();
	console.timeEnd("Request");
});

const checkUserExists = ((req, res, next) => {
	if (!req.body.name) {
		return res.status(400).json({ error: 'User name is required' });
	}
	next();
});

const checkUserInArrayExists = ((req, res, next) => {
	if (!users[req.params.id]) {
		return res.status(400).json({ error: 'User does not exists' });
	}
	next();
});


server.get('/users', (req, res) => {
	//return res.json({ massege: `OLa ${req.params.id}` });
	return res.json({ users: users });
});

server.get('/users/:id', checkUserInArrayExists, (req, res) => {
	const { id } = req.params;
	//return res.json({ massege: `OLa ${req.params.id}` });
	return res.json({ user: users[id] });
});

server.post('/users', checkUserExists, (req, res) => {
	const { name } = req.body;
	users.push(name);
	return res.json({ users: users });
});

server.put('/users/:id', checkUserExists, checkUserInArrayExists, (req, res) => {
	const { name } = req.body;
	users[req.params.id] = name;
	return res.json({ users: users });
});

server.delete('/users/:id', checkUserInArrayExists, (req, res) => {
	users.splice([req.params.id], 1);
	return res.json();
});





server.get('/users/:id', (req, res) => {
	return res.json({ massege: `OLa ${req.params.id}` });
});




server.listen(port, () => {
	console.log(`Server online... port ${port}`);
});



