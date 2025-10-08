/**
 * Main Application
 * Initializes and manages the portfolio application
 */

class PortfolioApp {
  constructor() {
    this.dataManager = new DataManager();
    this.sectionManagers = {};
    this.isInitialized = false;
  }
  
  async init() {
    try {
      // Load all data
      await this.dataManager.loadData();
      
      // Initialize section managers
      this.initializeSectionManagers();
      
      // Render all sections
      this.renderAllSections();
      
      this.isInitialized = true;
      console.log('Portfolio app initialized successfully');
    } catch (error) {
      console.error('Failed to initialize portfolio app:', error);
    }
  }
  
  initializeSectionManagers() {
    // Projects section
    if (typeof ProjectCard !== 'undefined') {
      this.sectionManagers.projects = new SectionManager(
        'projects-container',
        this.dataManager.getData('projects'),
        ProjectCard.createProjectCard,
        {
          filter: (project) => project.type === 'project' || project.type === 'side-project'
        }
      );
    }
    
    // Internship section
    if (typeof InternshipCard !== 'undefined') {
      this.sectionManagers.internship = new SectionManager(
        'internship-container',
        this.dataManager.getData('internship'),
        InternshipCard.createInternshipCard
      );
    }
    
    // Skills section
    if (typeof SkillGrid !== 'undefined') {
      this.sectionManagers.skills = new SectionManager(
        'skills-container',
        [this.dataManager.getData('skills')],
        (skills) => SkillGrid.createSkillGrid(skills)
      );
    }
  }
  
  renderAllSections() {
    Object.values(this.sectionManagers).forEach(manager => {
      manager.render();
    });
  }
  
  // Add new project
  addProject(project) {
    if (this.dataManager.addProject(project)) {
      this.sectionManagers.projects?.render();
      return true;
    }
    return false;
  }
  
  // Update project
  updateProject(id, updates) {
    if (this.dataManager.updateProject(id, updates)) {
      this.sectionManagers.projects?.render();
      return true;
    }
    return false;
  }
  
  // Remove project
  removeProject(id) {
    this.dataManager.removeProject(id);
    this.sectionManagers.projects?.render();
  }
  
  // Get project by ID
  getProject(id) {
    return this.dataManager.getProject(id);
  }
  
  // Get all projects
  getAllProjects() {
    return this.dataManager.getData('projects');
  }
  
  // Filter projects by type
  filterProjects(type) {
    return this.dataManager.filterProjects(type);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  window.portfolioApp = new PortfolioApp();
  await window.portfolioApp.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
} else {
  window.PortfolioApp = PortfolioApp;
}
