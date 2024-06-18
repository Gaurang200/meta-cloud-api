
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 7070;

const VERIFY_TOKEN = "your_token";

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log(body,'body');
    if (body.object) {
        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
            const messages = body.entry[0].changes[0].value.messages;
            messages.forEach(message => {
                console.log('Received message:', message);
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

