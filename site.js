/* Shared site behavior: mobile nav, roster rendering, scroll reveals.
   You should not need to edit this file to update the roster —
   edit js/members.js instead. */

// ----- Mobile navigation toggle -----
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ----- Scroll reveal (respects reduced motion via CSS) -----
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  // ----- Render rosters if this page has one -----
  renderRoster("board-roster", typeof BOARD_MEMBERS !== "undefined" ? BOARD_MEMBERS : []);
  renderRoster("general-roster", typeof GENERAL_MEMBERS !== "undefined" ? GENERAL_MEMBERS : []);

  var yearEls = document.querySelectorAll("[data-board-year]");
  if (typeof BOARD_YEAR !== "undefined") {
    yearEls.forEach(function (el) { el.textContent = BOARD_YEAR; });
  }

  var copyright = document.querySelector("[data-copyright-year]");
  if (copyright) copyright.textContent = new Date().getFullYear();
});

// ----- Roster rendering -----
var MONO_CLASSES = ["mono-blue", "mono-gold", "mono-green", "mono-navy"];

function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .map(function (part) { return part.charAt(0).toUpperCase(); })
    .slice(0, 2)
    .join("");
}

function renderRoster(containerId, members) {
  var container = document.getElementById(containerId);
  if (!container) return;

  if (!members.length) {
    var empty = document.createElement("p");
    empty.className = "member-meta";
    empty.textContent =
      "Roster coming soon — check back after our first general body meeting of the semester.";
    container.appendChild(empty);
    return;
  }

  members.forEach(function (m, i) {
    var card = document.createElement("article");
    card.className = "member-card reveal";

    if (m.photo) {
      var img = document.createElement("img");
      img.className = "member-photo";
      img.src = m.photo;
      img.alt = "Portrait of " + m.name;
      img.loading = "lazy";
      // If a photo file is missing, fall back to the monogram
      img.onerror = function () {
        card.replaceChild(makeMonogram(m, i), img);
      };
      card.appendChild(img);
    } else {
      card.appendChild(makeMonogram(m, i));
    }

    var info = document.createElement("div");
    info.className = "member-info";

    var role = document.createElement("p");
    role.className = "member-role";
    role.textContent = m.role;
    info.appendChild(role);

    var name = document.createElement("h3");
    name.className = "member-name";
    name.textContent = m.name;
    info.appendChild(name);

    var metaBits = [m.year, m.major].filter(Boolean);
    if (metaBits.length) {
      var meta = document.createElement("p");
      meta.className = "member-meta";
      meta.textContent = metaBits.join(" · ");
      info.appendChild(meta);
    }

    if (m.email) {
      var mail = document.createElement("a");
      mail.className = "member-email";
      mail.href = "mailto:" + m.email;
      mail.textContent = m.email;
      info.appendChild(mail);
    }

    card.appendChild(info);
    container.appendChild(card);
  });
}

function makeMonogram(member, index) {
  var tile = document.createElement("div");
  tile.className = "member-monogram " + MONO_CLASSES[index % MONO_CLASSES.length];
  tile.setAttribute("role", "img");
  tile.setAttribute("aria-label", "Monogram placeholder for " + member.name);
  tile.textContent = initialsOf(member.name);
  return tile;
}
