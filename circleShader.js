/***************************/
/** SHADER : draw circles **/
/***************************/

/** VERTEX SHADER **/

var circleVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform int nb;
uniform float radius;
uniform float z_position;

void main()
{
  float deg = 3.14159*2.0;

	gl_PointSize = 2.0;
	float a = deg*float(gl_VertexID) / float(nb);

  gl_Position = projectionMatrix * viewMatrix * vec4(
    sin(a) * radius,
    cos(a) * radius,
    z_position,
    1
  );
}

`;

/** FRAGMENT SHADER **/

var circleFragmentShader = `#version 300 es

precision mediump float;
out vec4 frag_out;
uniform vec3 color;

void main()
{
	frag_out = vec4(color, 1);
}

`;
