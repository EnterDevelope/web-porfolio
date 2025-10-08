const projects = [
  {
    id: 'exam-ai',
    type: 'side-project',
    title: 'Exam AI',
    date: '2025.07-현재',
    position: '생성형 AI 학습 서비스',
    problem: '프롬프트 반복과 컨텍스트 유실로 학습 흐름이 끊김',
    actions: '요약→퀴즈→오답 자동 루프, 난이도/문항수 조절, 오답 허브, 3-LLM 믹스, 주관식 채점 데이터 플로우/스키마 설계',
    metrics: '모델 라우팅으로 응답속도·비용 균형, 재복습률/완독률 측정 포인트 정의',
    evidence: '기능 플로우, DB 스키마, 퀴즈·오답 UI 캡처',
    links: {}
  },
  {
    id: 'army-startup',
    type: 'project',
    title: '군 창업경진대회',
    date: '2021.12-2022.06',
    position: '네일의 모든 것, 네모',
    problem: '불투명한 가격·불편한 예약·파편화된 정보',
    actions: '97명 설문/인터뷰로 검증, 견적 요청·디자인 아카이빙·매출 통계 등 양면 기능 정의, Flutter·Firebase MVP',
    metrics: '초기 유저 인터레스트·플로우 검증(대회 제출), 기능 가설 확정',
    evidence: '설문 결과/화면 흐름/프로토 UI, 대회 제출 문서',
    links: {
      pdf: 'https://github.com/EnterDevelope/web-porfolio/raw/1a3b3a2977f3d1e65dcf6670cb617e377d788e5e/%EC%B0%BD%EC%97%85%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C%20%EC%A0%91%EC%88%98%20%EB%AC%B8%EC%84%9C.pdf'
    }
  },
  {
    id: 'jellycrew',
    type: 'project',
    title: '(주)핸드허그 사의 \'JellyCrew\'와의 컨설팅 산학협력',
    date: '2023.03-2023.06',
    position: '',
    problem: '입점은 늘었으나 매출 성장이 정체, 팔로워 중심 평가의 한계',
    actions: '\'콘텐츠성\' 지표 도입, 평가모델 재설계, 오프라인 아케이드 콘셉트로 체류·전환 설계, KPI·분기 OKR 체계화',
    metrics: '잠재 IP 재평가 시뮬: 등급 상향 사례 도출, 오프→온 전환 가설지표 수립',
    evidence: '지표표/시뮬 결과 캡처, 오프라인 경험 시나리오 보드',
    links: {
      pdf: 'https://github.com/EnterDevelope/web-porfolio/raw/a2c4b630ec3910e4fcb0d8cc01cb882e39f36bb0/jellycrew_final.pdf'
    }
  },
  {
    id: 'youngpoong',
    type: 'project',
    title: '(주)영풍문고 사와의 산학협력 프로젝트',
    date: '2023.09-2023.12',
    position: '',
    problem: '방문·구매 전환 저하, 브랜드 정체성 약화',
    actions: '\'맛-누리-빠지다\' 3단계 여정, Light/Heavy 세그먼트별 체험·큐레이션, 온↔오프 전환 경로 정의',
    metrics: '실행 로드맵·지표 체계 제안, 프로젝트 팀 3위',
    evidence: '여정 맵, 체험 와이어, 전환 퍼널 설계안',
    links: {
      pdf: 'https://github.com/EnterDevelope/web-porfolio/raw/23c0e5accca2c8884bc8c629f10b801bee921f32/%EC%98%81%ED%92%8D%EB%AC%B8%EA%B3%A0_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8.pdf'
    }
  },
  {
    id: 'popple',
    type: 'project',
    title: '졸업 프로젝트 : POPPLE',
    date: '2024.01-2024.07',
    position: '학과 졸업 프로젝트',
    problem: '감정 기록 번거로움과 맥락 부족으로 지속 사용 어려움',
    actions: '센서 데이터→AI 대화 선제 제안, \'상황-생각-감정\' 리포트 제공, 예외 흐름 보강',
    metrics: '사용자 테스트 반복, 실패 경로 감소(정성), 전시 데모 안정성 확보',
    evidence: '인터랙션 플로우, 리포트 UI, 연동 조건 문서',
    links: {
      demo: 'http://d.yonsei.ac.kr/2024/portfolio/p10/'
    },
    media: {
      image: 'images/side-project-1.png',
      video: 'https://www.youtube.com/embed/nas7e3BTlhc?si=Hp2X3lk8-2BQzofd'
    }
  },
  {
    id: 'carmeal',
    type: 'project',
    title: '졸업 프로젝트 : Carmeal',
    date: '2024.01-2024.07',
    position: '학과 졸업 프로젝트',
    problem: '다세대 주거지의 충전 인프라 격차로 인한 이용 장벽',
    actions: '커뮤니티 크롤링·인터뷰로 격차 수치화, 4~8kWh 이동형 공유 충전기, 회원/비회원 이원 UX',
    metrics: '현장 검증·긍정 피드백, 창업 제안 획득',
    evidence: '서비스 플로우/지표 캡처, 시연 영상',
    links: {
      demo: 'http://d.yonsei.ac.kr/2024/portfolio/p17/'
    },
    media: {
      image: 'images/side-project-2.png',
      video: 'https://www.youtube.com/embed/R7ShXxnPnI4?si=iFkeemZ-0q7jC0Jf'
    }
  },
  {
    id: 'wayfinder',
    type: 'project',
    title: 'Wayfinder',
    date: '2025.03-2025.06',
    position: '학과 우수상 수상 (Design S award Green)',
    problem: '조현병에 대한 편견·낙인, 이해 부족',
    actions: 'VR·인터랙티브 스토리텔링 설계, 분기형 대사/컷신/시네마틱 구현, PJM으로 일정/협업 조율',
    metrics: '사용자 체험 피드백 향상(정성), 학과 우수상 수상',
    evidence: '시나리오 구조도, Dialogue/Timeline 스크립트, 데모 영상',
    links: {
      demo: 'https://d.exhibition.yonsei.ac.kr/bbs/board.php?bo_table=2025_IMD&wr_id=1'
    }
  },
  {
    id: 'id-linker',
    type: 'project',
    title: 'ID Linker',
    date: '2025.03-2025.06',
    position: '데이터기반통합디자인리서치 수업 프로젝트',
    problem: '재학생-졸업생 교류 단절로 정보 접근·소속감 저하',
    actions: '인터뷰+32명 설문, 상관·클러스터 분석(고립형/방황자/선도자) 도출, 핵심 기능 정의',
    metrics: '랜딩 퍼널 CTR 16.29%, 베타 신청 CVR 8%',
    evidence: '설문 폼·분석 노트, 세그먼트 페르소나, 랜딩 퍼널 보드',
    links: {}
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projects;
} else {
  window.projects = projects;
}
