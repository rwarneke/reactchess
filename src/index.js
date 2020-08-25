import React from "react";
import ReactDom from "react-dom";
import "./index.css";

function initialiseChessBoard() {
    var board = Array(8);
    for (var i = 0; i < 8; i++) {
        board[i] = Array(8).fill(null);
    }
    board[0][0] = new King(2);
    board[7][7] = new King(1);
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

function Square(props) {
    return (
        <button
            className="square"
            style={props.style}></button>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: initialiseChessBoard()
        };
    }

    renderSquare(i, j) {
        let piece = this.state.squares[i][j];
        return(
            <Square
                style = {piece ? piece.style : null}
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
            board.push(<div className="board-row">{row}</div>);
        }
        return(
            <div className="board">
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDom.render(
    <Game />,
    document.getElementById("root")
);