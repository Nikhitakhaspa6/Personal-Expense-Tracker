// Select elements
const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const clearExpensesBtn = document.getElementById('clear-expenses');

// Initialize expenses from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
renderExpenses();

// Add Expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = expenseTitle.value.trim();
  const amount = parseFloat(expenseAmount.value);

  if (title && amount > 0) {
    const newExpense = { id: Date.now(), title, amount };
    expenses.push(newExpense);
    saveAndRenderExpenses();
    expenseForm.reset();
  }
});

// Delete Expense
expenseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-expense')) {
    const id = parseInt(e.target.dataset.id, 10);
    expenses = expenses.filter(expense => expense.id !== id);
    saveAndRenderExpenses();
  }
});

// Clear All Expenses
clearExpensesBtn.addEventListener('click', () => {
  expenses = [];
  saveAndRenderExpenses();
});

// Save to LocalStorage and Render Expenses
function saveAndRenderExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

// Render Expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${expense.title} - ₹${expense.amount}</span>
      <button class="btn btn-sm btn-outline-danger delete-expense shadow-sm" data-id="${expense.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalAmount.textContent = `₹${total}`;
}
