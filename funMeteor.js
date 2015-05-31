PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){

  console.log("hello Client");



  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer){
        return "selected";
      }
    }
  });
  
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
    },
    'click .increament': function () {
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    }
  });

}
if(Meteor.isServer){
  console.log("hello Server")
}



