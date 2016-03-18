# Find a Classroom
A smart web app that tells you which classrooms are free at a given time.

#### Note
This app is made for students at Marianopolis College ONLY

## What it does?
Need an empty classroom to chill with friends or do homework? "Find a Classroom" got your back. With a single click, "Find a Classroom" will display all available classrooms at the given moment!

### Frontend
* Send current time to the server -> eg. GET /api?time=4:40
* Display server's response on the DOM

### Backend
* According to the time given by the client:
  * Returns a list of classrooms currently available
  * Returns a list of classrooms that will be available in under 30 minutes
* Each classroom object contains the amount of time left.
