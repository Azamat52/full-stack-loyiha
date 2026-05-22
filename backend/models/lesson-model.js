const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = model("lessonSchema", lessonSchema)