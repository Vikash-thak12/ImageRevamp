'use server';

import { redirect } from "next/navigation";
import Stripe from "stripe"


export async function checkOutCredits(transaction: CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const amount = Number(transaction.amount) * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan
                    }
                },
                quantity: 1
            }
        ], 
        metadata: {
            plan: transaction.plan, 
            credits: transaction.credits,
            buyerId: transaction.buyerId
        },
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}/`,
    })

    redirect(session.url!)
}