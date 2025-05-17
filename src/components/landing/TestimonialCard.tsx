
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full ${backgroundColor} flex items-center justify-center`}>
            <span className={`text-xl font-bold ${initialColor}`}>{initial}</span>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{school}</p>
          </div>
        </div>
        <p className="italic">
          {testimonial}
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
