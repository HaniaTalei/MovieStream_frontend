import React, { useEffect, useState } from 'react';

const CommentList = ({ movieId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/${movieId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [movieId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;