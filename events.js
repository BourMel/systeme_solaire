document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;

    switch(key) {
      case 112: // P
        PAUSE_MODE = !PAUSE_MODE;
        pause_checkbox.checked = PAUSE_MODE;
        break;
      case 105: // I
        INFO_MODE = !INFO_MODE;
        info_checkbox.checked = INFO_MODE;
        break;

      case 43: // +
        if(DISTANCE < 1) {
          DISTANCE += 0.01;
          update_distances();
          draw_wgl();
        }
        break;
      case 45: // -
        if(DISTANCE > 0.08) {
          DISTANCE -= 0.01;
          update_distances();
          draw_wgl();
        }
        break;
      default:
        console.log(key);
        break;
    }
});
