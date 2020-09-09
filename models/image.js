const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let ImageSchema = new Schema({
  img: { data: Buffer, contentType: String },
  userid: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 300 }
});



// Export the model
module.exports = mongoose.model("Image", ImageSchema);
