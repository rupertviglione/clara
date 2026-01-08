/* clara. — scripts definitivos */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-ready");

  // iniciar viewers (D)
  document.querySelectorAll(".viewer").forEach(initViewer);
});

/* VIEWER SIMPLES (D) */
function initViewer(viewer){
  const videos = viewer.querySelectorAll("video");
  if(videos.length < 2) return;

  let index = 0;

  videos.forEach((v,i)=>{
    v.preload = "auto";
    v.muted = true;
    v.loop = true;
    if(i === 0){
      v.classList.add("active");
      v.play();
    }
  });

  const prev = viewer.querySelector(".prev");
  const next = viewer.querySelector(".next");

  function show(i){
    videos[index].classList.remove("active");
    index = (i + videos.length) % videos.length;
    videos[index].classList.add("active");
    videos[index].play();
  }

  prev && (prev.onclick = () => show(index-1));
  next && (next.onclick = () => show(index+1));
}
