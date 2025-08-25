"use client"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Cell, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { IncidentCategory } from "@/lib/types"

const chartConfig = {
  count: {
    label: "Incidents",
  },
  Bullying: {
    label: "Bullying",
    color: "hsl(var(--chart-1))",
  },
  Theft: {
    label: "Theft",
    color: "hsl(var(--chart-2))",
  },
  "Medical Emergency": {
    label: "Medical",
    color: "hsl(var(--chart-3))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function DashboardClient({ incidentsData }: { incidentsData: { name: IncidentCategory; count: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Overview</CardTitle>
        <CardDescription>A summary of reported incidents by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incidentsData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
               <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="count" radius={8}>
                 {incidentsData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={chartConfig[entry.name].color} />
                 ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
