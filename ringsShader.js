/************************************/
/** SHADER : create planets' rings **/
/************************************/

/** VERTEX SHADER **/

var ringsVertexShader = `#version 300 es
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
// uniform radius = 2.0

in vec3 position_in;
in vec2 texcoord_in;

out vec2 v_texture_coord;

void main()
{
	vec4 P4 = viewMatrix * vec4(position_in * 2.0, 1);
	gl_Position = projectionMatrix * P4;
	v_texture_coord = texcoord_in;
}`;

/** FRAGMENT SHADER **/

var ringsFragmentShader=`#version 300 es
precision highp float;

uniform sampler2D TU0;

in vec2 v_texture_coord;
out vec4 frag_out;

void main()
{
  vec3 col = texture(TU0, v_texture_coord).rgb;
	frag_out = vec4(col, 1.0);
}`;
