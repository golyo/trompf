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

.factory('Lessons', function(Settings) {
  var _types;
  var initTypes = function() {
    if (!_types) {
      console.log("init Types");
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
      _types = [];
      for (var key in typesMap) {
        _types.push({"type" : key, "lessons":typesMap[key] });
      }
    }
  };
  return {
    all: function() {
      initTypes();
      return _types;
    },
    getDefinition: function(id) {
      initTypes();
      for (var i=0; i<_types.length; i++) {
        var t = _types[i];
        for (var j=0; j<t.lessons.length; j++) {
          var g = t.lessons[j];
          if (g.id==id) {
            return g;
          }
        }
      }
      return null;
    },
    getLesson: function(id) {
      var generator = Generator[id];
      if (generator) {
        var settings = Settings.get(id) || generator.defaultSettings;
        var lesson = {"id" : generator.id, "type": generator.type, "name" : generator.name, exercises: []};
        for (var i=0; i<settings.no; i++) {
          lesson.exercises.push(generator.generate(settings));
        }
        return lesson;
      }
    }
  };
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

