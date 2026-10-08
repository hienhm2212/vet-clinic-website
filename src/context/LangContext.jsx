import { createContext, useState, useCallback } from 'react'

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('vi')

  const t = useCallback(
    (vi, en) => (lang === 'vi' ? vi : en),
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}
