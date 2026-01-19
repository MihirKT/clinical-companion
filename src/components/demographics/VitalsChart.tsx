import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockVitals } from '@/data/mockData';

type VitalType = 'bloodPressure' | 'heartRate' | 'weight' | 'oxygenSaturation';

const vitalOptions: { value: VitalType; label: string }[] = [
  { value: 'bloodPressure', label: 'Blood Pressure' },
  { value: 'heartRate', label: 'Heart Rate' },
  { value: 'weight', label: 'Weight' },
  { value: 'oxygenSaturation', label: 'Oxygen Saturation' },
];

export function VitalsChart() {
  const [selectedVital, setSelectedVital] = useState<VitalType>('bloodPressure');

  const chartData = mockVitals.map(vital => ({
    date: new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(vital.date),
    systolic: vital.bloodPressureSystolic,
    diastolic: vital.bloodPressureDiastolic,
    heartRate: vital.heartRate,
    weight: vital.weight,
    oxygenSaturation: vital.oxygenSaturation,
  })).reverse();

  const renderChart = () => {
    switch (selectedVital) {
      case 'bloodPressure':
        return (
          <>
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              name="Systolic"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
              name="Diastolic"
            />
          </>
        );
      case 'heartRate':
        return (
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2 }}
            name="Heart Rate (bpm)"
          />
        );
      case 'weight':
        return (
          <Line
            type="monotone"
            dataKey="weight"
            stroke="hsl(var(--success))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
            name="Weight (kg)"
          />
        );
      case 'oxygenSaturation':
        return (
          <Line
            type="monotone"
            dataKey="oxygenSaturation"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
            name="SpO2 (%)"
          />
        );
    }
  };

  return (
    <Card className="clinical-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Vital Trends</CardTitle>
            <CardDescription>Track changes over time</CardDescription>
          </div>
          <Select value={selectedVital} onValueChange={(v) => setSelectedVital(v as VitalType)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select vital" />
            </SelectTrigger>
            <SelectContent>
              {vitalOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              {renderChart()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
