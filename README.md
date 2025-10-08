# Portfolio Management System

## 개요
이 프로젝트는 포트폴리오 웹사이트의 데이터와 템플릿을 분리하여 관리하는 시스템입니다. 데이터만 수정하면 자동으로 웹사이트가 업데이트됩니다.

## 프로젝트 구조

```
web-porfolio/
├── data/                    # 데이터 파일들
│   ├── projects.js         # 프로젝트 데이터
│   ├── skills.js          # 스킬 데이터
│   ├── personal.js        # 개인 정보
│   └── internship.js      # 인턴십 데이터
├── components/             # 컴포넌트 템플릿
│   ├── ProjectCard.js     # 프로젝트 카드
│   ├── SkillGrid.js       # 스킬 그리드
│   └── InternshipCard.js  # 인턴십 카드
├── managers/              # 관리 시스템
│   ├── DataManager.js     # 데이터 관리
│   └── SectionManager.js  # 섹션 관리
├── build/                 # 빌드 시스템
│   └── generate-html.js   # HTML 생성기
└── js/                    # 메인 애플리케이션
    └── app.js            # 앱 초기화
```

## 사용법

### 1. 프로젝트 추가
`data/projects.js` 파일을 수정하여 새로운 프로젝트를 추가할 수 있습니다.

```javascript
{
  id: 'new-project',
  type: 'project',
  title: '새 프로젝트',
  date: '2024.01-2024.06',
  position: '프로젝트 매니저',
  problem: '문제 정의',
  actions: '해결 방안',
  metrics: '성과 지표',
  evidence: '근거 자료',
  links: {
    demo: 'https://example.com'
  }
}
```

### 2. 스킬 업데이트
`data/skills.js` 파일에서 스킬 레벨을 조정할 수 있습니다.

```javascript
{
  name: 'React',
  level: 4  // 1-5 레벨
}
```

### 3. 개인 정보 수정
`data/personal.js` 파일에서 개인 정보를 업데이트할 수 있습니다.

## 데이터 구조

### 프로젝트 데이터
- `id`: 고유 식별자
- `type`: 프로젝트 유형 (project, side-project)
- `title`: 프로젝트 제목
- `date`: 기간
- `position`: 역할
- `problem`: 문제 정의
- `actions`: 해결 방안
- `metrics`: 성과 지표
- `evidence`: 근거 자료
- `links`: 관련 링크
- `media`: 미디어 파일

### 스킬 데이터
- `categories`: 스킬 카테고리 배열
- `languages`: 언어 스킬 배열
- 각 스킬은 1-5 레벨로 표시

## 컴포넌트 시스템

### ProjectCard
프로젝트 카드를 렌더링하는 컴포넌트입니다.
- P/A/M/E 구조 지원
- 링크 버튼 자동 생성
- 미디어 파일 지원

### SkillGrid
스킬 그리드를 렌더링하는 컴포넌트입니다.
- 6개 카테고리 그리드 레이아웃
- 점 기반 숙련도 표시
- 언어 스킬 프로그레스 바

### InternshipCard
인턴십 카드를 렌더링하는 컴포넌트입니다.
- 접을 수 있는 상세 정보
- P/A/M/E 구조 지원

## 관리 시스템

### DataManager
중앙화된 데이터 관리 클래스입니다.
- 데이터 로딩 및 검증
- CRUD 작업 지원
- 필터링 및 정렬

### SectionManager
섹션별 렌더링을 관리하는 클래스입니다.
- 동적 HTML 생성
- 필터 및 정렬 옵션
- 실시간 업데이트

## 빌드 시스템

### HTML 생성기
정적 HTML을 생성하는 도구입니다.
- 데이터 기반 HTML 생성
- 템플릿 엔진 지원
- 자동화된 빌드 프로세스

## 개발 가이드

### 새로운 컴포넌트 추가
1. `components/` 폴더에 새 컴포넌트 파일 생성
2. 템플릿 함수 구현
3. `managers/SectionManager.js`에 등록
4. `js/app.js`에서 초기화

### 데이터 스키마 변경
1. 해당 데이터 파일 수정
2. 컴포넌트 템플릿 업데이트
3. 검증 로직 수정

## 배포

1. 데이터 파일 수정
2. `git add .`
3. `git commit -m "Update portfolio data"`
4. `git push`

## 라이선스

MIT License