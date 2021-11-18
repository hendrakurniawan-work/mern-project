import { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";

const CommentItem = () => {
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.post.post._id);
  const comments = useSelector((state) => state.post.post.comments);

  const auth = useSelector((state) => state.auth);
  const commentItems = comments.map((comment) => {
    return (
      <div key={comment._id} className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img className="round-img" src={comment.avatar} alt="" />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{comment.text}</p>
          <p className="post-date">
            Posted <Moment format="YYYY/MM/DD">{comment.date}</Moment>
          </p>
          {!auth.loading && comment.user === auth.user._id && (
            <button type="button" className="btn btn-danger" onClick={(e)=>dispatch(deleteComment(postId, comment._id))}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    );
  });
  return <Fragment>{commentItems}</Fragment>;
};

export default CommentItem;
