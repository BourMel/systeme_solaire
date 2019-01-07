/** DRAW USER INTERFACE **/

function drawUserInterface() {
  UserInterface.begin();

  time_slider = UserInterface.add_slider('Adjust Time', 0, 20, 1, update_wgl);
  UserInterface.add_br();

  UserInterface.add_label("Toggle with 'I' key");
  info_checkbox = UserInterface.add_check_box('Display infos', INFO_MODE, () => {
		INFO_MODE = !INFO_MODE;
	});
  UserInterface.add_br();

  UserInterface.add_label("Toggle with 'P' key");
  pause_checkbox = UserInterface.add_check_box('Pause', PAUSE_MODE, () => {
		PAUSE_MODE = !PAUSE_MODE;
	});

  let distances = document.createElement("p");
  distances.style.whiteSpace = "normal";
  distances.innerHTML = "To change planets' distances, use '+' and '-' keys";
  distances.innerHTML += "<br/>Change focus with 'space' key. Current focus is : ";

  focus = document.createElement("b");
  focus.innerHTML = FOCUS_LIST[FOCUS];

  distances.append(focus);
  UserInterface.par[0].append(distances);
}

/**
 * Adds all informations on the screen
 */
function displayInformations() {
  sun_text = Mesh.Grid(80);
  mercury_text = Mesh.Grid(80);
  venus_text = Mesh.Grid(80);
  earth_text = Mesh.Grid(80);
  mars_text = Mesh.Grid(80);
  jupiter_text = Mesh.Grid(80);
  saturn_text = Mesh.Grid(80);
  uranus_text = Mesh.Grid(80);
  neptune_text = Mesh.Grid(80);

  sun_text_r = sun_text.renderer(true, false, true);
  mercury_text_r = mercury_text.renderer(true, false, true);
  venus_text_r = mercury_text.renderer(true, false, true);
  earth_text_r = earth_text.renderer(true, false, true);
  mars_text_r = earth_text.renderer(true, false, true);
  jupiter_text_r = earth_text.renderer(true, false, true);
  saturn_text_r = earth_text.renderer(true, false, true);
  uranus_text_r = earth_text.renderer(true, false, true);
  neptune_text_r = earth_text.renderer(true, false, true);

  sun_text_t = Texture2d();
  mercury_text_t = Texture2d();
  venus_text_t = Texture2d();
  earth_text_t = Texture2d();
  mars_text_t = Texture2d();
  jupiter_text_t = Texture2d();
  saturn_text_t = Texture2d();
  uranus_text_t = Texture2d();
  neptune_text_t = Texture2d();

  Promise.all([
    sun_text_t.load("./images/sun_text.jpg"),
    mercury_text_t.load("./images/mercury_text.jpg"),
    venus_text_t.load("./images/venus_text.jpg"),
    earth_text_t.load("./images/earth_text.jpg"),
    mars_text_t.load("./images/mars_text.jpg"),
    jupiter_text_t.load("./images/jupiter_text.jpg"),
    saturn_text_t.load("./images/saturn_text.jpg"),
    uranus_text_t.load("./images/uranus_text.jpg"),
    neptune_text_t.load("./images/neptune_text.jpg"),
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
    rotateZ(5*ewgl_current_time),
    translate(sun_size + mercury_distance, 0, 0), // same as mercury, except its rotation
    translate(0, 0, 2),
    rotateX(90),
    scale(mercury_size * 2)
  ));

	mercury_text_t.bind(0);
	mercury_text_r.draw(gl.TRIANGLES);

  // VENUS
  update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(80 + 6*ewgl_current_time),
		translate(sun_size + venus_distance, 0, 0), // same as venus
    translate(0, 0, 2),
    rotateX(90),
    scale(venus_size),
  ));

	venus_text_t.bind(0);
	venus_text_r.draw(gl.TRIANGLES);

  // EARTH
	update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(60 + 5*ewgl_current_time),
		translate(sun_size + earth_distance, 0, 0), // same as earth
    translate(0, 0, 2),
    rotateX(90),
    scale(earth_size),
  ));

	earth_text_t.bind(0);
	earth_text_r.draw(gl.TRIANGLES);

  // MARS
	update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(190 + 0.7*ewgl_current_time),
		translate(sun_size + mars_distance, 0, 0), // same as mars
    translate(0, 0, 1.5),
    rotateX(90),
    scale(mars_size),
  ));

	mars_text_t.bind(0);
	mars_text_r.draw(gl.TRIANGLES);

  // JUPITER
	update_uniform('viewMatrix', mmult(
    solar_system,
		rotateZ(250 + 3*ewgl_current_time),
		translate(sun_size + jupiter_distance, 0, 0), // same as jupiter
    translate(0, 0, 4),
    rotateX(90),
    scale(jupiter_size * 0.7)
  ));

	jupiter_text_t.bind(0);
	jupiter_text_r.draw(gl.TRIANGLES);

  // SATURN
	update_uniform('viewMatrix', mmult(
    solar_system,
    rotateZ(220 + 1.5*ewgl_current_time),
		translate(sun_size + saturn_distance, 0, 0), // same as saturn
    translate(0, 0, 2),
    rotateX(90),
    scale(0.6)
  ));

	saturn_text_t.bind(0);
	saturn_text_r.draw(gl.TRIANGLES);

  // URANUS
	update_uniform('viewMatrix', mmult(
    solar_system,
		rotateZ(67 + 2.1*ewgl_current_time),
		translate(sun_size + uranus_distance, 0, 0), // same as uranus
    translate(0, 0, 2.5),
    rotateX(90),
    scale(uranus_size)
  ));

	uranus_text_t.bind(0);
	uranus_text_r.draw(gl.TRIANGLES);

  // NEPTUNE
	update_uniform('viewMatrix', mmult(
    solar_system,
		rotateZ(46 + 1.3*ewgl_current_time),
		translate(sun_size + neptune_distance, 0, 0), // same as neptune
    translate(0, 0, 2),
    rotateX(90),
    scale(neptune_size * 0.8),
  ));

	neptune_text_t.bind(0);
	neptune_text_r.draw(gl.TRIANGLES);

  unbind_shader();
	unbind_texture2d();
}
