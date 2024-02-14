const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.get('/qrcode/generate', async (req, res) => {
  try {
    const { data, size } = req.query;
    const url = data || 'https://example.com';

    const options = {
      width: size || 100,
      margin: 1,
    };

    const qrCodeBuffer = await QRCode.toBuffer(url, options);

    res.set({ 'Content-Type': 'image/png' });
    res.send(qrCodeBuffer);
  } catch (error) {
    console.error('Error generating QR Code:', error);
    res.status(500).json({ error: 'Error generating QR Code' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});