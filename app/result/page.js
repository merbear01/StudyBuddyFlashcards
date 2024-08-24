'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import get_Stripe from '@/utils/get-stripe'  // Ensure this matches the file name
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Image from 'next/image';
import Head from 'next/head';
import { Container, Box, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] });

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
                const sessionData = await res.json();

                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError("An Error Occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            {session.payment_status === "paid" ? (
                <>
                    <Typography variant="h4">Thank you for purchasing!</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Session ID: {session_id}</Typography>
                        <Typography variant="body1">
                            We have received your payment. You will receive an email with the order details shortly.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">Payment Failed</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography>
                            Your Payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ResultPage;
