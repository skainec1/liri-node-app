# liri-node-app

The liri node application is an app that takes in user input regarding music artist, a song, or a movie, and returns info based on their query

There are four unique commands a user can input that tell the app which api to query

concert-this (for concerts)
spotify-this-song (for songs)
movie-this (for movies)
do-what-it-says (???)

in order to run these commands you must:
    1. open the files in VS code
    2. open the VS code terminal
    3. change directory to the liri-node-app folder
    4. install the node packages for the required modules
        "npm install axios" for example

after the proper modules are installed, you can run commands by typing 
    node liri concert-this <your-artist-here>
    node liri spotify-this-song <your-song-here>
    node liri movie-this <your-movie-here>
    node liri do-what-it-says <any-text-here>

