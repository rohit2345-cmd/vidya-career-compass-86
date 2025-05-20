
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AdminDataGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateDemoData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-demo-data`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (data.error) {
        toast.error(`Failed to generate data: ${data.error}`);
      } else {
        toast.success(`Successfully generated ${data.assessmentResults} assessment results and ${data.chatMessages} chat messages`);
      }
    } catch (error) {
      console.error("Error generating demo data:", error);
      toast.error("Failed to generate demo data. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={generateDemoData}
      disabled={isLoading}
      className="ml-4"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Demo Data"
      )}
    </Button>
  );
};

export default AdminDataGenerator;
