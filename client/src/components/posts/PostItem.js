import { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost, removeLike } from "../../actions/post";

const PostItem = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const auth = useSelector((state) => state.auth);
  const postItems = posts.map((post) => {
    return (
      <div key={post._id} className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
          </p>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => dispatch(addLike(post._id))}
          >
            <i className="fas fa-thumbs-up"></i>
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => dispatch(removeLike(post._id))}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${post._id}`} className="btn btn-primary">
            Discussion{" "}
            {post.comments.length > 0 && (
              <span className="comment-count">{post.comments.length}</span>
            )}
          </Link>

          {!auth.loading && post.user === auth.user._id && (
            <button type="button" className="btn btn-danger" onClick={(e)=>dispatch(deletePost(post._id))}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    );
  });
  return <Fragment>{postItems}</Fragment>;
};

export default PostItem;
