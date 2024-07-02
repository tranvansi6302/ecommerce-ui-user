import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { ExtendedCartType } from '~/@types/cart.type'
import { User } from '~/@types/users.type'

import { getProfileFromLS, getTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    profile: User | null
    setProfile: Dispatch<SetStateAction<User | null>>
    extendedCart: ExtendedCartType[]
    setExtendedCart: Dispatch<SetStateAction<ExtendedCartType[]>>
}

const initAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getTokenFromLS()),
    setIsAuthenticated: () => {},
    profile: getProfileFromLS(),
    setProfile: () => {},
    extendedCart: [],
    setExtendedCart: () => {}
}
export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initAppContext.profile)
    const [extendedCart, setExtendedCart] = useState<ExtendedCartType[]>([])
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, extendedCart, setExtendedCart }}>
            {children}
        </AppContext.Provider>
    )
}
