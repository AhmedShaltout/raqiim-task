const MONGO_URI = 'mongodb://raqiim:raqiim1@ds137605.mlab.com:37605/raqiim'
const MONGODB_CONFIG = { useNewUrlParser: true, autoReconnect: true, useCreateIndex: true }
module.exports = {
    SESSION_CONGIG: {
        secret: '!$_R@Q!!M_@PP', saveUninitialized: false, resave: false, rolling: true,
        cookie: { maxAge: 60 * 60 * 1000, httpOnly: false }
    },
    SESSION_STORE: { url: MONGO_URI, autoRemove: 'native', ...MONGODB_CONFIG },
    MONGOOSE_CONFIG: { MONGO_URI, MONGODB_CONFIG },
    PORT: 2607
}