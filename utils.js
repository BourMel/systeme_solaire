/**
 * init texture and renderer
 **/

function init_texture(mesh, file_name) {
  let renderer = mesh.renderer(true, true, true);
  let texture = Texture2d();
  texture.load("images/" + file_name + ".jpg").then(update_wgl);

  return {
    "texture": texture,
    "renderer": renderer
  };
}

/**
 * Since DISTANCE can change value, changes all the planets distances
 */
function update_distances() {
  mercury_distance = 8*DISTANCE;
  venus_distance = 7*DISTANCE;
  earth_distance = 13*DISTANCE;
  moon_distance = 5*DISTANCE; // reference = earth
  mars_distance = 20*DISTANCE;
  jupiter_distance = 10*DISTANCE;
  saturn_distance = 15*DISTANCE;
  uranus_distance = 17*DISTANCE;
  neptune_distance = 30*DISTANCE;
}

/**
 * set all planets' positions according to timer
 * called in draw_wgl
 * ARGS :
 * solar_system = solar_system view matrix
 */
function set_planets_positions(solar_system) {
  sun_view_matrix = solar_system;

	mercury_view_matrix = mmult(
		solar_system,
		rotateZ(10*ewgl_current_time), // rotation around the sun : const (where to start) + speed
		scale(mercury_size),
		translate(mercury_distance, 1, mercury_size/2), // distance to the sun
    rotateZ(10*ewgl_current_time) // rotate on itself
	);

	venus_view_matrix = mmult(
		solar_system,
		rotateZ(80 + 9*ewgl_current_time),
		scale(venus_size),
		translate(venus_distance, 1, venus_size/2),
    rotateZ(20*ewgl_current_time)
	);

	earth_view_matrix = mmult(
		solar_system,
		rotateZ(60 + 5*ewgl_current_time),
		scale(earth_size),
		translate(earth_distance, 1, earth_size/2),
		rotateZ(42*ewgl_current_time)
	);

	moon_view_matrix = mmult(
		earth_view_matrix, // set earth as reference
		rotateY(20*ewgl_current_time), // rotation around the earth
		scale(moon_size),
		translate(moon_distance, 1, moon_size/2),
		rotateY(42*ewgl_current_time)
	);

	mars_view_matrix = mmult(
		solar_system,
		rotateZ(190 + 0.7*ewgl_current_time),
		scale(mars_size),
		translate(mars_distance, 1, mars_size/2),
		rotateX(3*ewgl_current_time),
		rotateZ(33*ewgl_current_time)
	);

	jupiter_view_matrix = mmult(
		solar_system,
		rotateZ(250 + 3*ewgl_current_time),
		scale(jupiter_size),
		translate(jupiter_distance, 1, jupiter_size/2),
		rotateZ(18*ewgl_current_time)
	);

	saturn_view_matrix = mmult(
		solar_system,
		rotateZ(220 + 1.5*ewgl_current_time),
		scale(saturn_size),
		translate(saturn_distance, 1, saturn_size/2),
		rotateZ(35*ewgl_current_time)
	);

	uranus_view_matrix = mmult(
		solar_system,
		rotateZ(67 + 2.1*ewgl_current_time),
		scale(uranus_size),
		translate(uranus_distance, 1, uranus_size/2),
		rotateX(18*ewgl_current_time)
	);

	neptune_view_matrix = mmult(
		solar_system,
		rotateZ(46 + 1.3*ewgl_current_time),
		scale(neptune_size),
		translate(neptune_distance, 1, neptune_size/2),
		rotateX(21*ewgl_current_time)
	);
}

/**
 * Draw saturn rings
 **/

function drawSaturnRings() {
  // inside circle
  update_uniform('color', 0.6, 0.5, 0.3);
  for(let i=0; i<8; i++) {
    update_uniform('radius', 1.1 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  update_uniform('color', 0.7, 0.6, 0.4);
  for(let i=0; i<20; i++) {
    update_uniform('radius', 1.2 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  // next circle
  update_uniform('color', 0.8, 0.7, 0.6);
  for(let i=0; i<40; i++) {
    update_uniform('color', 0.7 + i*0.005, 0.6 + i*0.005, 0.4  + i*0.005);
    update_uniform('radius', 1.4 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  // outside circle
  for(let i=0; i<20; i++) {
    update_uniform('color', 0.85, 0.75, 0.65 - i*0.01);
    update_uniform('radius', 1.85 + i*0.02);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }
}
