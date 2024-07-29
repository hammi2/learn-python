import { database } from './Fire.js';
import { ref, set } from 'firebase/database';
import CourceData from './src/screens/HomeScreen/data/CourceData.json' assert { type: 'json' };
import ProjectData from './src/screens/HomeScreen/data/ProjectData.json' assert { type: 'json' };
import LibrariesData from './src/screens/HomeScreen/data/LibrariesData.json' assert { type: 'json' };

const uploadAllData = async () => {
  try {
    // رفع بيانات CourceData
    const courceDataRef = ref(database, 'cources');
    await set(courceDataRef, CourceData);
    console.log('CourceData uploaded successfully');

    // رفع بيانات ProjectData
    const projectDataRef = ref(database, 'projects');
    await set(projectDataRef, ProjectData);
    console.log('ProjectData uploaded successfully');

    // رفع بيانات LibrariesData
    const librariesDataRef = ref(database, 'libraries');
    await set(librariesDataRef, LibrariesData);
    console.log('LibrariesData uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

uploadAllData();