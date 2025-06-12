import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Airtable from 'airtable';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Submit consultation form endpoint
app.post('/api/submit-consultation', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required fields'
      });
    }

    // Create record in Airtable
    const record = await base(process.env.AIRTABLE_TABLE_ID).create([
      {
        fields: {
          'Name': name,
          'Email': email,
          'Number': phone || '',
          'Service': service || '',
          'Goals': message || ''
        }
      }
    ]);

    console.log('Record created successfully:', record[0].getId());

    res.json({
      success: true,
      message: 'Consultation request submitted successfully!',
      recordId: record[0].getId()
    });

  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to submit consultation request. Please try again.',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});