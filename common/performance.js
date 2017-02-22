global.performance = global.performance || {};
performance.now = (() => {
  return performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    function () {
      return new Date().getTime();
    };
})();