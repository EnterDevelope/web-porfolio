const skills = {
  categories: [
    {
      id: 'ai-tech',
      title: 'AI/Tech Tool',
      bgClass: 'bg-white border',
      items: [
        { name: 'Azure OpenAI, MCP', level: 2 },
        { name: 'Cursor, Supabase', level: 3 }
      ]
    },
    {
      id: 'data-analysis',
      title: '데이터 분석',
      bgClass: 'bg-white border',
      items: [
        { name: 'SQL(MySQL), Redash', level: 2 },
        { name: 'Python', level: 1 }
      ]
    },
    {
      id: 'collaboration',
      title: '협업 툴',
      bgClass: 'bg-light',
      items: [
        { name: 'Notion, Slack', level: 4 },
        { name: 'Jira', level: 2 }
      ]
    },
    {
      id: 'ux-ui',
      title: 'UX/UI',
      bgClass: 'bg-white border',
      items: [
        { name: 'Figma', level: 4 },
        { name: 'Adobe XD', level: 2 }
      ]
    },
    {
      id: 'analytics',
      title: '분석 툴',
      bgClass: 'bg-light',
      items: [
        { name: 'GA4', level: 2 },
        { name: 'Amplitude', level: 2 }
      ]
    },
    {
      id: 'development',
      title: '개발 기초 이해/기초 실습',
      bgClass: 'bg-white border',
      items: [
        { name: 'JS, TS, React, Next.js', level: 2 },
        { name: 'Flutter', level: 1 }
      ]
    }
  ],
  languages: [
    { name: 'English (OPIc AL)', level: 85 },
    { name: 'Japanese (회화·독해 기초)', level: 30 }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = skills;
} else {
  window.skills = skills;
}
