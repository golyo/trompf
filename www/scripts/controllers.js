angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LessonsCtrl', function($scope, Lessons) {
  $scope.lessonTypes = Lessons.all();
  console.log($scope.lessonTypes);
})

.controller('LessonSettingsCtrl', function($scope, $stateParams, $location, Lessons, Settings) {
  $scope.lesson = Lessons.getDefinition($stateParams.lessonId);
  var generator = Generator[$scope.lesson.id];
  var formTemplate = generator.settingsFields;
  if (formTemplate.length == 0 || formTemplate[formTemplate.length-1].type != "submit") {
    formTemplate.push({
      "type": "submit",
      "model": "submit",
      "label": "Start",
      "class": "submitClass" });
  }
  $scope.formTemplate = formTemplate;
  $scope.formData = Settings.get($scope.lesson.id) || generator.defaultSettings;
  $scope.submitClass="button button-block button-positive";
  $scope.processForm = function() {
    Settings.save($scope.lesson.id, $scope.formData);
    Lessons.generate($scope.lesson.id);
    $location.path('/tab/lessons/do/');
  };
})

.controller('LessonDoCtrl', function($rootScope, $scope, $location, Lessons, Settings) {
  var setActual = function(idx) {
    $scope.actIdx = idx;
    $scope.exercise = $scope.lesson.exercises[idx];
  }
  $scope.lesson = Lessons.getLesson();
	$scope.getChar = function(idx) {
		return String.fromCharCode(97 + idx);
	};
	$scope.prev = function() {
	  setActual($scope.actIdx-1);
	}
	$scope.next = function() {
	  setActual($scope.actIdx+1);
	}
	$scope.finish = function() {
	  $location.path('/tab/lessons/result');
	}
	$scope.select = function(choice) {
    if (!$scope.lesson.multipleAnswers) {
      for (var i=0; i<$scope.exercise.choices.length; i++) {
        $scope.exercise.choices[i].answer = choice.val == $scope.exercise.choices[i].val;
      }
      if ($scope.actIdx+1<$scope.lesson.exercises.length) {
        $scope.next();
      }
    }
	}
	setActual(0);
  $rootScope.startTimer(120, $scope.finish);
})

.controller('LessonResultCtrl', function($scope, $rootScope, Lessons) {
  $scope.lesson = Lessons.getLesson();
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
