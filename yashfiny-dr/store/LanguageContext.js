import { createContext, useState } from "react";
import i18n from "../i18n";
export const LanguageContext = createContext({
locale: i18n.locale,
changeLang: (lang) => {}
})
const LangContextProvider = ({children}) => {
    const [lang, setLang] = useState(i18n.locale)
    const changeLang = (lang) => {
        i18n.locale = lang
        setLang(lang)
    }
    const value = {
        locale: lang,
        changeLang
    }
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>

}
export default LangContextProvider;