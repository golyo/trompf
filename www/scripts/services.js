angular.module('starter.services', ['ngCookies'])

.factory('Settings', function($cookieStore) {
  return {
    get: function(key) {
      return $cookieStore.get('trompf_' + key);
    },
    save: function(key, settings) {
      return $cookieStore.put('trompf_', settings);
    }
  };
})

.factory('Selected', function($cookieStore) {
  return {
    get: function(key) {
      return $cookieStore.get('trompf_' + key);
    },
    save: function(key, settings) {
      return $cookieStore.put('trompf_', settings);
    }
  };
})

.factory('Lessons', function(Settings) {
  var Lessons = {
    selectedLesson : null,
    types : [],
    initialize : function() {
      var typesMap = {};
      for (var key in Generator) {
        var g = Generator[key];
        var impl = typesMap[g.type];
        if (!impl) {
          impl = [];
          typesMap[g.type] = impl;
        }
        impl.push({"name" : g.name, "id" : key});
      }
      Lessons.types = [];
      for (var key in typesMap) {
        Lessons.types.push({"type" : key, "lessons":typesMap[key] });
      }
    },
    all : function() {
      console.log("getAll")
      return Lessons.types;
    },
    getDefinition : function(id) {
      for (var i=0; i<Lessons.types.length; i++) {
        var t = Lessons.types[i];
        for (var j=0; j<t.lessons.length; j++) {
          var g = t.lessons[j];
          if (g.id==id) {
            return g;
          }
        }
      }
      return null;
    },
    generate : function(id) {
      var generator = Generator[id];
      if (generator) {
        var settings = Settings.get(id) || generator.defaultSettings;
        var lesson = {"id" : id, "type": generator.type, "name" : generator.name, "multipleAnswers" : generator.multipleAnswers, exercises: []};
        for (var i=0; i<settings.no; i++) {
          lesson.exercises.push(generator.generate(settings));
        }
        Lessons.selectedLesson = lesson;
        return lesson;
      }
    },
    getLesson: function() {
      return Lessons.selectedLesson;
    },
    getResult: function() {
      var successNo = 0;
      for (var i=0; i<Lessons.selectedLesson.exercises.length; i++) {
        var ex = Lessons.selectedLesson.exercises[i];
        var success = true;
        for (var j=0; j<ex.choices.length; j++) {
          success = success && (ex.choices[i].answer==ex.choices[i].isOk);
        }
        if (success) {
          successNo++;
        }
      }
      return {
        "successNo": successNo,
        "failedNo":failedNo
      }
    }
  };
  Lessons.initialize();
  return Lessons;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

