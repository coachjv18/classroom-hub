"use client";

import { useState, useEffect } from "react";

export default function ClassroomSite() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState("");
  const [period, setPeriod] = useState("1");

  const [unit, setUnit] = useState("Fall of the Western Roman Empire");
  const [day, setDay] = useState("Monday");
  const [answer, setAnswer] = useState("");
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("submissions");
    if (saved) setSubmissions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  const units = [
    "Fall of the Western Roman Empire",
    "Spread of Christianity",
    "Germanic Kingdoms",
    "Byzantine Empire",
    "Eastern Orthodox Church & Great Schism",
    "Byzantine Culture & Justinian Code",
    "Rise and Spread of Islam",
    "Islamic Sects & Culture",
    "Medieval Asia (China, India, Japan, Korea)",
    "Mongol Empire",
    "Religions in Asia",
    "Feudal Japan",
    "African Kingdoms (Ghana, Mali, Songhai)",
    "Indigenous Civilizations (Maya, Aztec, Inca, Mississippian)",
    "Medieval Europe (Feudalism, Church, Key Events)",
    "Magna Carta & Rule of Law",
    "Crusades, Reconquista, Spanish Inquisition",
    "Black Death",
    "Women in Medieval Europe",
    "Renaissance",
    "Reformation",
    "Scientific Revolution",
    "Age of Exploration",
    "Columbian Exchange",
    "Colonization & Indigenous Impact",
    "Transatlantic Slave Trade",
    "Absolutism",
    "English Government Development",
    "Political Philosophies (Hobbes & Locke)",
    "East Asia Governments (China & Japan)",
    "Enlightenment",

    "Enlightenment Influence on Revolutions",
    "American Revolution",
    "French Revolution",
    "Napoleon & Congress of Vienna",
    "Latin American Revolutions",
    "Industrial Revolution",
    "Economic Theories (Capitalism, Socialism, Marxism)",
    "Urbanization",
    "Nationalism",
    "Revolutions of 1848",
    "German & Italian Unification",
    "Meiji Restoration",
    "Imperialism",
    "Resistance to Imperialism",
    "World War I Causes",
    "World War I Warfare",
    "Russian Revolution",
    "Treaty of Versailles",
    "Interwar Period",
    "Rise of Totalitarianism",
    "Great Depression",
    "World War II",
    "Holocaust",
    "Cold War Origins",
    "Cold War Alliances & Organizations",
    "Chinese Civil War",
    "Decolonization",
    "Cold War Conflicts",
    "Collapse of the Soviet Union",
    "Modern Conflicts & Terrorism",
    "Globalization",
    "Trade & Economic Systems",
    "Technology & Communication",
    "Environmental Issues"
  ];

  const generateLesson = (topic) => ({
    bellringer: `What do you know about ${topic}?`,
    activity: `Study and analyze ${topic}.`,
    exit: `One important thing about ${topic}.`,
    quiz: [
      `Define ${topic}.`,
      `Why is ${topic} important?`,
      `Give one fact about ${topic}.`
    ]
  });

  const lesson = generateLesson(unit);

  const renderLogin = () => (
    <div>
      <h2>Login</h2>
      <input placeholder="Name" onChange={(e) => setUser(e.target.value)} />
      <input placeholder="Period" onChange={(e) => setPeriod(e.target.value)} />
      <button onClick={() => setView("home")}>Enter</button>
    </div>
  );

  const renderHome = () => (
    <div>
      <h1>Classroom Hub</h1>
      <button onClick={() => setView("today")}>Today</button>
      <button onClick={() => setView("units")}>Units</button>
      <button onClick={() => setView("submit")}>Submit</button>
    </div>
  );

  const renderToday = () => (
    <div>
      <button onClick={() => setView("home")}>Back</button>
      <h2>{unit}</h2>
      <p><b>Bellringer:</b> {lesson.bellringer}</p>
      <p><b>Activity:</b> {lesson.activity}</p>
      <p><b>Exit:</b> {lesson.exit}</p>
    </div>
  );

  const renderUnits = () => (
    <div>
      <button onClick={() => setView("home")}>Back</button>
      {units.map((t) => (
        <button key={t} onClick={() => setUnit(t)}>{t}</button>
      ))}
    </div>
  );

  const renderSubmit = () => {
    const key = `${user}-${unit}-${day}`;
    return (
      <div>
        <button onClick={() => setView("home")}>Back</button>
        <textarea onChange={(e) => setAnswer(e.target.value)} />
        <button onClick={() => {
          setSubmissions({ ...submissions, [key]: answer });
        }}>Submit</button>
        {submissions[key] && <p>Saved: {submissions[key]}</p>}
      </div>
    );
  };

  return (
    <div>
      {view === "login" && renderLogin()}
      {view === "home" && renderHome()}
      {view === "today" && renderToday()}
      {view === "units" && renderUnits()}
      {view === "submit" && renderSubmit()}
    </div>
  );
}
