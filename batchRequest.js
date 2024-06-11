const axios = require('axios');
const qs = require('qs');

async function sendBatchMessages(accessToken, phoneId, recipients, messageBody) {
    // Validate input
    if (!accessToken || !phoneId || !recipients || !messageBody) {
      throw new Error('Missing required arguments: accessToken, phoneId, recipients, messageBody');
    }
  
    // Prepare the batch request payload
    const batchRequest = recipients.map(recipient => ({
      name: `message_to_${recipient}`,
      method: 'POST',
      relative_url: `/${phoneId}/messages`,
      body: `messaging_product=whatsapp&recipient_type=individual&to=${recipient}&type=text&text={"preview_url":false,"body":"${messageBody}"}`
    }));
  
    // Set the URL for the batch request
    const url = 'https://graph.facebook.com/v14.0';
  
    // Create form data for the request
    const formData = {
      access_token: accessToken,
      batch: JSON.stringify(batchRequest)
    };
  
    // Make the request to send batch messages
    try {
      const response = await axios.post(url, qs.stringify(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Batch request response:', response.data);
    } catch (error) {
      console.error('Error sending batch request:', error.response?.data || error);
    }
  }
  
  const accessToken = '';
  const recipients = ['Mobile number 1','Mobile number 2','Mobile number 3'];
  const messageBody = 'This is a sample message.';

  sendBatchMessages(accessToken, recipients, messageBody)
    .then(() => console.log('Batch message sending initiated!'))
    .catch(error => console.error('Error:', error));