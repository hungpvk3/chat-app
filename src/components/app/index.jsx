import React from 'react'
import { Container, Grid } from '@material-ui/core'
import UserInfo from './userInfo'
import RoomList from './room'
import ChatAppComponent from './chatApp'

export default function ChatApp() {
    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={2} md={3} lg={3} style={{background: '#f2f2f2'}}>
                    <UserInfo />
                    <RoomList />
                </Grid>
                <Grid item xs={10} md={9} lg={9}>
                    <ChatAppComponent />
                    
                </Grid>
            </Grid>
        </Container>
    )
}
