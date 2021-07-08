import { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [userData, setUserData] = useState({})

    const history = useHistory()
    useEffect(() => {
        const unSubrice = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUserData({
                    displayName, 
                    email, 
                    uid, 
                    photoURL
                })
                history.push('/')
                return;
            }
            history.push('/login')
        })

        return () => {
            unSubrice()
        }

    }, [history])


    const authData = {
        userData
    }

    return (
        <AuthContext.Provider value={authData} >
            { children }
        </AuthContext.Provider>
    )
}
