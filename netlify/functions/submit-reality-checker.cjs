const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      currentWeight,
      goalWeight,
      timeline,
      height,
      age,
      gender,
      activityLevel,
      bmr,
      tdee,
      targetCalories,
      goalCategory,
      weeklyRate
    } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Airtable API configuration
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Fitness Assessment Leads';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      throw new Error('Airtable configuration missing');
    }

    // Prepare data for Airtable
    const airtableData = {
      fields: {
        'Name': name,
        'Email': email,
        'Phone': phone,
        'Source': 'Fitness Goal Reality Checker',
        'Date Submitted': new Date().toISOString(),
        'Status': 'New Lead',
        // Fitness Data
        'Current Weight (kg)': currentWeight ? parseFloat(currentWeight) : null,
        'Goal Weight (kg)': goalWeight ? parseFloat(goalWeight) : null,
        'Timeline (weeks)': timeline ? parseInt(timeline) : null,
        'Height (cm)': height ? parseFloat(height) : null,
        'Age': age ? parseInt(age) : null,
        'Gender': gender || null,
        'Activity Level': activityLevel || null,
        'BMR': bmr ? Math.round(bmr) : null,
        'TDEE': tdee ? Math.round(tdee) : null,
        'Target Calories': targetCalories ? Math.round(targetCalories) : null,
        'Goal Category': goalCategory || null,
        'Weekly Rate (kg)': weeklyRate ? parseFloat(weeklyRate.toFixed(2)) : null,
        'Weight Change (kg)': (currentWeight && goalWeight) ? parseFloat((goalWeight - currentWeight).toFixed(1)) : null
      }
    };

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(airtableData)
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text();
      console.error('Airtable error:', errorData);
      throw new Error('Failed to submit to Airtable');
    }

    const result = await airtableResponse.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Assessment request submitted successfully',
        id: result.id 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
