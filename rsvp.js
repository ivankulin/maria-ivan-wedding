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
    plusOneNameLabel: "Plus one name",
    plusOneNamePlaceholder: "Guest name",
    secondNameLabel: "Partner name",
    secondNamePlaceholder: "Partner name",
    overnightLabel: "Overnight stay at the venue?",
    overnightYes: "Yes",
    overnightNo: "No",
    overnightDatesLabel: "Which nights?",
    overnightDate1: "25 June",
    overnightDate2: "26 June",
    overnightDate3: "27 June",
    overnightDate4: "28 June",
    overnightDate5: "29 June",
    notesLabel: "Notes or allergies",
    notesPlaceholder: "Food preferences, kids, or anything else.",
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
    plusOneNameLabel: "Navn på +1",
    plusOneNamePlaceholder: "Gæstens navn",
    secondNameLabel: "Navn på partner",
    secondNamePlaceholder: "Partners navn",
    overnightLabel: "Overnatning på stedet?",
    overnightYes: "Ja",
    overnightNo: "Nej",
    overnightDatesLabel: "Hvilke nætter?",
    overnightDate1: "25. juni",
    overnightDate2: "26. juni",
    overnightDate3: "27. juni",
    overnightDate4: "28. juni",
    overnightDate5: "29. juni",
    notesLabel: "Noter eller allergier",
    notesPlaceholder: "Madønsker, børn eller andet.",
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
    plusOneNameLabel: "Numele +1",
    plusOneNamePlaceholder: "Numele invitatului",
    secondNameLabel: "Numele partenerului",
    secondNamePlaceholder: "Numele partenerului",
    overnightLabel: "Cazare la locație?",
    overnightYes: "Da",
    overnightNo: "Nu",
    overnightDatesLabel: "Ce nopți?",
    overnightDate1: "25 iunie",
    overnightDate2: "26 iunie",
    overnightDate3: "27 iunie",
    overnightDate4: "28 iunie",
    overnightDate5: "29 iunie",
    notesLabel: "Observații sau alergii",
    notesPlaceholder: "Preferințe alimentare, copii sau altceva.",
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
    plusOneNameLabel: "Име на +1",
    plusOneNamePlaceholder: "Име на госта",
    secondNameLabel: "Име на партньора",
    secondNamePlaceholder: "Име на партньора",
    overnightLabel: "Нощувка на място?",
    overnightYes: "Да",
    overnightNo: "Не",
    overnightDatesLabel: "Кои нощи?",
    overnightDate1: "25 юни",
    overnightDate2: "26 юни",
    overnightDate3: "27 юни",
    overnightDate4: "28 юни",
    overnightDate5: "29 юни",
    notesLabel: "Бележки или алергии",
    notesPlaceholder: "Храна, деца или нещо друго.",
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
const plusOneMount = document.getElementById("plusOneMount");
let plusOneRow = null;
let plusOneNameRow = null;
let plusOneNameInput = null;
const overnightDatesRow = document.getElementById("overnightDatesRow");
const secondNameRow = document.getElementById("secondNameRow");
const secondNameInput = document.getElementById("secondName");

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
  if (plusOneRow) {
    plusOneRow.querySelector("#plusOneLabel").textContent = t.plusOneLabel;
    plusOneRow.querySelector("#plusOneYes").textContent = t.yes;
    plusOneRow.querySelector("#plusOneNo").textContent = t.no;
  }
  if (plusOneNameRow && plusOneNameInput) {
    plusOneNameRow.querySelector("#plusOneNameLabel").textContent = t.plusOneNameLabel;
    plusOneNameInput.setAttribute("placeholder", t.plusOneNamePlaceholder);
  }
  document.getElementById("overnightLabel").textContent = t.overnightLabel;
  document.getElementById("overnightYes").textContent = t.overnightYes;
  document.getElementById("overnightNo").textContent = t.overnightNo;
  document.getElementById("overnightDatesLabel").textContent = t.overnightDatesLabel;
  document.getElementById("overnightDate1").textContent = t.overnightDate1;
  document.getElementById("overnightDate2").textContent = t.overnightDate2;
  document.getElementById("overnightDate3").textContent = t.overnightDate3;
  document.getElementById("overnightDate4").textContent = t.overnightDate4;
  document.getElementById("overnightDate5").textContent = t.overnightDate5;
  document.getElementById("notesLabel").textContent = t.notesLabel;
  document.getElementById("notes").setAttribute("placeholder", t.notesPlaceholder);
  document.getElementById("submitBtn").textContent = t.submit;

  document.getElementById("secondNameLabel").textContent = t.secondNameLabel;
  document.getElementById("secondName").setAttribute("placeholder", t.secondNamePlaceholder);

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

function applyCodeRules(rule) {
  activeRule = rule;
  renderPlusOneSection(rule.allowPlusOne);
  updateSecondNameVisibility();
  updateOvernightVisibility();
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

  if (plusOneNameInput) {
    plusOneNameInput.disabled = disableExtras;
  }
  if (form.elements["overnight"]) {
    form.elements["overnight"].forEach((input) => {
      input.disabled = disableExtras;
      if (disableExtras) input.checked = false;
    });
  }

  updatePlusOneNameVisibility();
  updateSecondNameVisibility();
  updateOvernightVisibility();
}

function updatePlusOneNameVisibility() {
  if (!plusOneNameRow || !plusOneNameInput) return;

  const plusOneValue = form.elements["plus_one"]?.value;
  const attending = form.elements["attending"].value;
  const shouldShow = activeRule?.allowPlusOne && plusOneValue === "yes" && attending !== "no";

  plusOneNameRow.hidden = !shouldShow;
  plusOneNameInput.required = shouldShow;
  if (!shouldShow) {
    plusOneNameInput.value = "";
  }
}

function updateSecondNameVisibility() {
  const attending = form.elements["attending"].value;
  const shouldShow = activeRule?.isCouple && attending !== "no";

  secondNameRow.hidden = !shouldShow;
  secondNameInput.required = false;
  if (!shouldShow) {
    secondNameInput.value = "";
  }
}

function updateOvernightVisibility() {
  const attending = form.elements["attending"].value;
  const overnightValue = form.elements["overnight"]?.value;
  const shouldShow = attending !== "no" && overnightValue === "yes";

  overnightDatesRow.hidden = !shouldShow;
  form.elements["overnight_dates"].forEach((input) => {
    input.disabled = !shouldShow;
    if (!shouldShow) input.checked = false;
  });
}

function renderPlusOneSection(allowPlusOne) {
  plusOneMount.innerHTML = "";
  plusOneRow = null;
  plusOneNameRow = null;
  plusOneNameInput = null;

  if (!allowPlusOne) {
    return;
  }

  const t = translations[document.documentElement.lang] || translations.en;

  const plusOneWrapper = document.createElement("div");
  plusOneWrapper.className = "form-row full";
  plusOneWrapper.innerHTML = `
    <span class="label" id="plusOneLabel">${t.plusOneLabel}</span>
    <div class="radio-group">
      <label class="radio">
        <input type="radio" name="plus_one" value="yes">
        <span id="plusOneYes">${t.yes}</span>
      </label>
      <label class="radio">
        <input type="radio" name="plus_one" value="no">
        <span id="plusOneNo">${t.no}</span>
      </label>
    </div>
  `;

  const plusOneNameWrapper = document.createElement("div");
  plusOneNameWrapper.className = "form-row full";
  plusOneNameWrapper.hidden = true;
  plusOneNameWrapper.innerHTML = `
    <label for="plusOneName" id="plusOneNameLabel">${t.plusOneNameLabel}</label>
    <input id="plusOneName" name="plus_one_name" type="text" placeholder="${t.plusOneNamePlaceholder}">
  `;

  plusOneMount.appendChild(plusOneWrapper);
  plusOneMount.appendChild(plusOneNameWrapper);

  plusOneRow = plusOneWrapper;
  plusOneNameRow = plusOneNameWrapper;
  plusOneNameInput = plusOneNameWrapper.querySelector("#plusOneName");
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

  const isCoupleCode = code.includes("-");
  const resolvedRule = { ...rule, allowPlusOne: !isCoupleCode, isCouple: isCoupleCode };

  activeCode = code;
  codeStatus.dataset.state = "";
  codeStatus.textContent = "";
  form.hidden = false;
  applyCodeRules(resolvedRule);
  updateAttendingState();
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

form.addEventListener("change", (event) => {
  if (event.target.name === "attending") {
    updateAttendingState();
  }
  if (event.target.name === "plus_one") {
    updatePlusOneNameVisibility();
  }
  if (event.target.name === "overnight") {
    updateOvernightVisibility();
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

  const formData = new FormData(form);
  formData.append("code", activeCode);
  formData.append("household", activeRule.household);
  formData.append("language", activeLang);
  formData.append("attending", attending);

  if (!formData.get("name") || !formData.get("attending")) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    return;
  }

  if (activeRule.allowPlusOne && plusOneValue === "yes" && !formData.get("plus_one_name")) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    return;
  }

  const overnightValue = form.elements["overnight"]?.value || "";
  const overnightDates = Array.from(form.elements["overnight_dates"] || [])
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (attending === "yes" && overnightValue === "yes" && overnightDates.length === 0) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    return;
  }

  formData.append("overnight", overnightValue);
  formData.append("overnight_dates", overnightDates.join(", "));

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

