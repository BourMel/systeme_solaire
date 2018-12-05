"use strict"

var sunProgram = null;
let sunRenderer = null;
let sunTexture = null;

// vao
// var vao1 = null;
// var ebo1 = null;
// var b=0;
// var animation = null;
// var mode;


function init_wgl()
{
  // drawUserInterface();

	/** SUN**/
	sunProgram = ShaderProgram(sunVertexShader, sunFragmentShader, 'sunProgram');

	let sun = Mesh.Sphere(200);
	/*use : position, normals, texture*/
	sunRenderer = sun.renderer(true, true, true);
	scene_camera.show_scene(sun.BB);

	// sun sunTexture
	sunTexture = Texture2d();
	sunTexture.load("images/sun.jpg");

}

function draw_wgl()
{
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

	// SUN
	sunProgram.bind();
	sunTexture.bind();
	update_uniform('viewMatrix', view_matrix);
	update_uniform('projectionMatrix', projection_matrix);
	sunRenderer.draw(gl.TRIANGLES);
	unbind_shader();

	
}

launch_3d();
