/**
 * GA4 추적 스크립트
 * 포트폴리오 웹사이트의 사용자 행동을 추적합니다.
 */

class GA4Tracker {
    constructor() {
        this.scrollDepths = [25, 50, 75, 90];
        this.trackedScrollDepths = new Set();
        this.sectionStartTimes = new Map();
        this.init();
    }

    init() {
        // DOM이 로드된 후 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupTracking());
        } else {
            this.setupTracking();
        }
    }

    setupTracking() {
        this.trackScrollDepth();
        this.trackSectionViews();
        this.trackClicks();
        this.trackFormSubmissions();
        this.trackVideoPlays();
        this.trackModalInteractions();
        this.trackExternalLinks();
        this.trackPDFDownloads();
        this.trackProjectEngagement();
    }

    // GA4 이벤트 전송 헬퍼 함수
    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: parameters.category || 'engagement',
                event_label: parameters.label || '',
                value: parameters.value || 0,
                ...parameters
            });
        }
    }

    // 스크롤 깊이 추적
    trackScrollDepth() {
        let ticking = false;
        
        const updateScrollDepth = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            this.scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !this.trackedScrollDepths.has(depth)) {
                    this.trackedScrollDepths.add(depth);
                    this.trackEvent('scroll_depth', {
                        category: 'engagement',
                        label: `${depth}%`,
                        value: depth
                    });
                }
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollDepth);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // 섹션 진입 추적
    trackSectionViews() {
        const sections = [
            { id: 'about-section', name: 'About' },
            { id: 'resume-section', name: 'Resume' },
            { id: 'education-section', name: 'Education' },
            { id: 'contact-section', name: 'Contact' }
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.getAttribute('data-section-name') || 
                                       entry.target.id.replace('-section', '');
                    
                    this.trackEvent('view_section', {
                        category: 'navigation',
                        label: sectionName
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                element.setAttribute('data-section-name', section.name);
                observer.observe(element);
            }
        });
    }

    // 클릭 이벤트 추적
    trackClicks() {
        document.addEventListener('click', (event) => {
            const target = event.target.closest('[data-ga-event]');
            if (target) {
                const eventName = target.getAttribute('data-ga-event');
                const category = target.getAttribute('data-ga-category') || 'engagement';
                const label = target.getAttribute('data-ga-label') || '';
                
                this.trackEvent(eventName, {
                    category: category,
                    label: label
                });
            }
        });
    }

    // 폼 제출 추적
    trackFormSubmissions() {
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.tagName === 'FORM') {
                this.trackEvent('form_submit', {
                    category: 'engagement',
                    label: form.id || form.className || 'form'
                });
            }
        });
    }

    // 영상 재생 추적
    trackVideoPlays() {
        // YouTube iframe 추적
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
        iframes.forEach(iframe => {
            iframe.addEventListener('load', () => {
                this.trackEvent('video_load', {
                    category: 'engagement',
                    label: 'YouTube Video'
                });
            });
        });

        // HTML5 비디오 추적
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('play', () => {
                this.trackEvent('play_video', {
                    category: 'engagement',
                    label: video.src || 'video'
                });
            });
        });
    }

    // 모달 상호작용 추적
    trackModalInteractions() {
        // PM 분석 모달
        const pmModal = document.getElementById('pm-analysis-modal');
        if (pmModal) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const isVisible = pmModal.style.display === 'flex';
                        if (isVisible) {
                            this.trackEvent('view_pm_analysis', {
                                category: 'engagement',
                                label: 'PM Analysis Modal'
                            });
                        }
                    }
                });
            });
            observer.observe(pmModal, { attributes: true });
        }

        // 프로젝트 상세 토글
        const toggleButtons = document.querySelectorAll('[data-toggle="collapse"]');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('toggle_project_detail', {
                    category: 'engagement',
                    label: button.getAttribute('href') || 'project_detail'
                });
            });
        });
    }

    // 외부 링크 추적
    trackExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('click_external_link', {
                    category: 'navigation',
                    label: link.href
                });
            });
        });
    }

    // PDF 다운로드 추적
    trackPDFDownloads() {
        const pdfLinks = document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf"]');
        pdfLinks.forEach(link => {
            link.addEventListener('click', () => {
                const fileName = link.href.split('/').pop();
                this.trackEvent('download_pdf', {
                    category: 'conversion',
                    label: fileName
                });
            });
        });
    }

    // 프로젝트 참여도 추적
    trackProjectEngagement() {
        const projectCards = document.querySelectorAll('.project-card, .resume-wrap');
        
        projectCards.forEach(card => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.sectionStartTimes.set(entry.target, Date.now());
                    } else if (this.sectionStartTimes.has(entry.target)) {
                        const timeSpent = Date.now() - this.sectionStartTimes.get(entry.target);
                        const secondsSpent = Math.round(timeSpent / 1000);
                        
                        if (secondsSpent > 5) { // 5초 이상 체류한 경우만 추적
                            this.trackEvent('project_engagement', {
                                category: 'engagement',
                                label: entry.target.querySelector('h2, h3')?.textContent || 'project',
                                value: secondsSpent
                            });
                        }
                        
                        this.sectionStartTimes.delete(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(card);
        });
    }

    // 네비게이션 클릭 추적
    trackNavigation() {
        const navLinks = document.querySelectorAll('#navi a, .navbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('navigate_section', {
                    category: 'navigation',
                    label: link.textContent.trim()
                });
            });
        });
    }

    // Contact 액션 추적
    trackContactActions() {
        const contactElements = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], .contact-btn, .email-btn');
        contactElements.forEach(element => {
            element.addEventListener('click', () => {
                this.trackEvent('contact_action', {
                    category: 'conversion',
                    label: element.textContent.trim() || element.href
                });
            });
        });
    }

    // 프로젝트 페이지 이동 추적
    trackProjectPageNavigation() {
        const projectPageLinks = document.querySelectorAll('a[href*="projects.html"]');
        projectPageLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('view_projects_page', {
                    category: 'navigation',
                    label: 'Projects Page'
                });
            });
        });
    }

    // Back 버튼 추적
    trackBackNavigation() {
        const backButtons = document.querySelectorAll('.back-btn, a[href="index.html"]');
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('back_to_main', {
                    category: 'navigation',
                    label: 'Back to Main'
                });
            });
        });
    }

    // 검색 추적
    trackSearch() {
        const searchForms = document.querySelectorAll('.search-form');
        searchForms.forEach(form => {
            form.addEventListener('submit', (event) => {
                const searchInput = form.querySelector('input[type="text"]');
                if (searchInput && searchInput.value.trim()) {
                    this.trackEvent('search_submit', {
                        category: 'engagement',
                        label: searchInput.value.trim()
                    });
                }
            });
        });
    }

    // 댓글 상호작용 추적
    trackCommentInteractions() {
        const replyButtons = document.querySelectorAll('.reply, [href="#reply"]');
        replyButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('comment_reply', {
                    category: 'engagement',
                    label: 'Comment Reply'
                });
            });
        });
    }

    // 프로젝트 카드 호버 추적
    trackProjectCardHover() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            let hoverStartTime = null;
            
            card.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();
            });
            
            card.addEventListener('mouseleave', () => {
                if (hoverStartTime) {
                    const hoverDuration = Date.now() - hoverStartTime;
                    if (hoverDuration > 1000) { // 1초 이상 호버한 경우만 추적
                        this.trackEvent('hover_project_card', {
                            category: 'engagement',
                            label: card.querySelector('h3')?.textContent || 'project',
                            value: Math.round(hoverDuration / 1000)
                        });
                    }
                }
            });
        });
    }
}

// GA4 추적기 초기화
const ga4Tracker = new GA4Tracker();

// 전역 함수로 노출 (필요시 외부에서 호출 가능)
window.trackGA4Event = (eventName, parameters) => {
    ga4Tracker.trackEvent(eventName, parameters);
};
