## Draw & Guess Game
 This repository is a basic Draw & Guess game.
 
 # Demo
 https://eaertdrawguess.herokuapp.com/
 
# Installation
Run Commands:
* npm install
* cd client & npm install
* cd .. & npm start

Inorder to run the game on custom address change SERVER_ADDRESS value at Constants.js.
to run localy change the address to "http://localhost:5000"

# Game Instruction
* Click STAR GAME to start.
* Wait for an opponent.
* First player to join the room start as the drawer.
* Choose a word by difficulty
* Draw and send.
* Drawer becomes a Guesser for next round.
* Guesser will receive the Drawing and will try to guess the word.
* Guesser will end his turn if he succeed or giveup.
* Roles will be switch and the game will keep going on until one of the player leaves.
