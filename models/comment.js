///////////////////
// Comment model //
///////////////////

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({

    ////////////////////
    // MongoDB Fields //
    ////////////////////

    _id: {
        type: ObjectId,
        auto: true
    },
    __v: {
        type: Number,
        select: false
    },

    ////////////////////
    // Default Fields //
    ////////////////////

    text: {
        type: String,
        required: true
    },

    /////////////////////////
    // Relationship Fields //
    /////////////////////////

    author: {
        type: ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: ObjectId,
            ref: 'Comment'
        }
    ],

    //////////////////////
    // Timestamp Fields //
    //////////////////////

    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Date,
        default: null
    }

});

module.exports = mongoose.model('Comment', CommentSchema);
