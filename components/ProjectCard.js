/**
 * ProjectCard Component
 * Renders a project card with P/A/M/E structure
 */

function createProjectCard(project) {
  const linksHtml = generateProjectLinks(project.links);
  const mediaHtml = generateProjectMedia(project.media);
  
  return `
    <div class="resume-wrap d-flex ftco-animate">
      <div class="icon d-flex align-items-center justify-content-center">
        <span class="flaticon-ideas"></span>
      </div>
      <div class="text pl-3">
        <span class="date">${project.date}</span>
        <h2>${project.title}${linksHtml}</h2>
        <span class="position">${project.position}</span>
        <div class="mb-2"><span class="badge badge-dark mr-2">Problem</span> ${project.problem}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Actions</span> ${project.actions}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Metrics</span> ${project.metrics}</div>
        <div class="mb-2"><span class="badge badge-dark mr-2">Evidence</span> ${project.evidence}</div>
        ${mediaHtml}
      </div>
    </div>
  `;
}

function generateProjectLinks(links) {
  if (!links || Object.keys(links).length === 0) return '';
  
  let linksHtml = '';
  for (const [type, url] of Object.entries(links)) {
    const buttonClass = type === 'demo' ? 'btn-primary' : 'btn-outline-secondary';
    const buttonText = type === 'demo' ? '상세내용 보기' : 'PDF 다운로드';
    const ariaLabel = type === 'demo' ? `${type} 페이지 이동` : `${type} 파일 다운로드`;
    
    linksHtml += `
      <a class="btn ${buttonClass} ml-2" target="_blank" aria-label="${ariaLabel}"
        href="${url}">${buttonText}</a>
    `;
  }
  
  return linksHtml;
}

function generateProjectMedia(media) {
  if (!media) return '';
  
  let mediaHtml = '';
  
  if (media.image) {
    mediaHtml += `
      <div class="project img ftco-animate d-flex justify-content-center align-items-center" 
           style="background-image: url(${media.image});">
      </div>
      <br>
    `;
  }
  
  if (media.video) {
    mediaHtml += `
      <iframe width="760" height="415" src="${media.video}" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe>
    `;
  }
  
  return mediaHtml;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createProjectCard, generateProjectLinks, generateProjectMedia };
} else {
  window.ProjectCard = { createProjectCard, generateProjectLinks, generateProjectMedia };
}
