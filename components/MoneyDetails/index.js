import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="main-container">
      <div className="card border2">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p className="heading">Your Income</p>
          <p className="amount" testid="incomeAmount">
            Rs. {incomeAmount}
          </p>
        </div>
      </div>
      <div className="card border3">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p className="heading">Your Expenses</p>
          <p className="amount" testid="expensesAmount">
            Rs. {expensesAmount}
          </p>
        </div>
      </div>
      <div className="card border1">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p className="heading">Your Balance</p>
          <p className="amount">Rs. {balanceAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
