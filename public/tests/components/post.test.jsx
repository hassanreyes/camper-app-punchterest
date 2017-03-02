var React       = require("react");
var ReactDOM    = require("react-dom");
var expect      = require("expect");
var TestUtils   = require("react-addons-test-utils");
import $        from "jquery";
import Post     from "../../components/posts/post";

var defaultPost = {
    _id: "58adf2c4c961430afd19f90f",
    photoURL: "https://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png",
    post_id: "58adf55e47a6940f8860f8a3",
    imageURL: "https://pbs.twimg.com/media/C5S0v1LWYAUT2Kh.jpg",
    description: "great movie",
    likesCount: 1,
    liked: 1
};

var defaultUser = {
    _id: "5898b332804a39350c8f8909",
    name: "Hassan_Reyes",
    displayName: "Hassan",
    updatedAt: "2017-03-01T03:53:05.065Z",
    twitterId: 2827097383,
    createdAt: "2017-02-06T17:32:34.919Z",
    photoURL: "https://pbs.twimg.com/profile_images/826824046222286848/omPpVR-4_normal.jpg"
};

describe('Post', function() {
    it('Should exist', function() {
        expect(Post).toExist();
    });
    
    it("Should DON´T let a non-logged in user like the post", () =>{
        
        var post = TestUtils.renderIntoDocument(<Post id={defaultPost.post_id} userId={defaultPost._id} photoURL={defaultPost.photoURL}
                            imageURL={defaultPost.imageURL} description={defaultPost.description}
                            likesCount={defaultPost.likesCount} liked={defaultPost.liked > 0}  />);
        var $el = $(ReactDOM.findDOMNode(post));
        console.log($el);
        var likeBtnClass = $el.find('button');
        console.log(likeBtnClass);
        expect(likeBtnClass.attr("class")).toMatch('disabled');
    });
    
    it("Should DO LET a logged in user like the post", () =>{
        
        var post = TestUtils.renderIntoDocument(<Post id={defaultPost.post_id} userId={defaultPost._id} photoURL={defaultPost.photoURL}
                            imageURL={defaultPost.imageURL} description={defaultPost.description} user={defaultUser}
                            likesCount={defaultPost.likesCount} liked={defaultPost.liked > 0}  />);
        var $el = $(ReactDOM.findDOMNode(post));
        console.log($el);
        var likeBtnClass = $el.find('button');
        console.log(likeBtnClass);
        expect(likeBtnClass.attr("class")).toNotMatch('disabled');
    });
});
