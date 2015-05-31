PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  console.log("hello Client");

  Template.leaderboard.player = function(){
    return "Some test text";
  }


}
if(Meteor.isServer){
  console.log("hello Server")
}



