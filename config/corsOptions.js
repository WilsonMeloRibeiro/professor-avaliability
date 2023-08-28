const whiteList = ['localhost:3333'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new error('not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions;
