import {memo, useCallback, useMemo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import SideLayout from "../../components/side-layout";
import translate from "../../i18n/translate";
import useTranslate from "../../hooks/use-translate";

function Navigation() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang
  }));

  // Функция для локализации текстов
  const {t} = useTranslate();

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обработка перехода на главную
    onNavigate: useCallback((item) => {
      if (item.key === 1) store.actions.catalog.resetParams();
    }, [store])
  }

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: '/'},
    ]), [t])
  };

  return (
    <SideLayout side='between'>
      <Menu items={options.menu} onNavigate={callbacks.onNavigate}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} t={t}/>
    </SideLayout>
  );
}

export default memo(Navigation);
