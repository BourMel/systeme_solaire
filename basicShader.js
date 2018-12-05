/*************/
/** SHADERS **/
/*************/

/** BASIC VERTEX SHADER **/

var basicVertexShader = `#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

in vec3 position_in;
in vec3 normal_in;
in vec2 texcoord_in;

out vec3 Col;
out vec2 v_texture_coord;

// emplacement de la lumière : en haut de la caméra (0, 0, 0)
const vec3 pos_lum = vec3(0.0, 0.5, 0.0);
const float alpha = 100.0;

void main()
{
	vec4 P4 = viewMatrix * vec4(position_in,1);

	gl_Position = projectionMatrix * P4;

	vec3 P = P4.xyz;
	vec3 No = normalMatrix * normal_in;
	vec3 N = normalize(No);
	vec3 L = normalize(pos_lum-P);
	float lamb = 0.15+0.85*clamp(dot(N, L), 0.0, 1.0); //entre 0 et 1

	vec3 V = normalize(-P);
	vec3 R = reflect(-L, N);

	float spec = pow(clamp(dot(V,R), 0.0, 1.0), alpha);

	Col = lamb*vec3(1,0,0) + spec*vec3(1, 1, 1); //ou normal_in

	v_texture_coord = texcoord_in;
}

`;

/** BASIC FRAGMENT SHADER **/

var basicFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D uSampler;

in vec3 Col;
in highp vec2 v_texture_coord;

out vec4 frag_out;

void main()
{
	vec4 text_col = texture(uSampler, v_texture_coord);
	frag_out = text_col;
}

`;
