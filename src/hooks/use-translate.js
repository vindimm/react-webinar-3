import {useState, useMemo, useLayoutEffect} from "react";
import useServices from "./use-services";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import {I18nContext} from "../i18n/context";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.getLang());
  const t = i18n.translate.bind(i18n);

  const changeLang = (value) => {
    setLang(value);
    i18n.setLang(value);
  };

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe((value) => {
      setLang(value);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  // const store = useStore();
  // // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  // // Функция для смены локали
  // const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // // Функция для локализации текстов
  // const t = useCallback((text, number) => translate(lang, text, number), [lang]);
  //
  return {lang, changeLang, t};

  // return useContext(I18nContext);
}
