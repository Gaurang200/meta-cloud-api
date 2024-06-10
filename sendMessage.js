const axios = require('axios');

async function sendMessage() {
    try {
        const url = 'https://graph.facebook.com/v17.0/106540352242922/messages';
        const accessToken = 'EAAJB...'; // Your access token here

        const data = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: '+16505555555',
            type: 'text',
            text: {
                preview_url: true,
                body: "Message body"
            }
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };

        const response = await axios.post(url, data, { headers });

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response.data);
    }
}

// Call the function
sendMessage();
