let orders = [];
let orderId = 1;

// Funzione per andare alla schermata secondaria
function goToSecondaryPage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('secondary-page').style.display = 'block';
}

// Funzione per tornare alla schermata principale
function goBackToMainPage() {
    document.getElementById('secondary-page').style.display = 'none';
    document.getElementById('private-area').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

// Funzione per accedere all'area privata
function goToPrivateArea() {
    const code = prompt('Inserisci il codice per accedere all\'area privata:');
    if (code === '3455') {
        document.getElementById('main-page').style.display = 'none';
        document.getElementById('private-area').style.display = 'block';
        loadOrders(); // Carica gli ordini nella tabella
    } else {
        alert('Codice non valido');
    }
}

// Funzione per confermare l'ordine e generare un codice univoco
function submitOrder() {
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const phone = document.getElementById('phone').value;
    const via = document.getElementById('via').value;
    const city = document.getElementById('city').value;
    const cap = document.getElementById('cap').value;

    if (color && size && phone && via && city && cap) {
        const uniqueCode = `ORD-${orderId}-${Math.floor(Math.random() * 1000)}`;
        const order = { color, size, phone, via, city, cap, uniqueCode };

        // Invia l'ordine al server
        fetch('/.netlify/functions/ordini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Ordine confermato:', data);
            alert(`Ordine inviato con successo! Codice: ${uniqueCode}`);
            orders.push(order); // Aggiungi l'ordine all'array
            orderId++;
            clearOrderFields(); // Cancella i campi dell'ordine
            loadOrders(); // Ricarica gli ordini nell'area privata
        })
        .catch(error => {
            console.error('Errore nell\'invio dell\'ordine:', error);
            alert('Si è verificato un errore nell\'invio dell\'ordine.');
        });
    } else {
        alert('Compila tutti i campi.');
    }
}

// Funzione per caricare gli ordini nell'area privata
function loadOrders() {
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = ''; // Pulisce la tabella prima di caricare nuovi ordini
    
    // Recupera gli ordini dal database
    fetch('/.netlify/functions/getOrders')
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.data.color}</td>
                    <td>${order.data.size}</td>
                    <td>${order.data.phone}</td>
                    <td>${order.data.via}</td>
                    <td>${order.data.city}</td>
                    <td>${order.data.cap}</td>
                    <td>${order.data.uniqueCode}</td>
                    <td><input type="checkbox"></td>
                    <td><button onclick="deleteOrder('${order.ref.id}')">Cancella</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Errore nel recupero degli ordini:', error);
        });
}

// Funzione per cancellare un ordine
function deleteOrder(orderId) {
    fetch('/.netlify/functions/deleteOrder', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Ordine cancellato con successo!');
        loadOrders(); // Ricarica la tabella aggiornata
    })
    .catch(error => {
        console.error('Errore nella cancellazione dell\'ordine:', error);
        alert('Si è verificato un errore nella cancellazione dell\'ordine.');
    });
}

// Funzione per cancellare i campi dell'ordine dopo l'invio
function clearOrderFields() {
    document.getElementById('color').value = '';
    document.getElementById('size').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('via').value = '';
    document.getElementById('city').value = '';
    document.getElementById('cap').value = '';
}

// Aggiungi listener per il form
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina
    submitOrder(); // Chiama la funzione per inviare l'ordine
});
