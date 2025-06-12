exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    const { name, email, phone, service, message } = JSON.parse(event.body);
    
    // Log environment variables (without showing the actual API key)
    console.log('Base ID exists:', !!process.env.AIRTABLE_BASE_ID);
    console.log('API Key exists:', !!process.env.AIRTABLE_API_KEY);
    console.log('Table Name:', process.env.AIRTABLE_TABLE_NAME);
    
    const airtableData = {
      records: [
        {
          fields: {
            name: name,
            email: email,
            phone: phone,  // Changed from Number
            service: service,
            message: message  // Changed from Goals
          }
        }
      ]
    };
    
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(airtableData)
    });
    
    const responseData = await response.json();
    console.log('Airtable response status:', response.status);
    console.log('Airtable response:', responseData);
    
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' })
      };
    } else {
      console.error('Airtable error:', responseData);
      throw new Error(`Airtable API error: ${JSON.stringify(responseData)}`);
    }
  } catch (error) {
    console.error('Full error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit form' })
    };
  }
};
