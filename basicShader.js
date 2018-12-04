/*************/
/** SHADERS **/
/*************/

/** BASIC VERTEX SHADER **/

var basicVertexShader = `#version 300 es

uniform mat4 orthoMatrix;

in vec2 position_in;

void main()
{
	gl_PointSize = 8.0;
	gl_Position = orthoMatrix*vec4(position_in, 0.0, 1.0);
}

`;

/** BASIC FRAGMENT SHADER **/

var basicFragmentShader = `#version 300 es

precision highp float;

uniform vec3 color;

out vec4 frag_out;

void main()
{
	frag_out = vec4(color, 1.0);
}

`;
