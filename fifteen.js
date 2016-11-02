/*
	This JavaScript file specifies the code used to create a webpage that plays the Fifteen Puzzle game.
	
	Additional Feature to be graded: Transitions and Animations
*/

'use strict'; //ensures coding is done in accordance with the JavaScript rules and healthy coding practices

window.onload = function () //upon loading the webpage, the following is executed
{
	var puzzle = document.getElementById("puzzlearea"); //gets and stores the puzzle area, via its id
	var puzzlePieces = puzzle.children; //gets and stores the pieces of the puzzle
	var empty; //declares a varaible to represent the empty square
	var button = document.getElementById("shufflebutton"); //gets and assigns the shuffle button below the puzzle
	var moveable = 'N'; //initialises an array that will be used to determine whether a puzzle piece can be moved

	for (var i = 0; i < puzzlePieces.length; i++) //iterates over the puzzle pieces and sets the 'puzzlepiece' class for each as well as assigns each an id
	{
		puzzleFormat(puzzlePieces[i]);
		idPieces (puzzlePieces[i], i);
	}

	/*
		This function sets the class attribute for the puzzle pieces to the 'puzzlepiece' class
	*/
	function puzzleFormat (ele) 
	{
		ele.setAttribute("class", "puzzlepiece"); 
	}

	/*
		This function assigns an id to each puzzle piece
	*/
	function idPieces (ele, x)
	{
		var row, column;

		//calculates the row and column based on each puzzle pieces' position
		if (x <= 3)
		{
			row = x;
			column = 0;
		}
		else if (x <= 7)
		{
			row = x - 4;
			column = 1;
		}
		else if (x <= 11)
		{
			row = x - 8;
			column = 2;
		}
		else if (x <= 14)
		{
			row = x - 12;
			column = 3;
		}

		ele.setAttribute("id", row + " " + column); //sets the puzzle piece's id based on its position
	}

	/*
		This function aligns the puzzle pieces from left to right, top to bottom, in the correct order
	*/
	function alignPieces () 
	{
		var xValue = '0px'; //initialises the x coordinate to 0 px; used with setting the left value of each puzzle piece
		var yValue = '0px'; //initialises the y coordinate to 0 px; used with setting the top value of each puzzle piece

		for (var i = 0; i < puzzlePieces.length; i++) //iterates over the puzzle pieces and sets the left and top values for each
		{
			setLeft (puzzlePieces[i], xValue);
			setTop (puzzlePieces[i], yValue);

			if (parseInt (xValue, 10) < 300)
			{
				xValue = parseInt (xValue, 10) + 100 + 'px'; //changes x coordonate				
			}
			else //starts new row
			{
				xValue = '0px'; //resets the left value
				yValue = parseInt (yValue, 10) + 100 + 'px'; //changes y coordinate
			}
		}
		empty = ['300px', '300px']; //intiialises empty square's position to the bottom right; ['x coordinate', 'y coordinate']
	}

	/*
		This function sets the left value for each puzzle piece, using the x coordinate
	*/
	function setLeft (ele, x) 
	{
		ele.style.left = x; 
	}

	/*
		This function sets the top value for each puzzle piece, using the y coordinate
	*/
	function setTop (ele, y) 
	{
		ele.style.top = y;
	}

	/*
		This function specifies the portion of the background image to be shown on each puzzle piece. 
		It specifies how the image is initially shown upon starting the game.
	*/
	function setBg () 
	{
		var x = '0px';
		var y = '0px';

		for (var i = 0; i < puzzlePieces.length; i++) //iterates over the puzzle piece and specifies the part of the image to be shown
		{
			puzzlePieces[i].style.backgroundPosition = x + " " + y;

			if (parseInt (x, 10) > -300)
			{
				x = parseInt (x, 10) + -100 + 'px';
			}
			else
			{
				x = '0px';
				y = parseInt (y, 10) + -100 + 'px';
			}			
			
		}
	}

	/*
		This function swaps the position of a puzzle piece with that of the empty sqaure
	*/
	function movePiece (ele, empty, pos)
	{
		var left = coordinates(ele)[0]; //gets and assigns the x coordinate of the puzzle piece to a variable
		var top = coordinates(ele)[1]; //gets and assigns the y coordinate of the puzzle piece to a variable
		
		
		//Animations: puzzle pieces slide in a specific direction depending on their relative position to the empty square
		$(ele).animate ({left: empty[0], top: empty[1]},80); //puzzle pieces slide into positions as they swap places with the empty square

		//assigns the left and top values of the empty square to that of the puzzle piece
		ele.style.left = empty[0]; 
		ele.style.top = empty[1];

		empty = [left, top]; //assigns the left and top value of the ouzzle piece to that of the empty square

		updateEmpty (empty);
	}

	/*
		This function updates the empty square's position with that of the puzzle piece it was swapped with
	*/
	function updateEmpty (ele)
	{
		empty = ele;
	}

	/*
		This function returns a puzzle piece's id
	*/
	function getId (ele)
	{
		return ele.getAttribute ("id");
	}

	/*
		This function returns the coordinates of a puzzle piece.
	*/
	function coordinates (ele)
	{
		return [ele.offsetLeft + 'px', ele.offsetTop + 'px']; //returns x and y coordinates
	}

	/*
		This function determines whether a given puzzle piece can be moved based on its position relative to the empty square.
	*/
	function canMove (ele, empty)
	{
		var mL = [parseInt(empty[0], 10) - 100 + 'px', empty[1]]; //calculates and assigns the coordinates of the puzzle piece that should be to the left of the empty square as an array
		var mT = [empty[0], parseInt(empty[1], 10) - 100 + 'px']; //calculates and assigns the coordinates of the puzzle piece that should be above the empty square as an array
		var mR = [parseInt(empty[0], 10) + 100 + 'px', empty[1]]; //calculates and assigns the coordinates of the puzzle piece that should be to the right of the empty square as an array
		var mB = [empty[0], parseInt(empty[1], 10) + 100 + 'px']; //calculates and assigns the coordinates of the puzzle piece that should be below the empty square as an array

		var response = 'N'; //stores whether the puzzle piece can be moved or not

		if (mL[0] == coordinates(ele)[0] && mL[1] == coordinates(ele)[1]) //checks if the expected coordinates for the left puzzle piece match those of the given puzzle piece
		{
			response = 'Y';
		}
		else if (mT[0] == coordinates(ele)[0] && mT[1] == coordinates(ele)[1]) //checks if the expected coordinates for the puzzle piece above match those of the given puzzle piece
		{
			response = 'Y';
		}
		else if (mR[0] == coordinates(ele)[0] && mR[1] == coordinates(ele)[1]) //checks if the expected coordinates for the right puzzle piece match those of the given puzzle piece
		{
			response = 'Y';
		}
		else if (mB[0] == coordinates(ele)[0] && mB[1] == coordinates(ele)[1]) //checks if the expected coordinates for the uzzle piece below match those of the given puzzle piece
		{
			response = 'Y';
		}

		return response;
	}

	/*
		This function randomly chooses a puzzle piece near to the empty sqUare that can be moved, and swaps its position with that of the empty square.
	*/
	function randomMove ()
	{
		var N = 14;	//upper limit

		var randomIndex = Math.floor (Math.random () * N); //chooses a random number between 0 and 14

		var answer = canMove (puzzlePieces[randomIndex], empty); //checks if the puzzle piece at the random index can be moved

		if (answer == 'Y') //if the puzzle piece can be moved
		{
			movePiece (puzzlePieces[randomIndex], empty); //swaps the puzzle piece with the empty square
		}
		else
		{
			randomMove (); //recursive function: it calls back itself
		}
	}

	/*
		This function randomises the puzzle pieces.
	*/
	function shuffle ()
	{
		for (var i = 0; i < 100; i++) //calls the ranomMove function multiple times
		{
			randomMove ();
		}
	}

	/*
		This function employs event handling. Upon clicking the shuffle button, the puzzle pieces are randomised. It also allows for
		highlighting movable pieces and swapping them with the empty square.
	*/
	button.onclick = function ()
	{
		shuffle (); //randomises the puzzle pieces

		for (var i = 0; i < puzzlePieces.length; i++) //iterates over the puzzle pieces
		{
			puzzlePieces[i].onclick = function () //upon clicking a puzzle piece
			{
				moveable = canMove (this, empty); //checks if the puzzle piece can be oved
			 
				if (moveable == 'Y') //if the puzzle piece can be moved
				{
					movePiece (this, empty, moveable[1]); //swaps the puzzle piece with the empty square
				}

				ifAligned ();
			}	

			puzzlePieces[i].onmouseover = function () //upon hovering over a puzzle piece
			{
				moveable = canMove (this, empty); //checks if the puzzle piece can be moved
				
				if (moveable == 'Y') //if the puzzle piece can be moved
				{
					highlight (this); //highlights the movable puzzle piece 
				}
			}
		}		
	}

	/*
		This function checks whether the puzzle pieces were restored to their correct position. 
		It changes the appearance of the screen if the pieces were re-aligned correctly.
	*/
	function ifAligned ()
	{
		var count = 0; //stores the count of the number of puzzle pieces re-aligned in their correct position
		var max = 15; //number of puzzle pieces

		for (var i = 0; i < puzzlePieces.length; i++) //iterates over the puzzle pieces
		{
			var pos = convertCoordinates (puzzlePieces[i]); //converts puzzle pieces' coordinates into the same format used for their ids

			var id = getId (puzzlePieces[i]);

			if (id == pos)
			{
				count++;
			}

		}

		if (count == max) //if all the puzzle pieces are re-aligned correctly
		{
			closing ();
		}
		
	}

	/*
		This function converts the coordinates of the puzzle piece into the same format used to create
		its id.
	*/
	function convertCoordinates (ele)
	{
		var gps = coordinates (ele); //gets the coordinates of the puzzle piece

		var l = parseInt (gps[0], 10); //left value: x coordinate
		var t = parseInt (gps[1], 10); //top value: y coordinate

		l = l/100;
		t = t/100;

		return l + " " + t;
	}

	/*
		This function specifies the closing animations to be employed when the game is won.
	*/
	function closing ()
	{
		for (var i = 0; i < puzzlePieces.length; i++)
		{
			$(puzzlePieces[i]).animate ({left: -400, top: 0},500); //moves the puzzle pieces offscreen
		}
			$(puzzle).fadeOut (500);
			$(puzzle).css('background-image', 'url("background2.jpg")'); //changes the background of the puzzle
			$(shufflebutton).hide (500);
			$(puzzle).fadeIn (500); //shows the new background once the game is won
	}

	/*
		This function applies the movablepiece class on a puzzle piece that can be moved into the empty square's slot,
		once the mouse hovers over it. However, the class is removed once the mouse no longer hovers over it.
	*/
	function highlight (ele)
	{$(ele).toggleClass ("movablepiece"); //toggles between applying the class or removing
	}

	//execution
	alignPieces ();
	setBg ();
	//all other operations occur when the shuffle button is clicked
}