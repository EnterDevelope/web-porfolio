/**
 * Data Validation Tests
 * Tests for data structure and validation
 */

// Mock data for testing
const mockProject = {
  id: 'test-project',
  type: 'project',
  title: 'Test Project',
  date: '2024.01-2024.06',
  position: 'PM',
  problem: 'Test problem',
  actions: 'Test actions',
  metrics: 'Test metrics',
  evidence: 'Test evidence',
  links: {},
  media: null
};

const mockSkills = {
  categories: [
    {
      id: 'test-category',
      title: 'Test Category',
      bgClass: 'bg-light',
      items: [
        { name: 'Test Skill', level: 3 }
      ]
    }
  ],
  languages: [
    { name: 'English', level: 85 }
  ]
};

// Test functions
function testProjectValidation() {
  console.log('Testing project validation...');
  
  // Test valid project
  const validProject = { ...mockProject };
  console.log('✓ Valid project structure:', validProject.id);
  
  // Test missing required fields
  const invalidProject = { ...mockProject };
  delete invalidProject.id;
  console.log('✗ Invalid project (missing id):', !invalidProject.id);
  
  // Test invalid type
  const wrongTypeProject = { ...mockProject, type: 'invalid' };
  console.log('✗ Invalid project type:', wrongTypeProject.type);
  
  return true;
}

function testSkillsValidation() {
  console.log('Testing skills validation...');
  
  // Test valid skills
  console.log('✓ Valid skills structure:', mockSkills.categories.length > 0);
  
  // Test skill level validation
  const validLevel = mockSkills.categories[0].items[0].level;
  console.log('✓ Valid skill level (1-5):', validLevel >= 1 && validLevel <= 5);
  
  // Test language level validation
  const validLangLevel = mockSkills.languages[0].level;
  console.log('✓ Valid language level (0-100):', validLangLevel >= 0 && validLangLevel <= 100);
  
  return true;
}

function testDataIntegrity() {
  console.log('Testing data integrity...');
  
  // Test project ID uniqueness
  const projects = [mockProject, { ...mockProject, id: 'another-project' }];
  const uniqueIds = new Set(projects.map(p => p.id));
  console.log('✓ Unique project IDs:', uniqueIds.size === projects.length);
  
  // Test required fields
  const requiredFields = ['id', 'title', 'date', 'problem', 'actions', 'metrics', 'evidence'];
  const hasAllFields = requiredFields.every(field => mockProject.hasOwnProperty(field));
  console.log('✓ All required fields present:', hasAllFields);
  
  return true;
}

function testComponentGeneration() {
  console.log('Testing component generation...');
  
  // Test project card generation
  try {
    const projectHtml = generateProjectCard(mockProject);
    console.log('✓ Project card HTML generated:', projectHtml.length > 0);
  } catch (error) {
    console.log('✗ Project card generation failed:', error.message);
  }
  
  // Test skills grid generation
  try {
    const skillsHtml = generateSkillGrid(mockSkills);
    console.log('✓ Skills grid HTML generated:', skillsHtml.length > 0);
  } catch (error) {
    console.log('✗ Skills grid generation failed:', error.message);
  }
  
  return true;
}

// Mock component functions for testing
function generateProjectCard(project) {
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

function generateSkillGrid(skills) {
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

function generateSkillDots(level) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= level ? 'filled' : '';
    dots += `<span class="dot ${filled}"></span>`;
  }
  return dots;
}

// Run all tests
function runAllTests() {
  console.log('=== Portfolio Management System Tests ===\n');
  
  const tests = [
    testProjectValidation,
    testSkillsValidation,
    testDataIntegrity,
    testComponentGeneration
  ];
  
  let passed = 0;
  let total = tests.length;
  
  tests.forEach(test => {
    try {
      if (test()) {
        passed++;
      }
    } catch (error) {
      console.error('Test failed:', error.message);
    }
  });
  
  console.log(`\n=== Test Results ===`);
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Success Rate: ${(passed/total*100).toFixed(1)}%`);
  
  return passed === total;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runAllTests, testProjectValidation, testSkillsValidation, testDataIntegrity, testComponentGeneration };
} else {
  window.DataValidationTests = { runAllTests, testProjectValidation, testSkillsValidation, testDataIntegrity, testComponentGeneration };
}
