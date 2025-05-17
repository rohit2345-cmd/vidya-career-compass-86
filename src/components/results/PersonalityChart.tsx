
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PersonalityData {
  subject: string;
  A: number;
  fullMark: number;
}

interface PersonalityChartProps {
  data: PersonalityData[];
}

const PersonalityChart: React.FC<PersonalityChartProps> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <LineChart className="h-5 w-5 text-accent" />
          Personality Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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
  );
};

export default PersonalityChart;
