const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true

    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: true
    }
}, { timestamps: true })

postSchema.methods.savedToDB = function() {
    console.log(this.title + ' saved in Database')
}
module.exports = mongoose.model('Post', postSchema)