import { prisma } from "@/utils/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) {
        throw new Error("Missing SIGNING_SECRET from Clerk");
    }

    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");
    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Missing Svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let event: WebhookEvent;
    try {
        event = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature
        }) as WebhookEvent;
    } catch (error) {
        console.log(error)
        return new Response("Verification Error", { status: 400 });
    }

    // console.log(`Received event: ${event.type} with id ${event.data.id}`);
    // console.log(`Webhook body: ${body}`);

    if (event.type === "user.created") {
        try {
            await prisma.user.create({
                data: {
                    id: event.data.id,
                    username: JSON.parse(body).data.username,
                    email: JSON.parse(body).data.email_addresses[0].email_address
                }
            });
            return new Response("User created", { status: 201 });
        } catch (error) {
            console.error(error);
            return new Response("Error creating user", { status: 400 });
        }
    }

    if (event.type === "user.deleted") {
        try {
            await prisma.user.delete({ where: { id: event.data.id } });
            return new Response("User Deleted", { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Error deleting user", { status: 400 });
        }
    }

    if (event.type === "user.updated") {
        try {
            await prisma.user.update({
                data: {
                    id: event.data.id,
                    username: JSON.parse(body).data.username,
                    email: JSON.parse(body).data.email
                },
                where: { id: event.data.id }
            });
            return new Response("User updated", { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Error updating user", { status: 400 });
        }
    }
    
    return new Response("Webhook received", { status: 200 });
};
