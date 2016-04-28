# Last Notes

# Current Todos

1. Should be an icon indicating status that is clickable in the bottom right.  Use SVG and animations.

1. Should be able to gleam red if it wasn't found and gleam green if it is a found match

1. Should be able to insert a new action between a parent and a child.  This makes it easier to nest a bunch of stuff under another.

1. Should be able to drag an action under another.

1. Should know after clicking the link to next button which are valid targets

1. Creating or saving an action should set that for the trigger

1. Recreate the Aurelia documentation in a flow.

1. Have the

1. Ability to select voice

1. Create the introduction in code.

1. Split the app in two - generate flows and run flows
  a. Have the app call the API to seed flows
  a. Create a core attribute on flows indicating it is one anyone can install

1. Use some configuration for determining the right URLs to hit in environments

x. Need to get email set up on the server to pass on the email information.
  x. Need to save user information such as email
  a. Email should contain a link to the current domain

x. Need to have a list of available flows on the server to install
  a. Should be able to start one of those flows somehow
  a. Create an HTTP call command
  a. Make sure only core flows are returned for now

1. Notes
  a. Taking notes - new triggers
    1. new line
    1. new paragraph
    1. new checkbox

1. Should show text of what is being said.

1. Got some cool updates working
  a. Clean up the lint errors
  a. Get tests working again

# Notes Flow commands

1. 'add a note': adds a new note
  x. Create an addNote service method
  x. Create an addNote command
  x. Save the note
    x. Back
1. 'take notes': enters take note status
  a. 'stop taking notes': leaves take note status
  b. '*': recorded to a new note
1. 'read my notes': read all notes
  x. Create a getAllNotes service method
  x. Create a read notes command
1. 'clear my notes': enter clear note status
  x. 'are you sure':
    x. 'yes': delete all notes
      x. Create a clearNotes service method
      x. Create a clear notes command
      x. 'Notes cleared'
        x. Go back
    x. 'no': go back to notes flow root



x. Need to implement save functionality next probably.
  a. Need to be able to get or save matcher somehow (probably by id)

1. Session.js should use the data-store for all setting and getting of collections

1. Be able to switch to a child flow
1. Need to be able to save the root flow and a new flow
  a. All flows and all actions should be persisted in separate collections for now at least

1. Add some tests around face.js with expected behavior


















# Next Todos

1. Need to be able to create a new flow

1. Some of the global actions should be able to be invoked from anywhere
  a. Back
  a. Cancel
  a. List Options
  a. Make these available globally by flagging them as global and having the matcher run through them last
1. Need to add a 'trained' message to the end of the command flow








# Root commands

x. 'start flow': goes to root action of a flow
1. 'change command': change the trigger for a command
x. 'back': goes up one level in current flow or back to root of parent flow
1. 'create command': trains a new command (can be global)
x. 'list options': read all the available triggers
1. 'read {option}': read what a trigger does
1. 'cancel': cancels any action


# Todos

1. When you say change command it should find the matching command and adjust the trigger.  This can be found from the available keys of the current action
1. Perhaps since you can change commands of a flow there should be a source of truth that exists and the user only overrides it

# Flows (apps)

1. Write a blog on gist.run and post it on Reddit
1. You don't actually need the mobile API from what I know just the chrome stuff
1. May not need Electron at all
1. One flow can be a task management tool because everyone can add tasks and then they can pick them up from a list of generated tasks and finish it
1. The product person for example can be driving in and taking notes out of the unit as the person of the day
1. Go in to work and now your task list is your list of behaviors to drive your unit tests
1. The notes are the way you remind yourself what to do for the day
1. You can take the notes while commuting which takes advantage of more of the day
1. There needs to be a better way to keep talking like a continuous loop that restarts once the last one ends.
  a. Maybe that needs to be a separate flow?
  a. The action could be to start listening again and wait for key words to know when the notes are broken up






1. The logger can catch system logs and email the developer when it goes wrong
1. There should be a seed command if no data is present to drop the data in.
