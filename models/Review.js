const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    beer_name: {
        type: String
    },
    
    brewery_name: {
        type: String
    },
    
    score: {
        type: Number
    },
    
    review_body: {
        type: String
    },
    
    comments: {
        type: String
    }
});

const Review = mongoose.model("Review",ReviewSchema);

module.exports = Review;