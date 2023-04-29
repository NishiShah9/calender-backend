const mongoose = require("mongoose");
const { MESSAGE } = require("./constant");

// set mongo connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(MESSAGE.MONGO_CONNECT);
  })
  .catch((err) => {
    console.log(err);
  });
