
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  initial: string;
  name: string;
  school: string;
  testimonial: string;
  initialColor: string;
  backgroundColor: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  initial,
  name,
  school,
  testimonial,
  initialColor,
  backgroundColor
}) => {
  return (
    <Card className="card-hover border-0 shadow-lg h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-full ${backgroundColor} flex items-center justify-center`}>
            <span className={`text-xl font-bold ${initialColor}`}>{initial}</span>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{school}</p>
          </div>
        </div>
        
        <div className="relative flex-grow">
          <Quote className="absolute -top-2 -left-1 h-6 w-6 text-muted stroke-1 opacity-40" />
          <p className="pl-6 text-base">
            {testimonial}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
