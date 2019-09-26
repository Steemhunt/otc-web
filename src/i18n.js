import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const languageDetectorOptions = {
  // order and from where user language should be detected
  order: [
    "path",
    "querystring",
    "cookie",
    "localStorage",
    "navigator",
    "htmlTag",
    "subdomain"
  ],

  // keys or params to lookup language from
  lookupQuerystring: "l",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 1,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"]
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: ["en", "ko"],
    whitelist: ["en", "ko"],
    languages: ["en", "ko"],
    load: "languageOnly",
    detection: languageDetectorOptions,
    debug: false,

    transEmptyNodeValue: "", // what to return for empty Trans
    transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
    transKeepBasicHtmlNodesFor: ["br", "span", "strong", "i", "b", "a"], // don't convert to <1></1> if simple react elements
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
