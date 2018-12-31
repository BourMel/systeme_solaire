/************************************/
/** SHADER : create planets' rings **/
/************************************/

/** VERTEX SHADER **/

var ringsVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform int nb;
uniform float radius;
uniform float pointSize;

void main()
{
  gl_PointSize = pointSize;
  float deg = 3.14159*2.0;

	float a = deg*float(gl_VertexID) / float(nb);

  gl_Position = projectionMatrix * viewMatrix * vec4(
    sin(a) * radius ,
    cos(a) * radius,
    0,
    1
  );
}

`;

/** FRAGMENT SHADER **/

var ringsFragmentShader = `#version 300 es

precision mediump float;
out vec4 frag_out;
uniform vec3 color;

void main()
{
	frag_out = vec4(color, 1);
}

`;
