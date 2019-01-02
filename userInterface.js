/** DRAW USER INTERFACE **/

var time_slider;
var text_initialised = false;

function drawUserInterface() {
  UserInterface.begin();
  UserInterface.use_field_set('T', "Settings");

  time_slider = UserInterface.add_slider('Adjust Time', 0, 20, 1, update_wgl);
  UserInterface.end_use();
}

/**
 * Adds all informations on the screen
 */
function displayInformations() {
  sun_text = Mesh.Grid(80);
  mercury_text = Mesh.Grid(80);
  venus_text = Mesh.Grid(80);
  earth_text = Mesh.Grid(80);

  sun_text_r = sun_text.renderer(true, false, true);
  mercury_text_r = mercury_text.renderer(true, false, true);
  venus_text_r = mercury_text.renderer(true, false, true);
  earth_text_r = earth_text.renderer(true, false, true);

  sun_text_t = Texture2d();
  mercury_text_t = Texture2d();
  venus_text_t = Texture2d();
  earth_text_t = Texture2d();

  Promise.all([
    sun_text_t.load("./images/sun_text.jpg"),
    mercury_text_t.load("./images/mercury_text.jpg"),
    venus_text_t.load("./images/venus_text.jpg"),
    earth_text_t.load("./images/earth_text.jpg")
  ]).then(update_wgl);

  text_initialised = true;
  update_wgl();
}

/**
 * Update all informations positions
 */
function updateInformations(view_matrix, projection_matrix) {

  if(!text_initialised) {
    displayInformations();
  }

  text_program.bind();
	update_uniform('projectionMatrix', projection_matrix);

  // SUN
  update_uniform('viewMatrix', mmult(
    solar_system,
    translate(0, 0, 1.5),
    rotateX(90),
    scale(earth_size)
  ));

	sun_text_t.bind(0);
	sun_text_r.draw(gl.TRIANGLES);

  // MERCURY
  update_uniform('viewMatrix', mmult(
    solar_system,
		rotateZ(10*ewgl_current_time),
		scale(mercury_size),
		translate(mercury_distance, 1, mercury_size/2), // same as mercury, except its rotation
    translate(0, 1, 2),
    rotateX(90)
  ));

	mercury_text_t.bind(0);
	mercury_text_r.draw(gl.TRIANGLES);


  // VENUS
  update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(80 + 9*ewgl_current_time),
    scale(venus_size),
    translate(venus_distance, 1, venus_size/2), // same as venus, except its rotation
    translate(0, 1, 2),
    rotateX(90)
  ));

	venus_text_t.bind(0);
	venus_text_r.draw(gl.TRIANGLES);

  // EARTH
	update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(60 + 5*ewgl_current_time),
		scale(earth_size),
		translate(earth_distance, 1, earth_size/2), // same as earth, except its rotation
    translate(0, 1, 2),
    rotateX(90)
  ));

	earth_text_t.bind(0);
	earth_text_r.draw(gl.TRIANGLES);

  unbind_shader();
	unbind_texture2d();
}
