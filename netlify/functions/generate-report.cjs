// netlify/functions/generate-report.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Verify admin session
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { 
        statusCode: 401, 
        body: JSON.stringify({ error: 'Unauthorized' }) 
      };
    }
    
    const token = authHeader.substring(7);
    const session = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (session.exp < Date.now()) {
      return { 
        statusCode: 401, 
        body: JSON.stringify({ error: 'Session expired' }) 
      };
    }

    // For now, proxy to your Cloud Run service with CORS headers
    const reportResponse = await fetch('https://search-console-reporter-218046281466.us-central1.run.app/api/generate-report', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: event.body
    });
    
    const result = await reportResponse.json();
    
    return {
      statusCode: reportResponse.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    };
    
  } catch (error) {
    console.error('Report generation error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Report generation failed',
        details: error.message 
      })
    };
  }
};
