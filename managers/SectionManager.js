/**
 * SectionManager
 * Manages rendering of different sections with their respective data and templates
 */

class SectionManager {
  constructor(sectionId, data, templateFunction, options = {}) {
    this.sectionId = sectionId;
    this.data = data;
    this.templateFunction = templateFunction;
    this.options = {
      filter: null,
      sort: null,
      ...options
    };
  }
  
  render() {
    const container = document.getElementById(this.sectionId);
    if (!container) {
      console.error(`Container with id '${this.sectionId}' not found`);
      return;
    }
    
    let processedData = this.data;
    
    // Apply filters if specified
    if (this.options.filter) {
      processedData = this.applyFilter(processedData);
    }
    
    // Apply sorting if specified
    if (this.options.sort) {
      processedData = this.applySort(processedData);
    }
    
    // Generate HTML using template function
    const html = processedData.map(item => this.templateFunction(item)).join('');
    container.innerHTML = html;
  }
  
  applyFilter(data) {
    if (typeof this.options.filter === 'function') {
      return data.filter(this.options.filter);
    }
    return data;
  }
  
  applySort(data) {
    if (typeof this.options.sort === 'function') {
      return data.sort(this.options.sort);
    }
    return data;
  }
  
  addItem(item) {
    this.data.push(item);
    this.render();
  }
  
  updateItem(id, updatedItem) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedItem };
      this.render();
    }
  }
  
  removeItem(id) {
    this.data = this.data.filter(item => item.id !== id);
    this.render();
  }
  
  getData() {
    return this.data;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SectionManager;
} else {
  window.SectionManager = SectionManager;
}
