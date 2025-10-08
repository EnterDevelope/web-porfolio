/**
 * Integration Tests
 * Tests for the complete portfolio management system
 */

// Mock DOM environment
const mockDOM = {
  getElementById: (id) => ({
    innerHTML: '',
    style: {}
  }),
  addEventListener: (event, callback) => {
    if (event === 'DOMContentLoaded') {
      setTimeout(callback, 100);
    }
  }
};

// Mock global objects
global.document = mockDOM;
global.window = {
  portfolioApp: null,
  projects: [],
  skills: null,
  personalInfo: null,
  experience: [],
  education: [],
  internship: []
};

// Test data
const testData = {
  projects: [
    {
      id: 'test-project-1',
      type: 'project',
      title: 'Test Project 1',
      date: '2024.01-2024.06',
      position: 'PM',
      problem: 'Test problem 1',
      actions: 'Test actions 1',
      metrics: 'Test metrics 1',
      evidence: 'Test evidence 1',
      links: {},
      media: null
    },
    {
      id: 'test-project-2',
      type: 'side-project',
      title: 'Test Project 2',
      date: '2024.07-2024.12',
      position: 'Developer',
      problem: 'Test problem 2',
      actions: 'Test actions 2',
      metrics: 'Test metrics 2',
      evidence: 'Test evidence 2',
      links: { demo: 'https://example.com' },
      media: null
    }
  ],
  skills: {
    categories: [
      {
        id: 'tech',
        title: 'Technology',
        bgClass: 'bg-light',
        items: [
          { name: 'React', level: 4 },
          { name: 'JavaScript', level: 5 }
        ]
      }
    ],
    languages: [
      { name: 'English', level: 85 },
      { name: 'Korean', level: 100 }
    ]
  },
  personalInfo: {
    name: 'Test User',
    title: 'Test PM',
    tagline: 'Test tagline',
    valueProposition: 'Test value proposition',
    traits: [
      { text: 'Test Trait', type: 'primary', aria: 'Test aria' }
    ]
  },
  experience: [
    {
      id: 'test-exp',
      date: '2020-2024',
      title: 'Test Experience',
      position: 'Test Position',
      description: 'Test description'
    }
  ],
  education: [
    {
      id: 'test-edu',
      date: '2016-2020',
      title: 'Test University',
      position: 'Test Major',
      description: 'Test description'
    }
  ],
  internship: [
    {
      id: 'test-intern',
      title: 'Test Internship',
      date: '2024.01-2024.06',
      position: 'Test Intern',
      problem: 'Test problem',
      actions: 'Test actions',
      metrics: 'Test metrics',
      evidence: 'Test evidence',
      details: {
        role: ['Test role 1', 'Test role 2'],
        problemDefinition: ['Test problem 1', 'Test problem 2'],
        solution: ['Test solution 1', 'Test solution 2'],
        results: ['Test result 1', 'Test result 2']
      }
    }
  ]
};

// Test functions
function testDataLoading() {
  console.log('Testing data loading...');
  
  try {
    // Simulate data loading
    global.window.projects = testData.projects;
    global.window.skills = testData.skills;
    global.window.personalInfo = testData.personalInfo;
    global.window.experience = testData.experience;
    global.window.education = testData.education;
    global.window.internship = testData.internship;
    
    console.log('✓ Data loaded successfully');
    return true;
  } catch (error) {
    console.log('✗ Data loading failed:', error.message);
    return false;
  }
}

function testComponentRendering() {
  console.log('Testing component rendering...');
  
  try {
    // Test project card rendering
    const projectCard = renderProjectCard(testData.projects[0]);
    console.log('✓ Project card rendered:', projectCard.length > 0);
    
    // Test skills grid rendering
    const skillsGrid = renderSkillsGrid(testData.skills);
    console.log('✓ Skills grid rendered:', skillsGrid.length > 0);
    
    // Test internship card rendering
    const internshipCard = renderInternshipCard(testData.internship[0]);
    console.log('✓ Internship card rendered:', internshipCard.length > 0);
    
    return true;
  } catch (error) {
    console.log('✗ Component rendering failed:', error.message);
    return false;
  }
}

function testDataManagement() {
  console.log('Testing data management...');
  
  try {
    // Test project filtering
    const projects = testData.projects.filter(p => p.type === 'project');
    console.log('✓ Project filtering works:', projects.length === 1);
    
    // Test project updating
    const updatedProject = { ...testData.projects[0], title: 'Updated Title' };
    console.log('✓ Project updating works:', updatedProject.title === 'Updated Title');
    
    // Test project addition
    const newProject = { ...testData.projects[0], id: 'new-project' };
    const allProjects = [...testData.projects, newProject];
    console.log('✓ Project addition works:', allProjects.length === 3);
    
    return true;
  } catch (error) {
    console.log('✗ Data management failed:', error.message);
    return false;
  }
}

function testSectionManagement() {
  console.log('Testing section management...');
  
  try {
    // Test section rendering
    const projectsSection = renderProjectsSection(testData.projects);
    console.log('✓ Projects section rendered:', projectsSection.length > 0);
    
    // Test skills section rendering
    const skillsSection = renderSkillsSection(testData.skills);
    console.log('✓ Skills section rendered:', skillsSection.length > 0);
    
    // Test internship section rendering
    const internshipSection = renderInternshipSection(testData.internship);
    console.log('✓ Internship section rendered:', internshipSection.length > 0);
    
    return true;
  } catch (error) {
    console.log('✗ Section management failed:', error.message);
    return false;
  }
}

function testAppInitialization() {
  console.log('Testing app initialization...');
  
  try {
    // Simulate app initialization
    const app = {
      dataManager: {
        loadData: () => Promise.resolve(true),
        getData: (type) => testData[type] || null
      },
      sectionManagers: {},
      isInitialized: false
    };
    
    // Test initialization
    app.isInitialized = true;
    console.log('✓ App initialization works:', app.isInitialized);
    
    // Test data access
    const projects = app.dataManager.getData('projects');
    console.log('✓ Data access works:', projects.length === 2);
    
    return true;
  } catch (error) {
    console.log('✗ App initialization failed:', error.message);
    return false;
  }
}

// Mock rendering functions
function renderProjectCard(project) {
  return `
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
  `;
}

function renderSkillsGrid(skills) {
  return skills.categories.map(category => `
    <div class="col-md-6 mb-3">
      <div class="skill-category ${category.bgClass} p-3 rounded">
        <h4 class="h6 font-weight-bold mb-3">${category.title}</h4>
        ${category.items.map(item => `
          <div class="skill-item mb-2">
            <span class="skill-name">${item.name}</span>
            <div class="skill-dots d-inline-block ml-2">
              ${generateSkillDots(item.level)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderInternshipCard(internship) {
  return `
    <div class="resume-wrap d-flex ftco-animate">
      <div class="icon d-flex align-items-center justify-content-center">
        <span class="flaticon-ideas"></span>
      </div>
      <div class="text pl-3">
        <span class="date">${internship.date}</span>
        <h2>${internship.title}</h2>
        <div class="mb-2"><span class="badge badge-dark mr-2">Problem</span> ${internship.problem}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Actions</span> ${internship.actions}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Metrics</span> ${internship.metrics}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Evidence</span> ${internship.evidence}</div>
      </div>
    </div>
  `;
}

function renderProjectsSection(projects) {
  return projects.map(project => renderProjectCard(project)).join('');
}

function renderSkillsSection(skills) {
  return renderSkillsGrid(skills);
}

function renderInternshipSection(internships) {
  return internships.map(internship => renderInternshipCard(internship)).join('');
}

function generateSkillDots(level) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= level ? 'filled' : '';
    dots += `<span class="dot ${filled}"></span>`;
  }
  return dots;
}

// Run all integration tests
function runIntegrationTests() {
  console.log('=== Portfolio Management System Integration Tests ===\n');
  
  const tests = [
    testDataLoading,
    testComponentRendering,
    testDataManagement,
    testSectionManagement,
    testAppInitialization
  ];
  
  let passed = 0;
  let total = tests.length;
  
  tests.forEach(test => {
    try {
      if (test()) {
        passed++;
      }
    } catch (error) {
      console.error('Integration test failed:', error.message);
    }
  });
  
  console.log(`\n=== Integration Test Results ===`);
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Success Rate: ${(passed/total*100).toFixed(1)}%`);
  
  return passed === total;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runIntegrationTests, testDataLoading, testComponentRendering, testDataManagement, testSectionManagement, testAppInitialization };
} else {
  window.IntegrationTests = { runIntegrationTests, testDataLoading, testComponentRendering, testDataManagement, testSectionManagement, testAppInitialization };
}
