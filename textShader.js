/****************************************/
/** SHADER : apply textures with texts **/
/****************************************/

/** VERTEX SHADER **/

var textVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

in vec3 position_in;
in vec3 normal_in;
in vec2 texcoord_in;

out vec2 v_texture_coord;

void main()
{
	vec4 P4 = viewMatrix * vec4(
    position_in.x,
    - position_in.y,
    position_in.z,
    1
  );

	gl_Position = projectionMatrix * P4;

	v_texture_coord = texcoord_in;
}

`;

/** FRAGMENT SHADER **/

var textFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D TU0;

in vec3 Col;
in highp vec2 v_texture_coord;

out vec4 frag_out;

void main()
{
  vec3 black = vec3(0, 0, 0);
	vec3 text_color = texture(TU0, v_texture_coord).rgb;

  if(text_color == black) {
    discard;
  }

	frag_out = vec4(text_color, 1.0);
}

`;
