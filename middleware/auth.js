'use strict';

var jwt = require('jsonwebtoken');
var User = require('../models').User;

function GibLibAuth() {
    this.secret = undefined;
    this.options = undefined;
};

GibLibAuth.prototype.init = function(secret, options) {
    this.secret = secret;
    this.options = typeof options != 'undefined' && Object.keys(options).length != 0 ? options : undefined;
};

GibLibAuth.prototype.authenticate = function() {

    var self = this;
    console.log('inside authenticate middleware');

    return function(req, res, next) {

        var user = {
            username: typeof req.body.username != 'undefined' ? req.body.username : typeof req.query.username != 'undefined' ? req.query.username : false,
            password: typeof req.body.password != 'undefined' ? req.body.password : typeof req.query.password != 'undefined' ? req.query.password : false
        };

        if(!user.username || !user.password) {

            return res.status(403).send({
                status: 'error',
                message: 'Authentication error. Username and Password are required.'
            });

        }
        User.findOne({username: user.username }, function(err, obj) {
            if(obj.username !== null) {
                obj.compass(user.password, function(err, match) {
                    if(err || !match) {
                        return res.status(403).send({
                            status: 'error',
                            message: 'Authentication error. Not authorized.'
                        });
                    }

                    var payload = obj.toJson();

                    var token = jwt.sign(payload, this.secret, {
                        expiresIn: 86400
                    });

                    return res.status(200).send({
                        status: 'success',
                        message: 'Authentication success.',
                        token: token
                    });
                }.bind(this));
            } else {
                if(!self.isRestricted(req.method, req.path, null, self.options)) {
                    return next();
                }

                return res.status(403).send({
                    status: 'error',
                    message: 'Authentication failed.'
                });
            }
        }.bind(self));

        return false;
        

    };

};

GibLibAuth.prototype.authorize = function() {
    var self = this;

    return function(req, res, next) {
        req.user = {};
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || false;
        if (token) {
            jwt.verify(token, self.secret, function(err, decoded) {
                if (err) {

                    return res.status(403).send({
                        status: 'error',
                        message: 'Failed to authenticate token.' + err
                    });

                } else if (self.isRestricted(req.method, req.path, decoded.groups, self.options)) {

                    return res.status(403).send({
                        status: 'error',
                        message: 'Access is denied.'
                    });

                }
                req.user = decoded;
                return next();

            });
        } else if (self.isRestricted(req.method, req.path, '', self.options)) {

            return res.status(403).send({
                status: 'error',
                message: 'No token provided.'
            });

        } else {

            return next();

        }

        return true;

    };

};

GibLibAuth.prototype.isRestricted = function(method, path, role, options) {
    if(typeof options != 'undefined') {
        var restricted_methods = options.methods;
        var restricted_paths = options.paths;
        var unrestricted_paths = options.unrestricted;
        var super_group = options.super;

        if(restricted_methods.indexOf(method) > -1 && role != super_group && unrestricted_paths.indexOf(path) < -1) {

            return true;

        }

        if(restricted_paths.indexOf(path) > -1 && role != super_group) {

            return true;

        }
    }

    return false;

};

module.exports = new GibLibAuth();
