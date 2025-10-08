const internship = [
  {
    id: 'teamsparta',
    title: '팀스파르타 인턴: 이탈률 개선과 전환 고도화',
    date: '2024.09-2025.03',
    position: 'PM 인턴',
    problem: '초기 1~2개월 이탈이 높고, 로드맵-니즈 미스매치',
    actions: 'VOC/이탈 데이터 분석 → 초기 로드맵 재설계(LLM·빠른 배포·테스트) → 평가체계 고도화(VC/전문가) → 사전캠프·랜딩 메시지 개선',
    metrics: '이탈 -15%p(초기), 출석 +38.3%p, 결제 +4.3%p, 매출 2x, NPS +327%, 3기 모집 36~105%↑',
    evidence: '평가 기준표, 사전캠프 커리큘럼, 랜딩 메시지 개편안, VOC 요약본',
    details: {
      role: [
        '팀 교육운영 파트 PM 인턴. 5개월 기수제 2기 운영 총괄.',
        '보조 매니저 1, 튜터 5, 외부 VC/전문가 협업 주도.'
      ],
      problemDefinition: [
        '1~2개월 내 이탈 집중, 비전공자에게 개발 중심 로드맵이 과부하.',
        'VOC 키워드 상 공통 불만 다수, 로드맵-니즈 미스매치 확인.'
      ],
      solution: [
        '초기 구간을 창업 맥락에 맞추고 LLM·빠른 배포·테스트 중심으로 개편.',
        '사업계획·피칭 평가 기준표 제작(VC/전문가 자문), 공개 기준·합격 사례 반영.',
        '사전캠프를 비즈니스 미니 프로젝트로 재설계, 랜딩 메시지 소구점 재정의.'
      ],
      results: [
        '2개월 내 이탈률 -15%p, 평균 출석률 +38.3%p, 최종 결제 전환율 +4.3%p.',
        '이탈 50% 개선, 매출 2배, NPS 327% 상승.',
        '3기 모집 36~105% 성장, 정부지원사업 합격 팀 배출.'
      ]
    }
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = internship;
} else {
  window.internship = internship;
}
