const assets = [
  "assets/antes-full.png",
  "assets/depois-full.png",
  "assets/site seiva.mp4",
  "assets/site gq.mp4"
];

assets.forEach(src => {
  if (src.endsWith('.mp4')) {
    const v = document.createElement('video');
    v.src = src;
    v.preload = 'auto';
  } else {
    const i = new Image();
    i.src = src;
  }
});
