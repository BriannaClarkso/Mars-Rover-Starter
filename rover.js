const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
   //  position is a number representing the rover’s position.
    this.position = position;
    if(!position) {
      throw Error("Rover position required.");}
    this.mode = "NORMAL";
    this.generatorWatts = 110;

   }


   receiveMessage(message) {
      // console.log(message);
      let response = {
         message: message.name,
         results:[]
      };


      for(let i = 0; i < message.commands.length; i++){
         
      
      if(message.commands[i].commandType === 'MOVE'){
         if(this.mode === 'LOW_POWER'){
         response.results.push({
            completed: false
         });
         } else {
            response.results.push({completed: true});
            this.position = message.commands[i].value;
         };

      } else if (message.commands[i].commandType === 'STATUS_CHECK'){
         response.results.push({
            completed: true,
            roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
         });

      } else if (message.commands[i].commandType === 'MODE_CHANGE'){
      
            response.results.push({completed: true});
            this.mode = message.commands[i].value;
   }
   
}

return response;

}
}



// let commands = [new Command ('STATUS_CHECK'), new Command ('MOVE')];
// let message = new Message('Test 10', commands);
// let rover = new Rover(98382);   
//    //  let respo = rover.receiveMessage(message);
// console.log(rover.receiveMessage(message));



module.exports = Rover;