import { useState, useRef, useContext } from 'react'
import { AppContext } from '../../../context/AppProvider'
import { db } from '../../../firebase/config'
import { Box, Dialog, DialogTitle, DialogContent, Button, TextField, MenuItem } from '@material-ui/core'

const InvineMember = () => {
    const { openAddMember, setOpenAddMember, selecRoom, roomId } = useContext(AppContext)

    const [keyWork, setKeyWork] = useState('')
    const [data, setData] = useState([])
    const typingTimeout = useRef(null)

    const onSubmitFuc = async (keyWork) => {
        const query = await db.collection('users').where('keySearch', 'array-contains', keyWork.keyWork).orderBy('displayName').limit(10)
        query.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data()
            }))
            setData(data)
        })
    }

    const handleOnChange = (e) => {
        const value = e.target.value

        setKeyWork(value)
        if (!onSubmitFuc) return

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }

        typingTimeout.current = setTimeout(() => {
            const formValues = {
                keyWork: value
            }
    
            onSubmitFuc(formValues)
        }, 500)


    }


    const handleAddMember = (memberId) => {
        const query = db.collection('rooms').doc(roomId)

        if (selecRoom.members.includes(memberId)) {
            console.log('Nguoi da ton tai')
            setOpenAddMember('')
            setKeyWork('')
            return
        }
        query.update({
            members: [...selecRoom.members, memberId]
        })
        setOpenAddMember('')
        setKeyWork('')
    }

    return (
        <div>
            <Box>
                <Dialog open={openAddMember} onClose={() => setOpenAddMember(false)}>
                    <DialogTitle title="Mời thành viên" />
                    <DialogContent>
                        <form>
                            <Box display="flex" alignItems="center">
                                <TextField label="Seaarch..." onChange={handleOnChange} value={keyWork} style={{width: 300}}/> 
                            </Box>
                            {data?.map(user => (
                                <Box key={user.uid} display="flex" alignItems="center" my={3}>
                                    <MenuItem style={{width: 200}}>
                                        { user.displayName }
                                    </MenuItem>
                                    <Button variant="outlined" color="primary" onClick={() => handleAddMember(user.uid)}>Add</Button>
                                </Box>
                            ))}
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
        </div>
    )
}

export default InvineMember
