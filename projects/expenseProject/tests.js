import { Expense, ExpenseManager, BudgetExpenseManager } from './expense_project.js';

// Testing Helpers
function pass(msg) {
  console.log('\x1b[32m PASS:\x1b[0m ' + msg);
}
function fail(msg) {
  console.log('\x1b[31m FAIL:\x1b[0m ' + msg);
}
function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

// Part One
console.log('\n=== PART 1: EXPENSE ===\n');

// - Has an **id, amount, date, and category**.
try {
  console.log('- Has an **id, amount, date, and category**.');
  const expense = new Expense(1, 100, '2026-01-29', 'food');
  assert(expense.id === 1);
  assert(expense.amount === 100);
  assert(expense.date.getTime() === new Date('2026-01-29').getTime(), 'date should be 2026-01-29');
  assert(expense.category === 'food');
  pass('has an id, amount, date, and category');
} catch (error) { fail(error.message) }

// - The date cannot be in the future.
try {
  console.log('- The date cannot be in the future.');
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 100, '2030-11-06', 'food');
  fail('should throw error for date in the future');
} catch (_) {
  pass('Dates cannot be in the future');
}

// - The amount must be a positive number.
try {
  console.log('- The amount must be a positive number.');
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 0, '2026-01-29', 'food');
  fail('should throw error for non positive amount');
} catch (_) {
  pass('amounts must be positive');
}

// - The category must be a non-empty string.
try {
  console.log('- The category must be a non-empty string.');
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 100, '2026-01-29', '     ');
  fail('should throw error for empty category string');
} catch (_) {
  pass('category must be a non-empty string');
}

// - `Expense` objects are immutable once created. (cannot edit properties)
try {
  console.log('- `Expense` objects are immutable once created. (cannot edit properties)');
  const expense = new Expense(1, 100, '2026-01-29', 'food');
  expense.id = 42;
  fail('should throw error when trying to update a property');
} catch (_) {
  pass('cannot change properties once expense has been created');
}

// - `Expense` objects are immutable once created. (cannot add new properties)
try {
  console.log('- `Expense` objects are immutable once created. (cannot add new properties)');
  const expense = new Expense(1, 100, '2026-01-29', 'food');
  expense.newProperty = 42;
  fail('should throw error when trying to add a new property');
} catch (_) {
  pass('cannot add properties once expense has been created');
}

// Part Two
console.log('\n=== PART 2: EXPENSE MANAGER (BASIC) ===\n');

// - Manages a collection of `Expense` objects.
try {
  console.log('- Manages a collection of `Expense` objects.');
  const manager = new ExpenseManager();
  assert(manager.expenses.length === 0, 'expenses should be empty');
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'food'});
  assert(manager.expenses.length === 1, 'expenses should have a length of 1');
  pass('maintains a list of Expense objects');
} catch (error) { fail(error.message) }

// - Add a new expense.
try {
  console.log('- Add a new expense.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'food'});
  assert(manager.expenses[0].amount === 100, 'amount should be 100');
  assert(manager.expenses[0].date.getTime() === new Date('2026-01-29').getTime(), 'date should be 2026-01-29');
  assert(manager.expenses[0].category === 'food', 'category should be food');
  pass('adds a new expense');
} catch (error) { fail(error.message) }

// - Remove an expense by id.
try {
  console.log('- Remove an expense by id.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'food'});
  assert(manager.expenses.length === 1, 'expenses should have one expense');
  manager.removeExpenseById(1);
  assert(manager.expenses.length === 0, 'expenses should be empty');
  pass('removes an expense by id');
} catch (error) { fail(error.message) }

// - Retrieve the current list of allowed categories.
try {
  console.log('- Retrieve the current list of allowed categories.');
  const manager = new ExpenseManager();
  const initialCategories = manager.getCategories();
  assert(initialCategories.length === 5);
  assert(initialCategories.includes('food'), 'food should be in categories');
  assert(initialCategories.includes('housing'), 'housing should be in categories');
  assert(initialCategories.includes('transportation'), 'transportation should be in categories');
  assert(initialCategories.includes('entertainment'), 'entertainment should be in categories');
  assert(initialCategories.includes('health'), 'health should be in categories');
  pass('Initial categories are food, housing, transportation, entertainment, and health');
} catch (error) { fail(error.message) }

// - Allows known categories
try {
  console.log('- Allows known categories');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'food'});
  assert(manager.expenses.length === 1, 'expenses should have one expense');
  pass('Allows known categories');
} catch (error) { fail(error.message) }

// - Disallows known categories
try {
  console.log('- Disallows known categories');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'eating out' });
  fail('should throw error when trying to add an expense with an unknown category');
} catch (_) {
  pass('cannot add expenses with unknown category');
}

// - Add a new allowed category.
try {
  console.log('- Add a new allowed category.');
  const manager = new ExpenseManager();
  manager.addCategory('eating out');
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'eating out' });
  pass('Allows adding new categories');
} catch (error) { fail(error.message) };


console.log('\n=== PART 3: EXPENSE MANAGER (EXTENDED) ===\n');

// - Summarize expenses (total spent, average amount, and count).
try {
  console.log('- Summarize expenses (total spent, average amount, and count).');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2026-01-29', category: 'food'});
  manager.addExpense({ amount: 200, date: '2026-01-29', category: 'food'});
  const summary = manager.summarizeExpenses();
  assert(summary.total === 300, 'total should be 300');
  assert(summary.average === 150, 'average should be 150');
  assert(summary.count === 2, 'count should be 2');
  pass('summarizes expenses (total spent, average, count');
} catch (error) { fail(error.message) }

// - Filter expenses by category.
try {
  console.log('- Filter expenses by category.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-01-29', category: 'food'});
  manager.addExpense({ amount: 50, date: '2025-5-15', category: 'health'});
  manager.addExpense({ amount: 80, date: '2025-10-31', category: 'entertainment'});
  manager.addExpense({ amount: 25, date: '2026-01-29', category: 'food'});
  assert(manager.expenses.length === 4, 'expenses should have 4 expense objects');
  const foodExpenses = manager.filterExpensesByCategory('food');
  assert(foodExpenses.length === 2, 'filtered expenses should have 2 expense objects');
  assert(foodExpenses[0].amount === 100, 'amount should be 100');
  pass('Can filter expenses by category');
} catch (error) { fail(error.message) }

// - Filter expenses by a date range.
try {
  console.log('- Filter expenses by a date range.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-01-29', category: 'food'});
  manager.addExpense({ amount: 50, date: '2025-5-15', category: 'health'});
  manager.addExpense({ amount: 80, date: '2025-10-31', category: 'entertainment'});
  manager.addExpense({ amount: 25, date: '2026-01-29', category: 'housing'});
  assert(manager.expenses.length === 4, 'expenses should have 4 expense objects');
  const expensesInRange = manager.filterExpensesByDate('2025-04-01', '2025-12-31');
  assert(expensesInRange.length === 2, 'filtered expenses should have 2 expense objects');
  assert(expensesInRange[0].date.getTime() === new Date('2025-5-15').getTime());
  assert(expensesInRange[1].date.getTime() === new Date('2025-10-31').getTime());
  pass('Can filter expenses by date range, inclusive');
} catch (error) { fail(error.message) }

console.log('\n=== PART 4: BUDGET EXPENSE MANAGER ===\n');

// - Provides a way to show how much budget remains.
try {
  console.log('- Provides a way to show how much budget remains.');
  const manager = new BudgetExpenseManager(100);
  manager.addExpense({ amount: 20, date: '2025-01-29', category: 'food'});
  manager.addExpense({ amount: 40, date: '2025-01-29', category: 'food'});
  assert(manager.remainingBudget() === 40, 'Remaining budget should be 40');
  pass('remaining budget shows budget - expenses so far');
} catch (error) { fail(error.message) }

// - Prevents adding expenses that would cause the total to exceed the budget.
try {
  console.log('- Prevents adding expenses that would cause the total to exceed the budget.');
  const manager = new BudgetExpenseManager(100);
  manager.addExpense({ amount: 101, date: '2025-01-29', category: 'food'});
  fail('should throw error when trying to add an expense that exceeds the allowed budget');
} catch (_) {
  pass('cannot add expenses that exceeds the allowed budget');
}

// - Summary also reports how much of the budget has been used.
try {
  console.log('- Summary also reports how much of the budget has been used.');
  const manager = new BudgetExpenseManager(100);
  manager.addExpense({ amount: 20, date: '2025-01-29', category: 'food'});
  manager.addExpense({ amount: 40, date: '2025-01-29', category: 'food'});
  const summary = manager.summarizeExpenses();
  assert(summary.total === 60, 'total should be 60');
  assert(summary.average === 30, 'average should be 30');
  assert(summary.count === 2, 'count should be 2');
  assert(summary.remainingBudget === 40, 'remaining budget should be 40');
  assert(summary.budgetLimit === 100, 'budget limit should be 100');
  pass('summary also reports how much of the budget has been used');
} catch (error) { fail(error.message) }