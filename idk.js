let EpW = 2
let EpB = 2
// Inserting the Images
function insertImage() {

    document.querySelectorAll('.box').forEach(image => {
  
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
  
            }
            
            else {
  
                image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
  }
  insertImage()
  //En Passant
  function EnPassant(){
    
  }
  
  
  //Coloring
  
  function coloring() {
    const color = document.querySelectorAll('.box')
  
    color.forEach(color => {
        
        //Get box's ID as a int
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup
  
        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(240, 201, 150)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(100, 75, 43)'
        }
        // if (a % 2 == 0) {
        //     color.style.backgroundColor = 'seagreen'
        // }
        // if (a % 2 !== 0) {
        //     color.style.backgroundColor = 'lime'
        // }
  
    })
  }
  coloring()
  
  
  
  
  //function to not remove the same team element
  
  function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {
  
            document.querySelectorAll('.box').forEach(i2 => {
  
                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {
  
  
                    greenText = i2.innerText
  
                    pinkText = i1.innerText
  
                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()
  
                    //Get box's ID as a int
                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup
  
                    if (a % 2 == 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(100, 75, 43)'
                    }
  
                    // if (pinkColor == greenColor) {
                    //     i2.style.backgroundColor = 'rgb(253, 60, 60)'
                    // }
                }
            })
        }
    })
  }
  
  
  
  tog = 1
  whiteCastleChance=true
  blackCastleChance=true
  
  document.querySelectorAll('.box').forEach(item => {
  
  
  
    item.addEventListener('click', function () {
        console.log(EpW)
        // To delete the opposite element
  
        //Increase toggle var (next turn)
        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1
            if (tog % 2 == 0) EpB ++
            else EpW ++
        }
        else if (item.style.backgroundColor == 'aqua' && item.innerText.length == 0) {
            tog = tog + 1
            if (tog % 2 == 0) EpB ++
            else EpW ++
        }
        else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
  
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'pink') {

                    //Get box's ID as a int
                    tempId = item.id
                    arr = Array.from(tempId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup

                    pinkId = i.id
                    pinkText = i.innerText
                    document.getElementById(pinkId).innerText = ''

                    //Delete opposite pawn if take with EnPassant
                    if(EpW == 1 && item.innerText == 'temp'){
                        document.getElementById(`b${a + 100}`).innerText = ''
                    }

                    if(EpB == 1 && item.innerText == 'temp'){
                        document.getElementById(`b${a - 100}`).innerText = ''
                    }

                    item.innerText = pinkText
                    
                    //Promote to queen with pawn take
                    if (pinkText == 'Wpawn' && aup == 800) {
                        document.getElementById(`b${a}`).innerText = 'Wqueen'
                        document.getElementById(pinkId).innerText = ''  
                        coloring()
                        insertImage()

                    }
                    else if (pinkText == `Bpawn` && aup == 100) {

                        document.getElementById(`b${a}`).innerText = 'Bqueen'
                        document.getElementById(pinkId).innerText = ''
                        coloring()
                        insertImage()

                    }

                    coloring()
                    insertImage()

                    //Play meme sound
                    let beat = new Audio('bonk_7zPAD7C.mp3');
                    beat.play()
                    tog = tog + 1
                    if (tog % 2 == 0) EpB ++
                    else EpW ++
                    let slap = document.getElementById("slap")
                    slap.src = "slap.mp4"
                    setTimeout(function(){slap.src = ""}, 800)
  
                }
            })
        }
  
  
        //Get peice(clicked)'s ID as a int
        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup
  
  
        // Function to display the available paths for all pieces
  
        function whosTurn(toggle) {
  
            // PAWN
  
            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'pink'

                //If White turn
                if (tog % 2 !== 0 && aup < 800) {

                    //If Wpawn at starting position
                    if (aup == 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                        if (aup == 200 && document.getElementById(`b${a + 200}`).innerText.length == 0) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                        }
                    }
  
                    //Else
                    if (aup !== 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    }
  
                    //If Wpawn can take
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                    }
  
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
  
                    }
                    // if (aup == 800) {
                    //     document.getElementById(`b${a}`).innerText = 'Wqueen'
                    //     coloring()
                    //     insertImage()
                    // }
                    // if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green' 
                    // }
  
                    // if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
  
                    // }
                }
                
                //If Black turn
                //If Bpawn at starting position
                if (tog % 2 == 0 && aup > 100) {
  
                    //If Bpawn at starting position
                    if (aup == 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                        if (aup == 700 && document.getElementById(`b${a - 200}`).innerText.length == 0) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                        }
                    }
  
                    //Else
                    if (aup !== 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                    }

                    //If Bpawn can take
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
  
                    }
                    
                }
  
                
            }
  
            // KING
  
            if (item.innerText == `${toggle}king`) {
  
                //If `${toggle}king`(whoTurn(king)) not at right columme
                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'
  
                //If `${toggle}king`(whoTurn(king)) not at left columme    
                }
                if (aside > 1) {
  
                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
                }

                //If `${toggle}king`(whoTurn(king)) not at top row
                if (aup < 800) {
  
                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                }

                //If `${toggle}king`(whoTurn(king)) not at bottom row
                if (aup > 100) {
  
                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                }
                
                //If `${toggle}king`(whoTurn(king)) not at bottom right corner
                if (aup > 100 && aside < 8) {
  
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                }

                //If `${toggle}king`(whoTurn(king)) not at bottom left corner
                if (aup > 100 && aside > 1) {
  
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                }

                //If `${toggle}king`(whoTurn(king)) not at top right corner
                if (aup < 800 && aside < 8) {
  
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                }

                //If `${toggle}king`(whoTurn(king)) not at top left corner
                if (aup < 800 && aside > 1) {
  
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                }
                
                //If White can short castle
                if(whiteCastleChance==true && a==105 && document.getElementById('b106').innerText== '' && document.getElementById('b107').innerText== '' && document.getElementById('b108').innerText== 'Wrook'){
                    document.getElementById(`b107`).style.backgroundColor = 'aqua'
  
                }

                //If White can long castle
                if(whiteCastleChance==true && a==105 && document.getElementById('b104').innerText== '' && document.getElementById('b103').innerText== '' && document.getElementById('b102').innerText== '' && document.getElementById('b101').innerText== 'Wrook'){
                    document.getElementById(`b103`).style.backgroundColor = 'aqua'
  
                }

                //If Black can short castle
                if(blackCastleChance==true && a==805 && document.getElementById('b806').innerText== '' && document.getElementById('b807').innerText== '' && document.getElementById('b808').innerText== 'Brook'){
                    document.getElementById(`b807`).style.backgroundColor = 'aqua'
  
                }

                //If Black can long castle
                if(blackCastleChance==true && a==805 && document.getElementById('b804').innerText== '' && document.getElementById('b803').innerText== '' && document.getElementById('b802').innerText== '' && document.getElementById('b801').innerText== 'Brook'){
                    document.getElementById(`b803`).style.backgroundColor = 'aqua'
  
                }
  
                item.style.backgroundColor = 'pink'
  
            }
  
  
            // ROOK
  
            if (item.innerText == `${toggle}rook`) {
  
                for (let i = 1; i < 9; i++) {
                    
                    //If rook can move vertically up
                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If rook can move vertically down
                for (let i = 1; i < 9; i++) {
  
                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If rook can move horizontally right
                for (let i = 1; i < 9; i++) {
  
                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If rook can move horizontally left
                for (let i = 1; i < 9; i++) {
  
                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                item.style.backgroundColor = 'pink'
            }
  
  
  
            // BISHOP
  
            if (item.innerText == `${toggle}bishop`) {
  
                //If bishop can go up right
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If bishop can go down right
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If bishop can go up left
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
  
                }
  
                //If bishop can go down left
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
  
  
                item.style.backgroundColor = 'pink'
  
            }
  
  
  
            // QUEEN
  
            if (item.innerText == `${toggle}queen`) {
  
                //If queen can go vertically up
                for (let i = 1; i < 9; i++) {
  
                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                //If queen can go vertically down
                for (let i = 1; i < 9; i++) {
  
                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If queen can go horizontally right
                for (let i = 1; i < 9; i++) {
  
                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If queen can go horizontally left
                for (let i = 1; i < 9; i++) {
  
                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If queen can go up right
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If queen can go down right
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
                //If queen can go up left
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
  
                }
  
                //If queen can go down left
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
  
  
  
                item.style.backgroundColor = 'pink'
  
            }
  
            // KNIGHT
  
            if (item.innerText == `${toggle}knight`) {
  
                //If knight can move to lower up right
                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
                }

                //If knight can move higher down right
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
                }

                //If knight can move to higher up right
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
                }

                //If knight can move to higher up left
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
                }

                //If knight can move to lower up left
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
                }

                //If knight can move higher down left
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
                }

                //If knight can move lower down right
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
                }

                //If knight can move lower down left
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
                }
  
                item.style.backgroundColor = 'pink'
  
            }
        }
  
  
        // Toggling the turn
  
        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }
        reddish()
    })
  
  })
  

// winning
//Run the winning func
const won = setInterval(ifWin, 1)

function ifWin(){
    numOfKings = 0
    
    
    document.querySelectorAll('.box').forEach(win => {
        if (win.innerText == 'Wking' || win.innerText == 'Bking') {
            numOfKings += 1
        }

    })

    //If there is only one King on the board
    if (numOfKings == 1) {

        //Play meme vid
        let beat = new Audio('bomman-tao-la-bo-chung-m.mp3');
        beat.play()
        let dame = document.getElementById("dame")
        dame.style.display = "block"
        dame.src = "dame.mp4"
        dame.playbackRate = 1.65

        //Stop the winning func
        clearInterval(won)
    }
}

  
  // Moving the element
  document.querySelectorAll('.box').forEach(item => {
  
    item.addEventListener('click', function () {
  
  
        if (item.style.backgroundColor == 'pink') {
            pinkId = item.id
            pinkText = item.innerText

            //Get the peice(cliked)'s ID starting position as int
            getId = item.id
            arr = Array.from(getId)
            arr.shift()
            startSide = eval(arr.pop())
            arr.push('0')
            startUp = eval(arr.join(''))
            start = startSide + startUp
  
            document.querySelectorAll('.box').forEach(item2 => {
  
                item2.addEventListener('click', function () {

                    //Get the box(cliked)'s ID as int
                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup
                    
                    //If that box is moveable
                    if (item2.style.backgroundColor == 'green' && item2.innerText.length == 0){
                        //delete En Passant piece after the valid move
                        document.querySelectorAll('.box').forEach(image => {
                            if(image.innerText == `temp` && EpW !== 1){
                                image.innerText = ``
                            } 
                            else if(image.innerText == `temp` && EpB !== 1){
                                image.innerText = ``
                            } 
                        })

                        //Creat En passant element(W)
                        if (pinkText == `Wpawn` && aup == 400 ) {
                            if(aside > 1){
                                if(document.getElementById(`b${a - 1}`).innerText == `Bpawn`){
                                    EpW = 1
                                }
                            }
                            else if(aside < 8){
                                if(document.getElementById(`b${a + 1}`).innerText == `Bpawn`){
                                    EpW = 1
                                }
                            }
                            if(EpW == 1){
                                document.getElementById(pinkId).innerText = ''
                                item2.innerText = pinkText
                                insertImage()
                                pinkText = `temp`
                                document.getElementById(`b${a - 100}`).innerHTML = `${pinkText} <img class='EnPass' src="${pinkText}.png" alt="">`          
                                coloring()
                                EpW = 1 
                            }
                            else {
                                document.getElementById(pinkId).innerText = ''
                                item2.innerText = pinkText
                                coloring()
                                insertImage()
                            }                                
                        }

                        //Creat En passant element(B)
                        else if (pinkText == `Bpawn` && aup == 500 ) {
                            if(aside > 1){
                                if(document.getElementById(`b${a - 1}`).innerText == `Wpawn`){
                                    EpB = 1
                                }
                            }
                            else if(aside < 8){
                                if(document.getElementById(`b${a + 1}`).innerText == `Wpawn`){
                                    EpB = 1
                                }
                            }
                            if(EpB == 1){
                                document.getElementById(pinkId).innerText = ''
                                item2.innerText = pinkText
                                insertImage()
                                pinkText = `temp`
                                document.getElementById(`b${a + 100}`).innerHTML = `${pinkText} <img class='EnPass' src="${pinkText}.png" alt="">`          
                                coloring()
                                EpB = 1
                            }
                            else {
                                document.getElementById(pinkId).innerText = ''
                                item2.innerText = pinkText
                                coloring()
                                insertImage()
                            }
                        }
                        
                        //Promote Wpawn to queen
                        else if (pinkText == `Wpawn` && aup == 800) {
                            console.log(pinkText, " ", a, " ", aside, " ", aup)
                            document.getElementById(`b${a}`).innerText = 'Wqueen'
                            document.getElementById(pinkId).innerText = ''  
                            coloring()
                            insertImage()
  
                        }

                        //Promote Bpawn to queen
                        else if (pinkText == `Bpawn` && aup == 100) {
  
                            document.getElementById(`b${a}`).innerText = 'Bqueen'
                            document.getElementById(pinkId).innerText = ''
                            coloring()
                            insertImage()
  
                        }

                        //Rewrite the innerText of the box we moved to
                        else {
  
                            document.getElementById(pinkId).innerText = ''
                            item2.innerText = pinkText
                            coloring()
                            insertImage()
                        }

                        //Play meme sound
                        let beat = new Audio('bonk_7zPAD7C.mp3');
                        beat.play()                     
  
                    }
                    
                    //Castle long for white
                    else if (item2.style.backgroundColor == 'aqua') {
                        if(item2.id=='b103'){
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b102').innerText = ''
                            document.getElementById('b103').innerText = 'Wking'
                            document.getElementById('b104').innerText = 'Wrook'
                            document.getElementById('b105').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()

                            //Play meme sound
                            let beat = new Audio('bonk_7zPAD7C.mp3');
                            beat.play()
                            
                        }

                        //Castle short for white
                        else if(item2.id=='b107'){
                            document.getElementById('b105').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                            document.getElementById('b107').innerText = 'Wking'
                            document.getElementById('b108').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()

                            //Play meme sound
                            let beat = new Audio('bonk_7zPAD7C.mp3');
                            beat.play()
  
                        }

                        //Castle long for black
                        else if(item2.id=='b803'){
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b802').innerText = ''
                            document.getElementById('b803').innerText = 'Bking'
                            document.getElementById('b804').innerText = 'Brook'
                            document.getElementById('b805').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()

                            //Play meme sound
                            let beat = new Audio('bonk_7zPAD7C.mp3');
                            beat.play()
                            
                        }

                        //Castle short for black
                        else if(item2.id=='b807'){
                            document.getElementById('b805').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                            document.getElementById('b807').innerText = 'Bking'
                            document.getElementById('b808').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()

                            //Play meme sound
                            let beat = new Audio('bonk_7zPAD7C.mp3');
                            beat.play()
  
                        }
                    }
  
                })
            })
  
        }
  
    })
  
  })
  
  
  
  
  
  
  // Prvents from selecting multiple elements
  z = 0
  document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green' && ee.style.backgroundColor !== 'aqua') {
            coloring()
        }
    })
  })
  //Timer
  const startMinutes = 10;
  let timeW = startMinutes * 60
  let timeB = startMinutes * 60

  const countdownElB = document.getElementById("countdownB");
  const countdownElW = document.getElementById("countdownW");

  //Auto run timer
  const Btime = setInterval(updateCountdownB, 1000)
  const Wtime = setInterval(updateCountdownW, 1000)

  //Update timer for black
  function updateCountdownB(){
    let minutesB = Math.floor(timeB / 60)
    let secondsB = timeB % 60

    //Delete black king if out of time
    if(minutesB == 0 && secondsB == 0){
        document.querySelectorAll('.box').forEach(i => {
            if(i.innerText == 'Bking'){
                document.getElementById(i.id).innerText = ''
            }
        })
        clearInterval(Btime)
    }

    //Print time
    secondsB = secondsB < 10 ? '0' + secondsB : secondsB
    minutesB = minutesB < 10 ? '0' + minutesB : minutesB

    countdownElB.innerHTML = `${minutesB}:${secondsB}`

    if (tog % 2 == 0) {timeB--}
  }

  //Update timer for white
  function updateCountdownW(){
    let minutesW = Math.floor(timeW / 60)
    let secondsW = timeW % 60

    //Delete white king if out of time
    if(minutesW == 0 && secondsW == 0){
        document.querySelectorAll('.box').forEach(i => {
            if(i.innerText == 'Wking'){
                document.getElementById(i.id).innerText = ''
            }
        })
        clearInterval(Wtime)
    }

    //Print time
    secondsW = secondsW < 10 ? '0' + secondsW : secondsW
    minutesW = minutesW < 10 ? '0' + minutesW : minutesW
    
    countdownElW.innerHTML = `${minutesW}:${secondsW}`

    if (tog % 2 !== 0) {timeW--}
  }
