import {memo, useCallback} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
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
import CommentsBlock from '../../containers/comments-block';


function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const {lang} = useTranslate();
  // Параметры из пути /articles/:id
  const params = useParams();

  // В лекции был показан вариант с использованием Promise.all для параллельного совершения запросов

  // useInit(async () => {
  //   await Promise.all([
  //     dispatch(commentsActions.load(params.id)),
  //     dispatch(articleActions.load(params.id)),
  //   ]);
  // }, [params.id], true);

  // Согласно вкладке "DevTools -> Network -> Waterfall" без Promise.all запросы тоже идут параллельно
  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
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
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.articleWaiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.commentsWaiting}>
        <CommentsBlock/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
