/**
 * Animal Service
 * Handles animal health profiles, vaccination history, and medical history queries.
 */
import { apiService } from './apiService.js';
import { MOCK_ANIMALS } from '../mock/mockData.js';

const STORAGE_KEY = 'VET_ANIMALS_DATA';

class AnimalService {
  getAnimals() {
    return apiService.getFromStorage(STORAGE_KEY, MOCK_ANIMALS);
  }

  saveAnimals(animals) {
    apiService.saveToStorage(STORAGE_KEY, animals);
  }

  getAnimalById(id) {
    const animals = this.getAnimals();
    return animals.find(a => a.id === id || a.tagId === id) || null;
  }

  addVaccinationRecord(animalId, vaccination) {
    const animals = this.getAnimals();
    const index = animals.findIndex(a => a.id === animalId);
    if (index !== -1) {
      animals[index].vaccinations.unshift(vaccination);
      this.saveAnimals(animals);
      return animals[index];
    }
    return null;
  }
}

export const animalService = new AnimalService();
