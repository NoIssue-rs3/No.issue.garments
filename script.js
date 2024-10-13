let orders = [];
let orderId = 1;

// Funzione per andare alla schermata secondaria
function goToSecondaryPage() {
    // Nascondo la schermata principale e mostro quella secondaria
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('secondary-page').style.display = 'block';
}

// Funzione per tornare alla schermata principale
function goBackToMainPage() {
    // Nascondo tutte le schermate e mostro quella principale
    document.getElementById('secondary-page').style.display = 'none';
    document.getElementById('private-area').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

// Funzione per accedere all'area privata
function goToPrivateArea() {
    const code = prompt('Inserisci il codice per accedere all\'area privata:');
    if (code === '3455') {
        // Nascondo la schermata principale e mostro l'area privata
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
    const uniqueCode = `ORD-${orderId}-${Math.floor(Math.random() * 1000)}`;

    if (color && size && phone && via && city && cap) {
        const order = {
            color, size, phone, via, city, cap, uniqueCode
        };
        orders.push(order); // Aggiungi l'ordine all'array
        alert(`ATTENZIONE: salva e invia questo codice nei direct della pagina Instagram @no.issue_official per la conferma e il pagamento dell'ordine: ${uniqueCode}`);
        orderId++;
    } else {
        alert('Compila tutti i campi.');
    }
}

// Funzione per caricare gli ordini nell'area privata
function loadOrders() {
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = ''; // Pulisce la tabella prima di caricare nuovi ordini
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.color}</td>
            <td>${order.size}</td>
            <td>${order.phone}</td>
            <td>${order.via}</td>
            <td>${order.city}</td>
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
