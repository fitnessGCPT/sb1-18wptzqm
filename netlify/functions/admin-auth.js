// netlify/functions/admin-auth.js
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);
    
    // Validate input
    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username and password required' })
      };
    }
    
    // Check against Airtable Admins table
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Admins`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to connect to Airtable');
    }
    
    const data = await response.json();
    
    // Find matching admin user
    const admin = data.records.find(record => 
      record.fields.Username === username && 
      record.fields.Password === password &&
      record.fields.Active === true
    );
    
    if (admin) {
      // Update last login time
      await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Admins/${admin.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Last Login': new Date().toISOString()
          }
        })
      });
      
      // Create session token (simple base64 for demo - in production use JWT)
      const sessionData = {
        username: admin.fields.Username,
        role: admin.fields.Role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          token,
          user: {
            username: admin.fields.Username,
            role: admin.fields.Role
          }
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username or password' })
      };
    }
    
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication system temporarily unavailable' })
    };
  }
};
