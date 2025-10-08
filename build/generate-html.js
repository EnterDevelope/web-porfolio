/**
 * HTML Generator
 * Generates static HTML from data and templates
 */

const fs = require('fs');
const path = require('path');

class HTMLGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '../templates');
    this.outputPath = path.join(__dirname, '../dist');
    this.dataPath = path.join(__dirname, '../data');
  }
  
  async generate() {
    try {
      // Load all data
      const data = await this.loadAllData();
      
      // Load template
      const template = await this.loadTemplate();
      
      // Generate HTML
      const html = this.renderTemplate(template, data);
      
      // Write to output
      await this.writeOutput(html);
      
      console.log('HTML generated successfully');
    } catch (error) {
      console.error('Error generating HTML:', error);
    }
  }
  
  async loadAllData() {
    const data = {};
    
    // Load each data file
    const dataFiles = ['projects', 'skills', 'personal', 'experience', 'education', 'internship'];
    
    for (const file of dataFiles) {
      try {
        const filePath = path.join(this.dataPath, `${file}.js`);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract data from JS file (simple approach)
        const match = content.match(/const \w+ = (\[.*?\]);/s);
        if (match) {
          data[file] = JSON.parse(match[1]);
        }
      } catch (error) {
        console.warn(`Could not load ${file}.js:`, error.message);
      }
    }
    
    return data;
  }
  
  async loadTemplate() {
    const templatePath = path.join(this.templatePath, 'index-template.html');
    return fs.readFileSync(templatePath, 'utf8');
  }
  
  renderTemplate(template, data) {
    // Simple template replacement
    let html = template;
    
    // Replace placeholders with data
    html = html.replace(/\{\{projects\}\}/g, this.renderProjects(data.projects));
    html = html.replace(/\{\{skills\}\}/g, this.renderSkills(data.skills));
    html = html.replace(/\{\{personal\}\}/g, this.renderPersonal(data.personal));
    
    return html;
  }
  
  renderProjects(projects) {
    if (!projects) return '';
    
    return projects.map(project => `
      <div class="resume-wrap d-flex ftco-animate">
        <div class="icon d-flex align-items-center justify-content-center">
          <span class="flaticon-ideas"></span>
        </div>
        <div class="text pl-3">
          <span class="date">${project.date}</span>
          <h2>${project.title}</h2>
          <span class="position">${project.position}</span>
          <div class="mb-2"><span class="badge badge-dark mr-2">Problem</span> ${project.problem}</div>
          <div class="mb-2"><span class="badge badge-dark mr-2">Actions</span> ${project.actions}</div>
          <div class="mb-2"><span class="badge badge-dark mr-2">Metrics</span> ${project.metrics}</div>
          <div class="mb-2"><span class="badge badge-dark mr-2">Evidence</span> ${project.evidence}</div>
        </div>
      </div>
    `).join('');
  }
  
  renderSkills(skills) {
    if (!skills) return '';
    
    return skills.categories.map(category => `
      <div class="col-md-6 mb-3">
        <div class="skill-category ${category.bgClass} p-3 rounded">
          <h4 class="h6 font-weight-bold mb-3">${category.title}</h4>
          ${category.items.map(item => `
            <div class="skill-item mb-2">
              <span class="skill-name">${item.name}</span>
              <div class="skill-dots d-inline-block ml-2">
                ${this.generateSkillDots(item.level)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  
  generateSkillDots(level) {
    let dots = '';
    for (let i = 1; i <= 5; i++) {
      const filled = i <= level ? 'filled' : '';
      dots += `<span class="dot ${filled}"></span>`;
    }
    return dots;
  }
  
  renderPersonal(personal) {
    if (!personal) return '';
    
    return `
      <h1 class="big">About</h1>
      <h2 class="mb-4">About Me</h2>
      <p>"${personal.tagline}"</p>
      <p class="mt-2 mb-2"><strong>가치제안</strong>: ${personal.valueProposition}</p>
      <div class="d-flex flex-wrap">
        ${personal.traits.map(trait => `
          <span class="badge badge-${trait.type} mr-2 mb-2" aria-label="${trait.aria}">${trait.text}</span>
        `).join('')}
      </div>
    `;
  }
  
  async writeOutput(html) {
    // Ensure output directory exists
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
    
    // Write HTML file
    const outputFile = path.join(this.outputPath, 'index.html');
    fs.writeFileSync(outputFile, html);
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new HTMLGenerator();
  generator.generate();
}

module.exports = HTMLGenerator;
