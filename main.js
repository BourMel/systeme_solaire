"use strict"

//
// Shaders
//

var color_vert=`#version 300 es
uniform mat4 orthoMatrix;
in vec2 position_in;
void main()
{
	gl_PointSize = 8.0;
	gl_Position = orthoMatrix*vec4(position_in, 0.0, 1.0);
}
`;


var color_frag=`#version 300 es
precision highp float;
uniform vec3 color;
out vec4 frag_out;
void main()
{
	frag_out = vec4(color, 1.0);
}
`;

var prg1 = null;
var vao1 = null;
var ebo1 = null;
var b=0;
var animation = null;
var mode;
var sl_r;
var sl_g;
var sl_b;



function init_wgl()
{
	UserInterface.begin(); // name of html id
	UserInterface.use_field_set('H',"Color");
	sl_r  = UserInterface.add_slider('R ',0,100,50,update_wgl);
	set_widget_color(sl_r,'#ff0000','#ffcccc');
	sl_g  = UserInterface.add_slider('G ',0,100,50,update_wgl);
	set_widget_color(sl_g,'#00bb00','#ccffcc');
	sl_b  = UserInterface.add_slider('B ',0,100,50,update_wgl);
	set_widget_color(sl_b,'#0000ff','#ccccff');
	UserInterface.end_use();	UserInterface.add_br();
	mode = UserInterface.add_radio('H','Mode',['points','lines ','both  '],0, update_wgl);
	UserInterface.add_br();
	UserInterface.add_check_box('Animate ',false, (c)=>
	{
		if (c)
		{
			animation = setInterval( () => { b += 5; update_wgl(); }, 50);
		}
		else
		{
			window.clearInterval(animation);
			animation = null;
		}
	});
	UserInterface.add_br();
	UserInterface.adjust_width();

	/// programs shader
	prg1 = ShaderProgram(color_vert,color_frag,'color1');

	/// VBO

	/// VAO

	/// indices
}

function draw_wgl()
{
	gl.clearColor(0,0,0,1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	prg1.bind();
	update_uniform('orthoMatrix',ortho2D);


	unbind_shader();
}

launch_2d();
