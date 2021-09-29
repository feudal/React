import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import ExpenseFilter from './ExpensesFilter';

const Expenses = (props) => {
    const filterChangeHandler = selectedYear => {
        console.log(selectedYear);
    };
    const expensesList = props.expenses.map((ex) => {
        // if(ex.date.getFullYear() === selectedYear) {
        //     return null;
        // }
        return (
            <ExpenseItem
                title={ex.title}
                amount={ex.amount}
                date={ex.date}
            />
        )
    });

    return (
        <div className="expenses">
            <ExpenseFilter onCangheFilter={filterChangeHandler} />
            {expensesList}
        </div>
    )
};

export default Expenses;