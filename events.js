document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;

    switch(key) {
      case 112: // P
        PAUSE_MODE = !PAUSE_MODE;
        break;

      case 43: // +
        if(DISTANCE < 1) {
          DISTANCE += 0.01;
          draw_wgl();
        }
        break;
      case 45: // -
        if(DISTANCE > 0.8) {
          DISTANCE -= 0.01;
          draw_wgl();
        }
        break;
      default:
        console.log(key);
        break;
    }
});
