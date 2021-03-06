const mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
module.exports = mongoose;