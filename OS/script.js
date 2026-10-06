const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("q");
const dialog = document.getElementById("dlg");
const body = document.getElementById("dBody");
let family = "All";

function text(tag, value, cls) {
  const el = document.createElement(tag);
  el.textContent = value;
  if (cls) el.className = cls;
  return el;
}

function logo(d) {
  const img = document.createElement("img");
  img.className = "logo";
  img.src = d.logo;
  img.alt = d.name + " logo";
  img.onerror = () => {
    img.onerror = null;
    img.src = "logos/other.svg";
  };
  return img;
}

function famTag(d) {
  return text("span", d.family, "fam " + d.family.toLowerCase());
}

function render() {
  const q = search.value.trim().toLowerCase();
  const list = DISTROS.filter(d =>
    (family === "All" || d.family === family) && d.name.toLowerCase().includes(q)
  );
  grid.replaceChildren();
  for (const d of list) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.append(logo(d), text("h3", d.name), famTag(d), text("p", d.description));
    card.onclick = () => openDetail(d);
    grid.append(card);
  }
  empty.hidden = list.length > 0;
}

function row(dl, label, value) {
  dl.append(text("dt", label), text("dd", value));
}

function openDetail(d) {
  body.replaceChildren();
  const head = document.createElement("div");
  head.className = "dhead";
  const title = document.createElement("div");
  title.append(text("h2", d.name), famTag(d));
  head.append(logo(d), title);
  const dl = document.createElement("dl");
  row(dl, "Used", d.used);
  row(dl, "Rating", d.rating ? d.rating + " / 5" : "Not rated");
  if (d.notes) row(dl, "Notes", d.notes);
  body.append(head, text("p", d.description), dl);
  if (d.screenshots.length) {
    const shots = document.createElement("div");
    shots.className = "shots";
    for (const src of d.screenshots) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = d.name + " screenshot";
      shots.append(img);
    }
    body.append(shots);
  }
  dialog.showModal();
}

const count = f => DISTROS.filter(d => d.family === f).length;
document.getElementById("nLinux").textContent = count("Linux");
document.getElementById("nBsd").textContent = count("BSD");
document.getElementById("nMs").textContent = count("Microsoft");
document.getElementById("nAll").textContent = DISTROS.length;

document.querySelectorAll(".filters button").forEach(b => {
  b.onclick = () => {
    family = b.dataset.f;
    document.querySelectorAll(".filters button").forEach(x =>
      x.setAttribute("aria-pressed", x === b)
    );
    render();
  };
});

search.addEventListener("input", render);
document.getElementById("closeBtn").onclick = () => dialog.close();
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
render();
