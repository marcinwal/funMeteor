PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){

  console.log("hello Client");



  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({},{sort: {score: -1,name: 1}});
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer){
        return "selected";
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });
  
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
    },
    'click .increament': function () {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer,{$inc: {score:5}});
    },
    'click .decrement': function () {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer,{$inc: {score:-5}});
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      console.log('submited form');
      console.log(event.type);
    }
  });

}
if(Meteor.isServer){
  console.log("hello Server")
}



