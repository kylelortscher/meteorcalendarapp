CalEvent = new Mongo.Collection('calevent');

if (Meteor.isClient) {
  Template.main.rendered = function(){
    var calendar = $('#calendar').fullCalendar({
      dayClick:function(date,allDay,jsEvent,view){
        var calendarEvent = {};
        calendarEvent.start = date;
        calendarEvent.end = date;
        calendarEvent.title = 'New Event';
        calendarEvent.owner = Meteor.userId;
        Meteor.call('saveCalEvent', calendarEvent);
      }
    })
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      'saveCalEvent':function(ce){
        CalEvent.insert(ce)
      }
    })
  });
}
