import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from 'next';
dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            let customersRq = await fetch(`${process.env.QUICKBOOKS_API_URL}/v3/company/9341452624364795/query?query=SELECT * FROM Customer maxresults 5&format=json`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${process.env.QUICKBOOKS_ACCESS_TOKEN}`,
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