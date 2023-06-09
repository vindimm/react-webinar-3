import {memo, useState, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

import CommentLayout from "../../components/comments/comment-layout";
import CommentList from "../../components/comments/comment-list";
import CommentForm from "../../components/comments/comment-form";


function CommentsBlock() {
  const [activeCommentId, setActiveCommentId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectStore = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    articleId: state.article.data._id,
    comments: state.comments.comments,
    commentsCount: state.comments.count,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
     // Клик по кнопке "Ответить"
    onAnswerClick: useCallback((id) => {
      setActiveCommentId(id);
    }, []),
     // Клик по кнопке "Отмена"
    onCancelClick: useCallback(() => {
      setActiveCommentId('');
    }, []),
    // Отправка комментария
    onSendComment: useCallback((message) => {
      const type = activeCommentId ? 'comment' : 'article';
      const data = {text: message, parent: {_id: activeCommentId || selectRedux.articleId, _type: type}};
      dispatch(commentsActions.send(data));
    }, [activeCommentId]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  let tree = [];
  let newComments = [];
  if (selectRedux.comments && selectRedux.articleId) {
    tree = listToTree(selectRedux.comments, selectRedux.articleId);
    newComments = treeToList(tree, (item, level) => ({...item, level}));
  }

  return (
    !selectRedux.commentsWaiting &&
    <CommentLayout count={selectRedux.commentsCount}>
      <CommentList
        comments={newComments}
        activeCommentId={activeCommentId}
        isAuth={selectStore.isAuth}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
        onSendComment={callbacks.onSendComment}
        onSignIn={callbacks.onSignIn}
      />
      {
        !activeCommentId &&
        <CommentForm
          isAuth={selectStore.isAuth}
          onSignIn={callbacks.onSignIn}
          onSendComment={callbacks.onSendComment}
        />
      }
    </CommentLayout>
  )
}

export default memo(CommentsBlock);
