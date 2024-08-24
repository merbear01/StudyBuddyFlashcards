'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get("id")

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }

        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    // Return nothing or a loader if user is not loaded or not signed in
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
                {flashcards.length > 0 && (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>Flashcards Preview</Typography>
                        <Grid container spacing={6} justifyContent="center">
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                                            },
                                        }}
                                    >
                                        <CardActionArea onClick={() => handleCardClick(index)}>
                                            <CardContent>
                                                <Box sx={{
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                        borderRadius: '10px',
                                                        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '200px',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: '10px',
                                                        boxSizing: 'border-box',
                                                        color: '#fff',
                                                        textAlign: 'center',
                                                        wordWrap: 'break-word',
                                                        lineHeight: '1.4',
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                    },
                                                }}>
                                                    <div>
                                                        <div>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: '1rem',
                                                                    lineHeight: '1.4',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                            >
                                                                {flashcard.front}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: '1rem',
                                                                    lineHeight: '1.4',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                            >
                                                                {flashcard.back}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Container>
    )
}
