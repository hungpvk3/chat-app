import { useContext } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import AddRoom from './AddRoom'
import { db } from '../../../firebase/config'


const RoomList = () => {

    // Context API
    const { rooms, setOpenAddRoom, setRoomId} = useContext(AppContext)
    const { userData: { uid } } = useContext(AuthContext)

    // Handler
    const handleDeleteRoom = (roomId) => {
        db.collection('rooms').doc(roomId).delete()
    }

    return (
        <Box>
            {rooms.map(room => (
                    <Box my={3} display="flex" alignItems="center" key={room.id} style={{cursor: 'pointer', width: '100%'}} onClick={() => setRoomId(room.id)}>
                        <Box><HomeIcon /></Box>
                        <Box mx={1} display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2">
                                {room.name}
                            </Typography>
                        </Box>
                        <Box>
                        {room.members[0] === uid ? (
                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteRoom(room.id)}>
                                <DeleteIcon />
                            </Button>
                        ) : ('')}
                        </Box>
                    </Box>
            ))}
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="outlined" color="primary" onClick={() => setOpenAddRoom(true)}>
                    <AddIcon />
                    Thêm phòng
                </Button>
           </Box>
            <AddRoom />
        </Box>
    )
}

export default RoomList
