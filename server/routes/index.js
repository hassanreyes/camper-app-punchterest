var User = require('./../models/user');
var mongoose = require('mongoose');

var routes = function(app, router, passportInstance){
    
    /*--------------------------------------------
    *
    * HOME ROUTES
    *
    *---------------------------------------------*/
    
    router.get('/', (req, res) => {
        res.render('app');
    });
    
    
    router.post('/post', passportInstance.authorize, (req, res) => {
        
        const newPost = { imageURL: req.body.imageURL, description: req.body.description };
        
        const condition = { _id: { $eq: req.user._id } };
        const update = { $push: { posts: newPost } };
        
        User.findOneAndUpdate( condition, update, { new: true },
            (err, result) => {
                if(err || result.ok === 0) return res.status(422).json({ error: "unknown error trying to add a new post"});
                if(result.nModified == 0) return res.status(422).json({ error: "post could not be added"});
                if(result.n == 0) return  res.status(422).json({ error: "user not found"});
                //return the given post
                const post = result.posts[result.posts.length - 1];
                const returnValue = { 
                    _id: result._id, 
                    photoURL: result.photoURL, 
                    imageURL: post.imageURL,
                    description: post.description,
                    likesCount: 0,
                    liked: 0
                };
                    
                res.status(200).json(returnValue);
            });
    });
    
    router.get('/posts', (req, res) => {
        var user = req.user || { _id: 0 };
        User.aggregate([
            { $unwind: '$posts' },
            { $project: {
                photoURL: 1,
                post_id: '$posts._id',
                imageURL: '$posts.imageURL',
                description: '$posts.description',
                likesCount: { $size: '$posts.likes' },
                liked: { $size : {
                    $filter: { 
                        input: '$posts.likes',
                        as: 'like',
                        cond: { $eq: [ '$$like.user', user._id ] }
                    }
                }}
            }},
            { $sort: { 'posts.date': -1} }
            ])
            .exec((err, result) => {
                if(err) return res.status(422).json({ error: "unknown error getting posts"});
                res.status(200).json(result);
            });
    });
    
    router.delete('/posts/:post_id', passportInstance.authorize, (req, res) => {
        var user = req.user || { _id: 0 };
        var id = req.params.post_id;
        
        User.findOneAndUpdate(
           { _id: user._id },
           { $pull: { posts : { _id : id } } },
           { 'new' : true },
           (err, result) => {
               if(err) return res.status(422).json({ error: "unknown error removing like in a post"});
               //return empty success
                return res.status(200).json();
           }
           );
    });
    
    router.get('/posts/:user_id', (req, res) => {
        var user = req.user || { _id: 0 };
        var user_id = mongoose.Types.ObjectId(req.params.user_id);
        
        User.findById(user_id, (err, postsUser) => {
            if(err) return res.status(422).json({ error: "unknown error getting posts"});
           
            User.aggregate([
                { $match: { "_id" : postsUser._id } },
                { $unwind: '$posts' },
                { $project: {
                    photoURL: 1,
                    post_id: '$posts._id',
                    imageURL: '$posts.imageURL',
                    description: '$posts.description',
                    likesCount: { $size: '$posts.likes' },
                    liked: { $size : {
                        $filter: { 
                            input: '$posts.likes',
                            as: 'like',
                            cond: { $eq: [ '$$like.user', user._id ] }
                        }
                    }}
                }
            },
            { $sort: { 'posts.date': -1} }
            ])
            .exec((err, result) => {
                if(err) return res.status(422).json({ error: "unknown error getting posts"});
                //return user and his posts
                res.status(200).json( { user: postsUser, posts: result } );
            });   
            
        });
        
    });
    
    router.get('/posts/like/:user_id/:post_id', passportInstance.authorize, (req, res) => {
        var user = req.user || { _id: 0 };
        var user_id = mongoose.Types.ObjectId(req.params.user_id);
        var id = mongoose.Types.ObjectId(req.params.post_id);
        //var like_by = mongoose.Types.ObjectId(req.params.like_by);
       
        User.findOneAndUpdate(
           { '_id': user_id, 'posts._id': id },
           { '$push': {
                    'posts.$.likes' : { user: user._id }
                }
           },
           { 'new' : true },
           (err, result) => {
                if(err) return res.status(422).json({ error: "unknown error setting like a post"});
                //retrun empty success
                return res.status(200).json();
           }
           );
    });
    
    router.get('/posts/unlike/:user_id/:post_id', passportInstance.authorize, (req, res) => {
        var user = req.user || { _id: 0 };
        var user_id = mongoose.Types.ObjectId(req.params.user_id);
        var id = mongoose.Types.ObjectId(req.params.post_id);
        //var like_by = mongoose.Types.ObjectId(req.params.like_by);
       
        User.findOneAndUpdate(
           { '_id': user_id, 'posts._id': id },
           { '$pull': {
                    'posts.$.likes' : { $elemMatch : { 'user': user._id } }
                }
           },
           { 'new' : true },
           (err, result) => {
                if(err) return res.status(422).json({ error: "unknown error removing like in a post"});
                //return empty success
                return res.status(200).json();
           }
           );
    });
    
    return router;
};


module.exports = routes;