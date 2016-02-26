module.exports = function (Models, router) {
    var User = Models.User;
    var Comment = Models.Comment;    


    router.get('/comments', function (req, res) {
        var query = {};

        Comment.find(query)
            .populate('author comments')
            .sort('-created')
            .exec(function (err, data) {
                return processResponse(err, data, res);
            });
    });

    router.post('/comments', function (req, res) {

        if (typeof req.body == 'object') {
            Comment.create({
                text: req.body.text,
                author: req.user._id
            }, function (err, data) {
                return processResponse(err, data, res);
            });
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
            return res.send({
                error: err
            });
        }
        return res.send(data);
    }

    return router;
};
