const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: "User" },
}, {
    timestamps: true
})

module.exports = model("PostModel", postSchema)