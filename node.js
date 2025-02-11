// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Mock payment processor
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiry, cvv, amount } = req.body;

  // Simple validation
  if (!cardNumber || !expiry || !cvv || !amount) {
    return res.status(400).json({ success: false, message: 'Invalid payment data' });
  }

  // Mock payment processing
  const paymentSuccess = Math.random() > 0.1; // 90% success rate

  if (paymentSuccess) {
    // Save payment to database (mock)
    const paymentRecord = {
      id: 'PAY' + Date.now().toString().slice(-6),
      amount: amount,
      status: 'completed',
      timestamp: new Date().toISOString()
    };

    return res.json({
      success: true,
      paymentId: paymentRecord.id
    });
  } else {
    return res.status(402).json({
      success: false,
      message: 'Payment declined by bank'
    });
  }
});

app.listen(3000, () => {
  console.log('Payment server running on port 3000');
});

