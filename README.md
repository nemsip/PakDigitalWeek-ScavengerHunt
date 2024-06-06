# Digital Week 2024 Scavenger Hunt

Welcome to Digital Week 2024! 
This project is meant to be a cool looking presentation for the interactive quiz questions in the school-wide Scavenger Hunt Event.

The site can be live previewed online, synced to the changes of this repo [HERE](https://pakscavengerhunt.netlify.app/).

## Features

NOTE: This section is basicly a TODO for now.

- **Terminal-like Interface**: The project uses HTML, CSS, and JavaScript to create a terminal-like interface. This interface is designed to mimic a stereotypical vintage terminal. It was inspired by Blooket's Cryptohack interface, using the same way to achieve that look. I won't call it stealing because they stole it from a random codepen first.
- 
- **Interactiveness**: The quiz is interactive. The questions and instructions are shown with animations done natively in css and js, which will hopefully make it immersive and engaging for the little time the players will be interacting with the website.


- **Sound Design**: The project (will) also incorporates custom composed sound design to enhance the user experience and make it more emersive. This will have an ambient background track that plays at the title screen, then techie sounds will play during the main quesion unveiling and instruction process. (I'm planning to do a "Your next mission, should you choose to accept it, is to blah blah" thing for instructions bit.)

## How It Works

1. **Initial Setup**: When the page loads, users see the title screen. All dynamic elements in this page will loop seamlessly as to be shown on the screen for a while as we wait for players to arrive at our location. The interface has an ambient BGM track with a blinking prompt to press enter to begin the quiz.

2. **Starting the Quiz**: When pressing enter, the title, subtitle, and prompt fade out, and the console output is displayed. This output mimics a terminal session, with each line of text appearing one after the other to simulate the installation of a package. For the output, I yoinked some random package installation output and changed the name of the base deb file (in kali linux, to rub in the "this is peak nerd week").

==== ***TODO STARTS HERE*** ====

3. **Quiz Questions**: The quiz will start with the console output going away to show a matrix rain type thing in the background, while an animation of characters being shuffled into place to "generate"
 the question(s). The quesion will then be visible for the user to answer.

4. **Hint to the Next Stall**: After the user answers the question, the question disappears, then a new (unplanned) animation reveals the hint to find the next question of the scavenger hunt somewhere else in the school.

## Tech Used

- **HTML**: The project uses HTML to structure the content.

- **CSS**: Custom CSS is used to style the terminal interface, including the color scheme, some animations, and fonts.

- **JavaScript**: JavaScript is used to handle the interactive elements of the quiz, such as most of the larger animations and the cues for sound design.

## Getting Started

Coming soon :/

## Contributing

Contributions to the Scavenger Hunt Quiz project are welcome, as long as you and your changes have been cleared by Wallace or a teacher associated with the Digital Council.

## License

This project is licensed under Apache 2.0. See the `LICENSE` file for more details.
