class Tree{
    constructor(playerMinusOne, startBoard){
        this.rootNode = new Node(playerMinusOne, "", startBoard);
        this.rootNode.initChildren();
    }
    
    nextRootNode(columnClicked){
        this.rootNode = this.rootNode.children[columnClicked];
        this.rootNode.initChildren();
    }
    
    simulate(){
        for (let i = 0; i < this.rootNode.children.length; i++){
            let wins = 0;
            let loss = 0;
            let simulations = 1000;
            let child = this.rootNode.children[i];
            if (child.invalid == true){
                break;
            }
            for (let j = 0; j < simulations; j++){
                let turn = child.playerTurn;
                child.simulateBoard.board = child.board.cloneBoard();
                let winner = child.simulateBoard.checkForWin();
                while(winner == 0 && child.simulateBoard.AllColumnsFull() == false){
                    let column = Math.floor(Math.random()*7);
                    if (child.simulateBoard.checkIfColumnIsFull(column) == false){
                        child.simulateBoard.dropTile(turn, column);
                        turn = turn * -1;
                        winner = child.simulateBoard.checkForWin();
                    }
                    else{
                        child.invalid == true;
                    }
                }
                if (winner == child.playerTurn){
                    wins+=1;
                }
                if (winner == child.playerTurn*-1){
                    loss+=1;
                }
            }
            child.winRate = (wins*wins)/(simulations*loss);
            console.log(child.winRate);
        }
    }
    
    bestChoice(){
        let max = this.rootNode.children[0].winRate;
        let best = 0;
        for (let i = 1; i < this.rootNode.children.length; i++){
            let child = this.rootNode.children[i];
            if (child.winRate > max){
                max = child.winRate;
                best = i;
            }
        }
        return best;
    }
}

class Node{
    constructor(playerTurn, boardString, parentBoard){
        this.winRate = 0;
        this.invalid = false;
        this.playerTurn = playerTurn;
        this.children = [];
        this.boardString = boardString;
        this.board = parentBoard.clone();
        if (boardString.length > 0){
            this.board.dropTile(playerTurn, Number(boardString[boardString.length-1]));
        }
        this.simulateBoard = this.board.clone();
    }

    initChildren(){
        for (let i = 0; i < 7; i++){
            this.children[i] = new Node(this.playerTurn*-1, this.boardString + "" + i, this.board);
        }
    }
}

