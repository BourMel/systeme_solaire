/**
 * init texture and renderer
 **/

function init_texture(mesh, file_name) {
  let renderer = mesh.renderer(true, true, true);
  let texture = Texture2d();
  texture.load("images/" + file_name + ".jpg").then(update_wgl);

  return {
    "texture": texture,
    "renderer": renderer
  };
}
