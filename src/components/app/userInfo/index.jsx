import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { Box, Typography, makeStyles, Avatar, Button } from '@material-ui/core'
import { auth } from '../../../firebase/config'

const useStyles = makeStyles(theme => ({
    name: {
        marginLeft: 5
    },
    heightUserInfo: {
        height: 92,
        maxHeight: 92,
        background: '#4387F4',
        color: '#fff'
    }
}))

const UserInfo = () => {

    // Context API
    const { userData: { displayName, photoURL } } = useContext(AuthContext)


    // Style
    const classes = useStyles()

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.heightUserInfo}>  
            <Box display="flex" alignItems="center">
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)}</Avatar>
                <Typography variant="body2" className={classes.name}>{displayName}</Typography>
            </Box>
            <Button variant="outlined" color="secondary" size="small" onClick={() => auth.signOut()}>Đăng xuất</Button>
        </Box>
    )
}

export default UserInfo
