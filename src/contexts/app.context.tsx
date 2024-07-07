import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { ExtendedCartType } from '~/@types/carts.type'
import { User } from '~/@types/users.type'
import CreateAddress from '~/pages/MyAccount/pages/MyAddress/components/CreateAddress'
import UpdateAddress from '~/pages/MyAccount/pages/MyAddress/components/UpdateAddress/UpdateAddress'

import { getProfileFromLS, getTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    profile: User | null
    setProfile: Dispatch<SetStateAction<User | null>>
    extendedCart: ExtendedCartType[]
    setExtendedCart: Dispatch<SetStateAction<ExtendedCartType[]>>
    globalOpenCreateAddessDialog: boolean
    setGlobalOpenCreateAddessDialog: Dispatch<SetStateAction<boolean>>
    globalOpenUpdateAddessDialog: boolean
    setGlobalOpenUpdateAddessDialog: Dispatch<SetStateAction<boolean>>
    addressIdContext: number
    setAddressIdContext: Dispatch<SetStateAction<number>>
}

const initAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getTokenFromLS()),
    setIsAuthenticated: () => {},
    profile: getProfileFromLS(),
    setProfile: () => {},
    extendedCart: [],
    setExtendedCart: () => {},
    globalOpenCreateAddessDialog: false,
    setGlobalOpenCreateAddessDialog: () => {},
    globalOpenUpdateAddessDialog: false,
    setGlobalOpenUpdateAddessDialog: () => {},
    addressIdContext: 0,
    setAddressIdContext: () => {}
}
export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initAppContext.profile)
    const [extendedCart, setExtendedCart] = useState<ExtendedCartType[]>([])
    const [globalOpenCreateAddessDialog, setGlobalOpenCreateAddessDialog] = useState<boolean>(false)
    const [globalOpenUpdateAddessDialog, setGlobalOpenUpdateAddessDialog] = useState<boolean>(false)
    const [addressIdContext, setAddressIdContext] = useState<number>(0)
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                extendedCart,
                setExtendedCart,
                globalOpenCreateAddessDialog,
                setGlobalOpenCreateAddessDialog,
                globalOpenUpdateAddessDialog,
                setGlobalOpenUpdateAddessDialog,
                addressIdContext,
                setAddressIdContext
            }}
        >
            <div>
                {children}
                <CreateAddress />
                <UpdateAddress />
            </div>
        </AppContext.Provider>
    )
}
