import { promises as fs } from 'fs';
import path from 'path';
import type { SiteSettings } from '@/types';

const dataFilePath = path.join(process.cwd(), 'db', 'settings.json');

const defaultSettings: SiteSettings = {
  logo_url: "",
  contact: {
    email: "contacto@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Anytown, USA"
  },
  theme: {
    light: {
      background: "210 40% 98%",
      foreground: "222 47% 11%",
      accent: "173 95% 42%"
    },
    dark: {
      background: "222 47% 11%",
      foreground: "210 40% 98%",
      accent: "173 95% 42%"
    }
  }
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.warn('settings.json not found or invalid, using default settings.');
    
    try {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    } catch (mkdirError) {
       console.error('Could not create db directory', mkdirError);
    }
    
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(defaultSettings, null, 2), 'utf8');
      console.log('Created default settings.json file.');
      return defaultSettings;
    } catch (writeFileError) {
        console.error('Could not write default settings.json file', writeFileError);
        return defaultSettings;
    }
  }
}

export async function saveSettings(data: SiteSettings): Promise<{ success: boolean; error?: string }> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(dataFilePath, jsonData, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Failed to save settings:', error);
    return { success: false, error: 'Could not write to settings file.' };
  }
}
