const translations = {
  en: {
    title: "Maria & Ivan",
    date: "June 2026 · Denmark",
    welcomeTitle: "We’re getting married!",
    welcomeText: "We can’t wait to celebrate with you.",
    rsvpTitle: "RSVP",
    nameLabel: "Your name",
    attendingLabel: "Will you attend?",
    yes: "Yes",
    no: "No",
    plusOneLabel: "Will you bring a +1?",
    mealLabel: "Meal preference",
    fish: "Fish",
    chicken: "Chicken",
    nightsLabel: "Nights staying at the venue",
    submit: "Send RSVP"
  },

  da: {
    title: "Maria & Ivan",
    date: "Juni 2026 · Danmark",
    welcomeTitle: "Vi skal giftes!",
    welcomeText: "Vi glæder os til at fejre dagen med jer.",
    rsvpTitle: "Tilmelding",
    nameLabel: "Dit navn",
    attendingLabel: "Deltager du?",
    yes: "Ja",
    no: "Nej",
    plusOneLabel: "Medbringer du en +1?",
    mealLabel: "Menuvalg",
    fish: "Fisk",
    chicken: "Kylling",
    nightsLabel: "Antal nætter på stedet",
    submit: "Send svar"
  },

  ro: {
    title: "Maria & Ivan",
    date: "Iunie 2026 · Danemarca",
    welcomeTitle: "Ne căsătorim!",
    welcomeText: "Abia așteptăm să sărbătorim împreună cu voi.",
    rsvpTitle: "Confirmare",
    nameLabel: "Numele tău",
    attendingLabel: "Vei participa?",
    yes: "Da",
    no: "Nu",
    plusOneLabel: "Vii cu +1?",
    mealLabel: "Preferință meniu",
    fish: "Pește",
    chicken: "Pui",
    nightsLabel: "Număr de nopți la locație",
    submit: "Trimite"
  },

  bg: {
    title: "Мария и Иван",
    date: "Юни 2026 · Дания",
    welcomeTitle: "Ние се женим!",
    welcomeText: "Очакваме с нетърпение да празнуваме заедно.",
    rsvpTitle: "Потвърждение",
    nameLabel: "Вашето име",
    attendingLabel: "Ще присъствате ли?",
    yes: "Да",
    no: "Не",
    plusOneLabel: "Ще доведете ли +1?",
    mealLabel: "Избор на меню",
    fish: "Риба",
    chicken: "Пиле",
    nightsLabel: "Брой нощувки",
    submit: "Изпрати"
  }
};

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.getElementById("title").textContent = t.title;
  document.getElementById("date").textContent = t.date;
  document.getElementById("welcomeTitle").textContent = t.welcomeTitle;
  document.getElementById("welcomeText").textContent = t.welcomeText;
  document.getElementById("rsvpTitle").textContent = t.rsvpTitle;

  document.getElementById("nameLabel").textContent = t.nameLabel;
  document.getElementById("attendingLabel").textContent = t.attendingLabel;
  document.getElementById("yesOption").textContent = t.yes;
  document.getElementById("noOption").textContent = t.no;
  document.getElementById("plusOneLabel").textContent = t.plusOneLabel;
  document.getElementById("plusOneYes").textContent = t.yes;
  document.getElementById("plusOneNo").textContent = t.no;
  document.getElementById("mealLabel").textContent = t.mealLabel;
  document.getElementById("fishOption").textContent = t.fish;
  document.getElementById("chickenOption").textContent = t.chicken;
  document.getElementById("nightsLabel").textContent = t.nightsLabel;
  document.getElementById("submitBtn").textContent = t.submit;
}

document.querySelectorAll(".lang-switcher button").forEach(btn => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// Default language
const browserLang = navigator.language.slice(0, 2);
setLanguage(translations[browserLang] ? browserLang : "en");
