import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function Square(props) {
  return (
    <button className='square' onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      step: 0,
    }
  }

  getCurrent() {
    const history = this.state.history
    return history[this.state.step]
  }

  xIsNext() {
    return this.state.step % 2 === 0
  }

  getPlayer() {
    return this.xIsNext() ? 'X' : 'O'
  }

  handleClick(i) {
    const history = this.state.history
    const squares = this.getCurrent().squares
    if (squares[i] || calculateWinner(squares)) return

    const newSquares = squares.slice()
    newSquares[i] = this.getPlayer()

    let newHistory = history.slice(0, this.state.step + 1)
    newHistory.push({ squares: newSquares })

    this.setState({
      history: newHistory,
      step: this.state.step + 1,
    })
  }

  jumpTo(i) {
    this.setState({ step: i })
  }

  render() {
    const current = this.getCurrent()

    let status = 'Next player: ' + this.getPlayer()
    const winner = calculateWinner(current.squares)
    if (winner) {
      status = 'Winner: ' + winner
    }

    const moves = this.state.history.map((_, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            status={status}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)
