import {memo, useState, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';

import CommentLayout from "../../components/comments/comment-layout";
import CommentList from "../../components/comments/comment-list";
import CommentForm from "../../components/comments/comment-form";


function CommentsBlock() {
  const [activeCommentId, setActiveCommentId] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const selectStore = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    articleId: state.article.data._id,
    comments: state.comments.comments,
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
    // Изменения текста комментария
    onMessageChange: useCallback((text) => {
      setMessage(text);
    }, []),
    // Отправка комментария
    onSendComment: useCallback(async () => {
      const type = activeCommentId ? 'comment' : 'article';
      const data = {text: message, parent: {_id: activeCommentId || selectRedux.articleId, _type: type}};
      dispatch(commentsActions.send(data));
    }, [message, selectRedux.articleId]),
  }

  return (
    <CommentLayout count={selectRedux.comments.length}>
      <CommentList
        comments={selectRedux.comments}
        activeCommentId={activeCommentId}
        isAuth={selectStore.isAuth}
        message={message}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
        onMessageChange={callbacks.onMessageChange}
        onSendComment={callbacks.onSendComment}
      />
      {
        !activeCommentId &&
        <CommentForm
          isAuth={selectStore.isAuth}
          message={message}
          onMessageChange={callbacks.onMessageChange}
          onSendComment={callbacks.onSendComment}
        />
      }
    </CommentLayout>
  )
}

export default memo(CommentsBlock);
