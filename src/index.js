import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB first, then start the HTTP server
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
