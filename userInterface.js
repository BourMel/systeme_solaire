/** DRAW USER INTERFACE **/

var redSlider;
var greenSlider;
var blueSlider;

function drawUserInterface () {
  UserInterface.begin();
  UserInterface.use_field_set('H', "Color");

  redSlider = UserInterface.add_slider('R', 0, 100, 50, update_wgl);
  set_widget_color(redSlider, '#ff0000', '#ffcccc');

  greenSlider = UserInterface.add_slider('G', 0, 100, 50, update_wgl);
  set_widget_color(greenSlider, '#00bb00', '#ccffcc');

  blueSlider = UserInterface.add_slider('B', 0, 100, 50, update_wgl);
  set_widget_color(blueSlider, '#0000ff', '#ccccff');

  UserInterface.end_use();
  UserInterface.add_br();
  mode = UserInterface.add_radio('H', 'Mode', ['points', 'lines', 'both'], 0, update_wgl);
  UserInterface.add_br();
  UserInterface.add_check_box('Animate', false, (c) => {
    if (c) {
      animation = setInterval( () => {
        b += 5;
        update_wgl();
      }, 50);
    } else {
      window.clearInterval(animation);
      animation = null;
    }
  });
  UserInterface.add_br();
  UserInterface.adjust_width();
}
