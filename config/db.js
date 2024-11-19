const mongoose = require("mongoose");

async function connectBD() {
  try {
    await mongoose.connect(process.env.MONGOBD_URI);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectBD