function addService() {
  const date = prompt("Enter service date: e.g. 29 July 2026");
  const work = prompt("What work was done? e.g. Oil Change");
  const notes = prompt("Any notes? e.g. Used Castrol 5W-30");

  if (date && work) {
    const service = { date, work, notes };
    let services = JSON.parse(localStorage.getItem('bmwServices')) || [];
    services.push(service);
    localStorage.setItem('bmwServices', JSON.stringify(services));
    loadServices();
  }
}

function loadServices() {
  let services = JSON.parse(localStorage.getItem('bmwServices')) || [];
  const list = document.getElementById('serviceList');
  
  if (!list) return; // safety check
  
  if (services.length === 0) {
    list.innerHTML = '<li>⏳ No services logged yet. Click button to add one!</li>';
    return;
  }

  list.innerHTML = '';
  services.reverse().forEach(s => {
    list.innerHTML += <li style="margin: 10px 0;">✅ <b>${s.date}:</b> ${s.work} <br><small style="color:#888;">${s.notes}</small></li>;
  });
}

// Wait for page to load, THEN connect button
document.addEventListener('DOMContentLoaded', function() {
  loadServices();
  document.getElementById('addServiceBtn').addEventListener('click', addService);
});
