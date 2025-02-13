"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  MessageSquare,
} from "lucide-react";

// Define the type for a log object
type Log = {
  id: number;
  date: string;
  callerName: string;
  type: string;
  status: string;
  peerReview: boolean;
  timeSpent: number;
  site: string;
};

const MyLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<Log | null>(null); // Fix: Add type annotation

  // Sample data - replace with actual data from your backend
  const logs: Log[] = [
    {
      id: 1,
      date: "2025-02-10 14:30",
      callerName: "Dr. Smith",
      type: "Medicine Information",
      status: "Completed",
      peerReview: true,
      timeSpent: 20,
      site: "Central Hospital",
    },
    {
      id: 2,
      date: "2025-02-10 15:45",
      callerName: "Nurse Johnson",
      type: "Clinical Advice",
      status: "Pending Review",
      peerReview: true,
      timeSpent: 15,
      site: "North Wing",
    },
    // Add more sample logs here
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format`);
    // Implement export functionality
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.site.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateFilter = dateFilter === "all" ? true : true; // Implement date filtering
    const matchesTypeFilter =
      typeFilter === "all" ? true : log.type === typeFilter;

    return matchesSearch && matchesDateFilter && matchesTypeFilter;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Logs</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("excel")}>
              <FileText className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Medicine Information">
                  Medicine Information
                </SelectItem>
                <SelectItem value="Clinical Advice">Clinical Advice</SelectItem>
                <SelectItem value="Supply Issue">Supply Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.callerName}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>{log.site}</TableCell>
                    <TableCell>{log.timeSpent} min</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)} // Now works with `Log | null`
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {log.peerReview && (
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Details Modal would go here */}
    </div>
  );
};

export default MyLogs;