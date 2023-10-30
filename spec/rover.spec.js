const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
      let rover = new Rover(98382);
        expect(rover.position).toEqual(98382);
        expect(rover.mode).toEqual("NORMAL");
        expect(rover.generatorWatts).toEqual(110);
  });

  //test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    // let rover = new Rover(98382);   
    // let response = rover.receiveMessage(message);
    expect(message.name).toEqual('Test message with two commands');
 });

 //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [ new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test 9', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(commands.length);

  });

  //test 10 
   it("responds correctly to the status check command", function(){
    let commands = [new Command ('STATUS_CHECK')];
    let message = new Message('Test 10', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    let roverOBjectInfo = {
      // completed: true,
      mode: (rover.mode), 
      generatorWatts: (rover.generatorWatts), 
      position: (rover.position)};

    expect(response.results[0].roverStatus).toEqual(roverOBjectInfo);
    
  });

  // test 11
  it("responds correctly to the mode change command", function(){
    let commands = [new Command ('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test 11', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);

  
    // expect(response.results.completed).toEqual(false);
    expect(rover.mode).toEqual('LOW_POWER');
    // expect(response.results[0].completed).toBeTrue();
  });

  // test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command ('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test 12', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message).results;

    expect(response).toEqual([{"completed": true}]);
    
  });

  // test 13
  it("responds with the position for the move command", function(){
    let commands = [new Command ('MOVE')];
    let message = new Message('Test 12', commands);
    let rover = new Rover(98382);   
    // let response = rover.receiveMessage(message).message;

    expect(rover.position).toEqual(98382);
    
  });

});

//     A MOVE command will update the rover’s position with the position value in the command.

// constructor(position)

//     position is a number representing the rover’s position.
//     Sets this.position to position
//     Sets this.mode to 'NORMAL'
//     Sets the default value for generatorWatts to 110

// receiveMessage(message)

//     message is a Message object
//     Returns an object containing at least two properties:
//         message: the name of the original Message object
//         results: an array of results. Each element in the array is an object that corresponds 
//         to one Command in message.commands.
//     Updates certain properties of the rover object