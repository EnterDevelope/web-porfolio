const personalInfo = {
  name: '김우현',
  title: 'Product Manager 김우현',
  birthDate: '2000 - 11 - 18',
  email: 'socc2369@naver.com',
  phone: '010-4127-6409',
  address: '서울특별시 서대문구 연희동',
  instagram: '@this_wayout_',
  tagline: '"Be productive, Not busy"',
  valueProposition: '문제 정의→검증→전환 개선에 강한 PM. 데이터와 실험으로 성과를 만듭니다.',
  traits: [
    { text: '성취 지향', type: 'primary', aria: '성취 지향적 성향' },
    { text: 'Data-driven', type: 'primary', aria: '데이터 기반 의사결정' },
    { text: '체계적 해결', type: 'primary', aria: '체계적 문제 해결' },
    { text: '계획 우선', type: 'primary', aria: '계획 우선 사고' },
    { text: '리더십', type: 'primary', aria: '리더십과 실행력' },
    { text: '안정적', type: 'secondary', aria: '감정 기복 낮음' },
    { text: '유연성', type: 'secondary', aria: '가끔 낭만은 챙기자' }
  ],
  stats: {
    projectCount: 8,
    resumeLink: 'https://github.com/EnterDevelope/web-porfolio/raw/main/%EA%B9%80%EC%9A%B0%ED%98%84_%ED%8F%AC%ED%8F%B4.pdf'
  }
};

const experience = [
  {
    id: 'us-study',
    date: '2008-2013(3~4개월씩 3번 총 11개월)',
    title: '미국 초등학교 어학연수',
    position: 'Boston, Massachusetts/Denver, Colorado',
    description: '영어 어학연수'
  },
  {
    id: 'short-track',
    date: '2007-2013',
    title: '쇼트트랙 주니어 선수',
    position: '',
    description: '&emsp;'
  },
  {
    id: 'tutoring',
    date: '2019-2024',
    title: '수능 과외',
    position: '',
    description: '4년간 고등학생 개인과외 총 16명 모집, 전체 학생 평균 2등급 이상 성적 향상'
  },
  {
    id: 'clubs',
    date: '2019-2025',
    title: '다양한 취미 동아리',
    position: '밴드, 배구, 배드민턴',
    description: '공연 기획, 동아리 운영 경험'
  }
];

const education = [
  {
    id: 'highschool',
    date: '2016-2018',
    title: '한영외국어고등학교 일본어 전공',
    position: 'Hanyoung Foreign Language Highschool',
    description: ''
  },
  {
    id: 'university',
    date: '2019-now',
    title: '연세대학교 통합디자인학과(구 생활디자인학과)',
    position: 'Yonsei University Dept of Integrated Design',
    description: [
      '미술대학이 아닌 생활과학대학 소속으로, 데이터에 기반한한 문제해결 능력을 키워 혁신을 이루고자 하는 인재를 양성하는 학과입니다.',
      '학과의 대부분 교과목은 프로젝트 식으로 운영이 되며, 저 또한 전공과목들을 통해 다양한 분야와 주제의 프로젝트들에서 Leader와 Player로 적극 참여하였습니다.',
      '매학기 결과물들은 \'과제전\'을 통해 선보여지며 웹사이트에 아카이빙되고 있습니다.'
    ],
    links: [
      { text: '통합디자인학과 과제전 링크', url: 'https://d.exhibition.yonsei.ac.kr/' },
      { text: '통합디자인학과 졸업전시 링크', url: 'http://d.yonsei.ac.kr/' }
    ]
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { personalInfo, experience, education };
} else {
  window.personalInfo = personalInfo;
  window.experience = experience;
  window.education = education;
}
