import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { ExtendedCartType } from '~/@types/carts.type'
import { User } from '~/@types/users.type'

import { getProfileFromLS, getTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    profile: User | null
    setProfile: Dispatch<SetStateAction<User | null>>
    extendedCart: ExtendedCartType[]
    setExtendedCart: Dispatch<SetStateAction<ExtendedCartType[]>>
    globalOpenAddessDialog: boolean
    setGlobalOpenAddessDialog: Dispatch<SetStateAction<boolean>>
}

const initAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getTokenFromLS()),
    setIsAuthenticated: () => {},
    profile: getProfileFromLS(),
    setProfile: () => {},
    extendedCart: [],
    setExtendedCart: () => {},
    globalOpenAddessDialog: false,
    setGlobalOpenAddessDialog: () => {}
}
export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initAppContext.profile)
    const [extendedCart, setExtendedCart] = useState<ExtendedCartType[]>([])
    const [globalOpenAddessDialog, setGlobalOpenAddessDialog] = useState<boolean>(false)
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                extendedCart,
                setExtendedCart,
                globalOpenAddessDialog,
                setGlobalOpenAddessDialog
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
