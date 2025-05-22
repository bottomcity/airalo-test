import { APIRequestContext, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_API_URL = process.env.BASE_API_URL

export async function authenticatePartner(): Promise<{
    accessToken: string;
    apiContext: APIRequestContext;
}> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${BASE_API_URL}/token`, {
        form: {
                client_id: process.env.CLIENT_ID!,
                client_secret: process.env.CLIENT_SECRET!,
                grant_type: 'client_credentials',
            },
        }
    );

    if (response.status() !== 200) {
        throw new Error(`Failed to authenticate. Status: ${response.status()}`);
    }

    const responseData = await response.json();

    const accessToken = responseData.data.access_token;

    const authorizedContext = await request.newContext({
        baseURL: BASE_API_URL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    return { accessToken, apiContext: authorizedContext };
}