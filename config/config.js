module.exports = {
    env: process.env.GIBLIB_ENV || 'dev',
    mongodb: {
        uri: 'mongodb://159.203.255.156/giblibtest',
        //uri: 'mongodb://localhost/test1',
        opts: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    secret: 'QAZxswedc852369',
    options: {
        methods: [
            'POST',
            'PUT',
            'DELETE'
        ],
        paths: [
            'user',
            'video',
        ],
        unrestricted: [
            'register'
        ]
    }
};