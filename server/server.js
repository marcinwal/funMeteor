  console.log("hello Server")

  Meteor.publish('thePlayers',function(){
    var currentUserId = this.userId;
    // console.log(Meteor.userId());
    return PlayersList.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      console.log('currentUserId:'+currentUserId);
      console.log('currentUserId from this:'+this.userId)
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer){
      var currentUserId = Meteor.userId();
      PlayersList.remove({_id: selectedPlayer,createdBy: currentUserId});
    },
    'modifyPlayerScore': function(selectedPlayer,scoreValue){
      var currentUserId = Meteor.userId();
      PlayersList.update({_id:selectedPlayer,createdBy:currentUserId},
                         {$inc:{score: scoreValue}})
    }
  });