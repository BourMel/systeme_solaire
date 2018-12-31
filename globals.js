var PAUSE_MODE = false;
var DISTANCE = 1;
let SPHERE_PRECISION = 200;
let ELLIPSE_PRECISION = 300;

// PROGRAMS
var texture_program = null;
var double_texture_program = null;
var y_circle_program = null;
var circle_program = null;
var rings_program = null;

// PLANETS
let earth = null;

// TEXTURES AND RENDERERS
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

// PLANETS' SIZES (reference is most often the sun)
let mercury_size = 0.2;
let venus_size = 0.3;
let earth_size = 0.3;
let moon_size = 0.3; // reference = earth
let mars_size = 0.25;
let jupiter_size = 0.6;
let saturn_size = 0.5;
let uranus_size = 0.4;
let neptune_size = 0.3;

// PLANETS' DISTANCES to their reference (most often : the sun)
let mercury_distance = null;
let venus_distance = null;
let earth_distance = null;
let moon_distance = null;
let mars_distance = null;
let jupiter_distance = null;
let saturn_distance = null;
let uranus_distance = null;
let neptune_distance = null;
