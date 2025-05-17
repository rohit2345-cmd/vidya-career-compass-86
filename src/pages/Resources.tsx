
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuidesTab from "../components/resources/GuidesTab";
import EducationTab from "../components/resources/EducationTab";
import AssessmentsTab from "../components/resources/AssessmentsTab";
import VideosTab from "../components/resources/VideosTab";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 animate-fade-in">
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Career Resources</h1>
          <p className="text-xl text-muted-foreground">
            Helpful resources to guide your career journey
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="guides">Career Guides</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="videos">Video Resources</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guides">
            <GuidesTab />
          </TabsContent>

          <TabsContent value="education">
            <EducationTab />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentsTab />
          </TabsContent>

          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
