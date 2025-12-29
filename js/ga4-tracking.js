/**
 * GA4 & Amplitude 추적 스크립트
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
        // 페이지 로드 이벤트
        this.trackPageView();
        
        // 스크롤 관련
        this.trackScrollDepth();
        this.trackSectionViews();
        this.trackProjectDetailSections();
        
        // 클릭 및 상호작용
        this.trackClicks();
        this.trackNavigation();
        this.trackContactActions();
        this.trackProjectPageNavigation();
        this.trackBackNavigation();
        this.trackExternalLinks();
        this.trackPDFDownloads();
        this.trackProjectCardHover();
        this.trackProjectCardClicks();
        
        // 폼 및 미디어
        this.trackFormSubmissions();
        this.trackVideoPlays();
        this.trackImagePopups();
        
        // 모달 및 기타
        this.trackModalInteractions();
        this.trackProjectEngagement();
        this.trackSmoothScroll();
    }

    // GA4 & Amplitude 이벤트 전송 헬퍼 함수
    trackEvent(eventName, parameters = {}) {
        // GA4 이벤트 전송
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: parameters.category || 'engagement',
                event_label: parameters.label || '',
                value: parameters.value || 0,
                ...parameters
            });
        }

        // Amplitude 이벤트 전송
        const sendAmplitudeEvent = () => {
            try {
                // Amplitude SDK 확인
                if (typeof window.amplitude === 'undefined' && typeof amplitude === 'undefined') {
                    console.warn('[Amplitude] SDK not loaded yet');
                    return;
                }

                // Amplitude 인스턴스 가져오기 (여러 방식 지원)
                let amplitudeInstance = null;
                
                if (typeof window.amplitude !== 'undefined') {
                    // window.amplitude 직접 사용
                    if (window.amplitude.getInstance) {
                        amplitudeInstance = window.amplitude.getInstance();
                    } else if (window.amplitude.logEvent) {
                        amplitudeInstance = window.amplitude;
                    }
                } else if (typeof amplitude !== 'undefined') {
                    // 전역 amplitude 사용
                    if (amplitude.getInstance) {
                        amplitudeInstance = amplitude.getInstance();
                    } else if (amplitude.logEvent) {
                        amplitudeInstance = amplitude;
                    }
                }

                if (amplitudeInstance && amplitudeInstance.logEvent) {
                    const eventProperties = {
                        category: parameters.category || 'engagement',
                        label: parameters.label || '',
                        value: parameters.value || 0,
                        page_url: window.location.href,
                        page_title: document.title,
                        ...parameters
                    };
                    
                    amplitudeInstance.logEvent(eventName, eventProperties);
                    console.log('[Amplitude] Event sent:', eventName, eventProperties);
                } else {
                    console.warn('[Amplitude] Instance not available or logEvent method not found');
                }
            } catch (error) {
                console.error('[Amplitude] Event tracking error:', error);
            }
        };

        // Amplitude 초기화 대기 (최대 5초)
        if (typeof window.amplitude === 'undefined' && typeof amplitude === 'undefined') {
            let attempts = 0;
            const maxAttempts = 50; // 5초
            const checkAmplitude = setInterval(() => {
                attempts++;
                if ((typeof window.amplitude !== 'undefined' || typeof amplitude !== 'undefined') || attempts >= maxAttempts) {
                    clearInterval(checkAmplitude);
                    if (typeof window.amplitude !== 'undefined' || typeof amplitude !== 'undefined') {
                        sendAmplitudeEvent();
                    } else {
                        console.warn('[Amplitude] SDK not loaded after', maxAttempts * 100, 'ms');
                    }
                }
            }, 100);
        } else {
            sendAmplitudeEvent();
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
        const projectCards = document.querySelectorAll('.project-card, .resume-wrap');
        projectCards.forEach(card => {
            let hoverStartTime = null;
            
            card.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();
            });
            
            card.addEventListener('mouseleave', () => {
                if (hoverStartTime) {
                    const hoverDuration = Date.now() - hoverStartTime;
                    if (hoverDuration > 1000) { // 1초 이상 호버한 경우만 추적
                        const title = card.querySelector('h2, h3, .project-title')?.textContent || 'project';
                        this.trackEvent('hover_project_card', {
                            category: 'engagement',
                            label: title.trim(),
                            value: Math.round(hoverDuration / 1000)
                        });
                    }
                }
            });
        });
    }

    // 페이지 뷰 추적
    trackPageView() {
        this.trackEvent('page_view', {
            category: 'navigation',
            label: document.title,
            page_path: window.location.pathname,
            page_url: window.location.href
        });
    }

    // 프로젝트 카드 클릭 추적
    trackProjectCardClicks() {
        const projectCards = document.querySelectorAll('.project-card, .resume-wrap');
        projectCards.forEach(card => {
            card.addEventListener('click', (event) => {
                // 버튼이나 링크 클릭은 제외
                if (event.target.closest('a, button')) {
                    return;
                }
                
                const title = card.querySelector('h2, h3, .project-title')?.textContent || 'project';
                const projectId = card.id || '';
                
                this.trackEvent('click_project_card', {
                    category: 'engagement',
                    label: title.trim(),
                    project_id: projectId
                });
            });
        });
    }

    // 이미지 팝업 추적
    trackImagePopups() {
        // Magnific Popup 추적
        document.addEventListener('click', (event) => {
            const popupTrigger = event.target.closest('.image-popup, .popup-youtube, .popup-vimeo');
            if (popupTrigger) {
                this.trackEvent('open_image_popup', {
                    category: 'engagement',
                    label: popupTrigger.href || popupTrigger.getAttribute('data-src') || 'image'
                });
            }
        });
    }

    // 부드러운 스크롤 네비게이션 추적
    trackSmoothScroll() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.trackEvent('smooth_scroll', {
                        category: 'navigation',
                        label: targetId,
                        section_name: targetElement.getAttribute('data-section-name') || targetId
                    });
                }
            }
        });
    }

    // 프로젝트 상세 페이지 섹션 뷰 추적
    trackProjectDetailSections() {
        const projectSections = document.querySelectorAll('.project-card[id]');
        if (projectSections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const projectId = entry.target.id;
                    const projectTitle = entry.target.querySelector('.project-title, h3')?.textContent || projectId;
                    
                    this.trackEvent('view_project_detail', {
                        category: 'engagement',
                        label: projectTitle.trim(),
                        project_id: projectId
                    });
                }
            });
        }, { threshold: 0.3 });

        projectSections.forEach(section => {
            observer.observe(section);
        });
    }
}

// GA4 추적기 초기화
const ga4Tracker = new GA4Tracker();

// 전역 함수로 노출 (필요시 외부에서 호출 가능)
window.trackGA4Event = (eventName, parameters) => {
    ga4Tracker.trackEvent(eventName, parameters);
};
