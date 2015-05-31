PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  console.log("hello Client");

  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    }

  });
  


}
if(Meteor.isServer){
  console.log("hello Server")
}



