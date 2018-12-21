"use strict"

var simple_program = null;
var circle_program = null;

let sun_infos = null;
let mercury_infos = null;
let venus_infos = null;
let earth_infos = null;
let moon_infos = null;
let mars_infos = null;
let jupiter_infos = null;
let saturn_infos = null;
let uranus_infos = null;
let neptune_infos = null;

// sphere precision
let precision = 200;

/*****************************/
/*****************************/
/*****************************/

function init_wgl()
{
  // drawUserInterface();

	// start timer
	ewgl_continuous_update = true;

	// PROGRAMS
	simple_program = ShaderProgram(simpleVertexShader, simpleFragmentShader, 'simple_program');
	circle_program = ShaderProgram(circleVertexShader, circleFragmentShader, 'circle_program');

	// solar system
	let sun = Mesh.Sphere(precision);
	sun_infos = init_texture(sun, "sun");

	let mercury = Mesh.Sphere(precision);
	mercury_infos = init_texture(mercury, "mercury");

	let venus = Mesh.Sphere(precision);
	venus_infos = init_texture(venus, "venus");

	let earth = Mesh.Sphere(precision);
	earth_infos = init_texture(earth, "earth");

	let moon = Mesh.Sphere(precision);
	moon_infos = init_texture(moon, "moon");

	let mars = Mesh.Sphere(precision);
	mars_infos = init_texture(mars, "mars");

	let jupiter = Mesh.Sphere(precision);
	jupiter_infos = init_texture(jupiter, "jupiter");

	let saturn = Mesh.Sphere(precision);
	saturn_infos = init_texture(saturn, "saturn");

	let uranus = Mesh.Sphere(precision);
	uranus_infos = init_texture(uranus, "uranus");

	let neptune = Mesh.Sphere(precision);
	neptune_infos = init_texture(neptune, "neptune");

	scene_camera.show_scene(sun.BB);
}

/*****************************/
/*****************************/
/*****************************/

function draw_wgl()
{
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// all size (reference is most often the sun)
	let mercury_size = 0.2;
	let venus_size = 0.3;
	let earth_size = 0.3;
	let moon_size = 0.3; // reference = earth
	let mars_size = 0.25;
	let jupiter_size = 0.6;
	let saturn_size = 0.5;
	let uranus_size = 0.4;
	let neptune_size = 0.3;
	// all distances to the reference (most often : the sun)
	let mercury_distance = 8;
	let venus_distance = 7;
	let earth_distance = 13;
	let moon_distance = 5; // reference = earth
	let mars_distance = 20;
	let jupiter_distance = 10;
	let saturn_distance = 15;
	let uranus_distance = 17;
	let neptune_distance = 30;

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

	// set the scale for the entire view
	let solar_system = mmult(view_matrix, scale(0.1));
	let sun_view_matrix = solar_system;

	let mercury_view_matrix = mmult(
		solar_system,
		rotateZ(10*ewgl_current_time), // rotation around the sun : const (where to start) + speed
		scale(mercury_size),
		translate(mercury_distance, 1, mercury_size/2) // distance to the sun
	);
	let venus_view_matrix = mmult(
		solar_system,
		rotateZ(80 + 9*ewgl_current_time),
		scale(venus_size),
		translate(venus_distance, 1, venus_size/2)
	);
	let earth_view_matrix = mmult(
		solar_system,
		rotateZ(60 + 5*ewgl_current_time),
		scale(earth_size),
		translate(earth_distance, 1, earth_size/2),
		rotateX(42*ewgl_current_time) // rotate on itself
	);
	let moon_view_matrix = mmult(
		earth_view_matrix, // set earth as reference
		rotateY(20*ewgl_current_time), // rotation around the earth
		scale(moon_size),
		translate(moon_distance, 1, moon_size/2),
		rotateY(42*ewgl_current_time)
	);
	let mars_view_matrix = mmult(
		solar_system,
		rotateZ(190 + 0.7*ewgl_current_time),
		scale(mars_size),
		translate(mars_distance, 1, mars_size/2),
		rotateX(33*ewgl_current_time),
		rotateY(11*ewgl_current_time)
	);
	let jupiter_view_matrix = mmult(
		solar_system,
		rotateZ(250 + 3*ewgl_current_time),
		scale(jupiter_size),
		translate(jupiter_distance, 1, jupiter_size/2),
		rotateX(18*ewgl_current_time)
	);
	let saturn_view_matrix = mmult(
		solar_system,
		rotateZ(220 + 1.5*ewgl_current_time),
		scale(saturn_size),
		translate(saturn_distance, 1, saturn_size/2),
		rotateX(35*ewgl_current_time)
	);
	let uranus_view_matrix = mmult(
		solar_system,
		rotateZ(67 + 2.1*ewgl_current_time),
		scale(uranus_size),
		translate(uranus_distance, 1, uranus_size/2),
		rotateX(18*ewgl_current_time)
	);
	let neptune_view_matrix = mmult(
		solar_system,
		rotateZ(46 + 1.3*ewgl_current_time),
		scale(neptune_size),
		translate(neptune_distance, 1, neptune_size/2),
		rotateX(21*ewgl_current_time)
	);

	// SUN
	simple_program.bind();
	update_uniform('projectionMatrix', projection_matrix);

	update_uniform('viewMatrix', sun_view_matrix);
	sun_infos["texture"].bind();
	sun_infos["renderer"].draw(gl.TRIANGLES);

	// MERCURY
	update_uniform('viewMatrix', mercury_view_matrix);
	mercury_infos["texture"].bind();
	mercury_infos["renderer"].draw(gl.TRIANGLES);

	// VENUS
	update_uniform('viewMatrix', venus_view_matrix);
	venus_infos["texture"].bind();
	venus_infos["renderer"].draw(gl.TRIANGLES);

	// EARTH
	update_uniform('viewMatrix', earth_view_matrix);
	earth_infos["texture"].bind();
	earth_infos["renderer"].draw(gl.TRIANGLES);

	// MOON
	update_uniform('viewMatrix', moon_view_matrix);
	moon_infos["texture"].bind();
	moon_infos["renderer"].draw(gl.TRIANGLES);

	// MARS
	update_uniform('viewMatrix', mars_view_matrix);
	mars_infos["texture"].bind();
	mars_infos["renderer"].draw(gl.TRIANGLES);

	// JUPITER
	update_uniform('viewMatrix', jupiter_view_matrix);
	jupiter_infos["texture"].bind();
	jupiter_infos["renderer"].draw(gl.TRIANGLES);

	// SATURN
	update_uniform('viewMatrix', saturn_view_matrix);
	saturn_infos["texture"].bind();
	saturn_infos["renderer"].draw(gl.TRIANGLES);

	// URANUS
	update_uniform('viewMatrix', uranus_view_matrix);
	uranus_infos["texture"].bind();
	uranus_infos["renderer"].draw(gl.TRIANGLES);

	// NEPTUNE
	update_uniform('viewMatrix', neptune_view_matrix);
	neptune_infos["texture"].bind();
	neptune_infos["renderer"].draw(gl.TRIANGLES);

	unbind_shader();
	unbind_texture2d();

	// ELLIPSES
	circle_program.bind();
	update_uniform('projectionMatrix', projection_matrix);
	update_uniform('viewMatrix', solar_system);
	update_uniform('color', 255, 255, 255);
	update_uniform('nb', 300);
	update_uniform('z_position', 0);

	/**
   * Radius of an ellipse :
	 * Previous planet's size
	 * + (this planet's distance to its reference * its scale)
	 * - (this planet's size/2)
	 */

	// MERCURY
	update_uniform('radius', 1.0 /*sun radius*/ + mercury_distance*0.1 /*sun scale*/ - mercury_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// VENUS
	update_uniform('radius', mercury_size + venus_distance*venus_size - venus_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// EARTH
	update_uniform('radius', venus_size + earth_distance*earth_size - earth_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// MOON
	// update_uniform('viewMatrix', earth_view_matrix);
	// update_uniform('radius', 1.0 + moon_distance*moon_size - moon_size/2);
	// gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// MARS
	update_uniform('radius', earth_size + mars_distance*mars_size - mars_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// JUPITER
	update_uniform('radius', mars_size + jupiter_distance*jupiter_size - jupiter_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// SATURN
	update_uniform('radius', jupiter_size + saturn_distance*saturn_size - saturn_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// URANUS
	update_uniform('radius', saturn_size + uranus_distance*uranus_size - uranus_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);

	// NEPTUNE
	update_uniform('radius', uranus_size + neptune_distance*neptune_size - neptune_size/2);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);
}

/*****************************/
/*****************************/
/*****************************/

launch_3d();
