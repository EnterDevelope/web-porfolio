/**
 * InternshipCard Component
 * Renders internship card with collapsible details
 */

function createInternshipCard(internship) {
  const detailsHtml = createCollapsibleDetails(internship.details);
  
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
        <div class="mt-3">
          <a class="btn btn-sm btn-outline-primary" data-toggle="collapse" 
             href="#${internship.id}-details" role="button" aria-expanded="false" 
             aria-controls="${internship.id}-details" 
             aria-label="${internship.title} 상세 내용 토글">자세히 보기</a>
          <div class="collapse mt-3" id="${internship.id}-details">
            <div class="card card-body">
              ${detailsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createCollapsibleDetails(details) {
  if (!details) return '';
  
  let detailsHtml = '';
  
  if (details.role) {
    detailsHtml += `
      <h3 class="h5 mb-2">역할과 맥락</h3>
      <ul class="mb-3">
        ${details.role.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
  
  if (details.problemDefinition) {
    detailsHtml += `
      <h3 class="h5 mb-2">핵심 문제 정의</h3>
      <ul class="mb-3">
        ${details.problemDefinition.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
  
  if (details.solution) {
    detailsHtml += `
      <h3 class="h5 mb-2">솔루션 설계</h3>
      <ul class="mb-3">
        ${details.solution.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
  
  if (details.results) {
    detailsHtml += `
      <h3 class="h5 mb-2">성과</h3>
      <ul class="mb-0">
        ${details.results.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }
  
  return detailsHtml;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createInternshipCard, createCollapsibleDetails };
} else {
  window.InternshipCard = { createInternshipCard, createCollapsibleDetails };
}
