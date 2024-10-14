exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const order = JSON.parse(event.body);
    console.log('Ordine ricevuto:', order);

    // Qui puoi aggiungere la logica per salvare l'ordine in un database se necessario

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Ordine ricevuto con successo!', order }),
    };
};
