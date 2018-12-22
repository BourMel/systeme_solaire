/** DRAW USER INTERFACE **/

var time_slider;

function drawUserInterface () {
  UserInterface.begin();
  UserInterface.use_field_set('T', "Settings");

  time_slider = UserInterface.add_slider('Adjust Time', 0, 20, 1, update_wgl);
  UserInterface.end_use();
}
