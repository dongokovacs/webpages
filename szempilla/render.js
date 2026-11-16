/* Az adatok.js tartalmát írja be az oldalba. Ezt a fájlt nem kell szerkeszteni:
   minden adat az adatok.js-ben van. Klasszikus (nem modul) szkript, a system.js
   előtt fut, így a nyitvatartást és a kiemelt idézetet a kit már kész állapotban látja. */
(function () {
  var A = window.ADATOK;
  if (!A) return;
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  var cim = A.utca + ", " + A.telepules;
  var terkep = "https://www.openstreetmap.org/search?query=" + encodeURIComponent(A.utca + " " + A.telepules);
  var hrefs = {
    idopont: A.idopontLink,
    email: "mailto:" + A.email,
    facebook: A.facebook,
    tiktok: A.tiktok,
    terkep: terkep
  };

  // egyszerű szövegek: <span data-adat="nev"></span>
  $$("[data-adat]").forEach(function (n) {
    var k = n.getAttribute("data-adat");
    if (k === "cim") n.textContent = cim;
    else if (k === "ev") n.textContent = String(new Date().getFullYear());
    else if (A[k] != null) n.textContent = A[k];
  });
  // linkek: <a data-link="idopont">
  $$("[data-link]").forEach(function (n) {
    var h = hrefs[n.getAttribute("data-link")];
    if (h) n.setAttribute("href", h);
  });

  // hír az oldal tetején; üres hír esetén eltűnik
  $$("[data-hirdetmeny]").forEach(function (n) {
    if (A.hirdetmeny) n.textContent = A.hirdetmeny; else n.remove();
  });

  // nyitvatartás: <dl class="hours" data-nyitvatartas data-tz="Europe/Budapest">
  $$("[data-nyitvatartas]").forEach(function (dl) {
    dl.textContent = "";
    A.nyitvatartas.forEach(function (s) {
      var dt = el("dt", null, s.cimke); dt.setAttribute("data-days", s.nap);
      dl.appendChild(dt); dl.appendChild(el("dd", null, s.ido));
    });
  });

  // „Most nyitva, 18:00-ig” sor, budapesti idő szerint
  $$("[data-nyitva-most]").forEach(function (n) {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Budapest", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
      var nap = get("weekday").toLowerCase().slice(0, 3);
      var perc = (+get("hour")) * 60 + (+get("minute"));
      var napok = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      var sor = function (k) { return A.nyitvatartas.filter(function (s) { return s.nap === k; })[0]; };
      var ido = function (s) { var m = s && /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/.exec(s.ido); return m ? { tol: +m[1] * 60 + +m[2], ig: +m[3] * 60 + +m[4], tolS: m[1] + ":" + m[2], igS: m[3] + ":" + m[4] } : null; };
      var ma = ido(sor(nap));
      var szoveg;
      if (ma && perc >= ma.tol && perc < ma.ig) szoveg = "Most nyitva, " + ma.igS + "-ig";
      else {
        var i = napok.indexOf(nap);
        for (var k = 0; k < 7 && !szoveg; k++) {
          var s = sor(napok[(i + k) % 7]), t = ido(s);
          if (!t || (k === 0 && perc >= t.tol)) continue;
          var mikor = k === 0 ? "ma" : k === 1 ? "holnap" : s.cimke.toLowerCase();
          szoveg = "Most zárva, " + mikor + " " + t.tolS + "-kor nyit";
        }
      }
      if (szoveg) n.textContent = szoveg; else n.remove();
    } catch (e) { n.remove(); }
  });

  // árak: három csoport sorokkal
  $$("[data-arak]").forEach(function (box) {
    box.textContent = "";
    A.arcsoportok.forEach(function (g) {
      var col = el("div", "price-group span-4");
      col.appendChild(el("h3", "t-label", g.cim));
      var ul = el("ul", "rows");
      g.sorok.forEach(function (r) {
        var li = el("li");
        li.appendChild(el("span", "rows__name", r.nev));
        li.appendChild(el("span", "rows__value", r.ar));
        ul.appendChild(li);
      });
      col.appendChild(ul);
      box.appendChild(col);
    });
  });
  $$("[data-ar-megjegyzes]").forEach(function (n) { n.textContent = A.arMegjegyzes || ""; });

  // vélemények
  $$("[data-velemenyek]").forEach(function (box) {
    // a dobozban álló fotó (figure) marad; a vélemények elé kerülnek
    var fig = box.querySelector("figure");
    $$(".review", box).forEach(function (r) { r.remove(); });
    A.velemenyek.forEach(function (v) {
      var f = el("div", "review span-4");
      var q = el("blockquote"); q.appendChild(el("p", null, "„" + v.szoveg + "”"));
      f.appendChild(q);
      f.appendChild(el("p", "review__name", v.nev));
      box.insertBefore(f, fig || null);
    });
  });

  // a kiemelt idézet, egy színes szóval
  $$("[data-adat-kiemelt-nev]").forEach(function (n) { n.textContent = A.kiemelt.nev; });
  $$("[data-kiemelt]").forEach(function (p) {
    var sz = A.kiemelt.szoveg, w = A.kiemelt.kiemeltSzo, i = w ? sz.indexOf(w) : -1;
    p.textContent = "";
    p.appendChild(document.createTextNode("„" + (i < 0 ? sz : sz.slice(0, i))));
    if (i >= 0) { p.appendChild(el("strong", null, w)); p.appendChild(document.createTextNode(sz.slice(i + w.length))); }
    p.appendChild(document.createTextNode("”"));
  });

  // házirend (hazirend.html)
  $$("[data-hazirend]").forEach(function (box) {
    box.textContent = "";
    A.hazirend.forEach(function (b) {
      var s = el("div", "rule");
      s.appendChild(el("h2", null, b.cim));
      var ul = el("ul");
      b.pontok.forEach(function (p) { ul.appendChild(el("li", null, p)); });
      s.appendChild(ul);
      box.appendChild(s);
    });
  });
})();
