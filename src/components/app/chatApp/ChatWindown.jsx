import { useState, useContext, useMemo } from 'react'
import useFireStore from '../../../hooks/useFireStore'
import { addDocument } from '../../../firebase/service'
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import { Box, TextField, Button, makeStyles } from '@material-ui/core'
import ChatMessage from './ChatMessage'

const useStyles = makeStyles(theme => ({
    chatmes: {
        height: '80vh',
        overflowY: 'auto',
        background: '#ccc'
    },
    textFile: {
        width: '80%',
    },
    button: {
        margin: '12px 0 0 1rem'
    }
}))

const ChatWindown = () => {

    // Context API
    const { userData: { uid, displayName, photoURL } } = useContext(AuthContext)
    const { selecRoom } = useContext(AppContext)

    // State
    const [messageText, setMessageText] = useState('')

    // Handle
    const onSendMessage = (e) => {
        e.preventDefault()
        addDocument('messages', {
            message: messageText,
            uid,
            displayName,
            photoURL,
            roomId: selecRoom?.id
        })
        setMessageText('')
    }

    const messageCondition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: selecRoom?.id
        }
    }, [selecRoom?.id])

    const getMessage = useFireStore('messages', messageCondition)

    // Style
    const classes = useStyles()
    
    return (
        <div>
            {selecRoom ? (
                <Box>
                <Box className={classes.chatmes} display="flex" flexDirection="column" justifyContent="flex-end">
                    {getMessage?.map(message => (
                        <ChatMessage 
                            key={message.id}
                            avatar={message.photoURL} 
                            displayName={message.displayName} 
                            text={message.message} 
                        />
                    ))}
                </Box>
                <Box>
                    <form onSubmit={onSendMessage}>
                        <TextField label="Nhập nội dung tin nhắn" 
                            className={classes.textFile} 
                            value={messageText} 
                            onChange={(e) => setMessageText(e.target.value)} 
                        />
                        <Button variant="outlined" color="primary" className={classes.button} type="submit">Gủi tin nhắn</Button>
                    </form>
                </Box>
            </Box> 
            ) : (
                <Box className={classes.chatmes}>

                </Box>
            )}
        </div>
    )
}

export default ChatWindown
