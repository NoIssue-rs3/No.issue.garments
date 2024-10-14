let orders = []; // Array per memorizzare gli ordini

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const order = JSON.parse(event.body);
        console.log('Ordine ricevuto:', order);
        
        // Aggiungi l'ordine all'array
        orders.push(order);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Ordine ricevuto con successo!', order }),
        };
    } catch (error) {
        console.error('Errore nella gestione dell\'ordine:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Errore nel parsing dell\'ordine', error }),
        };
    }
};

// Funzione per ottenere tutti gli ordini
exports.getOrders = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(orders),
    };
};
