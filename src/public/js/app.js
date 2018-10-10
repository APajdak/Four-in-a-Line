const socket = io();

class fourInALine{
    constructor(){
        this.board = document.querySelector('#board');
        this.rows = 6;
        this.cols = 7;
        this.generateBoard();
        this.addEvents();
    }

    generateBoard(){
        for (let i = 1; i <= this.rows; i++){
            let row = document.createElement('div');
            row.classList.add('row');
            
            this.board.appendChild(row);
            for (let j = 1; j <= this.cols; j++){
                let col = document.createElement('div');
                col.classList.add('col', 'white');
                col.dataset.row = i;
                col.dataset.col = j;
                row.appendChild(col);
            }
        }
    }

    bottomCell(col){
        let cols = document.querySelectorAll(`[data-col="${col}"]`);

        for (let i = cols.length - 1; i >= 0; i--) {
            let cell = cols[i];
            if (cell.classList.contains('white')){
                return cell;
            }
        }
        return null;
    }

    addEvents(){
        let columns = document.querySelectorAll('.white');
        let that = this;
        let lastCell;
        for (let i = 0; i < columns.length; i++) {
            
            columns[i].addEventListener('mouseenter', function(){
                lastCell = that.bottomCell(this.dataset.col);
                if(lastCell){
                    lastCell.classList.add("grey");
                }
            });

            columns[i].addEventListener('mouseleave', function(){
                lastCell = that.bottomCell(this.dataset.col);
                if(lastCell){
                    lastCell.classList.remove("grey");
                }
                
            });

            columns[i].addEventListener('click', function(){
                lastCell = that.bottomCell(this.dataset.col);
                if(lastCell){
                    lastCell.classList.add("black");
                    lastCell.classList.remove("white");
                    socket.emit('hello', {row: this.dataset.row, col: this.dataset.col});
                } 
            });
        }
    }
}
let game = new fourInALine();

socket.on('siema', (data)=>{
    console.log("hey");
    console.log(data);
})


window.addEventListener('beforeunload', (e)=>{
    e.preventDefault();
    e.returnValue = '';
})
