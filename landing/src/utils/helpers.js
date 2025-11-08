// Funções auxiliares
import { projectNegatives } from "../data/projects";

export const statusDot = (s) => {
  const base = "w-3.5 h-3.5 rounded-full";
  if (s === "yellow") return base + " bg-yellow-400";
  if (s === "red") return base + " bg-red-500";
  return base + " bg-green-500";
};

export const getTowerNames = (project) =>
  project.key === "vila-nova" ? ["Torre 1", "Torre 2", "Torre 3", "Torre 4"] : ["Torre A", "Torre B"];

export const getPrimaryUnits = (project) => {
  const towers = getTowerNames(project);
  return Array.from({ length: 12 }, (_, i) => {
    const tower = towers[i % towers.length];
    const apt = `${Math.floor(i / 4) + 1}0${(i % 4) + 1}`;
    const price = 350000 + i * 10000;
    return { id: `${tower} • Apto ${apt}`, tower, apt, price };
  });
};

export const enrichUnit = (u) => {
  const digits = String(u.apt);
  const floor = digits.length === 4 ? parseInt(digits.slice(0, 2), 10) : parseInt(digits.slice(0, 1), 10);
  const number = parseInt(digits.slice(-2), 10);
  const views = ["vista cidade", "vista parque", "vista mar", "vista interna"];
  const vIdx = (floor + number) % views.length;
  const bedrooms = 2 + (floor % 2);
  const bathrooms = bedrooms;
  const suites = bedrooms >= 3 ? 2 : 1;
  const area = Math.round(65 + bedrooms * 12 + floor * 1.5);
  return { ...u, floor, number, view: views[vIdx], bedrooms, bathrooms, suites, area };
};

export const makeVilaNovaApts = () => {
  const a = [];
  for (let floor = 1; floor <= 14; floor++) {
    for (let apt = 1; apt <= 4; apt++) {
      a.push(`${floor}${apt.toString().padStart(2, "0")}`);
    }
  }
  a.push("1501", "1502");
  return a;
};

export const useCondoData = (projectKey, projectName) => {
  const isVN = projectKey === "vila-nova";
  const towerNames = isVN ? ["Torre 1", "Torre 2", "Torre 3", "Torre 4"] : ["Torre A", "Torre B"];
  const towers = towerNames.map((name) => ({
    name,
    apartments: isVN ? makeVilaNovaApts() : makeVilaNovaApts().slice(0, 40),
  }));
  const negatives = projectNegatives[projectKey] || [];
  return { name: projectName, towers, negatives };
};

