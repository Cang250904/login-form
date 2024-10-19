const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = fs.readFileSync('user.txt', 'utf-8').split('\n');
    
    let isAuthenticated = false;
    users.forEach(user => {
        const [storedUsername, storedPassword] = user.split('|');
        if (username === storedUsername && password === storedPassword) {
            isAuthenticated = true;
        }
    });

    if (isAuthenticated) {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
