const axios = require('axios');

module.exports = {
  createPayment: async (req, res) => {
    try {
      const { amount, successUrl, failUrl } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
      }

      if (typeof amount !== 'number') {
        return res.status(400).json({ error: 'Amount must be a number' });
      }

      if (!process.env.FLOUCI_APP_TOKEN || !process.env.FLOUCI_APP_SECRET) {
        return res.status(500).json({ error: 'Payment configuration is incomplete' });
      }

      const flouciResponse = await axios.post('https://developers.flouci.com/api/generate_payment', {
        app_token: process.env.FLOUCI_APP_TOKEN,
        app_secret: process.env.FLOUCI_APP_SECRET,
        amount: amount,
        accept_card: "true",
        session_timeout_secs: 1200,
        success_link: successUrl || "http://localhost:3000/payment/success",
        fail_link: failUrl || "http://localhost:3000/payment/fail",
        developer_tracking_id: process.env.FLOUCI_DEVELOPER_ID
      });

      res.json(flouciResponse.data);
    } catch (error) {
      console.error('Payment generation error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.status(error.response.status).json({
          error: 'Payment generation failed',
          details: error.response.data
        });
      } else if (error.request) {
        // The request was made but no response was received
        res.status(500).json({
          error: 'No response received from payment service',
          details: error.message
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).json({
          error: 'Error setting up payment request',
          details: error.message
        });
      }
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { paymentId } = req.params;
      
      // Note: In test environment, payment information is only stored for 20 minutes
      const flouciResponse = await axios.get(`https://developers.flouci.com/api/verify_payment/${paymentId}`, {
        headers: {
          'app_token': process.env.FLOUCI_APP_TOKEN,
          'app_secret': process.env.FLOUCI_APP_SECRET
        }
      });

      res.json(flouciResponse.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; 