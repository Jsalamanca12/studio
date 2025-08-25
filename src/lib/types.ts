export type IncidentCategory = "Bullying" | "Theft" | "Medical Emergency" | "Other";

export interface Incident {
  id: string;
  description: string;
  category: IncidentCategory;
  date: string;
  status: "New" | "In Progress" | "Resolved";
  location: string;
}
