"use strict"

// programs
var basicProgram = null;

// vao
var vao1 = null;
var ebo1 = null;
var b=0;
var animation = null;
var mode;

function init_wgl()
{
  drawUserInterface();

	/** PROGRAM SHADER**/
	basicProgram = ShaderProgram(basicVertexShader, basicFragmentShader, 'basicProgram');

	/** VBO **/

	/** VAO **/

}

function draw_wgl()
{
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	basicProgram.bind();
	update_uniform('orthoMatrix', ortho2D);
	unbind_shader();
  
}

launch_2d();
