"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "recharts";
import {
  FileText,
  Download,
  Filter,
  RefreshCcw,
  Clock,
  Calendar,
  FileSpreadsheet,
  PhoneCall,
  Users,
  Eye,
  Settings,
  Mail,
  AlertCircle,
  Printer,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Type definitions
interface ReportData {
  volumeData: Array<{
    date: string;
    calls: number;
  }>;
  responseData: Array<{
    name: string;
    value: number;
  }>;
  detailedLogs: Array<{
    dateTime: string;
    pharmacist: string;
    type: string;
    responseTime: number;
    status: string;
  }>;
}

interface Schedule {
  id: number;
  name: string;
  frequency: string;
  day: string;
  time: string;
  recipients: string[];
  type: string;
  active: boolean;
}

interface SavedReport {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface ReportConfigurationProps {
  reportType: string;
  setReportType: (type: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  site: string;
  setSite: (site: string) => void;
  generateReport: (format?: string) => Promise<void>;
  loading: boolean;
}

interface ReportPreviewProps {
  reportData: ReportData;
  reportType: string;
}

// Custom components for report sections
const ReportConfiguration: React.FC<ReportConfigurationProps> = ({
  reportType,
  setReportType,
  dateRange,
  setDateRange,
  site,
  setSite,
  generateReport,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generate Report</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateReport('excel')}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateReport('pdf')}
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Activity</SelectItem>
                <SelectItem value="clinical">Clinical Impact</SelectItem>
                <SelectItem value="performance">Performance Metrics</SelectItem>
                <SelectItem value="drugs">Drug Analysis</SelectItem>
                <SelectItem value="audit">Audit Report</SelectItem>
                <SelectItem value="peer">Peer Review Status</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Site</Label>
            <Select value={site} onValueChange={setSite}>
              <SelectTrigger>
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="central">Central Hospital</SelectItem>
                <SelectItem value="north">North Wing</SelectItem>
                <SelectItem value="south">South Wing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => generateReport()}
              disabled={loading}
            >
              {loading ? (
                <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReportPreview: React.FC<ReportPreviewProps> = ({ reportData, reportType }) => {
  const renderCharts = () => {
    switch (reportType) {
      case 'summary':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reportData.volumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="calls" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportData.responseData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {reportData.responseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'detailed':
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Pharmacist</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.detailedLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.dateTime}</TableCell>
                    <TableCell>{log.pharmacist}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>{log.responseTime} min</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {renderCharts()}
      </CardContent>
    </Card>
  );
};

const ScheduledReports: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      name: "Weekly Performance Report",
      frequency: "Weekly",
      day: "Monday",
      time: "09:00",
      recipients: ["team@hospital.com"],
      type: "performance",
      active: true,
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Scheduled Reports</CardTitle>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage Schedules
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">{schedule.name}</p>
                  <p className="text-sm text-gray-500">
                    {schedule.frequency} on {schedule.day} at {schedule.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {schedule.recipients.length} recipients
                </span>
                <Switch
                  checked={schedule.active}
                  onCheckedChange={(checked: boolean) => {
                    setSchedules(schedules.map(s =>
                      s.id === schedule.id ? { ...s, active: checked } : s
                    ));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SavedReports: React.FC = () => {
  const [savedReports, setSavedReports] = useState<SavedReport[]>([
    {
      id: 1,
      name: "Q1 Performance Report",
      type: "performance",
      date: "2025-01-15",
      size: "2.4 MB",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-500">
                    Generated on {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState("summary");
  const [dateRange, setDateRange] = useState("week");
  const [site, setSite] = useState("all");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const generateReport = async (format?: string) => {
    setLoading(true);
    try {
      // Simulate API call to generate report
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock report data
      const mockData: ReportData = {
        volumeData: [
          { date: "Mon", calls: 24 },
          { date: "Tue", calls: 18 },
          { date: "Wed", calls: 22 },
        ],
        responseData: [
          { name: "< 15 min", value: 45 },
          { name: "15-30 min", value: 30 },
          { name: "30-60 min", value: 15 },
          { name: "> 60 min", value: 10 },
        ],
        detailedLogs: [
          {
            dateTime: "2025-02-12 14:30",
            pharmacist: "Jane Doe",
            type: "Medicine Info",
            responseTime: 12,
            status: "Completed",
          },
        ],
      };

      setReportData(mockData);

      if (format) {
        // Handle export logic
        console.log(`Exporting report in ${format} format`);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <ReportConfiguration
            reportType={reportType}
            setReportType={setReportType}
            dateRange={dateRange}
            setDateRange={setDateRange}
            site={site}
            setSite={setSite}
            generateReport={generateReport}
            loading={loading}
          />
          
          {reportData && (
            <ReportPreview
              reportData={reportData}
              reportType={reportType}
            />
          )}
        </TabsContent>

        <TabsContent value="scheduled">
          <ScheduledReports />
        </TabsContent>

        <TabsContent value="saved">
          <SavedReports />
        </TabsContent>
      </Tabs>

      {/* Report Templates */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Monthly Summary",
                description: "Overview of monthly on-call activities",
                icon: Calendar,
              },
              {
                title: "Clinical Impact",
                description: "Analysis of clinical interventions",
                icon: AlertCircle,
              },
              {
                title: "Performance Review",
                description: "Staff performance metrics and analysis",
                icon: Users,
              },
            ].map((template, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <template.icon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Settings */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Report Settings</CardTitle>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label>Default Report Type</Label>
              <Select defaultValue="summary">
                <SelectTrigger>
                  <SelectValue placeholder="Select default type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Activity</SelectItem>
                  <SelectItem value="clinical">Clinical Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Default Date Range</Label>
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue placeholder="Select default range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Email Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select email format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Label>Default Recipients</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {['manager@hospital.com', 'team@hospital.com'].map((email, index) => (
                <Badge key={index} variant="secondary">
                  {email}
                  <button className="ml-2 text-xs">&times;</button>
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                Add Recipient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;