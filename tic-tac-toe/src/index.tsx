import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquareProps {
  onClick(): void;          //Recebe função em Board e recebe void de Game (handleClick), está mais para um listener component
  value: string | null;     //value pode ser os valores null definido na array em 
}

/* function Square(props: SquareProps): React.FC {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
} */

const Square: React.FC<SquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  onClick(i: number): void;
  squares: ('X' | 'O' | null)[];
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square                                                             //Props enviados para Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}                             //i passa um número coletado no momento do 'click' para onclick
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface GameProps {
  //history: (string | null)[];
  //stepNumber: number;
  //xIsNext: boolean;
}

interface GameState {
  history: {squares: ('X' | 'O' | null)[]}[];
  stepNumber: number;
  xIsNext: boolean;
}

const calculateWinner = (squares: ('X' | 'O' | null)[]): 'X' | 'O' | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

class Game extends React.Component<GameProps, GameState> {
  
  //Declaração dos states
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  //Tem propósito de mudar os estados dos quadrados e gerar o histórico de jogadas, pode retornar void e alterar o state do square e o valor dentro da array square com alguma string
  handleClick(i: number) { 
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board                                                                  //props enviados para Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}                                    //número do Square que foi clicado
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));