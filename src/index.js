import React from "react";
import ReactDom from "react-dom";
import "./index.css";

function initialiseChessBoard() {
    var board = Array(8);
    for (var i = 0; i < 8; i++) {
        board[i] = Array(8).fill(null);
    }
    board[0][0] = new Rook(2);
    board[0][1] = new Knight(2);
    board[0][2] = new Bishop(2);
    board[0][3] = new Queen(2);
    board[0][4] = new King(2);
    board[0][5] = new Bishop(2);
    board[0][6] = new Knight(2);
    board[0][7] = new Rook(2);
    for (let i = 0; i < 8; i++) {
        board[1][i] = new Pawn(2);
    }

    board[7][0] = new Rook(1);
    board[7][1] = new Knight(1);
    board[7][2] = new Bishop(1);
    board[7][3] = new Queen(1);
    board[7][4] = new King(1);
    board[7][5] = new Bishop(1);
    board[7][6] = new Knight(1);
    board[7][7] = new Rook(1);
    for (let i = 0; i < 8; i++) {
        board[6][i] = new Pawn(1);
    }

    return board;
}

class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.iconUrl = iconUrl;
        this.style = {
            backgroundImage: "url('" + iconUrl + "')"
        };
    }
}

class King extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
        super(player, url);
    }
}

class Queen extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
        super(player, url);
    }
}

class Rook extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
        super(player, url);
    }
}

class Bishop extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
        super(player, url);
    }
}

class Knight extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
        super(player, url);
    }
}

class Pawn extends Piece {
    constructor(player) {
        var url = player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";
        super(player, url);
    }
}

function Square(props) {
    return (
        <button
            className="square"
            style={props.style}
            onClick={props.onClick}></button>
    )
}

class Board extends React.Component {
    renderSquare(i, j) {
        let piece = this.props.squares[i][j];
        return(
            <Square
                key={i*8+j}
                style={piece ? piece.style : null}
                onClick={() => this.props.onClick(i, j)}
            />
        )
    }

    render() {
        const board = []
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                row.push(this.renderSquare(i, j));
            }
            board.push(<div className="board-row" key={i}>{row}</div>);
        }
        return(
            <div className="board">
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: initialiseChessBoard(),
            fromSquare: null,
        };
    }

    handleClick(i, j) {
        if (!this.state.fromSquare) {
            // no square currently selected
            // select this square if it has a piece on it
            if (this.state.squares[i][j]) {
                console.log("Set fromSquare to", i, j);
                this.setState({fromSquare: [i,j]});
            }
        } else {
            // toSquare selected
            const from = this.state.fromSquare;
            // move to toSquare, unless it is just fromSquare...
            if (i !== from[0] || j !== from[1]) {
                console.log("Moving to", i, j);
                const piece = this.state.squares[from[0]][from[1]];
                var squares = this.state.squares;
                // add piece to toSquare
                squares[i][j] = piece;
                // remove piece from fromSquare
                squares[from[0]][from[1]] = null;
            } else {
                console.log("Unselecting.")
            }
            // ... in either case, unselect the from square
            this.setState({fromSquare: null});
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {this.state.squares}
                        onClick = {(i, j) => this.handleClick(i, j)}
                    />
                </div>
            </div>
        );
    }
}

ReactDom.render(
    <Game />,
    document.getElementById("root")
);