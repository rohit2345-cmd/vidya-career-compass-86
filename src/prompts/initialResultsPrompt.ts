export const generateInitialResultsPrompt = (
  studentName: string,
  assessmentType: string,
  scores: Record<string, number>,
  strengths: string[],
  interests: string[]
) => {
  return `
-- Begin Conciseness Instructions --
• Keep each section to no more than 5-7 sentences or 5 bullet points.
• Total output should not exceed ~350 words.
• Use clear simple and short, direct language—avoid long paragraphs.
-- End Conciseness Instructions --

Dear ${studentName},

Based on your ${assessmentType} assessment results, I have carefully analyzed your academic profile, interests, and strengths to offer personalized career guidance. Below is a comprehensive overview tailored to your unique profile and the Indian context.

===========================
1. APTITUDE PROFILE
===========================
${Object.entries(scores)
  .map(([category, score]) => `- ${category}: ${score}%`)
  .join('\n')}

===========================
2. KEY STRENGTHS
===========================
${strengths.map(strength => `- ${strength}`).join('\n')}

===========================
3. INTEREST AREAS
===========================
${interests.map(interest => `- ${interest}`).join('\n')}

===========================
4. ASSESSMENT SUMMARY
===========================
• You have demonstrated strong aptitude in: ${Object.entries(scores)
    .filter(([, score]) => score >= 70)
    .map(([category]) => category)
    .join(', ') || 'areas to develop further'}.
• Your key strengths include: ${strengths.join(', ')}.
• Your primary interests are: ${interests.join(', ')}.
• Taken together, these suggest a profile that values ${strengths[0] || 'your main strength'} and enjoys ${interests[0] || 'your top interest'}.

===========================
5. STREAM RECOMMENDATION
===========================  
Based on your aptitude and interests, the most suitable stream in Class 11 appears to be:

**Recommended Stream:**
- \${STREAM_PLACEHOLDER}

**Reasoning:**
1. **Academic Fit:** Your high proficiency in ${Object.entries(scores)
    .filter(([, score]) => score >= 70)
    .map(([category]) => category)
    .join(', ') || 'core subjects'} aligns well with the rigors of this stream.
2. **Interest Alignment:** You expressed strong interest in ${interests[0] || 'a relevant subject'}, which is central to this stream.
3. **Strength Utilization:** Your strength in ${strengths[0] || 'your main strength'} will be valuable in coursework and projects typical of this stream.

_If you have already chosen a stream, validate that your interests, strengths, and goals align with your current selection._

===========================
6. SUGGESTED CAREER FIELDS
===========================  
Below are 3–5 broad career fields that align with your profile. Each field is explained in the context of your skills, interests, and the Indian job market.

1. **[First Career Field]**
   - **Why It Fits:** You enjoy ${interests[0] || 'X'}, demonstrate aptitude in ${Object.entries(scores)
     .filter(([, score]) => score >= 70)
     .map(([category]) => category)
     .join(', ') || 'relevant skills'}, and have strength in ${strengths[0] || 'Y'}.
   - **Indian Context:** Leading institutes like IITs, NITs, and top private universities offer strong programs in this field. Entrance exams include JEE Main/Advanced or related state-level exams.
   - **Emerging Trends:** Growing demand in India’s technology and service sectors, opportunities for research and innovation.

2. **[Second Career Field]**
   - **Why It Fits:** You have shown interest in ${interests[1] || 'A'} and excel at ${strengths[1] || 'B'}, which are key for this field.
   - **Indian Context:** Programs available through CBSE and state boards’ Science/Commerce streams, with entrance options like NEET or CLAT if relevant.
   - **Emerging Trends:** Rising opportunities in India’s startup ecosystem, digital transformation, and global outsourcing.

3. **[Third Career Field]**
   - **Why It Fits:** Your communication skills and creative flair (e.g., ${interests[2] || 'C'}) make you suitable for this domain.
   - **Indian Context:** Institutes such as NID, NIFT, and premier liberal arts colleges provide strong foundations. Entrance exams include NID DAT and NIFT CAT.
   - **Emerging Trends:** Increasing demand for content creation, design thinking, and creative problem-solving in Indian industry.

(Optionally include 4th or 5th fields if needed.)

===========================
7. EDUCATIONAL PATHWAYS
===========================  
To prepare for the suggested career fields, consider these academic and exam pathways in India:

1. **[Pathway for First Career Field]**
   - **Stream & Subjects (Class 11–12):** Focus on ${'\${RELEVANT_SUBJECTS_1}'}.
   - **Entrance Exams:** Register and prepare for ${'\${RELEVANT_EXAM_1}'} (e.g., JEE Main/Advanced, NEET, CLAT).
   - **Recommended Boards:** CBSE or State Board with strong Science/Commerce curriculum for foundational knowledge.

2. **[Pathway for Second Career Field]**
   - **Stream & Subjects (Class 11–12):** Focus on ${'\${RELEVANT_SUBJECTS_2}'}.
   - **Entrance Exams:** Aim for ${'\${RELEVANT_EXAM_2}'} (e.g., NIFT CAT, CUET, state-level design exams).
   - **Recommended Boards:** CBSE/State Board, with elective options in Economics, Informatics Practices, or Fine Arts as applicable.

3. **[Pathway for Third Career Field]**
   - **Stream & Subjects (Class 11–12):** Focus on ${'\${RELEVANT_SUBJECTS_3}'}.
   - **Entrance Exams:** Prepare for ${'\${RELEVANT_EXAM_3}'} (e.g., CLAT for Law, NID DAT for Design).
   - **Recommended Boards:** Any mainstream board; emphasize strong language, arts, or humanities electives.

===========================
8. RECOMMENDED INSTITUTIONS
===========================  
These institutions in India offer top-tier programs aligned with your interests:

1. **[Institution 1]** – Known for excellence in ${'\${PROGRAM_1}'}; located in ${'\${CITY_1}'}.
2. **[Institution 2]** – Renowned for ${'\${PROGRAM_2}'}; located in ${'\${CITY_2}'}.
3. **[Institution 3]** – Offers strong curriculum in ${'\${PROGRAM_3}'}; located in ${'\${CITY_3}'}.

(Adjust as needed based on the chosen career fields.)

===========================
9. SKILL DEVELOPMENT RECOMMENDATIONS
===========================  
To strengthen your profile and readiness for these fields, focus on developing:

1. **Core Technical Skills:**  
   - ${'\${SKILL_1}'} (e.g., Python programming, fundamental lab methodology, financial modeling)
   - ${'\${SKILL_2}'} (e.g., data analysis, design thinking, legal research)
2. **Soft Skills & Extras:**  
   - ${'\${SKILL_3}'} (e.g., communication, teamwork, leadership)
   - ${'\${SKILL_4}'} (e.g., critical thinking, creativity, time management)
3. **Certifications & Online Courses:**  
   - Platforms: SWAYAM, NPTEL, Coursera, Udemy
   - Specific Courses: ${'\${COURSE_1}'} (e.g., “Introduction to AI & ML”), ${'\${COURSE_2}'} (e.g., “Basics of Graphic Design”), ${'\${COURSE_3}'} (e.g., “Foundations of Business & Economics”)

===========================
10. NEXT STEPS
===========================  
1. **In-Depth Research:**  
   - Explore each suggested career field by reading articles, watching webinars, and talking to professionals.  
   - Attend virtual college fairs or local career counseling events.  
2. **Subject Selection (Class 11–12):**  
   - Finalize your stream based on the “Educational Pathways” section.  
   - Choose electives that strengthen your core interests (e.g., Maths & Physics for Engineering, English & History for Humanities).  
3. **Entrance Exam Planning:**  
   - Create a study timeline for relevant exams (JEE, NEET, CLAT, NIFT, CUET).  
   - Gather recommended study materials and join a reputable coaching institute or online prep course if needed.  
4. **Skill-Building Projects:**  
   - Start a small personal or group project aligned with your interests (e.g., build a basic website, design a logo, conduct a simple science experiment).  
   - Participate in relevant competitions (e.g., science fairs, hackathons, debate contests) to build experience.  
5. **Networking & Mentorship:**  
   - Connect with seniors, alumni, or professionals in your fields of interest via LinkedIn or school alumni networks.  
   - Seek an informational interview or short mentorship session to understand day-to-day realities.  

===========================
11. ADDITIONAL RESOURCES
===========================  
- **Entrance Exam Resources:**  
  - JEE Main: NTA (https://jeemain.nta.nic.in)  
  - NEET: NTA (https://ntaneet.nic.in)  
  - CLAT: Consortium of NLUs (https://consortiumofnlus.ac.in)  
  - NIFT & NID: Official websites (https://nift.ac.in, https://nid.edu)  
- **Online Learning Platforms:**  
  - SWAYAM, NPTEL, Coursera, edX  
  - YouTube Channels: Khan Academy India, Unacademy, TED-Ed (for subject clarity)  
- **Government Initiatives & Scholarships:**  
  - Skill India (https://skillindia.gov.in)  
  - NSQF-aligned courses (https://nsqcindia.org)  
  - Central/State Scholarship Portals (e.g., NSP, Odisha Scholarship)  

Feel free to ask follow-up questions or request deeper guidance on any specific section. Your career journey is a continuous exploration—take one step at a time, stay curious, and leverage available resources to build a path that reflects your passions and strengths.

Sincerely,

CareerPathAI (Claude 3)
`;
};

export default generateInitialResultsPrompt;
