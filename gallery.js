const params = new URLSearchParams(window.location.search);
const view = params.get("view");

const gallery = document.getElementById("gallery");
const title = document.getElementById("gallery-title");

if (view === "chapter") {
  title.textContent = "Pictures by Chapter";
  groupAndRender("chapter");
}

if (view === "subject") {
  title.textContent = "Pictures by Subject";
  groupAndRender("subject");
}

if (view === "timeline") {
  title.textContent = "Pictures by Timeline";
  renderTimeline();
}

function groupAndRender(key) {
  const groups = {};

  images.forEach(img => {
    groups[img[key]] = groups[img[key]] || [];
    groups[img[key]].push(img);
  });

  for (const group in groups) {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${group}</h2>`;
    groups[group].forEach(renderImage.bind(null, section));
    gallery.appendChild(section);
  }
}

function renderTimeline() {
  images
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(img => renderImage(gallery, img));
}

function renderImage(container, img) {
  const figure = document.createElement("figure");
  figure.innerHTML = `
    <img src="${img.src}" alt="">
    <figcaption>${img.caption}</figcaption>
  `;
  container.appendChild(figure);
}