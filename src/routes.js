var mongoose = require('mongoose');
var uuid = require('node-uuid');

module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.html'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the register form
    app.get('/register', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('register.html', { message: req.flash('registerMessage') });
    });

    // process the signup form
    // app.post('/register', do all our passport stuff here);
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.html', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/me', isLoggedIn, function (req, res) {
        res.send({ email: req.user.local.email });
    });

    app.get('/me/links', isLoggedIn, function (req, res) {
        var userLinkModel = mongoose.model('UserLink');
        userLinkModel.findOne({userId: req.user._id}, function (err, userLink) {
            if (err) {/*error!!!*/ }
            if (!userLink) {
                res.send([]);
                return;
            }

            var links = userLink.links.map(function (link) {
                return { id: link.internalId, url: link.url };
            });
            res.send(links);
        });
    });

    app.post('/me/links', isLoggedIn, function (req, res) {
        var UserLinkModel = mongoose.model('UserLink');
        var sentLinks = req.body.links;
        if(!sentLinks || sentLinks.length === 0)
            return res.send(400, { error: "Empty links collection." });

        UserLinkModel.findOne({ userId: req.user._id }, function (err, userLink) {
            if (err) { }
            if (!userLink) {
                userLink = {
                    links: []
                };
            }

            //O(N^2) lol
            function isValidLink(sentLink) {
                if (!sentLink.url) {
                    return false;
                }

                var linkExists = false;
                userLink.links.forEach(function (existingLink) {
                    if (sentLink.url === existingLink.url) {
                        console.log("Link: " + sentLink.url + " already exists and will not be saved again.");
                        linkExists = true;
                        return;
                    }
                });

                return !linkExists;
            }

            sentLinks.forEach(function (sentLink) {
                if (isValidLink(sentLink)) {
                    if (!sentLink.id || sentLink.id === "") {
                        sentLink.id = uuid.v4();
                        console.log("Internal id for link " + sentLink.url + " has not been provided. " +
                            "Created a new one: " + sentLink.id + ".");
                    }
                    var linkData = {
                        internalId: sentLink.id,
                        url: sentLink.url
                    };
                    userLink.links.push(linkData);
                    console.log("Adding new link " + linkData.url + " [id: " + linkData.internalId + "].");
                }
            });

            UserLinkModel.findOneAndUpdate({ userId: req.user._id }, userLink, { upsert: true }, function (updateErr, userLinks) {
                if (updateErr) return res.send(500, { error: updateErr });
                return res.send("Succesfully saved links.");
            });
        });

    });

    app.delete('/me/links/:id', isLoggedIn, function (req, res) {
        var UserLinkModel = mongoose.model('UserLink');
        var linkId = req.params.id;
        if(!linkId)
            return res.send(400, { error: "Missing link id." });

        UserLinkModel.findOne({ userId: req.user._id }, function (err, userLink) {
            if (err) { }
            if (!userLink) {
                userLink = {
                    links: []
                };
            }

            var linkToRemoveIndex = -1;
            userLink.links.forEach(function (existingLink, index) {
                if (linkId === existingLink.internalId) {
                    linkToRemoveIndex = index;
                    return;
                }
            });

            if(linkToRemoveIndex < 0)
                return res.send(400, { error: "Invalid link id." });

            userLink.links.splice(linkToRemoveIndex, 1);

            UserLinkModel.findOneAndUpdate({ userId: req.user._id }, userLink, { upsert: true }, function (updateErr, userLinks) {
                if (updateErr) return res.send(500, { error: updateErr });
                return res.send("Succesfully removed link.");
            });
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
