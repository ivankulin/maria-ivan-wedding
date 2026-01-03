let codeRules = {};

function toCode(name) {
  return name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildCodeRules(invites) {
  const rules = {};
  invites.forEach((invite) => {
    if (!invite || !Array.isArray(invite.names)) return;
    const cleanNames = invite.names.map((name) => name.trim()).filter(Boolean);
    if (!cleanNames.length) return;
    const code = cleanNames.map(toCode).join("-");
    rules[code] = {
      names: cleanNames,
      household: cleanNames.join(" & "),
      allowPlusOne: Boolean(invite.allowPlusOne)
    };
  });
  return rules;
}

async function loadInvites() {
  try {
    const response = await fetch("invites.json", { cache: "no-store" });
    if (!response.ok) throw new Error("load failed");
    const data = await response.json();
    codeRules = buildCodeRules(Array.isArray(data.invites) ? data.invites : []);
  } catch (error) {
    codeRules = {};
  }
}

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

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) {
    el.textContent = value;
  }
}

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
  setText("title", t.title);
  setText("date", t.date);
  setText("navHome", t.navHome);
  setText("navCeremony", t.navCeremony);
  setText("navReception", t.navReception);
  setText("navInfo", t.navInfo);
  setText("navRsvp", t.navRsvp);
  setText("welcomeTitle", t.welcomeTitle);
  setText("welcomeText", t.welcomeText);
  setText("detailsTitle", t.detailsTitle);
  setText("detailsText", t.detailsText);
  setText("ceremonyTitle", t.ceremonyTitle);
  setText("ceremonyLead", t.ceremonyLead);
  setText("ceremonyText", t.ceremonyText);
  setText("ceremonyAddressLabel", t.ceremonyAddressLabel);
  setText("ceremonyAddress", t.ceremonyAddress);
  setText("receptionTitle", t.receptionTitle);
  setText("receptionLead", t.receptionLead);
  setText("receptionText", t.receptionText);
  const menuLink = document.getElementById("menuLink");
  if (menuLink) menuLink.textContent = t.menuLink;
  const drinksLink = document.getElementById("drinksLink");
  if (drinksLink) drinksLink.textContent = t.drinksLink;
  setText("infoTitle", t.infoTitle);
  setText("infoTwoTitle", t.infoTwoTitle);
  setText("infoTwoText", t.infoTwoText);
  setText("infoThreeTitle", t.infoThreeTitle);
  setText("infoThreeText", t.infoThreeText);
  setText("rsvpCtaTitle", t.rsvpCtaTitle);
  setText("rsvpCtaText", t.rsvpCtaText);
  setText("codeLabel", t.codeLabel);
  setText("codeBtn", t.codeButton);
  setText("countDays", t.countDays);
  setText("countHours", t.countHours);
  setText("countMinutes", t.countMinutes);
  setText("countSeconds", t.countSeconds);

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
  await loadInvites();

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
