import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div>
      <p>{comment.user_id}: {comment.content}</p>
    </div>
  );
};

export default CommentItem;