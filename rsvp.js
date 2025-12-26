const FORM_ENDPOINT = "https://formspree.io/f/xwvkpnzk";

const codeRules = {
  "ANGEL-EVELIN": { household: "Angel & Evelin", maxAdults: 2, maxChildren: 1, allowPlusOne: false },
  "YOSIF": { household: "Yosif", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "SLAVI": { household: "Slavi", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "STOYAN": { household: "Stoyan", maxAdults: 2, maxChildren: 0, allowPlusOne: true }
};

const translations = {
  en: {
    navHome: "Home",
    navCeremony: "Ceremony",
    navReception: "Reception",
    navInfo: "Info",
    navRsvp: "RSVP",
    rsvpTitle: "RSVP",
    rsvpIntro: "Please reply by May 1, 2026.",
    codeLabel: "RSVP code",
    codeButton: "Unlock",
    invalidCode: "Invalid code.",
    nameLabel: "Your name",
    emailLabel: "Email (optional)",
    attendingLabel: "Will you attend?",
    yes: "Yes",
    no: "No",
    plusOneLabel: "Will you bring a +1?",
    adultsLabel: "Adults attending",
    childrenLabel: "Children attending",
    mealLabel: "Meal preference",
    fish: "Fish",
    chicken: "Chicken",
    vegetarian: "Vegetarian",
    nightsLabel: "Nights staying at the venue",
    nights0: "Not staying overnight",
    nights1: "1 night",
    nights2: "2 nights",
    nights3: "3 nights",
    notesLabel: "Notes or allergies",
    submit: "Send RSVP",
    statusSuccess: "Thank you! Your RSVP has been received.",
    statusError: "Something went wrong. Please try again.",
    requiredField: "Please fill in the required fields."
  },
  da: {
    navHome: "Start",
    navCeremony: "Vielse",
    navReception: "Festen",
    navInfo: "Godt at vide",
    navRsvp: "Tilmelding",
    rsvpTitle: "Tilmelding",
    rsvpIntro: "Svar venligst senest 1. maj 2026.",
    codeLabel: "Tilmeldingskode",
    codeButton: "Lås op",
    invalidCode: "Ugyldig kode.",
    nameLabel: "Dit navn",
    emailLabel: "Email (valgfri)",
    attendingLabel: "Deltager du?",
    yes: "Ja",
    no: "Nej",
    plusOneLabel: "Medbringer du en +1?",
    adultsLabel: "Voksne der deltager",
    childrenLabel: "Børn der deltager",
    mealLabel: "Menuvalg",
    fish: "Fisk",
    chicken: "Kylling",
    vegetarian: "Vegetar",
    nightsLabel: "Antal nætter på stedet",
    nights0: "Overnatter ikke",
    nights1: "1 nat",
    nights2: "2 nætter",
    nights3: "3 nætter",
    notesLabel: "Noter eller allergier",
    submit: "Send svar",
    statusSuccess: "Tak! Vi har modtaget dit svar.",
    statusError: "Noget gik galt. Prøv igen.",
    requiredField: "Udfyld venligst de obligatoriske felter."
  },
  ro: {
    navHome: "Acasă",
    navCeremony: "Cununie",
    navReception: "Petrecere",
    navInfo: "Info",
    navRsvp: "Confirmare",
    rsvpTitle: "Confirmare",
    rsvpIntro: "Vă rugăm să răspundeți până la 1 mai 2026.",
    codeLabel: "Cod RSVP",
    codeButton: "Deblochează",
    invalidCode: "Cod invalid.",
    nameLabel: "Numele tău",
    emailLabel: "Email (opțional)",
    attendingLabel: "Vei participa?",
    yes: "Da",
    no: "Nu",
    plusOneLabel: "Vii cu +1?",
    adultsLabel: "Adulți participanți",
    childrenLabel: "Copii participanți",
    mealLabel: "Preferință meniu",
    fish: "Pește",
    chicken: "Pui",
    vegetarian: "Vegetarian",
    nightsLabel: "Număr de nopți la locație",
    nights0: "Fără cazare",
    nights1: "1 noapte",
    nights2: "2 nopți",
    nights3: "3 nopți",
    notesLabel: "Observații sau alergii",
    submit: "Trimite",
    statusSuccess: "Mulțumim! Am primit răspunsul tău.",
    statusError: "Ceva nu a mers bine. Te rugăm să încerci din nou.",
    requiredField: "Te rugăm să completezi câmpurile obligatorii."
  },
  bg: {
    navHome: "Начало",
    navCeremony: "Венчавка",
    navReception: "Тържество",
    navInfo: "Инфо",
    navRsvp: "Потвърждение",
    rsvpTitle: "Потвърждение",
    rsvpIntro: "Моля, отговорете до 1 май 2026 г.",
    codeLabel: "Код за RSVP",
    codeButton: "Отключи",
    invalidCode: "Невалиден код.",
    nameLabel: "Вашето име",
    emailLabel: "Имейл (по желание)",
    attendingLabel: "Ще присъствате ли?",
    yes: "Да",
    no: "Не",
    plusOneLabel: "Ще доведете ли +1?",
    adultsLabel: "Брой възрастни",
    childrenLabel: "Брой деца",
    mealLabel: "Предпочитано меню",
    fish: "Риба",
    chicken: "Пиле",
    vegetarian: "Вегетарианско",
    nightsLabel: "Нощувки на място",
    nights0: "Без нощувка",
    nights1: "1 нощ",
    nights2: "2 нощувки",
    nights3: "3 нощувки",
    notesLabel: "Бележки или алергии",
    submit: "Изпрати",
    statusSuccess: "Благодарим! Получихме вашия отговор.",
    statusError: "Нещо се обърка. Опитайте отново.",
    requiredField: "Моля, попълнете задължителните полета."
  }
};

const form = document.getElementById("rsvpForm");
const formStatus = document.getElementById("formStatus");
const langButtons = document.querySelectorAll(".lang-switcher button");
const codeStatus = document.getElementById("codeStatus");
const plusOneRow = document.getElementById("plusOneRow");
const adultsRow = document.getElementById("adultsRow");
const adultsSelect = document.getElementById("adults");
const childrenRow = document.getElementById("childrenRow");
const childrenSelect = document.getElementById("children");

let activeCode = null;
let activeRule = null;

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.getElementById("navHome").textContent = t.navHome;
  document.getElementById("navCeremony").textContent = t.navCeremony;
  document.getElementById("navReception").textContent = t.navReception;
  document.getElementById("navInfo").textContent = t.navInfo;
  document.getElementById("navRsvp").textContent = t.navRsvp;
  document.getElementById("rsvpTitle").textContent = t.rsvpTitle;
  document.getElementById("rsvpIntro").textContent = t.rsvpIntro;
  document.getElementById("nameLabel").textContent = t.nameLabel;
  document.getElementById("emailLabel").textContent = t.emailLabel;
  document.getElementById("attendingLabel").textContent = t.attendingLabel;
  document.getElementById("yesOption").textContent = t.yes;
  document.getElementById("noOption").textContent = t.no;
  document.getElementById("plusOneLabel").textContent = t.plusOneLabel;
  document.getElementById("plusOneYes").textContent = t.yes;
  document.getElementById("plusOneNo").textContent = t.no;
  document.getElementById("adultsLabel").textContent = t.adultsLabel;
  document.getElementById("childrenLabel").textContent = t.childrenLabel;
  document.getElementById("mealLabel").textContent = t.mealLabel;
  document.getElementById("fishOption").textContent = t.fish;
  document.getElementById("chickenOption").textContent = t.chicken;
  document.getElementById("vegetarianOption").textContent = t.vegetarian;
  document.getElementById("nightsLabel").textContent = t.nightsLabel;
  document.getElementById("nights0Option").textContent = t.nights0;
  document.getElementById("nights1Option").textContent = t.nights1;
  document.getElementById("nights2Option").textContent = t.nights2;
  document.getElementById("nights3Option").textContent = t.nights3;
  document.getElementById("notesLabel").textContent = t.notesLabel;
  document.getElementById("submitBtn").textContent = t.submit;

  if (codeStatus.dataset.state === "error") {
    codeStatus.textContent = t.invalidCode;
  }

  if (formStatus.dataset.state) {
    formStatus.textContent = formStatus.dataset.state === "success" ? t.statusSuccess : t.statusError;
  }

  langButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

function updateOptions(select, maxValue, startAtOne) {
  select.innerHTML = "";
  const start = startAtOne ? 1 : 0;
  for (let i = start; i <= maxValue; i += 1) {
    const option = document.createElement("option");
    option.value = `${i}`;
    option.textContent = `${i}`;
    select.appendChild(option);
  }
}

function applyCodeRules(rule) {
  activeRule = rule;
  plusOneRow.hidden = !rule.allowPlusOne;
  adultsRow.hidden = rule.allowPlusOne;
  updateOptions(adultsSelect, rule.maxAdults, true);

  childrenRow.hidden = rule.maxChildren === 0;
  updateOptions(childrenSelect, rule.maxChildren, false);

  if (!rule.allowPlusOne) {
    form.elements["plus_one"].forEach((input) => {
      input.checked = false;
    });
  }
}

function updateAttendingState() {
  const attending = form.elements["attending"].value;
  const disableExtras = attending === "no";

  if (form.elements["plus_one"]) {
    form.elements["plus_one"].forEach((input) => {
      input.disabled = disableExtras;
      if (disableExtras) input.checked = false;
    });
  }

  adultsSelect.disabled = disableExtras || activeRule?.allowPlusOne === true;
  childrenSelect.disabled = disableExtras;
  form.elements["meal"].disabled = disableExtras;
  form.elements["nights"].disabled = disableExtras;
}

function unlockWithCode(rawCode) {
  const code = rawCode.trim().toUpperCase();
  const activeLang = document.documentElement.lang || "en";
  const t = translations[activeLang] || translations.en;
  const rule = codeRules[code];

  if (!rule) {
    codeStatus.dataset.state = "error";
    codeStatus.textContent = t.invalidCode;
    form.hidden = true;
    activeCode = null;
    return;
  }

  activeCode = code;
  codeStatus.dataset.state = "";
  codeStatus.textContent = "";
  form.hidden = false;
  applyCodeRules(rule);
  updateAttendingState();
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

form.addEventListener("change", (event) => {
  if (event.target.name === "attending") {
    updateAttendingState();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const activeLang = document.documentElement.lang || "en";
  const t = translations[activeLang] || translations.en;

  if (!activeCode || !activeRule) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    return;
  }

  const attending = form.elements["attending"].value;
  const plusOneValue = form.elements["plus_one"]?.value || "";

  let adults = 0;
  let children = 0;

  if (attending === "yes") {
    if (activeRule.allowPlusOne) {
      adults = plusOneValue === "yes" ? 2 : 1;
    } else {
      adults = Number(adultsSelect.value || activeRule.maxAdults);
    }

    children = Number(childrenSelect.value || 0);
  }

  const formData = new FormData(form);
  formData.append("code", activeCode);
  formData.append("household", activeRule.household);
  formData.append("adults", `${adults}`);
  formData.append("children", `${children}`);
  formData.append("language", activeLang);
  formData.append("attending", attending);

  if (!formData.get("name") || !formData.get("attending")) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    return;
  }

  formStatus.textContent = "";
  formStatus.dataset.state = "";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    form.reset();
    updateAttendingState();
    formStatus.dataset.state = "success";
    formStatus.textContent = t.statusSuccess;
  } catch (error) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.statusError;
  }
});

const browserLang = navigator.language.slice(0, 2);
const params = new URLSearchParams(window.location.search);
const paramLang = params.get("lang");
const initialLang = translations[paramLang] ? paramLang : (translations[browserLang] ? browserLang : "en");
setLanguage(initialLang);

const paramCode = params.get("code");
if (paramCode) {
  unlockWithCode(paramCode);
} else {
  codeStatus.dataset.state = "error";
  codeStatus.textContent = translations[initialLang].invalidCode;
  form.hidden = true;
}

