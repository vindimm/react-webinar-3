import {memo, useState, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";

import CommentLayout from "../../components/comments/comment-layout";
import CommentList from "../../components/comments/comment-list";
import CommentForm from "../../components/comments/comment-form";


function CommentsBlock() {
  const [activeCommentId, setActiveCommentId] = useState(''); // activeCommentId: string;

  const selectStore = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
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
  }

  return (
    <CommentLayout count={selectRedux.comments.length}>
      <CommentList
        comments={selectRedux.comments}
        activeCommentId={activeCommentId}
        isAuth={selectStore.isAuth}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
      />
      {!activeCommentId && <CommentForm isAuth={selectStore.isAuth}/>}
    </CommentLayout>
  )
}

export default memo(CommentsBlock);
