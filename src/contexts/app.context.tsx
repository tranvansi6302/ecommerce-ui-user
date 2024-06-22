import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from '~/@types/users.type'

import { getProfileFromLS, getTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    profile: User | null
    setProfile: Dispatch<SetStateAction<User | null>>
}

const initAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getTokenFromLS()),
    setIsAuthenticated: () => {},
    profile: getProfileFromLS(),
    setProfile: () => {}
}
export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initAppContext.profile)

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>{children}</AppContext.Provider>
    )
}
