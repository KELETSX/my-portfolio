const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmountEl = document.getElementById('totalAmount');

// Load expenses when page opens
document.addEventListener('DOMContentLoaded', loadExpenses);

// Add new expense
expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const note = document.getElementById('note').value;
  const date = new Date().toLocaleDateString();

  if (amount && category) {
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
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
  expenseList.innerHTML = '';
  let total = 0;

  if (expenses.length === 0) {
    expenseList.innerHTML = '<li>No expenses yet. Add your first one!</li>';
  } else {
    expenses.reverse().forEach(exp => {
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
  
  totalAmountEl.innerText = R${total.toFixed(2)};
}
