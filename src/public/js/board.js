document.addEventListener('DOMContentLoaded', ()=>{
    let color = 'red';
    let board = document.querySelector('#bgBoard');
    (function generateBoard(){
        for (let i = 1; i <= 6; i++){
            let row = document.createElement('div');
            row.classList.add('row');
            
            board.appendChild(row);
            for (let j = 1; j <= 7; j++){
                let col = document.createElement('div');
                col.classList.add('cell', 'white', 'col');
                col.dataset.row = i;
                col.dataset.col = j;
                row.appendChild(col);
            }
        }
    })();
    function updateOptions(){
        let options = [];
        let elems = document.querySelectorAll(`[data-row="1"].white`);
        for (let i = 0; i < elems.length; i++) {
            options.push(elems[i].dataset.col)
        }
        return options
    }
    
    function getRandomCol(){
        let options = updateOptions();
        let randomCol = Math.floor(Math.random() * options.length);
        let bottom = bottomCell(options[randomCol]);
        animateDrop(options[randomCol])
        bottom.classList.remove("white");
    }

    function bottomCell(col){
        let cols = document.querySelectorAll(`[data-col="${col}"]`);

        for (let i = cols.length - 1; i >= 0; i--) {
            let cell = cols[i];
            if (cell.classList.contains('white')){
                return cell;
            }
        }
        return null;
    }

    function animateDrop(col){
        let cols = document.querySelectorAll(`[data-col="${col}"].white`);
        let colsLength = document.querySelectorAll(`[data-col="${col}"].white`).length;
        let counter = 0;

        let anim = setInterval(function(){
            if(counter < colsLength){
                if(counter == 0){
                    cols[counter].classList.add(`coin-${color}`);
                    counter++;
                }else{
                    cols[counter -1].classList.remove(`coin-${color}`);
                    cols[counter].classList.add(`coin-${color}`);
                    counter++;
                }
            }else{
                clearInterval(anim);
                if(color == 'red'){
                    color = 'yellow';
                }else{
                    color = 'red';
                }
                if(document.querySelectorAll(`[data-row="1"].white`).length){
                    getRandomCol();
                }
            }

        }, 100);
    }
    getRandomCol();
    document.querySelector('a').addEventListener('click', function(e){
        if(!document.querySelector('input').value){
            e.preventDefault();
            return;
        }else{
            document.querySelector('a').setAttribute('href', `/rooms/${document.querySelector('input').value}`)
        }
    })
})

