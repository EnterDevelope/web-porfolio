/**
 * SkillGrid Component
 * Renders skill categories with dot indicators
 */

function createSkillGrid(skills) {
  const categoriesHtml = skills.categories.map(category => createSkillCategory(category)).join('');
  const languagesHtml = createLanguageSection(skills.languages);
  
  return `
    <div class="row mb-4">
      ${categoriesHtml}
    </div>
    <div class="row">
      ${languagesHtml}
    </div>
  `;
}

function createSkillCategory(category) {
  const itemsHtml = category.items.map(item => createSkillItem(item)).join('');
  
  return `
    <div class="col-md-6 mb-3">
      <div class="skill-category ${category.bgClass} p-3 rounded">
        <h4 class="h6 font-weight-bold mb-3">${category.title}</h4>
        ${itemsHtml}
      </div>
    </div>
  `;
}

function createSkillItem(item) {
  const dotsHtml = generateSkillDots(item.level);
  
  return `
    <div class="skill-item mb-2">
      <span class="skill-name">${item.name}</span>
      <div class="skill-dots d-inline-block ml-2">
        ${dotsHtml}
      </div>
    </div>
  `;
}

function generateSkillDots(level) {
  let dotsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const filledClass = i <= level ? 'filled' : '';
    dotsHtml += `<span class="dot ${filledClass}"></span>`;
  }
  return dotsHtml;
}

function createLanguageSection(languages) {
  return languages.map(lang => `
    <div class="col-md-6 animate-box">
      <div class="progress-wrap ftco-animate">
        <h3>${lang.name}</h3>
        <div class="progress">
          <div class="progress-bar color-2" role="progressbar" 
               aria-valuenow="${lang.level}" aria-valuemin="0" aria-valuemax="100" 
               style="width:${lang.level}%">
            ${lang.name.includes('OPIc') ? 'OPIc AL' : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSkillGrid, createSkillCategory, createSkillItem, generateSkillDots, createLanguageSection };
} else {
  window.SkillGrid = { createSkillGrid, createSkillCategory, createSkillItem, generateSkillDots, createLanguageSection };
}
