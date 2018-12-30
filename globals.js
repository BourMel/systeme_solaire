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
let mercury_distance = 8*DISTANCE;
let venus_distance = 7*DISTANCE;
let earth_distance = 13*DISTANCE;
let moon_distance = 5*DISTANCE; // reference = earth
let mars_distance = 20*DISTANCE;
let jupiter_distance = 10*DISTANCE;
let saturn_distance = 15*DISTANCE;
let uranus_distance = 17*DISTANCE;
let neptune_distance = 30*DISTANCE;
