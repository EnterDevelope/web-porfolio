/**
 * DataManager
 * Centralized data management and validation
 */

class DataManager {
  constructor() {
    this.data = {
      projects: [],
      skills: null,
      personal: null,
      experience: [],
      education: [],
      internship: []
    };
  }
  
  // Load data from external sources
  async loadData() {
    try {
      // Load projects
      if (typeof projects !== 'undefined') {
        this.data.projects = projects;
      }
      
      // Load skills
      if (typeof skills !== 'undefined') {
        this.data.skills = skills;
      }
      
      // Load personal info
      if (typeof personalInfo !== 'undefined') {
        this.data.personal = personalInfo;
      }
      
      // Load experience
      if (typeof experience !== 'undefined') {
        this.data.experience = experience;
      }
      
      // Load education
      if (typeof education !== 'undefined') {
        this.data.education = education;
      }
      
      // Load internship
      if (typeof internship !== 'undefined') {
        this.data.internship = internship;
      }
      
      return true;
    } catch (error) {
      console.error('Error loading data:', error);
      return false;
    }
  }
  
  // Get data by type
  getData(type) {
    return this.data[type] || null;
  }
  
  // Validate project data
  validateProject(project) {
    const requiredFields = ['id', 'title', 'date', 'problem', 'actions', 'metrics', 'evidence'];
    const missingFields = requiredFields.filter(field => !project[field]);
    
    if (missingFields.length > 0) {
      console.warn(`Project ${project.id} is missing required fields:`, missingFields);
      return false;
    }
    
    return true;
  }
  
  // Add new project
  addProject(project) {
    if (this.validateProject(project)) {
      this.data.projects.push(project);
      return true;
    }
    return false;
  }
  
  // Update project
  updateProject(id, updates) {
    const index = this.data.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...updates };
      return true;
    }
    return false;
  }
  
  // Remove project
  removeProject(id) {
    this.data.projects = this.data.projects.filter(project => project.id !== id);
  }
  
  // Filter projects by type
  filterProjects(type) {
    return this.data.projects.filter(project => project.type === type);
  }
  
  // Get project by ID
  getProject(id) {
    return this.data.projects.find(project => project.id === id);
  }
  
  // Get all data
  getAllData() {
    return this.data;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataManager;
} else {
  window.DataManager = DataManager;
}
