import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: 0,
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  addButton = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const optionDetails = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = optionDetails
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: 0,
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteButton = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state
    let balance = 0
    let incomeSum = 0
    let expensesSum = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeSum += eachTransaction.amount
      } else {
        expensesSum += eachTransaction.amount
      }
    })

    balance = incomeSum - expensesSum

    return balance
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmt = this.getBalanceAmount()
    const incomeAmt = this.getIncomeAmount()
    const expensesAmt = this.getExpensesAmount()

    return (
      <div className="bg">
        <div className="card-1">
          <h1 className="user">Hi User</h1>
          <p className="welcome">
            Welcome back to your{' '}
            <span className="highlight">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmt}
          incomeAmount={incomeAmt}
          expensesAmount={expensesAmt}
        />
        <div className="card-2">
          <form className="form">
            <h1 className="heading">Add Transactions</h1>
            <label htmlFor="title">TITLE</label>
            <input
              onChange={this.onChangeTitleInput}
              className="input"
              type="text"
              placeholder="TITLE"
              value={titleInput}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              onChange={this.onChangeAmountInput}
              className="input"
              type="text"
              placeholder="AMOUNT"
              value={amountInput}
            />
            <label htmlFor="select">TYPE</label>
            <select
              className="input"
              id="select"
              onChange={this.onChangeOptionId}
              value={optionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button" onClick={this.addButton}>
              Add
            </button>
          </form>
          <div className="history-transactions">
            <h1 className="heading">History</h1>
            <ul className="history-content">
              <li className="table-header">
                <p className="table-content">TITLE</p>
                <p className="table-content">AMOUNT</p>
                <p className="table-content">TYPE</p>
                <p className="table-content">DELETE</p>
              </li>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransaction={this.deleteButton}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
