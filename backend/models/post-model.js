const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String }
}, {
    timestamps: true
})

module.exports = model("PostModel", postSchema)