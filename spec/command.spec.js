const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  //test 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  //test 2
  it("constructor sets command type", function() {
     let command = new Command("MODE_CHANGE");
     expect(command.commandType).toBe("MODE_CHANGE");
  });

  //test 3
  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command('MODE_CHANGE','LOW_POWER');
    expect(command.value).toBe('LOW_POWER');
 });

});


// This test checks that the constructor in the Command class correctly sets the commandType 
// property in the new object.

//     Without editing command.js, it contains the correct code. Run npm test to 
//     verify that the first and second tests both pass.
//     You do not need to use expect().toThrow().
//     You may not need to know the specific types of commands to write this test.