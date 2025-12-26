const codeRules = {
  "ANGEL-EVELIN": { household: "Angel & Evelin", maxAdults: 2, maxChildren: 1, allowPlusOne: false },
  "YOSIF": { household: "Yosif", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "SLAVI": { household: "Slavi", maxAdults: 2, maxChildren: 0, allowPlusOne: true },
  "STOYAN": { household: "Stoyan", maxAdults: 2, maxChildren: 0, allowPlusOne: true }
};

const translations = {
  en: {
    title: "Maria & Ivan",
    date: "June 27, 2026 at 15:00",
    navHome: "Home",
    navCeremony: "Ceremony",
    navReception: "Reception",
    navInfo: "Info",
    navRsvp: "RSVP",
    welcomeTitle: "We're getting married",
    welcomeText: "We can't wait to celebrate with you.",
    detailsTitle: "Wedding Celebration",
    detailsText: "More details and a formal invitation to follow.",
    ceremonyTitle: "Ceremony",
    ceremonyLead: "15:00 - Ceremony in Odense C",
    ceremonyText: "Our ceremony begins at the church. Follow the signs to the center and the church.",
    ceremonyAddressLabel: "Address:",
    ceremonyAddress: "Store Torv, 8000 Aarhus",
    receptionTitle: "Dinner and celebration",
    receptionLead: "Dinner and celebration in Risskov",
    receptionText: "Around 16:00 the couple arrives at the venue for dinner and party. The venue is about one kilometer from the church.",
    receptionAddressLabel: "Address:",
    receptionAddress: "Vejen 87, 8240 Risskov",
    infoTitle: "Good to know",
    infoOneTitle: "Food and drinks",
    infoOneText: "Starter, main course, and wedding cake. Drinks are served during dinner and at the bar.",
    infoTwoTitle: "Accommodation",
    infoTwoText: "If you are traveling from afar, we recommend Hotel Rubin near the venue.",
    infoThreeTitle: "Dress code: Dark suit",
    infoThreeText: "Men: dark suit with shirt and tie or bow tie. Women: an elegant dress.",
    infoFourTitle: "Kids",
    infoFourText: "We are still considering the best option for children. More info soon.",
    rsvpCtaTitle: "RSVP",
    rsvpCtaText: "Use your invitation code to access the RSVP form.",
    codeLabel: "RSVP code",
    codeButton: "Unlock",
    invalidCode: "Invalid code.",
    countDays: "days",
    countHours: "hours",
    countMinutes: "minutes",
    countSeconds: "seconds"
  },
  da: {
    title: "Maria & Ivan",
    date: "27. juni 2026 kl. 15:00",
    navHome: "Start",
    navCeremony: "Vielse",
    navReception: "Festen",
    navInfo: "Godt at vide",
    navRsvp: "Tilmelding",
    welcomeTitle: "Vi skal giftes!",
    welcomeText: "Vi glæder os til at fejre dagen med jer.",
    detailsTitle: "Bryllupsfest",
    detailsText: "Flere detaljer og formel invitation følger snart.",
    ceremonyTitle: "Vielse",
    ceremonyLead: "15:00 - Vielse i Odense C",
    ceremonyText: "Klokken tre begynder vores vielse i Vor Frue Kirke i Aarhus. Du finder lettest derhen ved at følge skiltene mod centrum og kirken.",
    ceremonyAddressLabel: "Adresse:",
    ceremonyAddress: "Store Torv, 8000 Aarhus",
    receptionTitle: "Middag og fest",
    receptionLead: "Middag og fest i Risskov",
    receptionText: "Omkring kl. 16 ankommer brudeparret til forsamlingshuset i Risskov. Der serveres middag efterfulgt af fest. Fra kirken til festlokalet er der cirka én kilometer.",
    receptionAddressLabel: "Adresse:",
    receptionAddress: "Vejen 87, 8240 Risskov",
    infoTitle: "Godt at vide",
    infoOneTitle: "Mad og drikke",
    infoOneText: "Forret, hovedret og traditionel bryllupskage. Vi byder på drikkevarer både under middagen og i baren bagefter.",
    infoTwoTitle: "Overnatning",
    infoTwoText: "Kommer du langvejsfra og vil overnatte, anbefaler vi Hotel Rubin, som ligger tæt på festlokalet.",
    infoThreeTitle: "Påklædning: Mørkt jakkesæt",
    infoThreeText: "For herrer betyder det et mørkt jakkesæt med skjorte og slips eller butterfly. For damer passer en elegant kjole bedst.",
    infoFourTitle: "Børn",
    infoFourText: "Vi overvejer stadig, hvordan vi bedst gør i forhold til børn. Mere info følger snart.",
    rsvpCtaTitle: "Tilmelding",
    rsvpCtaText: "Brug din invitationskode for at åbne tilmeldingen.",
    codeLabel: "Tilmeldingskode",
    codeButton: "Lås op",
    invalidCode: "Ugyldig kode.",
    countDays: "dage",
    countHours: "timer",
    countMinutes: "minutter",
    countSeconds: "sekunder"
  },
  ro: {
    title: "Maria & Ivan",
    date: "27 iunie 2026 la 15:00",
    navHome: "Acasă",
    navCeremony: "Cununie",
    navReception: "Petrecere",
    navInfo: "Info",
    navRsvp: "Confirmare",
    welcomeTitle: "Ne căsătorim!",
    welcomeText: "Abia așteptăm să sărbătorim împreună cu voi.",
    detailsTitle: "Sărbătoare de nuntă",
    detailsText: "Mai multe detalii și invitația oficială urmează.",
    ceremonyTitle: "Cununie",
    ceremonyLead: "15:00 - Cununie în Odense C",
    ceremonyText: "Cununia noastră începe la biserică. Urmează indicatoarele spre centru și biserică.",
    ceremonyAddressLabel: "Adresă:",
    ceremonyAddress: "Store Torv, 8000 Aarhus",
    receptionTitle: "Cină și petrecere",
    receptionLead: "Cină și petrecere în Risskov",
    receptionText: "În jurul orei 16:00 ajungem la locație pentru cină și petrecere. Locația este la aproximativ un kilometru de biserică.",
    receptionAddressLabel: "Adresă:",
    receptionAddress: "Vejen 87, 8240 Risskov",
    infoTitle: "Bine de știut",
    infoOneTitle: "Mâncare și băutură",
    infoOneText: "Felul întâi, felul principal și tortul de nuntă. Servim băuturi la cină și la bar.",
    infoTwoTitle: "Cazare",
    infoTwoText: "Dacă veniți de departe și doriți să rămâneți peste noapte, recomandăm Hotel Rubin aproape de locație.",
    infoThreeTitle: "Ținută: costum închis",
    infoThreeText: "Bărbați: costum închis cu cămașă și cravată sau papion. Femei: rochie elegantă.",
    infoFourTitle: "Copii",
    infoFourText: "Încă decidem cum procedăm cu copiii. Urmează informații.",
    rsvpCtaTitle: "Confirmare",
    rsvpCtaText: "Folosește codul invitației pentru a deschide formularul.",
    codeLabel: "Cod RSVP",
    codeButton: "Deblochează",
    invalidCode: "Cod invalid.",
    countDays: "zile",
    countHours: "ore",
    countMinutes: "minute",
    countSeconds: "secunde"
  },
  bg: {
    title: "Maria & Ivan",
    date: "27 юни 2026 г. в 15:00",
    navHome: "Начало",
    navCeremony: "Венчавка",
    navReception: "Тържество",
    navInfo: "Инфо",
    navRsvp: "Потвърждение",
    welcomeTitle: "Ще се женим!",
    welcomeText: "Нямаме търпение да празнуваме с вас.",
    detailsTitle: "Сватбено тържество",
    detailsText: "Още детайли и официална покана ще последват.",
    ceremonyTitle: "Венчавка",
    ceremonyLead: "15:00 - Венчавка в Оденсе C",
    ceremonyText: "Церемонията започва в църквата. Следвайте табелите към центъра и църквата.",
    ceremonyAddressLabel: "Адрес:",
    ceremonyAddress: "Store Torv, 8000 Aarhus",
    receptionTitle: "Вечеря и празненство",
    receptionLead: "Вечеря и празненство в Рисков",
    receptionText: "Около 16:00 пристигаме в залата за вечеря и празненство. От църквата до мястото са около един километър.",
    receptionAddressLabel: "Адрес:",
    receptionAddress: "Vejen 87, 8240 Risskov",
    infoTitle: "Добре е да знаете",
    infoOneTitle: "Храна и напитки",
    infoOneText: "Предястие, основно и традиционна сватбена торта. Предлагаме напитки по време на вечерята и в бара.",
    infoTwoTitle: "Нощувка",
    infoTwoText: "Ако идвате отдалеч и желаете да останете, препоръчваме Hotel Rubin близо до мястото.",
    infoThreeTitle: "Облекло: тъмен костюм",
    infoThreeText: "Мъже: тъмен костюм с риза и вратовръзка или папийонка. Жени: елегантна рокля.",
    infoFourTitle: "Деца",
    infoFourText: "Все още решаваме как да постъпим с децата. Повече информация скоро.",
    rsvpCtaTitle: "Потвърждение",
    rsvpCtaText: "Използвайте кода от поканата, за да отворите формата.",
    codeLabel: "Код за RSVP",
    codeButton: "Отключи",
    invalidCode: "Невалиден код.",
    countDays: "дни",
    countHours: "часа",
    countMinutes: "минути",
    countSeconds: "секунди"
  }
};

const langButtons = document.querySelectorAll(".lang-switcher button");
const codeInput = document.getElementById("rsvpCodeIndex");
const codeButton = document.getElementById("codeBtn");
const codeStatus = document.getElementById("codeStatus");

function setLanguage(lang) {
  const t = translations[lang];
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
  document.getElementById("receptionAddressLabel").textContent = t.receptionAddressLabel;
  document.getElementById("receptionAddress").textContent = t.receptionAddress;
  document.getElementById("infoTitle").textContent = t.infoTitle;
  document.getElementById("infoOneTitle").textContent = t.infoOneTitle;
  document.getElementById("infoOneText").textContent = t.infoOneText;
  document.getElementById("infoTwoTitle").textContent = t.infoTwoTitle;
  document.getElementById("infoTwoText").textContent = t.infoTwoText;
  document.getElementById("infoThreeTitle").textContent = t.infoThreeTitle;
  document.getElementById("infoThreeText").textContent = t.infoThreeText;
  document.getElementById("infoFourTitle").textContent = t.infoFourTitle;
  document.getElementById("infoFourText").textContent = t.infoFourText;
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

function verifyCode() {
  const code = codeInput.value.trim().toUpperCase();
  const activeLang = document.documentElement.lang || "en";
  const t = translations[activeLang] || translations.en;

  if (!codeRules[code]) {
    codeStatus.dataset.state = "error";
    codeStatus.textContent = t.invalidCode;
    return;
  }

  codeStatus.dataset.state = "";
  codeStatus.textContent = "";
  window.location.href = `rsvp.html?code=${encodeURIComponent(code)}&lang=${encodeURIComponent(activeLang)}`;
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

codeButton.addEventListener("click", verifyCode);
codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    verifyCode();
  }
});

const browserLang = navigator.language.slice(0, 2);
setLanguage(translations[browserLang] ? browserLang : "en");
