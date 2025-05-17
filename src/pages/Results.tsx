
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as BarChartIcon,
  PieChart,
  LineChart,
  Briefcase,
  GraduationCap,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react";

// Import recharts components for our visualization
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Results = () => {
  const { assessmentType = "comprehensive" } = useParams<{ assessmentType: string }>();

  // Mock data for charts
  const aptitudeData = [
    { name: "Logical", score: 75 },
    { name: "Numerical", score: 82 },
    { name: "Verbal", score: 65 },
    { name: "Spatial", score: 90 },
    { name: "Memory", score: 78 },
  ];

  const interestData = [
    { name: "Science", value: 35 },
    { name: "Commerce", value: 25 },
    { name: "Arts", value: 15 },
    { name: "Technology", value: 25 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const personalityData = [
    { subject: "Openness", A: 80, fullMark: 100 },
    { subject: "Conscientiousness", A: 70, fullMark: 100 },
    { subject: "Extraversion", A: 60, fullMark: 100 },
    { subject: "Agreeableness", A: 90, fullMark: 100 },
    { subject: "Neuroticism", A: 50, fullMark: 100 },
  ];

  const careerRecommendations = [
    {
      title: "Software Engineer",
      match: 95,
      description: "Develop applications and systems using programming and development skills.",
      skills: ["Programming", "Problem Solving", "Analytical Thinking"],
      education: ["B.Tech in Computer Science", "MCA", "B.Sc in IT"],
    },
    {
      title: "Data Scientist",
      match: 88,
      description: "Analyze complex data sets to identify trends and develop insights.",
      skills: ["Statistics", "Machine Learning", "Data Visualization"],
      education: ["B.Tech + M.Tech in CS/IT", "MSc in Statistics", "B.Sc in Mathematics with specialization"],
    },
    {
      title: "UX Designer",
      match: 82,
      description: "Design user-centered digital experiences and interfaces.",
      skills: ["Design Thinking", "Wireframing", "User Research"],
      education: ["B.Des", "Diploma in UX Design", "Any degree + UX certification"],
    },
  ];

  const topColleges = [
    {
      name: "Indian Institute of Technology (IIT), Mumbai",
      courses: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical Engineering"],
      location: "Mumbai, Maharashtra",
    },
    {
      name: "National Institute of Design (NID), Ahmedabad",
      courses: ["B.Des Product Design", "B.Des Graphic Design", "B.Des Animation"],
      location: "Ahmedabad, Gujarat",
    },
    {
      name: "St. Stephen's College, Delhi University",
      courses: ["B.A. Economics", "B.Sc. Mathematics", "B.A. English"],
      location: "Delhi",
    },
  ];

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
          <p className="text-muted-foreground">
            {assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)} Assessment
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-primary" />
              Aptitude Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aptitudeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis domain={[0, 100]} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Interest Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={interestData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {interestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Personality Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={personalityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="You" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="careers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="careers">Career Recommendations</TabsTrigger>
          <TabsTrigger value="education">Educational Pathways</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
        </TabsList>

        <TabsContent value="careers" className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerRecommendations.map((career, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{career.title}</CardTitle>
                      <Badge className="bg-primary">{career.match}% Match</Badge>
                    </div>
                    <CardDescription>{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Skills Required:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recommended Education:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {career.education.map((edu, i) => (
                            <li key={i}>{edu}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Explore Career
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="education" className="pt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Recommended Colleges & Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topColleges.map((college, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      {college.name}
                    </CardTitle>
                    <CardDescription>{college.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-medium mb-2">Recommended Courses:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {college.courses.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      College Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="pt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Skills to Develop</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Programming</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Data Analysis</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Design Tools</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Mathematics</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Find Courses
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Communication</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Leadership</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Problem Solving</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Teamwork</span>
                      <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Development Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted/30 rounded-lg p-6 border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Career Counselor
            </h3>
            <p className="text-muted-foreground">
              Chat with our AI counselor for personalized guidance about your results
            </p>
          </div>
          <Link to="/ai-counselor">
            <Button className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Start Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
