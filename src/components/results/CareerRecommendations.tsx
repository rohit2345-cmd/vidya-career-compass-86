
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CareerGuideQuestion {
  title: string;
  content: string;
}

interface CareerRecommendationsProps {
  careers: any[]; // We'll keep the prop for compatibility but won't use it
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  const careerGuideQuestions: CareerGuideQuestion[] = [
    {
      title: "Introduction: Why read this guide?",
      content: "This guide is for people who want to maximize their career impact. Unlike conventional advice that focuses on following passion or pursuing prestigious positions, we help you approach career decisions more systematically. We'll walk you through our research-backed frameworks for identifying high-impact careers matched to your unique skills and preferences. Whether you're starting your career or considering a change, this guide provides the tools to make more informed decisions about your professional future."
    },
    {
      title: "Part 1: What makes for a dream job?",
      content: "A dream job isn't just about following your passion. Our research suggests five key components: work that you're good at, work that helps others, supportive conditions (good colleagues, lack of major negatives), work that fits with the rest of your life, and work that's engaging. Job satisfaction studies show that the most fulfilling careers typically combine these elements, particularly meaningful work and using your strengths. Rather than 'finding your passion,' we recommend developing valuable skills through deliberate practice in areas where you can make a positive impact."
    },
    {
      title: "Part 2: Can one person make a difference?",
      content: "Yes, one person can make a significant difference. While many people feel their career choices won't substantially impact the world, our research shows otherwise. By choosing the right path, you can help solve important problems and improve many lives. The key is thinking strategically about where your skills can have the most leverage. We've found that thoughtful career choices can lead to impact equivalent to helping hundreds or even thousands of people directly. The difference between careers isn't small—it's often dramatic."
    },
    {
      title: "Part 3: Three ways anyone can have an impact",
      content: "There are three primary paths to having a positive impact: direct work (using your skills to directly address problems), earning to give (taking a high-earning job and donating to effective organizations), and building career capital (developing skills, credentials, and connections that will increase your future impact). Each approach can be powerful depending on your circumstances and strengths. Often the greatest impact comes not from directly helping others but from enabling others to help more effectively or influencing systems and institutions that affect many people."
    },
    {
      title: "Part 4: Scale, neglectedness, and solvability",
      content: "When choosing which problems to work on, we recommend considering three factors: scale (how big is the problem?), neglectedness (how many resources are already dedicated to it?), and solvability (how tractable is progress?). Problems that are large in scale, neglected by others, and where progress is possible often present the greatest opportunities for impact. This framework helps identify areas where additional effort is most likely to make a meaningful difference rather than simply adding to crowded fields."
    },
    {
      title: "Part 5: The world's most pressing problems",
      content: "Using our scale-neglectedness-solvability framework, we've identified several pressing global problems where careers can have outsized impact. These include global health and development, climate change, artificial intelligence safety, biosecurity, and improving institutional decision-making. These areas affect large numbers of people (present and future), receive insufficient resources relative to their importance, and are areas where progress appears feasible with dedicated effort."
    },
    {
      title: "Part 6: Which jobs help people the most?",
      content: "Beyond working on pressing problems, certain career paths offer particularly high leverage for creating positive change. These include research roles that generate new solutions, leadership and operations positions that enable organizations to function more effectively, entrepreneurship to develop new approaches, advocacy to influence policy, and earning to give in high-income fields. The most impactful path for you depends on your specific skills and circumstances."
    },
    {
      title: "Part 7: Career capital",
      content: "Career capital refers to the skills, credentials, connections, and resources that can help you have a greater impact in the future. Early in your career, it's often wise to prioritize building versatile career capital—transferable skills like management, data analysis, or communication; useful credentials; valuable connections; and financial runway. Some especially valuable forms include working with outstanding teams, developing rare and valuable skills, and taking roles that give you multiple options for future directions."
    },
    {
      title: "Part 8: Personal fit",
      content: "Personal fit means choosing paths where you have potential to excel, not just areas where you already have proven abilities. To assess personal fit, look for evidence of your potential in related domains, try tasks similar to the job, talk to experts in the field about your prospects, and consider starting with short trials before making major commitments. Remember that abilities are largely built rather than innate, so mindset and deliberate practice matter tremendously for developing expertise."
    },
    {
      title: "Part 9: How to be successful",
      content: "Career success comes from combining the right approach with consistent effort. Key principles include focusing on your top priorities rather than spreading yourself too thin, using deliberate practice to build skills efficiently, surrounding yourself with supportive people who raise your ambition, taking care of your basics (health, sleep, relationships), and building habits that support sustained productivity. Success rarely comes from passive rule-following—it requires thoughtful adaptation to your specific circumstances."
    },
    {
      title: "Part 10: How to make your career plan",
      content: "Effective career planning balances direction with flexibility. We recommend setting high-level goals but remaining adaptable about the specific path. Instead of planning decades ahead in detail, focus on identifying your next career move by exploring promising options, narrowing down based on impact potential and personal fit, then testing your options with low-cost experiments like conversations and short work trials. This approach recognizes the unpredictability of careers while still providing guidance."
    },
    {
      title: "Part 11: How to get a job",
      content: "Job hunting success comes from being strategic and proactive. Rather than just applying to posted positions, focus on building connections in your target field through warm introductions and informational interviews. Prepare thoroughly for formal applications by tailoring your materials to each position and practicing key skills for interviews. Remember that getting hired is about demonstrating value to the organization, not just your qualifications on paper."
    },
    {
      title: "Part 12: Community",
      content: "You don't have to pursue your career alone. There's a growing community of people focused on having a positive impact with their careers, with online resources, in-person events, and coaching available. Connecting with like-minded individuals can provide support, accountability, and valuable connections. Building your own supportive network across different areas of your life can dramatically increase your chances of staying motivated and finding opportunities."
    },
    {
      title: "Summary: Just the bottom lines",
      content: "Career decisions are among life's most important choices given the time we spend working. To maximize your positive impact: (1) Focus on the most pressing problems facing society and future generations, (2) Consider diverse paths for impact including direct work, enabling others, and earning to give, (3) Build career capital early to increase your future options, (4) Prioritize personal fit to find where you can excel, not just where you're currently skilled, and (5) Use an experimental approach to career planning, testing options rather than planning decades in detail. Small changes in direction now can lead to dramatically different outcomes over a full career."
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">Career Guide Questions & Answers</h2>
      <div className="grid grid-cols-1 gap-4">
        {careerGuideQuestions.map((question, index) => (
          <Card 
            key={index} 
            className={`transition-all duration-300 ${expandedQuestion === index ? "border-primary" : ""}`}
          >
            <CardHeader 
              className="cursor-pointer py-4" 
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  {question.title}
                </CardTitle>
                {expandedQuestion === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedQuestion === index && (
              <CardContent className="pt-0 pb-4">
                <p className="text-muted-foreground">{question.content}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendations;
