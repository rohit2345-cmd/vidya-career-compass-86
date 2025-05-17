import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { Configuration, OpenAIApi } from "npm:openai@3.3.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const systemPrompt = `You are an expert career counselor for students in India. Your role is to:
1. Analyze student assessment results and provide personalized career guidance
2. Consider academic performance, interests, and aptitude test scores
3. Recommend specific courses, colleges, and career paths
4. Provide actionable steps for skill development
5. Answer questions about different career paths and educational options

Base your recommendations on:
- Student's assessment scores in different areas
- Their interests and preferences
- Current academic performance
- Career market trends
- Available educational opportunities in India

Keep responses:
- Specific and actionable
- Backed by data when possible
- Focused on the Indian education and career context
- Encouraging but realistic`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, assessmentResults } = await req.json();

    // Initialize OpenAI
    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    }));

    // Prepare conversation context with assessment results
    const conversationMessages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Student's Assessment Results: ${JSON.stringify(assessmentResults)}` },
      ...messages
    ];

    // Get AI response
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: conversationMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return new Response(
      JSON.stringify({ response: completion.data.choices[0].message }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});