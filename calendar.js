CalEvent = new Mongo.Collection('calevent');

if (Meteor.isClient) {
  Template.main.rendered = function(){
    var calendar = $('#calendar').fullCalendar({
      dayClick:function(date,allDay,jsEvent,view){
        var calendarEvent = {};
        calendarEvent.start = date;
        calendarEvent.end = date;
        calendarEvent.title = 'New Event';
        calendarEvent.owner = Meteor.userId();
        Meteor.call('saveCalEvent', calendarEvent);
      },
      events:function(start,end,callback){
        var calEvents = CalEvent.find({}, {reactive:false}).fetch();
        callback(calEvents);
      }
    }).data().fullCalendar;
    Deps.autorun(function(){
      CalEvent.find().fetch();
      if(calendar){
        calendar.refetchEvents();
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
