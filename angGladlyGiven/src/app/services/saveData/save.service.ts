import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  // Save data to local storage
  static saveData(key: string, data: any): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  // Load data from local storage
  static loadData<T>(key: string): T | null {
    try {
      const jsonData = localStorage.getItem(key);
      if (jsonData) {
        return JSON.parse(jsonData) as T;
      }
      return null;
    } catch (error) {
      console.error('Error loading data from local storage:', error);
      return null;
    }
  }

  // Clear data from local storage
  static clearData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing data from local storage:', error);
    }
  }
}
