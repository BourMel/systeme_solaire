"use strict"

// programs
var basicProgram = null;

// vao
// var vao1 = null;
// var ebo1 = null;
// var b=0;
// var animation = null;
// var mode;

// mesh renderers
let sunRenderer = null;

function init_wgl()
{
  // drawUserInterface();

	/** PROGRAM SHADER**/
	basicProgram = ShaderProgram(basicVertexShader, basicFragmentShader, 'basicProgram');

	/** VBO **/

	/** VAO **/


  let sun = Mesh.Sphere(200);
  /*use : position, normals ; doesn't use : texture*/
  sunRenderer = sun.renderer(true, true, false);
  scene_camera.show_scene(sun.BB);


  FileDroppedOnCanevas( (blob) =>
	{
		Mesh.load(blob).then((mesh) =>
		{
			mesh_rend = mesh.renderer(true,true,false);
			scene_camera.show_scene(mesh.BB);
			update_wgl();
		});
	});

}

function draw_wgl()
{
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // les matrices sont deduites de la camera
  const projection_matrix = scene_camera.get_projection_matrix();
	const view_matrix = scene_camera.get_view_matrix();

	basicProgram.bind();
	update_uniform('viewMatrix', view_matrix);
	update_uniform('normalMatrix', view_matrix.inverse3transpose());
	update_uniform('projectionMatrix', projection_matrix);
	sunRenderer.draw(gl.TRIANGLES);
	unbind_shader();
}

launch_3d();
