document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;

    switch(key) {
      case 112: // P
        PAUSE_MODE = !PAUSE_MODE;
        break;

      case 39: // right arrow
        // scene_camera.show_scene({"x":0, "y":0, "z":0}, {"x":1, "y":1 ,"z":1});
        scene_camera.set_scene_center(earth.BB);
        console.log(earth);
        // console.log(earth.BB.center);
        console.log("eh");
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
