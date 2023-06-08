import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import CommentLayout from "../../components/comments/comment-layout";
import CommentList from "../../components/comments/comment-list";


function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selectStore = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    comments: state.comments.comments,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={selectRedux.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={selectRedux.articleWaiting}>
        <ArticleCard article={selectRedux.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={selectRedux.commentsWaiting}>
        <CommentLayout count={selectRedux.comments.length} isAuth={selectStore.isAuth} >
          <CommentList comments={selectRedux.comments}/>
        </CommentLayout>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
