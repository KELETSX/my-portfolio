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
  if (!list) return;

  if (services.length === 0) {
    list.innerHTML = '<li>⏳ No services logged yet. Click button to add one!</li>';
    return;
  }

  // Use a copy before reversing to avoid mutating the stored array
  const reversed = services.slice().reverse();

  // Build HTML then set once (better than repeatedly concatenating)
  let html = '';
  reversed.forEach(s => {
    html += `<li style="margin: 10px 0;">
               <b>${s.date}:</b> ${s.work} <br>
               <small style="color:#888;">${s.notes || ''}</small>
             </li>`;
  });
  list.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  loadServices();
  const btn = document.getElementById('addServiceBtn');
  if (btn) btn.addEventListener('click', addService);
});
