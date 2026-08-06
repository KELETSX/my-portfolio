// GLOBAL services array - only declare it once here
let services = JSON.parse(localStorage.getItem('bmwServices')) || [];

function updateStats() {
  const totalSpent = services.reduce((sum, service) => sum + Number(service.cost || 0), 0);
  const totalServices = services.length;
  const lastService = services.length > 0 ? services[services.length - 1].date : '-';

  document.getElementById('totalSpent').innerText = R${totalSpent}; // fixed backticks
  document.getElementById('totalServices').innerText = totalServices;
  document.getElementById('lastService').innerText = lastService;
}

function addService() {
  const date = prompt("Enter service date: e.g. 29 July 2026");
  const work = prompt("What work was done? e.g. Oil Change");
  const cost = prompt("How much did it cost? e.g. 1200"); // added cost so stats work
  const notes = prompt("Any notes? e.g. Used Castrol 5W-30");

  if (date && work && cost) {
    const service = { date, work, cost, notes }; // added cost
    services.push(service); // use the GLOBAL services
    localStorage.setItem('bmwServices', JSON.stringify(services));
    loadServices();
    updateStats(); // update the cards
  }
}

function loadServices() {
  const list = document.getElementById('serviceList');
  if (!list) return;

  if (services.length === 0) { // use GLOBAL services
    list.innerHTML = '<li>⏳ No services logged yet. Click button to add one!</li>';
    return;
  }

  const reversed = services.slice().reverse();
  let html = '';
  reversed.forEach(s => {
    html += `<li style="margin: 10px 0;">
               <b>${s.date}:</b> ${s.work} - R${s.cost} <br>
               <small style="color:#888;">${s.notes || ''}</small>
             </li>`;
  });
  list.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  loadServices();
  updateStats(); // load stats on page load
  const btn = document.getElementById('addServiceBtn');
  if (btn) btn.addEventListener('click', addService);
});
