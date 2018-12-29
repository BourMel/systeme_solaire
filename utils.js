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
