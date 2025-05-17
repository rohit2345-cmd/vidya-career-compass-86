
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart as BarChartIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AptitudeData {
  name: string;
  score: number;
}

interface AptitudeChartProps {
  data: AptitudeData[];
}

const AptitudeChart: React.FC<AptitudeChartProps> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChartIcon className="h-5 w-5 text-primary" />
          Aptitude Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
  );
};

export default AptitudeChart;
