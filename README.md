# Labyrinth2d

## Idea:
After developing Bubble Space Wars I decided to do something different so I had this idea to do a simple game using html/css/javascript and add it to my website that I was developing too.

## Game to do checklist:

1. Create a canvas.
2. Draw a player.
3. Add event listeners to move the player.
4. Draw a map.
5. Place a "door" to the next level.
6. Make player react to the walls.
7. Make start, lose and win pages.
8. Add buttons in the pages to start, retry game etc.
9. Make time limit and display it.

## Building:

1. Created a canvas- specified it is 2 dimensional and specified height and width of it.
2. Changed coordinates so the middle of canvas starts with coordinates (0, 0). I did this the same format as it is on Unity and personally found it easier to work this way. 
3. Made two objects "Player" and "Line" specified properties.
4. Maps are made from lines, all the coordinates are stored in nested array.

> **Note**
> * [x-axis-start, x-axis-end, y-axis-start, y-axis-end, specify line is horizontal or vertical]
> * 'Start' - coordinate number must be lower than 'End'.

5. Start button when pressed it changes visibility of 'gameplay page' to visible and 'start page' to hidden and the time limit is started.
6. Play again button when pressed it changes visibility of 'start page' to visible and the 'win page' is hidden, then it resets all the variables and stops the time limit.
7. Retry button when pressed it changes visibility of 'you lose' page to hidden and 'gameplay page' to visible, and then resets all the variables stops the time limit and starts new one.
8. Update function contains everything that needs to be drawn or checked during the gameplay.
9. Draw map function uses for loop to pull all the coordinates from the array and draws the map.
10. Timer uses setinterval of 1000, time limit is set to 5 minutes.
11. Circle to line collision was done by calculating triangles and finding how far the player is from the line.
12. Finding if the player touches start or the end of the line there is different if statements that check if its true. Player and line collision that is calculated does not check the ends of the line it just checks the distance from the line.
13. Boundaries being checked if the player reaches a 'Wall' his movement is stopped. You have to consider player size so it doesn't go through the 'wall'.
14. Player movement is done by checking event listeners which button is pressed, if you press two or more buttons together only one will register.

## Debugging:

I have been using console.log a lot to check what the code is doing and what kind of numbers I am getting. For example when I wrote circle(Player) and line collision detection I calculated triangles and I had this issue where circle(Player) use to go through the line at some points and I couldn't understand why but eventually I realised that I had to leave the exact number and don't round them. After I did that it resolved that issue.
