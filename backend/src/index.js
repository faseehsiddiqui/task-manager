
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const dotenv = require('dotenv');
const connectMongoDb = require('./config/mongoDb')
dotenv.config();

const app = express();
const port = process.env.PORT;
const startServer = async () => {
  try {
    await connectMongoDb(); // Wait for MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};
app.use(express.json());
app.use(cors());
app.use(router);

startServer();
