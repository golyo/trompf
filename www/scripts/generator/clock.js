var Generator = Generator || {};

Generator.Clock = {
  defaultSettings: function() {
    return {'no': 10};
  },
  generate: function(settings) {
    var hour = Generator.Util.rnd(24);
    var minute = Generator.Util.rnd(60);

    return {};
  }
};
