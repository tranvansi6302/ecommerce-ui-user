import { Dispatch, SetStateAction, createContext, useState } from 'react'

type AppContextType = {
    errorMessage: string
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const initAppContext: AppContextType = {
    errorMessage: '',
    setErrorMessage: () => {}
}
export const AppContext = createContext<AppContextType>(initAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    return <AppContext.Provider value={{ errorMessage, setErrorMessage }}>{children}</AppContext.Provider>
}
