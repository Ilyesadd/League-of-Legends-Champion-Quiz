// Champion Service for fetching data from Riot's Data Dragon API

import { Champion } from '../data/champions';

// Current Data Dragon version
const DDRAGON_VERSION = '14.9.1';
const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

// Additional champion data that isn't available directly from Data Dragon
const CHAMPION_EXTRA_DATA: Record<string, { species: string; resource: string; regions: string[] }> = {
  Ahri: { species: 'Vastaya', resource: 'Mana', regions: ['Ionia'] },
  Darius: { species: 'Human', resource: 'Mana', regions: ['Noxus'] },
  Jinx: { species: 'Human', resource: 'Mana', regions: ['Zaun'] },
  Thresh: { species: 'Undead', resource: 'Mana', regions: ['Shadow Isles'] },
  Zed: { species: 'Human', resource: 'Energy', regions: ['Ionia'] },
  Leona: { species: 'Human', resource: 'Mana', regions: ['Targon'] },
  Yasuo: { species: 'Human', resource: 'Flow', regions: ['Ionia'] },
  Lux: { species: 'Human', resource: 'Mana', regions: ['Demacia'] },
  Pyke: { species: 'Revenant', resource: 'Mana', regions: ['Bilgewater'] },
  Senna: { species: 'Human', resource: 'Mana', regions: ['Shadow Isles'] },
  // Add more champions as needed
};

// Map Data Dragon roles to our simplified roles
const roleMapping: Record<string, string> = {
  Assassin: 'Assassin',
  Fighter: 'Fighter',
  Mage: 'Mage',
  Marksman: 'Marksman',
  Support: 'Support',
  Tank: 'Tank'
};

// Get release year data (not available in Data Dragon)
const getReleaseYear = (championName: string): number => {
  const releaseYears: Record<string, number> = {
    Ahri: 2011,
    Darius: 2012,
    Jinx: 2013,
    Thresh: 2013,
    Zed: 2012,
    Leona: 2011,
    Yasuo: 2013,
    Lux: 2010,
    Pyke: 2018,
    Senna: 2019,
    // Add more as needed
  };
  
  return releaseYears[championName] || 2020; // Default to 2020 if unknown
};

// Fetch all champions from Data Dragon API
export const fetchChampions = async (): Promise<Champion[]> => {
  try {
    const response = await fetch(`${DDRAGON_BASE_URL}/data/en_US/champion.json`);
    const data = await response.json();
    
    const champions: Champion[] = [];
    
    // Process each champion
    for (const key in data.data) {
      const champData = data.data[key];
      const name = champData.name;
      
      // Skip if we don't have extra data for this champion
      if (!CHAMPION_EXTRA_DATA[name]) continue;
      
      // Get primary role from tags
      const primaryRole = champData.tags[0];
      const role = roleMapping[primaryRole] || 'Fighter';
      
      // Determine range type based on Data Dragon stats
      const rangeType = champData.stats.attackrange > 300 ? 'Ranged' : 'Melee';
      
      // Create champion object
      const champion: Champion = {
        name,
        role,
        species: CHAMPION_EXTRA_DATA[name].species,
        resource: CHAMPION_EXTRA_DATA[name].resource,
        rangeType,
        regions: CHAMPION_EXTRA_DATA[name].regions,
        releaseYear: getReleaseYear(name),
        image: `${DDRAGON_BASE_URL}/img/champion/splash/${key}_0.jpg`
      };
      
      champions.push(champion);
    }
    
    return champions;
  } catch (error) {
    console.error('Error fetching champions:', error);
    // Fallback to local data if API fails
    return import('../data/champions').then(module => module.getAllChampions());
  }
};

// Get a random champion
export const getRandomChampion = async (): Promise<Champion> => {
  const champions = await fetchChampions();
  const randomIndex = Math.floor(Math.random() * champions.length);
  return champions[randomIndex];
};