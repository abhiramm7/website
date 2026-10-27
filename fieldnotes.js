// Field notes: tile map of the utilities and cities I have worked with. Data lives in PLACES below.
(() => {
  // ─── DATA: utilities and cities. util/note are optional. status: "shipped" | "active" ───
  const PLACES = [
    { st: "MI", city: "Ann Arbor", util: "City of Ann Arbor" },
    { st: "MI", city: "Ann Arbor", util: "Open Storm project" },
    { st: "MI", city: "Detroit", util: "GLWA" },
    { st: "MI", city: "Kalamazoo" },
    { st: "MI", city: "Grand Rapids" },
    { st: "IN", city: "South Bend" },
    { st: "IN", city: "Evansville" },
    { st: "OH", city: "Columbus" },
    { st: "OH", city: "Dayton" },
    { st: "OH", city: "Cincinnati" },
    { st: "NY", city: "Buffalo" },
    { st: "MA", city: "Boston", note: "Pilot" },
    { st: "MD", util: "WSSC Water", note: "Pilot" },
    { st: "DC", city: "Washington", util: "Open-source project", note: "Flood forecasting" },
    { st: "GA", city: "Gwinnett", status: "active" },
    { st: "GA", city: "Augusta", status: "active" },
    { st: "GA", city: "Douglas", status: "active" },
    { st: "GA", city: "Rockdale", status: "active" },
    { st: "AL", city: "Opelika", status: "active" },
    { st: "AR", city: "Fayetteville", status: "active" },
    { st: "FL", city: "Jacksonville", util: "JEA", status: "active" },
    { st: "TX", city: "Houston", status: "active" },
    { st: "CA", city: "San Lorenzo", util: "Oro Loma Sanitary District" },
    { st: "CAN", city: "Vancouver" },
    { st: "CHN", city: "Shenzhen" },
    { st: "NLD", city: "Netherlands" },
  ].map(p => ({ status: "shipped", ...p }));
  // International tiles sit in the empty bottom-left corner: [code, col, row]
  const INTL = [["CAN",0,6],["CHN",1,6],["NLD",2,6]];
  const MARKS = { DC: "🏠", MI: "📜" };

  // Square tile grid based on NPR / Bloomberg, 0-indexed [abbr, col, row]. Adjusted so DC sits beside VA,
  // NC sits under VA, MD sits above DC, and TX moves up a row beside LA.
  const TILES = [["AK",0,0],["WI",5,0],["VT",8,0],["NH",9,0],["ME",10,0],
   ["WA",0,1],["ID",1,1],["MT",2,1],["ND",3,1],["MN",4,1],["IL",5,1],["MI",6,1],["NY",8,1],["MA",9,1],["RI",10,1],
   ["OR",0,2],["NV",1,2],["WY",2,2],["SD",3,2],["IA",4,2],["IN",5,2],["OH",6,2],["PA",7,2],["MD",8,2],["NJ",9,2],["CT",10,2],
   ["CA",0,3],["UT",1,3],["CO",2,3],["NE",3,3],["MO",4,3],["KY",5,3],["WV",6,3],["VA",7,3],["DC",8,3],["DE",9,3],
   ["AZ",1,4],["NM",2,4],["KS",3,4],["OK",4,4],["AR",5,4],["TN",6,4],["NC",7,4],
   ["TX",3,5],["LA",4,5],["MS",5,5],["AL",6,5],["GA",7,5],["SC",8,5],
   ["HI",3,6],["FL",7,6]];
  // Great Lakes in the empty cells north of the Midwest: [name, col, row, note]
  const LAKES = [["Superior",4,0],["Michigan",6,0,"my favorite lake"],["Huron",7,0],["Erie",7,1]];

  const byState = {};
  PLACES.forEach(p => (byState[p.st] ||= []).push(p));
  const stateStatus = st => byState[st] ? (byState[st].some(p => p.status === "shipped") ? "shipped" : "active") : "";


  const board = document.getElementById("fn-board");
  if (board) {
  const pop = document.getElementById("fn-pop");
  const tiles = {};

  function showPop(d, html) {
    board.querySelectorAll(".tile.selected").forEach(t => t.classList.remove("selected"));
    d.classList.add("selected");
    pop.innerHTML = html;
    pop.classList.add("show");
    // anchor beside the tile, flipping left near the right edge
    const x = d.offsetLeft + d.offsetWidth + 8;
    pop.style.top = Math.min(d.offsetTop, board.offsetHeight - pop.offsetHeight) + "px";
    pop.style.left = (x + pop.offsetWidth > board.offsetWidth ? d.offsetLeft - pop.offsetWidth - 8 : x) + "px";
  }
  const placeName = p => p.util ? (p.city ? `${p.city}: ${p.util}` : p.util) : p.city;
  const stateHtml = st => `<b>${st}</b><ul>${byState[st].map(p =>
    `<li>${placeName(p)}${p.status === "active" ? '<span class="pill">now</span>' : ""}${p.note ? `<br><span>${p.note}</span>` : ""}</li>`).join("")}</ul>`;
  function select(st) { const d = tiles[st]; if (d && byState[st]) showPop(d, stateHtml(st)); }   // used by #places=XX deep links
  function clear() { pop.classList.remove("show"); board.querySelectorAll(".tile.selected").forEach(t => t.classList.remove("selected")); }
  // popover opens on hover or keyboard focus; a tap toggles it on touch screens, which have no hover
  const popOn = (d, html) => {
    d.onmouseenter = d.onfocus = () => showPop(d, html);
    d.onmouseleave = d.onblur = clear;
    d.onclick = e => { e.stopPropagation(); d.classList.contains("selected") && e.pointerType !== "mouse" ? clear() : showPop(d, html); };
  };

  function makeTile(st) {
    const d = document.createElement("div");
    const status = stateStatus(st);
    d.className = "tile " + status;
    d.innerHTML = `<span>${st}</span>` + (status ? `<span class="n">${byState[st].length}</span>` : "") + (MARKS[st] ? `<span class="mark">${MARKS[st]}</span>` : "");
    if (status) {
      d.tabIndex = 0; d.setAttribute("role", "button");
      d.setAttribute("aria-label", `${st}: ${byState[st].map(placeName).join(", ")}`);
      popOn(d, stateHtml(st));
    }
    tiles[st] = d;
    return d;
  }
  const place = (d, c, r) => { d.style.gridColumn = c + 1; d.style.gridRow = r + 1; d.style.setProperty("--c", c); board.appendChild(d); };

  TILES.forEach(([st, c, r]) => place(makeTile(st), c, r));
  LAKES.forEach(([name, c, r, note]) => {
    const d = document.createElement("div"); d.className = "tile lake" + (note ? " fav" : "");
    const label = "Lake " + name + (note ? ", " + note : "");
    d.tabIndex = 0; d.setAttribute("aria-label", label);
    d.innerHTML = note ? "<span>❤️</span>" : "<span>🌊</span>";
    popOn(d, `<b>Lake ${name}</b>` + (note ? `<ul><li>${note} ❤️</li></ul>` : ""));
    place(d, c, r);
  });
  const intlLbl = document.createElement("span");
  intlLbl.className = "lbl"; intlLbl.textContent = "International";
  intlLbl.style.gridColumn = "1 / 4"; intlLbl.style.gridRow = 6; intlLbl.style.justifySelf = "start";
  board.appendChild(intlLbl);
  INTL.forEach(([st, c, r]) => place(makeTile(st), c, r));

  document.addEventListener("click", clear);
  document.addEventListener("keydown", e => { if (e.key === "Escape") clear(); });

  // legend filter
  document.querySelectorAll("#fn-legend button").forEach(b => b.onclick = e => {
    e.stopPropagation();
    const on = b.getAttribute("aria-pressed") !== "true";
    document.querySelectorAll("#fn-legend button").forEach(o => o.setAttribute("aria-pressed", "false"));
    board.classList.remove("f-shipped", "f-active");
    if (on) { b.setAttribute("aria-pressed", "true"); board.classList.add("f-" + b.dataset.f); }
  });

  // entrance when scrolled into view, then open any deep-linked state
  new IntersectionObserver((es, io) => {
    if (!es[0].isIntersecting) return;
    board.classList.add("in"); io.disconnect();
    setTimeout(() => board.classList.add("done"), 800);
    const m = location.hash.match(/^#places=([A-Z]{2})$/);
    if (m) setTimeout(() => select(m[1]), 600);
  }, { threshold: 0.2 }).observe(board);
  }
})();
