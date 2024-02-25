document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalExpense = document.getElementById('totalExpense');
    let expenses = [];

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (expenseName && expenseAmount) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            updateExpenses();
            expenseForm.reset();
        }
    });

    function updateExpenses() {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach(function(expense, index) {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span>${index + 1}. ${expense.name}: ₹${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
            total += expense.amount;
        });
        totalExpense.textContent = `Total Expenses: ₹${total.toFixed(2)}`;
        
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                expenses.splice(index, 1);
                updateExpenses();
            });
        });
    }
});
