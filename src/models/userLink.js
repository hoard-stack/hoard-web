var mongoose = require('mongoose');

var userLinkSchema = mongoose.Schema({
    userId: String,
    links: [
        {
            internalId: String,
            url: String,
            from: String
        }
    ]
});

module.exports = mongoose.model('UserLink', userLinkSchema);