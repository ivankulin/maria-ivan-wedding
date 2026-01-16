const translationCache = {};
let currentLang = "en";

const langButtons = document.querySelectorAll(".lang-switcher button");
const pageKey = document.body.dataset.page;

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const pageBody = document.getElementById("pageBody");

async function loadTranslations(lang) {
  if (translationCache[lang]) return translationCache[lang];

  try {
    const response = await fetch(`i18n/${lang}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("load failed");
    const data = await response.json();
    translationCache[lang] = data;
    return data;
  } catch (error) {
    return null;
  }
}

function setLanguage(lang, data) {
  if (!data) return;

  document.documentElement.lang = lang;
  const nav = data.index || {};
  const page = data[pageKey] || {};

  const navHome = document.getElementById("navHome");
  const navCeremony = document.getElementById("navCeremony");
  const navReception = document.getElementById("navReception");
  const navInfo = document.getElementById("navInfo");
  const navRsvp = document.getElementById("navRsvp");

  if (navHome) navHome.textContent = nav.navHome || navHome.textContent;
  if (navCeremony) navCeremony.textContent = nav.navCeremony || navCeremony.textContent;
  if (navReception) navReception.textContent = nav.navReception || navReception.textContent;
  if (navInfo) navInfo.textContent = nav.navInfo || navInfo.textContent;
  if (navRsvp) navRsvp.textContent = nav.navRsvp || navRsvp.textContent;

  if (pageTitle && page.title) pageTitle.textContent = page.title;
  if (pageSubtitle && page.subtitle) pageSubtitle.textContent = page.subtitle;
  if (pageBody && page.body) pageBody.textContent = page.body;

  langButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

async function switchLanguage(lang) {
  const data = (await loadTranslations(lang)) || (await loadTranslations("en"));
  if (!data) return;

  currentLang = translationCache[lang] ? lang : "en";
  setLanguage(currentLang, data);
}

function initReveal() {
  const sections = Array.from(document.querySelectorAll(".content > section"));
  if (!sections.length) return;

  sections.forEach((section, index) => {
    section.classList.add("reveal");
    section.style.setProperty("--reveal-delay", `${index * 80}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const revealAfterPaint = (fn) => {
    requestAnimationFrame(() => requestAnimationFrame(fn));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));

  revealAfterPaint(() => {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.85) {
        section.classList.add("is-visible");
        observer.unobserve(section);
      }
    });
  });
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = urlLang || (["en", "da", "ro", "bg"].includes(browserLang) ? browserLang : "en");

  await switchLanguage(initialLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });

  initReveal();
}

init();
