# START THE APP

Run `npm install` then `npm run start` at the root of the directory.

To run tests run `npm run test`.

<br/>
<br/>

# CODE TEST INSTRUCTIONS

Agent 700 is a secret robot which is on a mission to a classified
destination. The robot is operated from base and it takes command in
0’s and 1’s only. The robot reveals its true location (x, y) and other
information only when a secret password is provided.

## Following are the commands

0 1 - Move Forward in the facing direction (has to be 0 &amp; 1 not 1 &amp; 0)
(facing y axis to start with)
0 - rotates in x-axis 90 degrees
1 - rotates in y-axis 90 degrees

Robot has to go through checkpoints to reach the destination, missing a
checkpoint and reaching the destination would alert the enemy and get it
killed and all data would be erased. When a checkpoint is reached robot
sends a message to the base.
Initial position (Base) (0, 0)

Checkpoint1 (5, 5),
Checkpoint 2 (10, 10),
Checkpoint 3 (15, 15).
Destination (20, 20)

Robot has self-destruct capability would be used when its lost, meaning
when it missed or crossed the destination point. ex (21,15), (10, 22), (25,
0) etc. And all data would be erased.

You can set any secret password you like, providing the password robot
would reveal following information.

1. Current X, Y co-ordinates
2. No of checkpoints reached.
3. Distance from Base
4. Distance to Destination.

You can create a UI on browser that you feel is appropriate and simple
to demonstrate this. Alternatively, you can do this on command line.

Use either React or Pure JS to achieve this, we aren’t interested in
reviewing any other JS framework code. Use redux or any other state
management frameworks if required.

We use this submission as a discussion point for the next stage of your
interview should you be successful.

We are interested in seeing an elegant solution with respect to your
experience. On the unit testing, test critical functionality, not 100%.

Sample commands and the new location after the command.
Starting from Base - (0, 0):

- 0 1 0 1 - (0, 2)
- 0 1 0 0 1 - (1, 3)
- 0 1 - (2, 3)
- 0 0 1 - (2, 3)
- 0 1 - (1, 3)
