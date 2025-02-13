"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from "recharts";
import {
  Activity,
  Clock,
  Users,
  PhoneCall,
  TrendingUp,
  Calendar,
  Download,
  FileText,
  AlertCircle,
  Brain,
  TrendingDown,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("week");
  const [site, setSite] = useState("all");
  const [loading, setLoading] = useState(false);

  // Enhanced sample data with more metrics
  const callsByDay = [
    { day: "Mon", calls: 24, responseTime: 15, satisfaction: 4.5 },
    { day: "Tue", calls: 18, responseTime: 12, satisfaction: 4.8 },
    { day: "Wed", calls: 22, responseTime: 18, satisfaction: 4.2 },
    { day: "Thu", calls: 20, responseTime: 14, satisfaction: 4.6 },
    { day: "Fri", calls: 26, responseTime: 16, satisfaction: 4.4 },
    { day: "Sat", calls: 15, responseTime: 10, satisfaction: 4.7 },
    { day: "Sun", calls: 12, responseTime: 11, satisfaction: 4.9 },
  ];

  const performanceData = [
    { month: "Jan", totalCalls: 280, responseTime: 15, efficiency: 85 },
    { month: "Feb", totalCalls: 300, responseTime: 14, efficiency: 87 },
    { month: "Mar", totalCalls: 320, responseTime: 13, efficiency: 89 },
    // Add more months...
  ];

  const aiInsights = [
    {
      type: "trend",
      message: "20% increase in call volume during weekends",
      impact: "high",
    },
    {
      type: "anomaly",
      message: "Unusual spike in response times between 2-4 AM",
      impact: "medium",
    },
    {
      type: "prediction",
      message: "Expected high call volume next Tuesday",
      impact: "high",
    },
  ];

  const handleExport = async (format: string) => {
    setLoading(true);
    try {
      // Implement export logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Exporting dashboard in ${format} format`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={site} onValueChange={setSite}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              <SelectItem value="central">Central Hospital</SelectItem>
              <SelectItem value="north">North Wing</SelectItem>
              <SelectItem value="south">South Wing</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => handleExport("pdf")}
            disabled={loading}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("excel")}
            disabled={loading}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PhoneCall className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Calls</p>
                <h3 className="text-2xl font-bold">1,284</h3>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <h3 className="text-2xl font-bold">18 min</h3>
                <p className="text-sm text-green-600">-5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Pharmacists</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-gray-500">Across all sites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Peer Reviews</p>
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-sm text-blue-600">32 pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalCalls" fill="#8884d8" yAxisId="left" />
                  <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" yAxisId="right" />
                  <Area type="monotone" dataKey="responseTime" fill="#ffc658" stroke="#ff7300" yAxisId="right" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Call Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Call Distribution by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Medicine Info', value: 35 },
                      { name: 'Clinical Advice', value: 25 },
                      { name: 'Supply Issue', value: 20 },
                      { name: 'Emergency', value: 15 },
                      { name: 'Other', value: 5 }
                    ]}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      '#0088FE',
                      '#00C49F',
                      '#FFBB28',
                      '#FF8042',
                      '#8884d8'
                    ].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calls" fill="#4F46E5" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="responseTime" stroke="#4F46E5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <CardTitle>AI Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {insight.type === 'trend' && (
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    )}
                    {insight.type === 'anomaly' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {insight.type === 'prediction' && (
                      <Zap className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{insight.message}</p>
                      <span className={`text-xs mt-1 ${
                        insight.impact === 'high' ? 'text-red-500' :
                        insight.impact === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New on-call log created</p>
                  <p className="text-sm text-gray-500">
                    Dr. Smith requested information about Medicine A
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;