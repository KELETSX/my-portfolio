// Dark/Light Mode
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if(document.body.classList.contains('dark')) {
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
    }
});

// Contact Button Alert
const contactBtn = document.getElementById('contactBtn');
contactBtn.addEventListener('click', () => {
    alert("Thanks for reaching out! Email: Nasdaqkeletso@gmail.com");
});
// Tracker Page Button
const addServiceBtn = document.getElementById('addServiceBtn');
if(addServiceBtn) {
    addServiceBtn.addEventListener('click', () => {
        alert("Feature coming soon: Save service to local storage");
    });
}