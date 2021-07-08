import { useContext, createContext, useMemo, useState } from 'react'
import { AuthContext } from './AuthProvider'
import useFireStore from '../hooks/useFireStore'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
    const { userData: { uid } } = useContext(AuthContext)

    // State
    const [openAddRoom, setOpenAddRoom] = useState(false)
    const [openAddMember, setOpenAddMember] = useState(false)
    const [roomId, setRoomId] = useState('')


    // Handdler

    const roomCondition = useMemo(() => {
        return { fieldName: 'members', operator: 'array-contains', compareValue: uid }
    }, [uid])

    const rooms = useFireStore('rooms', roomCondition)


    const selecRoom = useMemo(() => (
        rooms.find(room => room.id === roomId)
    ), [rooms, roomId])
    
    const userCondition = useMemo(() => {
        return { fieldName: 'uid', operator: 'in', compareValue: selecRoom?.members }
    }, [selecRoom])

    const users = useFireStore('users', userCondition)

    
    const appContextData = {
        rooms,
        users,
        openAddRoom, 
        setOpenAddRoom,
        roomId, 
        setRoomId,
        selecRoom,
        openAddMember, 
        setOpenAddMember
    }


    return (
        <AppContext.Provider value={appContextData}>
            { children }
        </AppContext.Provider>
    )
}

export default AppProvider
