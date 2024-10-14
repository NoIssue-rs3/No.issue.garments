const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

exports.handler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { id } = JSON.parse(event.body);

    try {
        await client.query(q.Delete(q.Ref(q.Collection('orders'), id)));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Ordine cancellato con successo' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore nella cancellazione dell\'ordine' }),
        };
    }
};
