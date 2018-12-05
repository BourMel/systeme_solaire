/*****************************/
/** SHADER : apply textures **/
/*****************************/

/** VERTEX SHADER **/

var simpleVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

in vec3 position_in;
in vec3 normal_in;
in vec2 texcoord_in;

out vec2 v_texture_coord;

void main()
{
	vec4 P4 = viewMatrix * vec4(position_in, 1);

	gl_Position = projectionMatrix * P4;

	v_texture_coord = texcoord_in;
}

`;

/** FRAGMENT SHADER **/

var simpleFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D uSampler;

in vec3 Col;
in highp vec2 v_texture_coord;

out vec4 frag_out;

void main()
{
	vec4 text_color = texture(uSampler, v_texture_coord);
	frag_out = text_color;
}

`;
