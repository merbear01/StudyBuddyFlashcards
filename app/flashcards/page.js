'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { CardActionArea, Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { doc, getDoc, collection, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from "next/navigation";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    // Return nothing or a loader if user is not loaded or not signed in
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth='100vw'>
            <Grid container spacing={3} sx={{ mt: 4 }}>
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
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                                        color: '#fff',
                                        padding: 3,
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
