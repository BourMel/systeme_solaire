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
  mercury_distance = 10*DISTANCE; // 70 000 km
  venus_distance = 15*DISTANCE; // 108 000 km
  earth_distance = 30*DISTANCE; // 149 597 870 km
  moon_distance = 5*DISTANCE; // reference = earth
  mars_distance = 40*DISTANCE; // 249 000 000 km
  jupiter_distance = 55*DISTANCE; // 778 000 000 km
  saturn_distance = 70*DISTANCE; // 1 427 000 000 km
  uranus_distance = 90*DISTANCE; // 2 869 000 000 km
  neptune_distance = 120*DISTANCE; // 4 497 000 000 km
}

/**
 * set all planets' positions according to timer
 * called in draw_wgl
 * ARGS :
 * solar_system = solar_system view matrix
 */
function set_planets_positions(solar_system) {
  sun_view_matrix = mmult(
    solar_system,
    rotateZ(7*ewgl_current_time)
  );

  stars_view_matrix = solar_system;

	mercury_view_matrix = mmult(
    solar_system,
    rotateZ(5*ewgl_current_time), // rotation around the sun : const (where to start) + speed
    translate(sun_size + mercury_distance, 0, 0), // distance to the sun
    rotateZ(10*ewgl_current_time) // rotate on itself
	);

	venus_view_matrix = mmult(
		solar_system,
		rotateZ(80 + 6*ewgl_current_time),
		translate(sun_size + venus_distance, 0, 0),
    rotateZ(20*ewgl_current_time)
	);

	earth_view_matrix = mmult(
		solar_system,
		rotateZ(60 + 5*ewgl_current_time),
		translate(sun_size + earth_distance, 0, 0),
		rotateZ(42*ewgl_current_time)
	);

	moon_view_matrix = mmult(
		earth_view_matrix, // set earth as reference
		rotateY(10*ewgl_current_time), // rotation around the earth
		translate(earth_size + moon_distance, 0, 0),
		rotateY(42*ewgl_current_time)
	);

	mars_view_matrix = mmult(
		solar_system,
		rotateZ(190 + 0.7*ewgl_current_time),
		translate(sun_size + mars_distance, 0, 0),
		rotateZ(33*ewgl_current_time)
	);

	jupiter_view_matrix = mmult(
		solar_system,
		rotateZ(250 + 3*ewgl_current_time),
		translate(sun_size + jupiter_distance, 0, 0),
		rotateZ(18*ewgl_current_time)
	);

	saturn_view_matrix = mmult(
		solar_system,
		rotateZ(220 + 1.5*ewgl_current_time),
		translate(sun_size + saturn_distance, 0, 0),
		rotateZ(35*ewgl_current_time)
	);

	uranus_view_matrix = mmult(
		solar_system,
		rotateZ(67 + 2.1*ewgl_current_time),
		translate(sun_size + uranus_distance, 0, 0),
		rotateX(-18*ewgl_current_time)
	);

	neptune_view_matrix = mmult(
		solar_system,
		rotateZ(46 + 1.3*ewgl_current_time),
		translate(sun_size + neptune_distance, 0, 0),
		rotateZ(21*ewgl_current_time)
	);
}

/**
 * set camera center according to FOCUS value
 * called in draw_wgl
 * all matrix values come from the planets matrix
 */
function choose_camera_focus() {
  let focus = null;

  switch(FOCUS_LIST[FOCUS]) {
    case "sun":
      focus = mmult(
        translate(0, 0, 0)
      );
      break;
    case "mercury":
      focus = mmult(
        rotateZ(5*ewgl_current_time),
        translate(sun_size + mercury_distance, 0, 0)
      );
      break;
    case "venus":
      focus = mmult(
        rotateZ(80 + 6*ewgl_current_time),
        translate(sun_size + venus_distance, 0, 0)
      );
      break;
    case "earth":
      focus = mmult(
        rotateZ(60 + 5*ewgl_current_time),
    		translate(sun_size + earth_distance, 0, 0)
      );
      break;
    case "mars":
      focus = mmult(
        rotateZ(190 + 0.7*ewgl_current_time),
    		translate(sun_size + mars_distance, 0, 0),
      );
      break;
    case "jupiter":
      focus = mmult(
        rotateZ(250 + 3*ewgl_current_time),
    		translate(sun_size + jupiter_distance, 0, 0),
      );
      break;
    case "saturn":
      focus = mmult(
        rotateZ(220 + 1.5*ewgl_current_time),
        translate(sun_size + saturn_distance, 0, 0),
      );
      break;
    case "uranus":
      focus = mmult(
        rotateZ(67 + 2.1*ewgl_current_time),
        translate(sun_size + uranus_distance, 0, 0),
      );
      break;
    case "neptune":
      focus = mmult(
        rotateZ(46 + 1.3*ewgl_current_time),
        translate(sun_size + neptune_distance, 0, 0),
      );
      break;
    }

    if(focus != null) {
      scene_camera.set_scene_center(
        focus.vecmult(Vec4(0, 0, 0, 1))
      );
    }
}

/**
 * Draw saturn rings
 **/

function drawSaturnRings() {
  update_uniform('viewMatrix', saturn_view_matrix);

  // inside circle
  update_uniform('color', 0.6, 0.5, 0.3);
  for(let i=0; i<8; i++) {
    update_uniform('radius', 1.8 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  update_uniform('color', 0.7, 0.6, 0.4);
  for(let i=0; i<20; i++) {
    update_uniform('radius', 1.9 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  // next circle
  update_uniform('color', 0.8, 0.7, 0.6);
  for(let i=0; i<40; i++) {
    update_uniform('color', 0.7 + i*0.005, 0.6 + i*0.005, 0.4  + i*0.005);
    update_uniform('radius', 2.1 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  // outside circle
  for(let i=0; i<20; i++) {
    update_uniform('color', 0.85, 0.75, 0.65 - i*0.01);
    update_uniform('radius', 2.6 + i*0.02);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }
  for(let i=0; i<10; i++) {
    update_uniform('radius', 3 + i*0.02);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }
}


/**
 * Draw uranus rings
 **/

function drawUranusRings() {
  update_uniform('viewMatrix', uranus_view_matrix);

  // inside circle
  update_uniform('color', 0.6, 0.7, 0.7);
  for(let i=0; i<4; i++) {
    update_uniform('radius', 1.5 + i*0.01);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

  // middle
  update_uniform('color', 0.65, 0.65, 0.7);
  for(let i=0; i<3; i++) {
    update_uniform('radius', 1.7 + i*0.13);
    gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);
  }

}
