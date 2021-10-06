import config from "config";
import mongoose from "mongoose";

// const databaseConfigurations:mongoose.ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

/**
 * Initializes MongoDB connection using configs and logs status
 */
export default () => {
  mongoose.connect(config.get("app.database.string"), (err) => {
    if (err) {
      console.error("connection.mongodb.failed");
    } else {
      console.info("connection.mongodb.successful");
    }
  });
};
