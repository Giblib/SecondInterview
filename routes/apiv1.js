var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (Models, router) {
    var User = Models.User;
    var Comment = Models.Comment;

    router.get('/api/comments', function (req, res) {
        var query = {};

        Comment.find(query)
            .populate('author comments')
            .sort('created')
            .exec(function (err, data) {
                return processResponse(err, data, res);
            });
    });

    router.post('/api/comments/comment', function (req, res) {
        if (typeof req.body == 'object') {
            Comment.create({
                text: req.body.text,
                author: req.body.id
            }, function (err, data) {
                return processResponse(err, data, res);
            });
        }
    });

    router.post('/api/users/register', function (req, res) {
        if (typeof req.body == 'object') {
            User.findOne({username: req.body.username }, function(err, obj) {
                if(obj !== null) {
                    return processResponse('Duplicate key error.', obj, res);
                }
                else {
                    User.create({
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name
                    }, function (err, data) {
                        return processResponse(err, data, res);
                    });
                }
            });
        }
    });

    router.post('/api/v1/authorize', function (req, res) {
        if (typeof req.body == 'object') {
            var token = req.body.token;
            if (token) {
                jwt.verify(token, config.secret, function(err, decoded) {
                    if (err) {
                        return res.status(403).send({
                            status: 'error',
                            message: 'Failed to authenticate token.' + err
                        });
                    }
                    req.user = decoded;
                    res.send({
                        id: req.user._id,
                        name: req.user.name
                    });
                });
            }
            else {
                return res.status(403).send({
                    status: 'error',
                    message: 'No token provided.'
                });
            }
        }
    });

    // Just a helper route to seed. No need to ever run this again.

    router.get('/seed', function (req, res) {
        User.find({username: 'test'})
            .exec(function (err, data) {
                if (data == null) {
                    User.create({
                        username: 'test',
                        password: 'test',
                        name: 'Test User'
                    }, function (err, data) {
                        return processResponse(err, data, res);
                    });
                }
                return processResponse(err, data, res);
            });
    });

    function processResponse(err, data, res) {
        if (err) {
            return res.status(400).send({
                status: 'error',
                message: err
            });
        }
        return res.send(data);
    }

    return router;
};
