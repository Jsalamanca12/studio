import { ReportForm } from "@/components/report-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Incident Reporting
        </h1>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              Submit a New Incident Report
            </CardTitle>
            <CardDescription>
              Help us maintain a safe and secure environment for everyone. If you&apos;ve witnessed or experienced an incident, please let us know.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
