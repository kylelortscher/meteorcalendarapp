if (Meteor.isClient) {
  Template.main.rendered = function(){
    var calendar = $('#calendar').fullCalendar({
      
    })
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
