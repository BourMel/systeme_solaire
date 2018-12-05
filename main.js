"use strict"

var simpleProgram = null;

let sunRenderer = null;
let sunTexture = null;

let mercuryRenderer = null;
let mercuryTexture = null;

function init_wgl()
{
  // drawUserInterface();

	/** SUN**/
	simpleProgram = ShaderProgram(simpleVertexShader, simpleFragmentShader, 'simpleProgram');

	let sun = Mesh.Sphere(200);
	/*use : position, normals, texture*/
	sunRenderer = sun.renderer(true, true, true);


	// sun sunTexture
	sunTexture = Texture2d();
	sunTexture.load("images/sun.jpg").then(update_wgl);

	/* MERCURY */
	let mercury = Mesh.Sphere(200);
	mercuryRenderer = mercury.renderer(true, true, true);
	mercuryTexture = Texture2d();
	mercuryTexture.load("images/mercury.jpg").then(update_wgl);

	scene_camera.show_scene(sun.BB);
}

function draw_wgl()
{
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

	let solar_system = mmult(view_matrix, scale(0.3));
	let sun_view_matrix = solar_system;
	let mercury_view_matrix = mmult(solar_system, scale(0.2), translate(8, 1, 1));

	// SUN
	simpleProgram.bind();

	sunTexture.bind();
	update_uniform('viewMatrix', sun_view_matrix);
	update_uniform('projectionMatrix', projection_matrix);

	sunRenderer.draw(gl.TRIANGLES);

	update_uniform('viewMatrix', mercury_view_matrix);

	// MERCURY
	mercuryTexture.bind();
	mercuryRenderer.draw(gl.TRIANGLES);

	unbind_shader();
	unbind_texture2d();
}

launch_3d();
