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

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

	// set the scale for the entire view
	let solar_system = mmult(view_matrix, scale(0.1));
	let sun_view_matrix = solar_system;

	let mercury_view_matrix = mmult(
		solar_system,
		rotateZ(10*ewgl_current_time), // rotation around the sun : const (where to start) + speed
		scale(0.2),
		translate(8, 1, 1) // distance to the sun
	);
	let venus_view_matrix = mmult(
		solar_system,
		rotateZ(80 + 9*ewgl_current_time),
		scale(0.3),
		translate(7, 1, 1)
	);
	let earth_view_matrix = mmult(
		solar_system,
		rotateZ(60 + 5*ewgl_current_time),
		scale(0.3),
		translate(13, 1, 1),
		rotateX(42*ewgl_current_time) // rotate on itself
	);
	let moon_view_matrix = mmult(
		earth_view_matrix, // set earth as reference
		rotateY(20*ewgl_current_time), // rotation around the earth
		scale(0.3),
		translate(5, 1, 1),
		rotateY(42*ewgl_current_time)
	);
	let mars_view_matrix = mmult(
		solar_system,
		rotateZ(190 + 0.7*ewgl_current_time),
		scale(0.25),
		translate(20, 1, 1),
		rotateX(33*ewgl_current_time),
		rotateY(11*ewgl_current_time)
	);
	let jupiter_view_matrix = mmult(
		solar_system,
		rotateZ(250 + 3*ewgl_current_time),
		scale(0.6),
		translate(10, 1, 1),
		rotateX(18*ewgl_current_time)
	);
	let saturn_view_matrix = mmult(
		solar_system,
		rotateZ(220 + 1.5*ewgl_current_time),
		scale(0.5),
		translate(15, 1, 1),
		rotateX(35*ewgl_current_time)
	);
	let uranus_view_matrix = mmult(
		solar_system,
		rotateZ(67 + 2.1*ewgl_current_time),
		scale(0.4),
		translate(17, 1, 1),
		rotateX(18*ewgl_current_time)
	);
	let neptune_view_matrix = mmult(
		solar_system,
		rotateZ(46 + 1.3*ewgl_current_time),
		scale(0.3),
		translate(30, 1, 1),
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


	circle_program.bind();
	update_uniform('viewMatrix', solar_system);
	update_uniform('color', 255, 255, 255);
	update_uniform('nb', 300);
	gl.drawArrays(gl.LINE_LOOP, 0, 300);
}

/*****************************/
/*****************************/
/*****************************/

launch_3d();
