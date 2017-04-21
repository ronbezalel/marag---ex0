EventEmitter = require('events');
eventsConfige = require('./eventsConfige.js').eventsConfige.events;
moment = require('moment');

exports.SoccerPlayer = class SoccerPlayer extends EventEmitter {

	constructor(name) {
	   super();
       this.medals = 0;
       this.playerName = name;
       this.description = [];

       var now = moment().format('YYYY-MM-DD HH:mm');
       var subDesc = `A Soccer player created - ${name} at ${now}`;
       console.log(subDesc);

       this.description.push(subDesc);

       this.on(eventsConfige.ADD, function(){
   			this.addDesc(this);
       });

       this.on(eventsConfige.DECREASE, function(){
   			this.decreaseDesc(this);
       });

       this.on(eventsConfige.DECREASE_ERROR, this.decreaseError);
   }

   	decreaseError(){
   		this.description.push('Cant have negetive medals');
   	}

	addMedals(medalsToAdd) {
		console.log(`Add ${medalsToAdd} medals`);
		this.medals += medalsToAdd;
		this.emit(eventsConfige.ADD);
	}

	decreaseMedals(medalsToDecrease) {
		console.log(`Try to decrease ${medalsToDecrease} medals`);
		if((this.medals - medalsToDecrease) < 0){
			console.log(`Cant decrease ${medalsToDecrease} medals`);
			this.emit(eventsConfige.DECREASE_ERROR);
		}
		else{
			console.log(`Success to decrease ${medalsToDecrease} medals`);
			this.medals -= medalsToDecrease;
			this.emit(eventsConfige.DECREASE);
		}
	}

	addDesc(player){
		this.pushDesc('added', player);
	}

	decreaseDesc(player){
		this.pushDesc('decreased', player);
	}

	pushDesc(action, player){
		var subDesc = `${player.playerName} (soccer player) ${action} medals, total medals so far: ${player.medals}`;
		this.description.push(subDesc);
	}
}

