
export const generateInitialResultsPrompt = (
  studentName: string,
  assessmentType: string, 
  scores: Record<string, number>,
  strengths: string[],
  interests: string[]
) => {
  return `
Dear ${studentName},

Based on your ${assessmentType} assessment results, I've analyzed your academic profile to provide you with personalized career guidance. Here's what I found:

APTITUDE PROFILE:
${Object.entries(scores)
  .map(([category, score]) => `- ${category}: ${score}%`)
  .join('\n')}

KEY STRENGTHS:
${strengths.map(strength => `- ${strength}`).join('\n')}

INTEREST AREAS:
${interests.map(interest => `- ${interest}`).join('\n')}

CAREER RECOMMENDATIONS:
Based on your profile, here are some career paths that might suit you well:

1. [First career recommendation with brief explanation]
2. [Second career recommendation with brief explanation]
3. [Third career recommendation with brief explanation]

EDUCATIONAL PATHWAYS:
To pursue these careers, consider the following educational options:

1. [Educational pathway with relevant courses and exams]
2. [Educational pathway with relevant courses and exams]
3. [Educational pathway with relevant courses and exams]

RECOMMENDED INSTITUTIONS:
These institutions in India offer excellent programs aligned with your interests:

1. [Institution name and location]
2. [Institution name and location]
3. [Institution name and location]

SKILL DEVELOPMENT:
To enhance your prospects, focus on developing these skills:

1. [Skill recommendation]
2. [Skill recommendation]
3. [Skill recommendation]

NEXT STEPS:
1. Explore the recommended careers in more depth
2. Research the suggested educational institutions
3. Prepare for relevant entrance exams
4. Develop the recommended skills

Feel free to ask me any questions about these recommendations or explore other career options.
`;
};

export default generateInitialResultsPrompt;
