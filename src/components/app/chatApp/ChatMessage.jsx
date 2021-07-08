import React from 'react'
import { Box, Typography, Avatar} from '@material-ui/core'


const ChatMessage = ({ avatar, text, displayName }) => {


    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Avatar src={avatar}>{avatar ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="body2" style={{marginLeft: 10}}>
                    {displayName}
                </Typography>
            </Box>
            <Typography variant="body2" style={{marginLeft: 50}}>
                {text}
            </Typography>
        </Box>
    )
}

export default ChatMessage
