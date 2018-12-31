"use strict"

/*****************************/
/*****************************/
/*****************************/

function init_wgl()
{
  drawUserInterface();

	// start timer
	if(!PAUSE_MODE) {
		ewgl_continuous_update = true;
	}

	// PROGRAMS
	texture_program = ShaderProgram(textureVertexShader, textureFragmentShader, 'texture_program');
	circle_program = ShaderProgram(circleVertexShader, circleFragmentShader, 'circle_program');
	y_circle_program = ShaderProgram(circleYVertexShader, circleFragmentShader, 'y_circle_program');
	double_texture_program = ShaderProgram(doubleTextureVertexShader, doubleTextureFragmentShader, 'double_texture_program');
	rings_program = ShaderProgram(ringsVertexShader, ringsFragmentShader, 'rings_program');

  // get all planets distances
  update_distances();

	// solar system
	let sun = Mesh.Sphere(SPHERE_PRECISION);
	sun_infos = init_texture(sun, "sun");

	let mercury = Mesh.Sphere(SPHERE_PRECISION);
	mercury_infos = init_texture(mercury, "mercury");

	let venus = Mesh.Sphere(SPHERE_PRECISION);
	venus_infos = init_texture(venus, "venus");

	let moon = Mesh.Sphere(SPHERE_PRECISION);
	moon_infos = init_texture(moon, "moon");

	let mars = Mesh.Sphere(SPHERE_PRECISION);
	mars_infos = init_texture(mars, "mars");

	let jupiter = Mesh.Sphere(SPHERE_PRECISION);
	jupiter_infos = init_texture(jupiter, "jupiter");

	let saturn = Mesh.Sphere(SPHERE_PRECISION);
  let saturn_rings = Mesh.Grid(100);
	saturn_infos = init_texture(saturn, "saturn");
  saturn_infos["rings_renderer"] = saturn_rings.renderer(true, false, true);

	let uranus = Mesh.Sphere(SPHERE_PRECISION);
	uranus_infos = init_texture(uranus, "uranus");

	let neptune = Mesh.Sphere(SPHERE_PRECISION);
	neptune_infos = init_texture(neptune, "neptune");

  // double texturing earth
  earth = Mesh.Sphere(SPHERE_PRECISION);
  earth_infos = {
    "texture": Texture2d(),
    "clouds": Texture2d(
      [gl.TEXTURE_MIN_FILTER, gl.NEAREST],
      [gl.TEXTURE_MAG_FILTER, gl.NEAREST]
    ),
    "renderer": earth.renderer(true, true, true)
  }
  Promise.all([earth_infos["texture"].load("./images/earth.jpg"),
	             earth_infos["clouds"].load("./images/earth_clouds.jpg")]).then( update_wgl );

	scene_camera.show_scene(sun.BB);
}

/*****************************/
/*****************************/
/*****************************/

function draw_wgl()
{
	if(PAUSE_MODE) {
		ewgl_current_time = 0;
	} else {
		ewgl_current_time += time_slider.value*0.01;
	}

	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

  /*************/
  /**POSITIONS**/
  /*************/

	// set the scale for the entire view
	let solar_system = mmult(view_matrix, scale(0.1));
  // set all planets positions
	set_planets_positions(solar_system);

  /****************/
  /**DRAW PLANETS**/
  /****************/

	// SUN
	texture_program.bind();
	update_uniform('projectionMatrix', projection_matrix);

	update_uniform('viewMatrix', sun_view_matrix);
	sun_infos["texture"].bind(0);
	sun_infos["renderer"].draw(gl.TRIANGLES);

	// MERCURY
	update_uniform('viewMatrix', mercury_view_matrix);
	mercury_infos["texture"].bind(0);
	mercury_infos["renderer"].draw(gl.TRIANGLES);

	// VENUS
	update_uniform('viewMatrix', venus_view_matrix);
	venus_infos["texture"].bind(0);
	venus_infos["renderer"].draw(gl.TRIANGLES);

	// MOON
	update_uniform('viewMatrix', moon_view_matrix);
	moon_infos["texture"].bind(0);
	moon_infos["renderer"].draw(gl.TRIANGLES);

	// MARS
	update_uniform('viewMatrix', mars_view_matrix);
	mars_infos["texture"].bind(0);
	mars_infos["renderer"].draw(gl.TRIANGLES);

	// JUPITER
	update_uniform('viewMatrix', jupiter_view_matrix);
	jupiter_infos["texture"].bind(0);
	jupiter_infos["renderer"].draw(gl.TRIANGLES);

	// SATURN
	update_uniform('viewMatrix', saturn_view_matrix);
	saturn_infos["texture"].bind(0);
	saturn_infos["renderer"].draw(gl.TRIANGLES);

	// URANUS
	update_uniform('viewMatrix', uranus_view_matrix);
	uranus_infos["texture"].bind(0);
	uranus_infos["renderer"].draw(gl.TRIANGLES);

	// NEPTUNE
	update_uniform('viewMatrix', neptune_view_matrix);
	neptune_infos["texture"].bind(0);
	neptune_infos["renderer"].draw(gl.TRIANGLES);

	unbind_shader();
	unbind_texture2d();

  /**************************/
  /**DOUBLE TEXTURING EARTH**/
  /**************************/

  double_texture_program.bind();
  update_uniform('viewMatrix', earth_view_matrix);
  update_uniform('projectionMatrix', projection_matrix);
  update_uniform('time', ewgl_current_time/6);

  earth_infos["texture"].bind(0, 'TU0');
  earth_infos["clouds"].bind(1, 'TU1');
  earth_infos["renderer"].draw(gl.TRIANGLES);

  unbind_texture2d();
  unbind_shader();

  /*****************/
  /**DRAW ELLIPSES**/
  /*****************/

	circle_program.bind();
	update_uniform('projectionMatrix', projection_matrix);
	update_uniform('viewMatrix', solar_system);
	update_uniform('color', 255, 255, 255);
	update_uniform('nb', ELLIPSE_PRECISION);
	update_uniform('z_position', 0);

	/**
   * Radius of an ellipse :
	 * Previous planet's size
	 * + (this planet's distance to its reference * its scale)
	 * - (this planet's size/2)
	 */

	// MERCURY
	update_uniform('radius', 1.0 /*sun radius*/ + mercury_distance*0.1 /*sun scale*/ - mercury_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// VENUS
	update_uniform('radius', mercury_size + venus_distance*venus_size - venus_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// EARTH
	update_uniform('radius', venus_size + earth_distance*earth_size - earth_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// MARS
	update_uniform('radius', earth_size + mars_distance*mars_size - mars_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// JUPITER
	update_uniform('radius', mars_size + jupiter_distance*jupiter_size - jupiter_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// SATURN
	update_uniform('radius', jupiter_size + saturn_distance*saturn_size - saturn_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// URANUS
	update_uniform('radius', saturn_size + uranus_distance*uranus_size - uranus_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

	// NEPTUNE
	update_uniform('radius', uranus_size + neptune_distance*neptune_size - neptune_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

  // MOON
  y_circle_program.bind();
  update_uniform('projectionMatrix', projection_matrix);
  update_uniform('viewMatrix', solar_system);
  update_uniform('y_position', moon_size/2);
  update_uniform('color', 255, 255, 255);
  update_uniform('nb', ELLIPSE_PRECISION);
	update_uniform('viewMatrix', earth_view_matrix);
	update_uniform('radius', moon_distance*moon_size);
	gl.drawArrays(gl.LINE_LOOP, 0, ELLIPSE_PRECISION);

  /**************/
  /**DRAW RINGS**/
  /**************/
  rings_program.bind();
  update_uniform('viewMatrix', saturn_view_matrix);
  update_uniform('projectionMatrix', projection_matrix);
  update_uniform('nb', ELLIPSE_PRECISION);

  drawSaturnRings();

  unbind_shader();
  unbind_texture2d();
}

/*****************************/
/*****************************/
/*****************************/

launch_3d();
