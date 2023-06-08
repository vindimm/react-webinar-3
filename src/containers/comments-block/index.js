import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";

import CommentLayout from "../../components/comments/comment-layout";
import CommentList from "../../components/comments/comment-list";


function CommentsBlock() {

  const selectStore = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    comments: state.comments.comments,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  return (
    <CommentLayout count={selectRedux.comments.length} isAuth={selectStore.isAuth} >
      <CommentList comments={selectRedux.comments}/>
    </CommentLayout>
  )
}

export default memo(CommentsBlock);
