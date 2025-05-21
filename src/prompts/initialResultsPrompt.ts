
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

CAREER GUIDANCE OVERVIEW:
----------------------

Introduction: Why read this guide?
This guide provides a systematic approach to career decisions based on research, helping you identify high-impact careers matched to your unique profile rather than just following conventional advice about passion or prestige.

Part 1: What makes for a dream job?
A fulfilling career combines work you're good at, work that helps others, supportive conditions, work-life balance, and engagement. Rather than just "finding your passion," focus on developing valuable skills in areas where you can make a positive impact.

Part 2: Can one person make a difference?
Yes! One person's career choices can significantly impact the world by thoughtfully applying skills where they have the most leverage. Strategic career choices can help you improve many lives.

Part 3: Three ways anyone can have an impact
You can create impact through direct work (directly addressing problems), earning to give (taking high-earning jobs to donate), or building career capital (developing skills for greater future impact).

Part 4: Scale, neglectedness, and solvability
When choosing problems to work on, consider their scale (how big), neglectedness (how few resources already dedicated), and solvability (how feasible progress is). This helps identify areas where additional effort makes meaningful differences.

Part 5: The world's most pressing problems
Consider focusing on pressing global problems like health, development, climate change, AI safety, biosecurity, and institutional decision-making—areas affecting many people that receive insufficient attention but where progress is possible.

Part 6: Which jobs help people the most?
High-impact careers include research roles, leadership positions, entrepreneurship, advocacy, and high-earning jobs that enable giving. The best path depends on your specific skills and circumstances.

Part 7: Career capital
Early in your career, prioritize building versatile skills, credentials, connections, and resources that increase your future impact. Work with outstanding teams, develop rare skills, and choose roles offering multiple future options.

Part 8: Personal fit
Choose paths where you can excel, not just where you already have proven abilities. Assess fit through related experience, trials, expert feedback, and remember that abilities are built through mindset and deliberate practice.

Part 9: How to be successful
Success comes from focusing on priorities, deliberate skill-building, surrounding yourself with supportive people, maintaining health basics, and developing productive habits—not just passive rule-following.

Part 10: How to make your career plan
Set high-level goals but remain flexible about specifics. Focus on your next move by exploring options, narrowing based on impact potential and personal fit, then testing through conversations and work trials.

Part 11: How to get a job
Be strategic—build connections through warm introductions and informational interviews, prepare thoroughly by tailoring materials to each position, and focus on demonstrating value to organizations.

Part 12: Community
Connect with like-minded individuals focused on impact through online resources, events, and coaching. Building a supportive network increases motivation and opportunities for meaningful work.

Summary: Just the bottom lines
Career decisions are among life's most important choices. To maximize positive impact: focus on pressing problems, consider diverse impact paths, build career capital early, prioritize personal fit, and approach career planning experimentally. Small directional changes now can dramatically alter your career trajectory.

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
