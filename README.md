# Labyrinth2d

## Idea:
After developing Bubble Space Wars I decided to do something different so I had this idea to do a simple game using html/css/javascript and add it to my website that I was developing too.

## Game to do checklist:

1. Draw a player.
2. Add event listeners to move the player.
3. Draw a map.
4. Place a "door" to the next level.
5. Make player react to the walls.
6. Make start, lose and win pages.
7. Add buttons in the pages to start, retry game etc.
8. Make time limit and display it.

## Building:

1. Created a canvas specified it's 2D and height and width of it.
2. Changed coordinates so the middle of canvas starts with coordinates (0, 0) I did this because in Unity it's like that so for me it was easier if it was that way.
3. Made two objects "Player" and "Line" specifield properties.
4. Maps are made from lines all the coordinates are stored in nested arrays 
* line coordinates:
* [x-start, x-end, y-start, y-end, line is horizontal or vertical]

5. Start button when pressed it change visibility of 'gameplay page' to visible and 'start page' to hidden and the time limit is started.
6. Play again button when pressed it changes visibility of 'start page' to visible and you 'win page' hidden then it reset all the variables and stops the time limit.
7. Retry button when pressed it changes visibility of 'you lose' page to hidden and 'gameplay page' to visible resets all the variable stops the time limit and starts new one.
8. Update function contains everything that needs to be drawn or checked durring the gameplay.
9. Draw map function uses for loop to pull all the coordinates from the array and draws the map.
10. Timer uses setinterval of 1000, time limit is set to 5 minutes.
11. Circle to line collision was done by calculating triangles and finding how far player is from the line.
12. Finding if player touches the start or the end of the line there is different if statement that check that because player and line collision that are calculated does't check the ends of the line it just checks the middle.
13. Player movement is done by checking event listeners which button is pressed if you press two or more buttons together only one going to work. 

## Debugging:

I been using console.log a lot to check what is the code doing and what kind of numbers I am getting. For exhample when I wrote circle line collision detection I calculate triangles and I had this issue were circle use to go thru the line at some points I could't understand why but eventually I realised that I had to leave full numbers and don't round them after I did that it no longer had that issue.
