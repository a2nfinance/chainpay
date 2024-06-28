import dotenv from "dotenv";

import { NextApiRequest, NextApiResponse } from 'next';

import { AuthorizationCode } from "simple-oauth2";

dotenv.config();

const oauth2 = new AuthorizationCode({
    client: {
        id: process.env.QUICKBOOKS_CLIENT_ID!,
        secret: process.env.QUICKBOOKS_SECRET_KEY!,
    },
    auth: {
        tokenHost: process.env.QUICKBOOKS_ENVIRONMENT === 'sandbox' ? 'https://oauth.platform.intuit.com' : 'https://oauth.platform.intuit.com',
        tokenPath: '/oauth2/v1/tokens/bearer',
        authorizePath: '/oauth2/v1/tokens/bearer',
    },
});

async function refreshAccessToken() {
    const tokenConfig = {
        scope: 'com.intuit.quickbooks.accounting',
        expires_in: 3600 * 24 * 30
    };

    try {
        const accessToken = oauth2.createToken({
            refresh_token: process.env.QUICKBOOKS_REFRESH_TOKEN
        });

        const newToken = await accessToken.refresh(tokenConfig);
        return newToken.token.access_token;
    } catch (error: any) {
        console.error('Error refreshing access token:', error.message);
        throw error;
    }
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const newToken = await refreshAccessToken();
            let customersRq = await fetch(`${process.env.QUICKBOOKS_API_URL}/v3/company/9341452624364795/query?query=SELECT * FROM Customer maxresults 5&format=json`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${newToken}`,
                    'Content-Type': 'application/text',
                    'Accept': 'application/json'
                }
            });
            let customers = await customersRq.json();
            let filteredCustomers = customers.QueryResponse.Customer.filter((c: any) => !!c.Notes)
            return res.status(200).send(filteredCustomers);
        } catch (error: any) {
            console.log(error)
            return res.status(200).send([]);
        }

    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default handler;