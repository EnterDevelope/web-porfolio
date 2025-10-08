# Portfolio Management API

## 개요
포트폴리오 관리 시스템의 API 문서입니다. 데이터 구조와 컴포넌트 사용법을 설명합니다.

## 데이터 구조

### Project
```javascript
{
  id: string,           // 고유 식별자
  type: string,         // 'project' | 'side-project'
  title: string,        // 프로젝트 제목
  date: string,         // 기간
  position: string,     // 역할
  problem: string,      // 문제 정의
  actions: string,      // 해결 방안
  metrics: string,      // 성과 지표
  evidence: string,     // 근거 자료
  links: object,       // 관련 링크
  media: object        // 미디어 파일
}
```

### Skill
```javascript
{
  categories: [
    {
      id: string,
      title: string,
      bgClass: string,
      items: [
        {
          name: string,
          level: number  // 1-5
        }
      ]
    }
  ],
  languages: [
    {
      name: string,
      level: number  // 0-100
    }
  ]
}
```

### Personal Info
```javascript
{
  name: string,
  title: string,
  birthDate: string,
  email: string,
  phone: string,
  address: string,
  instagram: string,
  tagline: string,
  valueProposition: string,
  traits: [
    {
      text: string,
      type: string,     // 'primary' | 'secondary'
      aria: string
    }
  ],
  stats: {
    projectCount: number,
    resumeLink: string
  }
}
```

## 컴포넌트 API

### ProjectCard

#### createProjectCard(project)
프로젝트 카드 HTML을 생성합니다.

**Parameters:**
- `project` (Object): 프로젝트 데이터

**Returns:**
- `string`: HTML 문자열

**Example:**
```javascript
const html = ProjectCard.createProjectCard({
  id: 'example',
  title: 'Example Project',
  date: '2024.01-2024.06',
  problem: 'Problem description',
  actions: 'Actions taken',
  metrics: 'Metrics achieved',
  evidence: 'Evidence provided'
});
```

#### generateProjectLinks(links)
프로젝트 링크 버튼을 생성합니다.

**Parameters:**
- `links` (Object): 링크 객체

**Returns:**
- `string`: HTML 문자열

#### generateProjectMedia(media)
프로젝트 미디어를 생성합니다.

**Parameters:**
- `media` (Object): 미디어 객체

**Returns:**
- `string`: HTML 문자열

### SkillGrid

#### createSkillGrid(skills)
스킬 그리드 HTML을 생성합니다.

**Parameters:**
- `skills` (Object): 스킬 데이터

**Returns:**
- `string`: HTML 문자열

#### createSkillCategory(category)
스킬 카테고리 HTML을 생성합니다.

**Parameters:**
- `category` (Object): 카테고리 데이터

**Returns:**
- `string`: HTML 문자열

#### generateSkillDots(level)
스킬 점 표시를 생성합니다.

**Parameters:**
- `level` (number): 숙련도 레벨 (1-5)

**Returns:**
- `string`: HTML 문자열

### InternshipCard

#### createInternshipCard(internship)
인턴십 카드 HTML을 생성합니다.

**Parameters:**
- `internship` (Object): 인턴십 데이터

**Returns:**
- `string`: HTML 문자열

#### createCollapsibleDetails(details)
접을 수 있는 상세 정보를 생성합니다.

**Parameters:**
- `details` (Object): 상세 정보 데이터

**Returns:**
- `string`: HTML 문자열

## 관리자 API

### DataManager

#### loadData()
모든 데이터를 로드합니다.

**Returns:**
- `Promise<boolean>`: 성공 여부

#### getData(type)
특정 타입의 데이터를 가져옵니다.

**Parameters:**
- `type` (string): 데이터 타입

**Returns:**
- `Array|Object`: 데이터

#### addProject(project)
새 프로젝트를 추가합니다.

**Parameters:**
- `project` (Object): 프로젝트 데이터

**Returns:**
- `boolean`: 성공 여부

#### updateProject(id, updates)
프로젝트를 업데이트합니다.

**Parameters:**
- `id` (string): 프로젝트 ID
- `updates` (Object): 업데이트 데이터

**Returns:**
- `boolean`: 성공 여부

#### removeProject(id)
프로젝트를 제거합니다.

**Parameters:**
- `id` (string): 프로젝트 ID

#### filterProjects(type)
프로젝트를 필터링합니다.

**Parameters:**
- `type` (string): 프로젝트 타입

**Returns:**
- `Array`: 필터링된 프로젝트 배열

### SectionManager

#### render()
섹션을 렌더링합니다.

#### addItem(item)
새 아이템을 추가합니다.

**Parameters:**
- `item` (Object): 아이템 데이터

#### updateItem(id, updatedItem)
아이템을 업데이트합니다.

**Parameters:**
- `id` (string): 아이템 ID
- `updatedItem` (Object): 업데이트된 데이터

#### removeItem(id)
아이템을 제거합니다.

**Parameters:**
- `id` (string): 아이템 ID

#### getData()
섹션 데이터를 가져옵니다.

**Returns:**
- `Array`: 섹션 데이터

## 애플리케이션 API

### PortfolioApp

#### init()
애플리케이션을 초기화합니다.

**Returns:**
- `Promise<void>`

#### addProject(project)
새 프로젝트를 추가합니다.

**Parameters:**
- `project` (Object): 프로젝트 데이터

**Returns:**
- `boolean`: 성공 여부

#### updateProject(id, updates)
프로젝트를 업데이트합니다.

**Parameters:**
- `id` (string): 프로젝트 ID
- `updates` (Object): 업데이트 데이터

**Returns:**
- `boolean`: 성공 여부

#### removeProject(id)
프로젝트를 제거합니다.

**Parameters:**
- `id` (string): 프로젝트 ID

#### getProject(id)
프로젝트를 가져옵니다.

**Parameters:**
- `id` (string): 프로젝트 ID

**Returns:**
- `Object`: 프로젝트 데이터

#### getAllProjects()
모든 프로젝트를 가져옵니다.

**Returns:**
- `Array`: 프로젝트 배열

#### filterProjects(type)
프로젝트를 필터링합니다.

**Parameters:**
- `type` (string): 프로젝트 타입

**Returns:**
- `Array`: 필터링된 프로젝트 배열

## 사용 예제

### 기본 사용법
```javascript
// 애플리케이션 초기화
await window.portfolioApp.init();

// 새 프로젝트 추가
const newProject = {
  id: 'new-project',
  type: 'project',
  title: 'New Project',
  date: '2024.01-2024.06',
  problem: 'Problem description',
  actions: 'Actions taken',
  metrics: 'Metrics achieved',
  evidence: 'Evidence provided'
};

window.portfolioApp.addProject(newProject);
```

### 데이터 필터링
```javascript
// 프로젝트만 필터링
const projects = window.portfolioApp.filterProjects('project');

// 사이드 프로젝트만 필터링
const sideProjects = window.portfolioApp.filterProjects('side-project');
```

### 프로젝트 업데이트
```javascript
// 프로젝트 업데이트
window.portfolioApp.updateProject('project-id', {
  title: 'Updated Title',
  metrics: 'Updated Metrics'
});
```

## 에러 처리

모든 API는 에러 발생 시 콘솔에 경고를 출력합니다. 중요한 작업은 반환값을 확인하여 성공 여부를 판단하세요.

```javascript
if (window.portfolioApp.addProject(project)) {
  console.log('프로젝트가 성공적으로 추가되었습니다.');
} else {
  console.error('프로젝트 추가에 실패했습니다.');
}
```
