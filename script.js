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
    const ordine = {
        colore: document.getElementById("color").value,
        taglia: document.getElementById("size").value,
        telefono: document.getElementById("phone").value,
        via: document.getElementById("via").value,
        citta: document.getElementById("city").value,
        cap: document.getElementById("cap").value
    };

    fetch('/.netlify/functions/ordini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordine),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Gestione errore se la risposta non è ok
        }
        return response.json(); // Restituisce il corpo della risposta come JSON
    })
    .then(data => {
        console.log('Ordine confermato:', data); // Log dei dati ricevuti
        alert('Ordine inviato con successo!'); // Messaggio di conferma
        // Qui puoi aggiungere la logica per aggiornare la tabella degli ordini, se necessario
        loadOrders(); // Carica gli ordini dopo aver confermato
    })
    .catch(error => {
        console.error('Errore nell\'invio dell\'ordine:', error); // Log degli errori
        alert('Si è verificato un errore nell\'invio dell\'ordine.'); // Messaggio di errore
    });
}

// Funzione per caricare gli ordini nell'area privata
function loadOrders() {
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = ''; // Pulisce la tabella prima di caricare nuovi ordini
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.colore}</td>
            <td>${order.taglia}</td>
            <td>${order.telefono}</td>
            <td>${order.via}</td>
            <td>${order.citta}</td>
            <td>${order.cap}</td>
            <td>${order.uniqueCode}</td>
            <td><input type="checkbox"></td>
            <td><button onclick="deleteOrder(${index})">Cancella</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per cancellare un ordine
function deleteOrder(index) {
    orders.splice(index, 1); // Rimuovi l'ordine dall'array
    loadOrders(); // Ricarica la tabella aggiornata
}

// Gestione dell'evento di invio del modulo
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina
    submitOrder(); // Chiama la funzione per inviare l'ordine
});
