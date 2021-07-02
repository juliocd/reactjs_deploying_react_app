import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {sendRequest, status, data:loadedComments} = useHttp(getAllComments, true);
  const {quoteId} = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // useCallback avoid the re-render when the function is re-evaluated, in order to avoid an infinite loop
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  if(status === 'pending'){
    comments = (
        <div className='centered'>
            <LoadingSpinner />
        </div>
    )
  }

  if(status === 'completed' && loadedComments){
    comments = <CommentsList comments={loadedComments} />
    console.log(loadedComments)
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments weere added yet!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && 
        <NewCommentForm 
          quoteId={quoteId} 
          onAddedComment={addedCommentHandler} 
        />}
      {comments}
    </section>
  );
};

export default Comments;
