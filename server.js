require('dotenv').config({ override: true });

const app = require('./app');
const connectDB = require('./config/db');
const axios = require('axios');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

  // const PING_INTERVAL = 14 * 60 * 1000;
  const PING_INTERVAL = 5000;
  const URL = process.env.RENDER_EXTERNAL_URL || `https://medlink-oyqm.onrender.com/api/v1/docs`;

  setInterval(async () => {
    try {
      await axios.get(URL);
      console.log(`🔄 Pinged ${URL} to keep Render app awake`);
    } catch (err) {
      console.error('⚠️ Error pinging self:', err.message);
    }
  }, PING_INTERVAL);
});
