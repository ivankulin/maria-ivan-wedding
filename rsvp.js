const FORM_ENDPOINT = "https://formspree.io/f/xwvkpnzk";

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
    const allowPlusOne = cleanNames.length === 1;
    rules[code] = {
      names: cleanNames,
      household: cleanNames.join(" & "),
      allowPlusOne
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

let currentRsvpStrings = null;
let currentLang = "en";

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

const fallbackRsvpStrings = {
  plusOneLabel: "Will you bring a +1?",
  plusOneNameLabel: "Plus one name",
  plusOneNamePlaceholder: "Guest name",
  yes: "Yes",
  no: "No"
};

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

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) {
      el.textContent = value;
    }
  };

  document.documentElement.lang = lang;
  setText("navHome", t.navHome);
  setText("navCeremony", t.navCeremony);
  setText("navReception", t.navReception);
  setText("navInfo", t.navInfo);
  setText("navRsvp", t.navRsvp);
  setText("rsvpTitle", t.rsvpTitle);
  setText("rsvpIntro", t.rsvpIntro);
  setText("nameLabel", t.nameLabel);
  setText("emailLabel", t.emailLabel);
  setText("attendingLabel", t.attendingLabel);
  setText("yesOption", t.yes);
  setText("noOption", t.no);
  setText("secondNameLabel", t.secondNameLabel);
  const secondNameEl = document.getElementById("secondName");
  if (secondNameEl && t.secondNamePlaceholder) {
    secondNameEl.setAttribute("placeholder", t.secondNamePlaceholder);
  }
  setText("overnightLabel", t.overnightLabel);
  setText("overnightYes", t.overnightYes);
  setText("overnightNo", t.overnightNo);
  setText("overnightDatesLabel", t.overnightDatesLabel);
  setText("overnightDate1", t.overnightDate1);
  setText("overnightDate2", t.overnightDate2);
  setText("overnightDate3", t.overnightDate3);
  setText("overnightDate4", t.overnightDate4);
  setText("notesLabel", t.notesLabel);
  const notesEl = document.getElementById("notes");
  if (notesEl && t.notesPlaceholder) {
    notesEl.setAttribute("placeholder", t.notesPlaceholder);
  }
  setText("submitBtn", t.submit);

  if (plusOneRow) {
    plusOneRow.querySelector("#plusOneLabel").textContent = t.plusOneLabel;
    plusOneRow.querySelector("#plusOneYes").textContent = t.yes;
    plusOneRow.querySelector("#plusOneNo").textContent = t.no;
  }

  if (plusOneNameRow && plusOneNameInput) {
    plusOneNameRow.querySelector("#plusOneNameLabel").textContent = t.plusOneNameLabel;
    plusOneNameInput.setAttribute("placeholder", t.plusOneNamePlaceholder);
  }

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

async function switchLanguage(lang) {
  const data = (await loadTranslations(lang)) || (await loadTranslations("en"));
  if (!data || !data.rsvp) return;

  currentLang = translationCache[lang] ? lang : "en";
  currentRsvpStrings = data.rsvp;
  setLanguage(currentLang, currentRsvpStrings);
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
  const shouldShow = (activeRule?.names?.length || 0) > 1 && attending !== "no";

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

function renderPlusOneSection(t, allowPlusOne) {
  plusOneMount.innerHTML = "";
  plusOneRow = null;
  plusOneNameRow = null;
  plusOneNameInput = null;

  if (!allowPlusOne) {
    return;
  }

  const strings = t || fallbackRsvpStrings;
  const plusOneWrapper = document.createElement("div");
  plusOneWrapper.className = "form-row full";
  plusOneWrapper.innerHTML = `
    <span class="label" id="plusOneLabel">${strings.plusOneLabel}</span>
    <div class="radio-group">
      <label class="radio">
        <input type="radio" name="plus_one" value="yes">
        <span id="plusOneYes">${strings.yes}</span>
      </label>
      <label class="radio">
        <input type="radio" name="plus_one" value="no">
        <span id="plusOneNo">${strings.no}</span>
      </label>
    </div>
  `;

  const plusOneNameWrapper = document.createElement("div");
  plusOneNameWrapper.className = "form-row full";
  plusOneNameWrapper.hidden = true;
  plusOneNameWrapper.innerHTML = `
    <label for="plusOneName" id="plusOneNameLabel">${strings.plusOneNameLabel}</label>
    <input id="plusOneName" name="plus_one_name" type="text" placeholder="${strings.plusOneNamePlaceholder}">
  `;

  plusOneMount.appendChild(plusOneWrapper);
  plusOneMount.appendChild(plusOneNameWrapper);

  plusOneRow = plusOneWrapper;
  plusOneNameRow = plusOneNameWrapper;
  plusOneNameInput = plusOneNameWrapper.querySelector("#plusOneName");
}

function applyCodeRules(rule) {
  activeRule = rule;
  renderPlusOneSection(currentRsvpStrings, rule.allowPlusOne);
  updateSecondNameVisibility();
  updateOvernightVisibility();
}

function unlockWithCode(rawCode) {
  const code = rawCode.trim().toUpperCase();
  const t = currentRsvpStrings || { invalidCode: "Invalid code." };
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
  const t = currentRsvpStrings || { requiredField: "Please fill in the required fields." };

  if (!activeCode || !activeRule) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    formStatus.hidden = false;
    return;
  }

  const attending = form.elements["attending"].value;
  const plusOneValue = form.elements["plus_one"]?.value || "";

  const formData = new FormData();
  formData.append("code", activeCode);
  formData.append("guest_1_name", form.elements["name"].value.trim());
  formData.append("guest_2_name", form.elements["second_name"]?.value.trim() || "");
  formData.append("email", form.elements["email"]?.value.trim() || "");
  formData.append("attending", attending);
  formData.append("plus_one", plusOneValue || "");
  formData.append("plus_one_name", form.elements["plus_one_name"]?.value.trim() || "");
  formData.append("note", form.elements["notes"]?.value.trim() || "");

  if (!formData.get("guest_1_name") || !formData.get("attending")) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    formStatus.hidden = false;
    return;
  }

  if (activeRule.allowPlusOne && plusOneValue === "yes" && !formData.get("plus_one_name")) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    formStatus.hidden = false;
    return;
  }

  const overnightValue = form.elements["overnight"]?.value || "";
  const overnightDates = Array.from(form.elements["overnight_dates"] || [])
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (attending === "yes" && overnightValue === "yes" && overnightDates.length === 0) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.requiredField;
    formStatus.hidden = false;
    return;
  }

  formData.append("overnight", overnightValue);
  formData.append("dates", overnightDates.join(", "));

  formStatus.textContent = "";
  formStatus.dataset.state = "";
  formStatus.hidden = false;

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
    formStatus.hidden = false;
  } catch (error) {
    formStatus.dataset.state = "error";
    formStatus.textContent = t.statusError;
    formStatus.hidden = false;
  }
});

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
  const paramLang = params.get("lang");
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = ["en", "da", "ro", "bg"].includes(paramLang)
    ? paramLang
    : (["en", "da", "ro", "bg"].includes(browserLang) ? browserLang : "en");

  await switchLanguage(initialLang);
  await loadInvites();

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });

  const paramCode = params.get("code");
  if (paramCode) {
    unlockWithCode(paramCode);
  } else {
    codeStatus.dataset.state = "error";
    codeStatus.textContent = currentRsvpStrings?.invalidCode || "Invalid code.";
    form.hidden = true;
  }

  initReveal();
}

init();
