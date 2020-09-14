var mongoose = require('mongoose');

DATABASE_URL = "mongodb://localhost:27017/my_sweet_moon"

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connnection successful!'))
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });

module.exports = mongoose