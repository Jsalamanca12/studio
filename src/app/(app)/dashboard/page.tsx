import React from "react";
import { Activity, AlertTriangle, Badge, FileText, HeartPulse, Users } from "lucide-react";

import type { Incident, IncidentCategory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { DashboardClient } from "@/components/dashboard-client";
import { Icons } from "@/components/icons";

const incidents: Incident[] = [
    { id: 'INC-001', description: 'Student was pushed in the hallway near the library.', category: 'Bullying', date: '2024-07-20', status: 'New', location: 'Main Hallway' },
    { id: 'INC-002', description: 'Backpack with textbooks was stolen from a locker.', category: 'Theft', date: '2024-07-19', status: 'In Progress', location: 'Gym Lockers' },
    { id: 'INC-003', description: 'Student fainted during the morning assembly.', category: 'Medical Emergency', date: '2024-07-19', status: 'Resolved', location: 'Auditorium' },
    { id: 'INC-004', description: 'Graffiti with offensive language found on bathroom wall.', category: 'Other', date: '2024-07-18', status: 'Resolved', location: '2nd Floor Bathroom' },
    { id: 'INC-005', description: 'A student reported receiving threatening messages online.', category: 'Bullying', date: '2024-07-18', status: 'In Progress', location: 'Online' },
    { id: 'INC-006', description: 'Lunch money was forcibly taken by an older student.', category: 'Theft', date: '2024-07-17', status: 'New', location: 'Cafeteria' },
    { id: 'INC-007', description: 'A student is being consistently excluded from group activities.', category: 'Bullying', date: '2024-07-20', status: 'New', location: 'Playground' },
];

const categoryIcons: Record<IncidentCategory, React.ReactElement> = {
    'Bullying': <Icons.bullying className="h-4 w-4" />,
    'Theft': <Icons.theft className="h-4 w-4" />,
    'Medical Emergency': <Icons.medical className="h-4 w-4" />,
    'Other': <Icons.other className="h-4 w-4" />
};

const statusVariant: Record<Incident['status'], 'default' | 'secondary' | 'outline'> = {
  'New': 'destructive',
  'In Progress': 'default',
  'Resolved': 'secondary'
}

export default function DashboardPage() {
    const totalIncidents = incidents.length;
    const newIncidents = incidents.filter(i => i.status === 'New').length;
    const inProgressIncidents = incidents.filter(i => i.status === 'In Progress').length;
    const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;

    const incidentsByCategory = incidents.reduce((acc, incident) => {
        acc[incident.category] = (acc[incident.category] || 0) + 1;
        return acc;
    }, {} as Record<IncidentCategory, number>);

    const chartData = (Object.keys(categoryIcons) as IncidentCategory[]).map(cat => ({
        name: cat,
        count: incidentsByCategory[cat] || 0,
    }));


    return (
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalIncidents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Incidents</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newIncidents}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inProgressIncidents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{resolvedIncidents}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <DashboardClient incidentsData={chartData} />
                </div>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Incidents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incidents.slice(0, 5).map((incident) => (
                                    <TableRow key={incident.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-medium">
                                                {categoryIcons[incident.category]}
                                                <span>{incident.category}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground truncate max-w-xs">{incident.description}</TableCell>
                                        <TableCell>
                                            <BadgeUI variant={statusVariant[incident.status]}>{incident.status}</BadgeUI>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}


function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
