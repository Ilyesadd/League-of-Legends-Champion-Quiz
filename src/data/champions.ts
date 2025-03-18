// Champions data for League of Legends Quiz

export interface Champion {
  name: string;
  role: string;
  species: string;
  resource: string;
  rangeType: string;
  regions: string[];
  releaseYear: number;
  image: string;
}

const champions: Champion[] = [
  {
    name: "Ahri",
    role: "Mage",
    species: "Vastaya",
    resource: "Mana",
    rangeType: "Ranged",
    regions: ["Ionia"],
    releaseYear: 2011,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg"
  },
  {
    name: "Darius",
    role: "Fighter",
    species: "Human",
    resource: "Mana",
    rangeType: "Melee",
    regions: ["Noxus"],
    releaseYear: 2012,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg"
  },
  {
    name: "Jinx",
    role: "Marksman",
    species: "Human",
    resource: "Mana",
    rangeType: "Ranged",
    regions: ["Zaun"],
    releaseYear: 2013,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg"
  },
  {
    name: "Thresh",
    role: "Support",
    species: "Undead",
    resource: "Mana",
    rangeType: "Ranged",
    regions: ["Shadow Isles"],
    releaseYear: 2013,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg"
  },
  {
    name: "Zed",
    role: "Assassin",
    species: "Human",
    resource: "Energy",
    rangeType: "Melee",
    regions: ["Ionia"],
    releaseYear: 2012,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg"
  },
  {
    name: "Leona",
    role: "Tank",
    species: "Human",
    resource: "Mana",
    rangeType: "Melee",
    regions: ["Targon"],
    releaseYear: 2011,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg"
  },
  {
    name: "Yasuo",
    role: "Fighter",
    species: "Human",
    resource: "Flow",
    rangeType: "Melee",
    regions: ["Ionia"],
    releaseYear: 2013,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg"
  },
  {
    name: "Lux",
    role: "Mage",
    species: "Human",
    resource: "Mana",
    rangeType: "Ranged",
    regions: ["Demacia"],
    releaseYear: 2010,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg"
  },
  {
    name: "Pyke",
    role: "Support",
    species: "Revenant",
    resource: "Mana",
    rangeType: "Melee",
    regions: ["Bilgewater"],
    releaseYear: 2018,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg"
  },
  {
    name: "Senna",
    role: "Marksman",
    species: "Human",
    resource: "Mana",
    rangeType: "Ranged",
    regions: ["Shadow Isles"],
    releaseYear: 2019,
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Senna_0.jpg"
  }
];

export default champions;

// Helper functions for the quiz
export const getRandomChampion = (): Champion => {
  const randomIndex = Math.floor(Math.random() * champions.length);
  return champions[randomIndex];
};

export const getAllChampions = (): Champion[] => {
  return champions;
};

export const getChampionByName = (name: string): Champion | undefined => {
  const normalizedName = name.trim().toLowerCase();
  return champions.find(champion => champion.name.toLowerCase() === normalizedName);
};