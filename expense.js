const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmountEl = document.getElementById('totalAmount');

if (!expenseForm || !expenseList || !totalAmountEl) {
  console.error('Required DOM elements missing: expenseForm, expenseList or totalAmount');
  // Stop further execution to avoid runtime errors
} else {
  // Load expenses when page opens
  document.addEventListener('DOMContentLoaded', loadExpenses);

  // Add new expense
  expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const amountVal = document.getElementById('amount').value;
    const amount = parseFloat(amountVal);
    const category = document.getElementById('category').value;
    const note = document.getElementById('note').value;
    const date = new Date().toLocaleDateString();

    // Use isNaN to allow zero if you want, or require amount > 0
    if (!isNaN(amount) && category) {
      const expense = { amount, category, note, date };
      
      let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      
      expenseForm.reset(); // clear form
      loadExpenses(); // refresh list
    }
  });

  // Load and display all expenses
  function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    expenseList.innerHTML = '';
    let total = 0;

    if (expenses.length === 0) {
      expenseList.innerHTML = '<li>No expenses yet. Add your first one!</li>';
    } else {
      // avoid mutating the original array in case you rely on order elsewhere
      const reversed = [...expenses].reverse();
      reversed.forEach(exp => {
        total += exp.amount;
        expenseList.innerHTML += `
          <li>
            <div>
              <b>${exp.category}</b> <br>
              <small>${exp.date} - ${exp.note}</small>
            </div>
            <div class="amount">-R${exp.amount.toFixed(2)}</div>
          </li>
        `;
      });
    }
    
    // FIXED: use a string/template literal here
    totalAmountEl.innerText = `R${total.toFixed(2)}`;
  }
}
