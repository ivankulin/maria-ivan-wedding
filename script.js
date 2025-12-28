const codeRules = {
  "ANGEL-EVELIN": { household: "Angel & Evelin", maxAdults: 2, maxChildren: 1, allowPlusOne: false },
  "YOSIF": { household: "Yosif", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "SLAVI": { household: "Slavi", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "STOYAN": { household: "Stoyan", maxAdults: 2, maxChildren: 0, allowPlusOne: true }
};

const translationCache = {};
let currentIndexStrings = null;
let currentLang = "en";

const langButtons = document.querySelectorAll(".lang-switcher button");
const codeInput = document.getElementById("rsvpCodeIndex");
const codeButton = document.getElementById("codeBtn");
const codeStatus = document.getElementById("codeStatus");
const countDaysEl = document.getElementById("countNumberDays");
const countHoursEl = document.getElementById("countNumberHours");
const countMinutesEl = document.getElementById("countNumberMinutes");
const countSecondsEl = document.getElementById("countNumberSeconds");

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

function setLanguage(lang, t) {
  if (!t) return;

  document.documentElement.lang = lang;
  document.getElementById("title").textContent = t.title;
  document.getElementById("date").textContent = t.date;
  document.getElementById("navHome").textContent = t.navHome;
  document.getElementById("navCeremony").textContent = t.navCeremony;
  document.getElementById("navReception").textContent = t.navReception;
  document.getElementById("navInfo").textContent = t.navInfo;
  document.getElementById("navRsvp").textContent = t.navRsvp;
  document.getElementById("welcomeTitle").textContent = t.welcomeTitle;
  document.getElementById("welcomeText").textContent = t.welcomeText;
  document.getElementById("detailsTitle").textContent = t.detailsTitle;
  document.getElementById("detailsText").textContent = t.detailsText;
  document.getElementById("ceremonyTitle").textContent = t.ceremonyTitle;
  document.getElementById("ceremonyLead").textContent = t.ceremonyLead;
  document.getElementById("ceremonyText").textContent = t.ceremonyText;
  document.getElementById("ceremonyAddressLabel").textContent = t.ceremonyAddressLabel;
  document.getElementById("ceremonyAddress").textContent = t.ceremonyAddress;
  document.getElementById("receptionTitle").textContent = t.receptionTitle;
  document.getElementById("receptionLead").textContent = t.receptionLead;
  document.getElementById("receptionText").textContent = t.receptionText;
  const menuLink = document.getElementById("menuLink");
  if (menuLink) menuLink.textContent = t.menuLink;
  const drinksLink = document.getElementById("drinksLink");
  if (drinksLink) drinksLink.textContent = t.drinksLink;
  document.getElementById("receptionAddressLabel").textContent = t.receptionAddressLabel;
  document.getElementById("receptionAddress").textContent = t.receptionAddress;
  document.getElementById("infoTitle").textContent = t.infoTitle;
  const infoOneTitle = document.getElementById("infoOneTitle");
  const infoOneText = document.getElementById("infoOneText");
  if (infoOneTitle) infoOneTitle.textContent = t.infoOneTitle;
  if (infoOneText) infoOneText.textContent = t.infoOneText;
  document.getElementById("infoTwoTitle").textContent = t.infoTwoTitle;
  document.getElementById("infoTwoText").textContent = t.infoTwoText;
  document.getElementById("infoThreeTitle").textContent = t.infoThreeTitle;
  document.getElementById("infoThreeText").textContent = t.infoThreeText;
  const infoFourTitle = document.getElementById("infoFourTitle");
  const infoFourText = document.getElementById("infoFourText");
  if (infoFourTitle) infoFourTitle.textContent = t.infoFourTitle;
  if (infoFourText) infoFourText.textContent = t.infoFourText;
  document.getElementById("rsvpCtaTitle").textContent = t.rsvpCtaTitle;
  document.getElementById("rsvpCtaText").textContent = t.rsvpCtaText;
  document.getElementById("codeLabel").textContent = t.codeLabel;
  document.getElementById("codeBtn").textContent = t.codeButton;
  document.getElementById("countDays").textContent = t.countDays;
  document.getElementById("countHours").textContent = t.countHours;
  document.getElementById("countMinutes").textContent = t.countMinutes;
  document.getElementById("countSeconds").textContent = t.countSeconds;

  if (codeStatus.dataset.state === "error") {
    codeStatus.textContent = t.invalidCode;
  }

  langButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

async function switchLanguage(lang) {
  const data = (await loadTranslations(lang)) || (await loadTranslations("en"));
  if (!data || !data.index) return;

  currentLang = translationCache[lang] ? lang : "en";
  currentIndexStrings = data.index;
  setLanguage(currentLang, currentIndexStrings);
}

function verifyCode() {
  const code = codeInput.value.trim().toUpperCase();
  const t = currentIndexStrings || { invalidCode: "Invalid code." };

  if (!codeRules[code]) {
    codeStatus.dataset.state = "error";
    codeStatus.textContent = t.invalidCode;
    return;
  }

  codeStatus.dataset.state = "";
  codeStatus.textContent = "";
  window.location.href = `rsvp.html?code=${encodeURIComponent(code)}&lang=${encodeURIComponent(currentLang)}`;
}

function updateCountdown() {
  const target = new Date(2026, 5, 27, 15, 0, 0);
  const now = new Date();
  let diff = Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (countDaysEl) countDaysEl.textContent = `${days}`;
  if (countHoursEl) countHoursEl.textContent = `${hours}`;
  if (countMinutesEl) countMinutesEl.textContent = `${minutes}`;
  if (countSecondsEl) countSecondsEl.textContent = `${seconds}`;
}

async function init() {
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = ["en", "da", "ro", "bg"].includes(browserLang) ? browserLang : "en";
  await switchLanguage(initialLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });

  codeButton.addEventListener("click", verifyCode);
  codeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifyCode();
    }
  });

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

init();
