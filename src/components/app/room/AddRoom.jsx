import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import { addDocument } from '../../../firebase/service'
import { Dialog, DialogTitle, DialogContent, Button, TextField, Box, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialog: {
        height: 'auto',
        width: 'auto',
        textAlign: 'center'
    },
    input: {
        width: 300
    },
    button: {
        marginRight: 10
    }
}))

const AddRoom = () => {

    //Context API
    const { openAddRoom, setOpenAddRoom } = useContext(AppContext)
    const { userData: { uid } } = useContext(AuthContext)

    // State
    const [roomData, setRoomData] = useState('')
    

    // Handler
    const handleCreateRoom = async (event) => {
        event.preventDefault()
        try {
            await addDocument('rooms', {
                name: roomData,
                members: [uid]
            })

            setRoomData('')
            setOpenAddRoom(false)
        } catch (error) {
            console.error(error)
        }
    }

    // Style
    const classes = useStyles()

    return (
        <Dialog open={openAddRoom} onClose={() => setOpenAddRoom(false)} className={classes.dialog}>
            <DialogTitle>Thêm phòng mới</DialogTitle>
            <DialogContent>
                <form onSubmit={handleCreateRoom} >
                    <TextField label="Tên phòng" name="name" className={classes.input} onChange={(e) => setRoomData(e.target.value)} />
                    <Box display="flex" alignItems="center" my={5} mx={2} justifyContent="flex-end">
                        <Button variant="outlined" color="primary" className={classes.button} type="submit">Thêm</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setOpenAddRoom(false)}>Dóng</Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRoom
