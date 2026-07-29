alert("Script loaded!");
// Load saved services when page loads
document.addEventListener('DOMContentLoaded', loadServices);

// Add new service when button is clicked
document.getElementById('addServiceBtn').addEventListener('click', addService);

function addService() {
  const date = prompt("Enter service date: e.g. 29 July 2026");
  const work = prompt("What work was done? e.g. Oil Change");
  const notes = prompt("Any notes? e.g. Used Castrol 5W-30");

  if (date && work) {
    const service = { date, work, notes };
    let services = JSON.parse(localStorage.getItem('bmwServices')) || [];
    services.push(service);
    localStorage.setItem('bmwServices', JSON.stringify(services));
    loadServices(); // refresh the list
  }
}

function loadServices() {
  let services = JSON.parse(localStorage.getItem('bmwServices')) || [];
  const list = document.getElementById('serviceList');
  
  if (services.length === 0) {
    list.innerHTML = '<li>⏳ No services logged yet. Click button to add one!</li>';
    return;
  }

  list.innerHTML = ''; // clear list
  services.reverse().forEach(s => {
    list.innerHTML += <li style="margin: 10px 0;">✅ <b>${s.date}:</b> ${s.work} <br><small style="color:#888;">${s.notes}</small></li>;
  });
}
