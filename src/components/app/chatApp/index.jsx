import { useContext } from 'react'
import { AppContext } from '../../../context/AppProvider'
import { Grid, Box, Typography, Avatar, Button, Tooltip } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AvatarGroup } from '@material-ui/lab'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home'
import ChatWindown from './ChatWindown'
import InvineMember from './InvineMember'


const ChatApp = () => {

    //Contxet API
    const { selecRoom, users, setOpenAddMember } = useContext(AppContext)


    return (
        <Grid container>
            {selecRoom?.id ? (<Grid item xs={12} md={12} lg={12} style={{background: '#4387F4', color: '#fff', height: 92}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" my={3} >
                    <Box display="flex" alignItems="center">
                        <Box mx={2}><HomeIcon /></Box>
                        <Typography variant="body1">
                            {selecRoom?.name}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Button style={{marginRight: 10}} onClick={() => setOpenAddMember(true)}>
                            <PersonAddIcon style={{marginRight: 5}} />
                            Mời
                        </Button>
                        <AvatarGroup max={3}>
                            {users?.map(user => (
                                <Tooltip title={user.displayName} key={user.id}>
                                    <Avatar src={user.photoURL}>{user.photoURL ? '': user.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    </Box>
                </Box>
            </Grid>) : (
                <Box display="flex" alignItems="center" justifyContent="center" style={{height: 91, background: '#4387F4', width: '100%'}}>
                    <Alert severity="info">Vui lòng chọn tham gia phòng-tạo mới phòng!</Alert>
                </Box>
            )}
            <Grid item xs={12} md={12} lg={12}>
                <ChatWindown />
            </Grid>
            <InvineMember />
        </Grid>
    )
}

export default ChatApp
