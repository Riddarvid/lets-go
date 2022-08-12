# Homepage for the Let's Go app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODO

- Fix final game logic:
  - The same game state should not be allowed twice in a row.
  - The same game state should not be allowed six times or more during the game.
  - White should receive a handicap. This should be set when creating a new game.
  - A player should be able to pass. This also has to do with the game ending.
- Display the number of captured stones. Store this in the DB.
- Remove secrets from code. How to do this?
- Add functionality for creating a new game.
- Add a detectOpponentMove function to reduce the amount of data needed to be fetched. Should use turn number.
- Add zoom buttons.
- Display "your turn/opponent's turn" instead of black/white.
- Mark the latest placed stone in some way.
- Show where a stone will be placed if the player were to click.
- Consider hosting via AWS amplify instead of EC2.
- Keep track of the number of captured stones. Display this.
- Points should be calculated automatically.
- Terraform or similar should be used to automatically provision the infrastructure.
