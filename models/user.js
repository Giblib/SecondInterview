////////////////
// User model //
////////////////

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({

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

    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },

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

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
        return false;
    });
    return false;
});

UserSchema.methods.compass = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, match) {
        if (err) return cb(err);
        return cb(null, match);
    });
};

UserSchema.methods.toJson = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', UserSchema);
