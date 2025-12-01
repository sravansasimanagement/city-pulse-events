import React, { createContext, useContext, useEffect, useState } from 'react'


type Lang = 'en' | 'ar'


const LanguageContext = createContext({
lang: 'en' as Lang,
setLang: (l: Lang) => {}
})


export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('cp_lang') as Lang) || 'en')


useEffect(() => {
document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
localStorage.setItem('cp_lang', lang)
}, [lang])


return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}


export const useLanguage = () => useContext(LanguageContext)