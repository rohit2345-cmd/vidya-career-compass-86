
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Youtube } from "lucide-react";

const VideosTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="card-hover bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <CardTitle>Career Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Video Thumbnail</p>
          </div>
          <p>
            Interviews with professionals across various fields sharing their
            career journeys and advice.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Watch Series
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-hover bg-gradient-to-br from-white to-emerald-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <CardTitle>Skill Development</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Video Thumbnail</p>
          </div>
          <p>
            Tutorial videos on developing essential skills for various career
            paths and industries.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Watch Tutorials
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-hover bg-gradient-to-br from-white to-amber-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <CardTitle>Student Success Stories</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Video Thumbnail</p>
          </div>
          <p>
            Real stories from students who successfully navigated their career
            journeys with our guidance.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Watch Stories
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideosTab;
