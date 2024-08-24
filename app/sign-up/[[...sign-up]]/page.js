import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage (){
    return (<Container maxWidth="100vw">
        <AppBar position= "static" sx ={{backgroundColor:'#000'}} >
            <Toolbar>
                <Typography variant="h6" sx={{
                    flexGrow:1
                }}>
                    FlashCard App
                </Typography>
                <Button
                    component="a"
                    href="/sign-in"
                    sx={{
                        color: 'white',
                        padding: '8px 16px',
                        margin: '0 8px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                            backgroundColor: '#333',
                            color: '#fff'
                        }
                    }}
                >
                    Login
                </Button>
                <Button
                    component="a"
                    href="/sign-up"
                    variant="contained"
                    sx={{
                        margin: '0 8px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        backgroundColor: '#000',
                        color: 'white',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: '#333'
                        }
                    }}
                >
                    Sign Up
                </Button>
            </Toolbar>
        </AppBar>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <Typography variant="h4" component="h1" gutterBottom>
                Sign up
            </Typography>
            <SignUp/>
        </Box>



    </Container>)
}