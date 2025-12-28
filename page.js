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

async function init() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = urlLang || (["en", "da", "ro", "bg"].includes(browserLang) ? browserLang : "en");

  await switchLanguage(initialLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });
}

init();
