// src/ai/actions.ts

import { categorizeIncident } from "./flows/categorize-incident";

// Esta función recibe la descripción del reporte
// y devuelve la categoría clasificada por la IA.
export async function clasificarIncidente(descripcion: string) {
  try {
    const resultado = await categorizeIncident({
      reportDescription: descripcion,
    });

    // Si la IA no devuelve nada, devolvemos "Otro"
    return resultado?.category ?? "Otro";
  } catch (error) {
    console.error("Error clasificando el incidente:", error);
    return "Otro"; // fallback seguro
  }
}
