import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});

const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100); // Convert dollars to cents
}

export async function POST(req) {
    const origin = req.headers.get("origin");
    const { plan } = await req.json(); // Extract the selected plan from the request body

    // Define pricing details for each plan
    const pricingDetails = {
        pro: {
            name: 'Pro subscription',
            amount: 10 // $10.00
        },
        enterprise: {
            name: 'Enterprise subscription',
            amount: 20 // $20.00
        }
    };

    const selectedPlan = pricingDetails[plan];

    if (!selectedPlan) {
        return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: selectedPlan.name,
                    },
                    unit_amount: formatAmountForStripe(selectedPlan.amount, 'usd'), // Amount in cents
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1,
            }
        ],
        success_url: `${origin}/results?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    };

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json(checkoutSession, { status: 200 });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}