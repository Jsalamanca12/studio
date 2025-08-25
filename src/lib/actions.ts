"use server";

import { z } from "zod";
import { categorizeIncident } from "@/ai/flows/categorize-incident";

const reportSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
});

export interface ReportState {
  message: string | null;
  category?: string;
  error?: boolean;
}

export async function submitReport(
  prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  const validatedFields = reportSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.description?.join(", ") ?? "Invalid input.",
      error: true,
    };
  }
  
  try {
    // Artificial delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await categorizeIncident({
      reportDescription: validatedFields.data.description,
    });
    
    return {
      message: `Your report has been submitted successfully and categorized as '${result.category}'. Thank you for helping keep our school safe.`,
      category: result.category,
      error: false,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "An AI error occurred while categorizing the incident. It has been filed as 'Other'.",
      category: "Other",
      error: false, // We still consider this a success for the user
    };
  }
}
