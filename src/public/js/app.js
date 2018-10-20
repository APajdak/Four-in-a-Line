document.addEventListener('DOMContentLoaded', ()=>{
    const socket = io();

    let data = {
        user: document.querySelector('#user').innerHTML,
        room: document.querySelector('#room').innerHTML
    }

    document.querySelector('#sendMessage').addEventListener('submit', sendMessage);
    let colors = document.querySelector('#coins').children;
    (function(){
        for (let i = 0; i < colors.length; i++) {
            colors[i].addEventListener('click', function(){
                data.color = this.id;
                socket.emit('join', {
                    user: data.user,
                    room: data.room,
                    color: this.id
                });

                this.parentNode.parentNode.close();
            })
            
        }
    })();
    function scrollChatWindow(){
        document.querySelector('#chat-window').scrollTop = document.querySelector('#chat-window').scrollHeight;
    }
    function sendMessage(e){
        e.preventDefault();
        socket.emit('message', {
           message: document.querySelector('#message').value,
           user: data.user,
           room: data.room,
           color: data.color
        });
        document.querySelector('#message').value = "";
    }

    socket.on('message', data=>{
        let div = document.createElement('div');
        div.classList.add(`msg`, `${data.color}-msg`);
        let h4 = document.createElement('h4');
        h4.innerText = data.from;
        let span = document.createElement('span');
        span.innerText = data.msg;

        div.appendChild(h4);
        div.appendChild(span);
        let chat = document.querySelector('#chat-window');
        chat.appendChild(div);
        scrollChatWindow()
    })



})


// class fourInALine{
//     constructor(){
//         this.board = document.querySelector('#board');
//         this.rows = 6;
//         this.cols = 7;
//         this.generateBoard();
//         this.addEvents();
//     }

//     generateBoard(){
//         for (let i = 1; i <= this.rows; i++){
//             let row = document.createElement('div');
//             row.classList.add('row');
            
//             this.board.appendChild(row);
//             for (let j = 1; j <= this.cols; j++){
//                 let col = document.createElement('div');
//                 col.classList.add('col', 'white');
//                 col.dataset.row = i;
//                 col.dataset.col = j;
//                 row.appendChild(col);
//             }
//         }
//     }

//     bottomCell(col){
//         let cols = document.querySelectorAll(`[data-col="${col}"]`);

//         for (let i = cols.length - 1; i >= 0; i--) {
//             let cell = cols[i];
//             if (cell.classList.contains('white')){
//                 return cell;
//             }
//         }
//         return null;
//     }

//     addEvents(){
//         let columns = document.querySelectorAll('.white');
//         let that = this;
//         let lastCell;
//         for (let i = 0; i < columns.length; i++) {
            
//             columns[i].addEventListener('mouseenter', function(){
//                 lastCell = that.bottomCell(this.dataset.col);
//                 if(lastCell){
//                     lastCell.classList.add("grey");
//                 }
//             });

//             columns[i].addEventListener('mouseleave', function(){
//                 lastCell = that.bottomCell(this.dataset.col);
//                 if(lastCell){
//                     lastCell.classList.remove("grey");
//                 }
                
//             });

//             columns[i].addEventListener('click', function(){
//                 lastCell = that.bottomCell(this.dataset.col);
//                 if(lastCell){
//                     lastCell.classList.add("black");
//                     lastCell.classList.remove("white");
//                     socket.emit('hello', {row: this.dataset.row, col: this.dataset.col});
//                 } 
//             });
//         }
//     }
// }
// let game = new fourInALine();

// socket.on('siema', (data)=>{
//     console.log("hey");
//     console.log(data);
// })


// window.addEventListener('beforeunload', (e)=>{
//     e.preventDefault();
//     e.returnValue = '';
// });