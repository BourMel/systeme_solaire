/*****************************/
/** SHADER : apply textures **/
/*****************************/

/** VERTEX SHADER **/

var doubleTextureVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

in vec3 position_in;
in vec3 normal_in;
in vec2 texcoord_in;

out vec2 v_texture_coord;

void main()
{

	gl_Position = projectionMatrix * viewMatrix * vec4(position_in, 1);
	v_texture_coord = vec2(texcoord_in.x, 1.0 - texcoord_in.y); // turn the texture
}

`;

/** FRAGMENT SHADER **/

var doubleTextureFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D TU0;
uniform sampler2D TU1;

uniform float time;
in highp vec2 v_texture_coord;

out vec4 frag_out;

void main()
{
	vec2 moving_text = vec2(
		mod(v_texture_coord.x + time, 1.0),
		v_texture_coord.y
	);

  vec3 text1 = texture(TU0, v_texture_coord).rgb;
	vec3 text2 = texture(TU1, moving_text).rgb;

	frag_out = vec4(mix(text1, text2, 0.2), 1.0);
}

`;
