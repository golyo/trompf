var Generator = Generator || {};

GeneratorUtil = {
  rnd : function(max, min) {
  		if (!min) {
  			min = 0;
  		}
  		return min + Math.floor((Math.random() * (max-min)));
  },
  createExerciseChoices : function(settings, result) {
    var choiceNo = settings.choiceNo || 4;
    var choices = GeneratorUtil.rndResults(settings.max, settings.min, result, choiceNo-1);
    var idx = GeneratorUtil.rnd(choiceNo);
    choices.splice(idx, 0, {'val': result, 'isOk': false});
    return {'choices' : choices};
  },
  rndResults : function(max, min, result, no) {
    var r = [];
    var minusNo = Math.min(GeneratorUtil.rnd(no), result/2);
    var act = result;
    for (var i=0; i<minusNo; i++) {
      var act = act-GeneratorUtil.rnd(1,3);
      r.push({'val': act, 'isOk': false});
    }
    var act = result;
    for (var i=0; i<no-minusNo; i++) {
      var act = act+GeneratorUtil.rnd(1,3);
      r.push({'val': act, 'isOk': false});
    }
    return GeneratorUtil.shuffle(r);
  },
  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
};

Generator.Addition = {
  type: "Matek",
  name: "Összeadás",
  defaultSettings: {'min':10, 'max': 20, 'no': 10},
  settingsFields: [ {
          "type": "number",
          "label": "Összeadandók mínimuma",
          "model": "min"
      }, {
          "type": "number",
          "label": "Összeadandók maximuma",
          "model": "max"
      }, {
          "type": "number",
          "label": "Összeadások száma",
          "model": "no"
      }
  ],
  generate: function(settings) {
    var r = GeneratorUtil.rnd(settings.max, settings.min);
    var a = GeneratorUtil.rnd(r);
    var idx = GeneratorUtil.rnd(2);
    var exercise;
    if (idx == 0) {
      exercise = GeneratorUtil.createExerciseChoices(settings, r-a);
      exercise.html = "[] + " + a + " = " + r;
    } else if (idx == 1) {
      exercise = GeneratorUtil.createExerciseChoices(settings, r-a);
      exercise.html = a + " + [] = " + r;
    } else {
      exercise = GeneratorUtil.createExerciseChoices(settings, r);
      exercise.html = a + " + " + (r-a) + " = []";
    }
    return exercise;
  }
};

Generator.Subtraction = {
  type: "Matek",
  name: "Kivonás",
  defaultSettings: {'min':10, 'max': 20, 'no': 10},
  settingsFields: [ {
          "type": "number",
          "label": "Kivonandók mínimuma",
          "model": "min"
      }, {
          "type": "number",
          "label": "Kivonandók maximuma",
          "model": "max"
      }, {
          "type": "number",
          "label": "Kivonások száma",
          "model": "no"
      }
  ],
  generate: function(settings) {
    var r = GeneratorUtil.rnd(settings.max, settings.min);
    var a = GeneratorUtil.rnd(r);
    var idx = GeneratorUtil.rnd(2);
    var exercise;
    if (idx == 0) {
      exercise = GeneratorUtil.createExerciseChoices(settings, r);
      exercise.html = "[] - " + a + " = " + (r-a);
    } else if (idx == 1) {
      exercise = GeneratorUtil.createExerciseChoices(settings, r-a);
      exercise.html = r + " - [] = " + a;
    } else {
      exercise = GeneratorUtil.createExerciseChoices(settings, r-a);
      exercise.html = r + " - " + a + " = []";
    }
    return exercise;
  }
};

Generator.Multiple = {
  type: "Matek",
  name: "Szorzás",
  defaultSettings: {'min':1, 'max': 10, 'no': 10},
  settingsFields: [ {
          "type": "number",
          "label": "Szorzandók mínimuma",
          "model": "min"
      }, {
          "type": "number",
          "label": "Szorzandók maximuma",
          "model": "max"
      }, {
          "type": "number",
          "label": "Szorzások száma",
          "model": "no"
      }
  ],
  generate: function(settings) {
    var a = GeneratorUtil.rnd(settings.max, settings.min);
    var b = GeneratorUtil.rnd(settings.max, settings.min);
    var idx = GeneratorUtil.rnd(2);
    var exercise;
    if (idx == 0) {
      exercise = GeneratorUtil.createExerciseChoices(settings, a);
      exercise.html = "[] * " + b + " = " + (a*b);
    } else if (idx == 1) {
      exercise = GeneratorUtil.createExerciseChoices(settings, b);
      exercise.html = a + " * [] = " + (a*b);
    } else {
      exercise = GeneratorUtil.createExerciseChoices(settings, a*b);
      exercise.html = a + " * " + b + " = []";
    }
    return exercise;
  }
};

Generator.Divide = {
  type: "Matek",
  name: "Osztás",
  defaultSettings: {'min':1, 'max': 10, 'no': 10},
  settingsFields: [ {
          "type": "number",
          "label": "Osztók mínimuma",
          "model": "min"
      }, {
          "type": "number",
          "label": "Osztók maximuma",
          "model": "max"
      }, {
          "type": "number",
          "label": "Osztások száma",
          "model": "no"
      }
  ],
  generate: function(settings) {
    var a = GeneratorUtil.rnd(settings.max, settings.min);
    var b = GeneratorUtil.rnd(settings.max, settings.min);
    var idx = GeneratorUtil.rnd(2);
    var exercise;
    if (idx == 0) {
      exercise = GeneratorUtil.createExerciseChoices(settings, a*b);
      exercise.html = "[] / " + b + " = " + a;
    } else if (idx == 1) {
      exercise = GeneratorUtil.createExerciseChoices(settings, b);
      exercise.html = (a*b) + " / [] = " + a;
    } else {
      exercise = GeneratorUtil.createExerciseChoices(settings, b);
      exercise.html = (a*b) + " / " + a + " = []";
    }
    return exercise;
  }
};
