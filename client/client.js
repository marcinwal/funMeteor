
  console.log("I am running on the client");

  Meteor.subscribe('thePlayers');


  Template.leaderboard.helpers({
    'player': function(){
      var currentUserId = Meteor.userId();
      // return PlayersList.find({createdBy:currentUserId},{sort: {score: -1,name: 1}});
      // changing thanks to subscription
      return PlayersList.find({},{sort:{score: -1,name: 1}});
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
      Meteor.call('modifyPlayerScore',selectedPlayer,5)
    },
    'click .decrement': function () {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore',selectedPlayer,-5)
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData',selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var currentUserId = Meteor.userId();
      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData',playerNameVar);
    }
  });