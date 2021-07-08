import { Container, Box, Grid, Button, Typography } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import firebase, { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/service'

const Login = () => {

    // Provider
    const providerFace = new firebase.auth.FacebookAuthProvider()

    // handler
    const handleLogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(providerFace)
        
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                providerId: additionalUserInfo.providerId,
                keySearch: generateKeywords(user.displayName)
            })
        }
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="h1">
                            Fun Chat
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            <FacebookIcon style={{marginRight: 10}} />
                            Đăng nhập bằng FaceBook
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login