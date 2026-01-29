You’re building a system to track expenses. The system has three main components:

=== PART 1: EXPENSE ===

Create an `Expense` class:

    - Represents a single expense record.
    - Has an **id, amount, date, and category**.
    - The date cannot be in the future.
    - The amount must be a positive number.
    - The category must be a non-empty string.
    - `Expense` objects are immutable once created.

=== PART 2: EXPENSE MANAGER (BASIC) ===

Create an `ExpenseManager` class with basic functionality:

    - Manages a collection of `Expense` objects.
    - Supports operations to:
        - Add a new expense.
        - Remove an expense by id.
        - Add a new allowed category.
        - Retrieve the current list of allowed categories.
    - Instances should start with a default set of allowed categories:
      Food, Housing, Transportation, Entertainment, and Health.
    - Enforces that all expenses belong to an allowed category.

=== PART 3: EXPENSE MANAGER (EXTENDED) ===

Extend the functionality of `ExpenseManager`:

    - Summarize expenses (total spent, average amount, and count).
    - Filter expenses by a date range.
    - Filter expenses by category.

=== PART 4: BUDGET EXPENSE MANAGER ===

Create a `BudgetExpenseManager` class to extend the capabilities of the `ExpenseManager`

    - Provides similar behavior to `ExpenseManager` but includes a budget limit.
    - Prevents adding expenses that would cause the total to exceed the budget.
    - Provides a way to show how much budget remains.
    - Summary also reports how much of the budget has been used.

=== General Guidelines: ===
- **Maintain encapsulation**. Expose only what’s necessary through public methods.
- Use **defensive copies** when returning collections or objects to prevent unintended external modifications.
- **Write tests** to verify that each class and method meets its stated requirements.