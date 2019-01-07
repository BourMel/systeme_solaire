var PAUSE_MODE = false;
var INFO_MODE = true;
var DISTANCE = 0.5;
let SPHERE_PRECISION = 200;
let ELLIPSE_PRECISION = 300;
let FOCUS = 0;
let FOCUS_LIST = [
  "sun", "mercury", "venus", "earth",
  "mars", "jupiter", "saturn", "uranus", "neptune"
];

// PROGRAMS
var text_program = null;
var texture_program = null;
var double_texture_program = null;
var y_circle_program = null;
var circle_program = null;
var rings_program = null;

// PLANETS
let earth = null;

// TEXTURES AND RENDERERS
let stars_infos = null;
let sun_infos = null;
let mercury_infos = null;
let venus_infos = null;
let earth_infos = null;
let moon_infos = null;
let mars_infos = null;
let jupiter_infos = null;
let saturn_infos = null;
let uranus_infos = null;
let neptune_infos = null;

// PLANETS POSITIONS

let solar_system = null;
let stars_view_matrix = null;
let sun_view_matrix = null;
let mercury_view_matrix = null;
let venus_view_matrix = null;
let earth_view_matrix = null;
let moon_view_matrix = null;
let mars_view_matrix = null;
let jupiter_view_matrix = null;
let saturn_view_matrix = null;
let uranus_view_matrix = null;
let neptune_view_matrix = null;

// PLANETS' SIZES
let stars_size = 600;
let sun_size = 3; // 700 000
// Next sizes will be divided by 7000
let mercury_size = 0.348; // 2 439 km
let venus_size = 0.865; // 6 051
let earth_size = 0.910; // 6 371
let moon_size = 0.246; // 0.27 * earth
let mars_size = 0.484; // 3 389km
// Next sizes will be divided by 35 000
let jupiter_size = 1.910; // 66 864 km
let saturn_size = 1.553; // 54 359 km
// Next sizes will be divided by 20 000 km
let uranus_size = 1.268; // 25 362
let neptune_size = 1.217; // 24 341

// PLANETS' DISTANCES to their reference (the sun, except for the moon)
let mercury_distance = null;
let venus_distance = null;
let earth_distance = null;
let moon_distance = null;
let mars_distance = null;
let jupiter_distance = null;
let saturn_distance = null;
let uranus_distance = null;
let neptune_distance = null;

// OBJECT TEXTS AND RENDERERS/TEXTURES

// text objects
var sun_text = null;
var mercury_text = null;
var venus_text = null;
var earth_text = null;
// let moon_text = null;
let mars_text = null;
let jupiter_text = null;
let saturn_text = null;
let uranus_text = null;
let neptune_text = null;

// renderers
let sun_text_r = null;
var mercury_text_r = null;
var venus_text_r = null;
var earth_text_r = null;
let mars_text_r = null;
let jupiter_text_r = null;
let saturn_text_r = null;
let uranus_text_r = null;
let neptune_text_r = null;

// textures
let sun_text_t = null;
var mercury_text_t = null;
var venus_text_t = null;
var earth_text_t = null;
let mars_text_t = null;
let jupiter_text_t = null;
let saturn_text_t = null;
let uranus_text_t = null;
let neptune_text_t = null;

// USER INTERFACE
let text_initialised = false;
//html
let focus;
let time_slider;
let info_checkbox;
let pause_checkbox;
