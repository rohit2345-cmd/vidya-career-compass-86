
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface StudentInfo {
  name: string;
  age: number;
  grade: string;
  school: string;
  board: string;
  currentStream: string;
  assessmentTaken: string;
  date: string;
  duration: string;
  questionsAnswered: number;
  overallScore: number;
}

interface StudentInfoCardProps {
  studentInfo: StudentInfo;
}

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ studentInfo }) => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-white to-blue-50 border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Student Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Personal Information</h3>
            <p className="font-semibold text-lg mb-1">{studentInfo.name}</p>
            <p>{studentInfo.age} years old</p>
            <p>{studentInfo.grade}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Academic Background</h3>
            <p>{studentInfo.school}</p>
            <p>{studentInfo.board} Board</p>
            <p>{studentInfo.currentStream}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Assessment Details</h3>
            <p>{studentInfo.assessmentTaken}</p>
            <p>Completed on: {studentInfo.date}</p>
            <p>Duration: {studentInfo.duration}</p>
            <p>Questions answered: {studentInfo.questionsAnswered}</p>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span>Overall Score:</span>
                <Badge className="bg-primary">{studentInfo.overallScore}%</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
