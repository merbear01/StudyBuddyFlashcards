'use client'

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import Head from 'next/head';
import getStripe from "@/utils/get-stripe";

export default function Home() {

    const handleSubmit = async (plan) => {
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan }), // Send the selected plan
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const session = await response.json();

            console.log(session); // Debugging step: Ensure the session is valid

            if (session.error) {
                console.error(session.error);
                return;
            }

            const stripe = await getStripe();
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                console.warn(error.message);
            }
        } catch (error) {
            console.error('Error handling checkout:', error);
        }
    };

    return (
        <Container maxWidth="100vw" sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 0 }}>
            <Head>
                <title>Study Buddy</title>
                <meta name="Description" content="Create flashcards from your text" />
            </Head>

            <AppBar position="static" sx={{ backgroundColor: '#111' }}>
                <Toolbar>
                    <Typography variant='h6' style={{ flexGrow: 1 }}>Study Buddy Flashcards</Typography>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color='inherit' href="/sign-up">Sign up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant='h3' sx={{ color: 'primary.main' }} gutterBottom>Welcome To Study Buddy Flashcards</Typography>
                <Typography variant='h5' gutterBottom>
                    {' '}
                    The Easiest Way To Make Flashcards from texts</Typography>
                <Button variant='contained' color='secondary' sx={{ mt: 2 }} href="/generate">Get Started</Button>
            </Box>

            <Box sx={{ my: 6 }}>
                <Typography variant='h4' color="primary" gutterBottom>Features</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant='h6' gutterBottom>Easy Text Input</Typography>
                        <Typography>Simply Input Your Text And Let Our Software Do The Rest. Creating Flashcards Has Never Been Easier</Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                        <Typography>
                            {' '}
                            Our AI Intelligently Breaks Down Your Text Into Concise Flashcards, Perfect For Studying
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant='h6' gutterBottom>Accessible Anywhere</Typography>
                        <Typography>
                            {' '}
                            Access Your Flashcards From Any Device, At Any Time. Study On The Go With Ease
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ my: 6 }}>
                <Typography variant='h4' color="primary">What Our Users Say</Typography>
                <Grid container spacing={4}>
                    {[
                        { name: 'James', feedback: 'This app is amazing!', image: 'avatar1.png' },
                        { name: 'Nina', feedback: 'Really useful for studying.', image: 'avatar2.png' },
                        { name: 'Aaliya', feedback: 'Helped me ace my exams!', image: 'avatar3.png' },

                    ].map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper elevation={4} sx={{
                                p: 5, // Increased padding
                                textAlign: 'center',
                                borderRadius: 3,
                                backgroundColor: '#222',
                                color: '#fff',
                            }}>
                                <Avatar
                                    alt={testimonial.name}
                                    src={testimonial.image}
                                    sx={{ width: 80, height: 80, margin: '0 auto' }} // Increased size of Avatar
                                />
                                <Typography variant='h6' component='div' gutterBottom>
                                    {testimonial.name}
                                </Typography>
                                <Typography variant='body1'>
                                    "{testimonial.feedback}"
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Pricing Section */}
            <Box sx={{ my: 6, textAlign: 'center' }}>
                <Typography variant='h4' color="primary">Pricing</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: '#555',
                            borderRadius: 2,
                            backgroundColor: '#222',
                            color: '#fff',
                        }}>
                            <Typography variant='h5' gutterBottom>
                                Basic Plan (Free)
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                                $5/month
                            </Typography>
                            <Typography>
                                {' '}
                                Access to basic flashcard features and limited storage.
                            </Typography>
                            <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleSubmit}href='/generate'>Choose Basic Plan</Button>

                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: '#555',
                            borderRadius: 2,
                            backgroundColor: '#222',
                            color: '#fff',
                        }}>
                            <Typography variant='h5' gutterBottom>
                                Pro Plan
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                                $10/month
                            </Typography>
                            <Typography>
                                {' '}
                                Unlimited flashcards and storage, with priority support.
                            </Typography>
                            <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={() => handleSubmit('pro')}>
                                Choose Pro Plan
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: '#555',
                            borderRadius: 2,
                            backgroundColor: '#222',
                            color: '#fff',
                        }}>
                            <Typography variant='h5' gutterBottom>
                                Enterprise Plan
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                                $20/month
                            </Typography>
                            <Typography>
                                {' '}
                                Best for teams and organizations with extensive needs.
                            </Typography>
                            <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={() => handleSubmit('enterprise')}>
                                Choose Enterprise Plan
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#111', color: '#fff', py: 4, textAlign: 'center' }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Flashcards App. All rights reserved.
                </Typography>
                <Typography variant="body2">
                    <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a> |
                    <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none' }}> Terms of Service</a>
                </Typography>
            </Box>
        </Container>
    );
}