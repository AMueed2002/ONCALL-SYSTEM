"use client"

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
  Archive,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";

const AllLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);

  // Sample data - replace with actual data from your backend
  const logs = [
    {
      id: 1,
      date: "2025-02-10 14:30",
      callerName: "Dr. Smith",
      pharmacist: "Jane Doe",
      type: "Medicine Information",
      status: "Completed",
      site: "Central Hospital",
      timeSpent: 20,
      priority: "High",
      peerReview: true,
    },
    // Add more sample logs
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting ${format} for selected logs:`, selectedLogs);
  };

  const handleArchive = () => {
    console.log("Archiving selected logs:", selectedLogs);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.pharmacist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSite = siteFilter === "all" ? true : log.site === siteFilter;
    const matchesDate = dateFilter === "all" ? true : true; // Implement date filtering
    const matchesStatus =
      statusFilter === "all" ? true : log.status === statusFilter;

    return matchesSearch && matchesSite && matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Logs</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleExport("pdf")}
              disabled={selectedLogs.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("excel")}
              disabled={selectedLogs.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button
              variant="outline"
              onClick={handleArchive}
              disabled={selectedLogs.length === 0}
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Selected
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Logs</p>
                    <p className="text-2xl font-bold">{logs.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Review</p>
                    <p className="text-2xl font-bold">
                      {
                        logs.filter((log) => log.status === "Pending Review")
                          .length
                      }
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">High Priority</p>
                    <p className="text-2xl font-bold">
                      {logs.filter((log) => log.priority === "High").length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Average Time</p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        logs.reduce((acc, log) => acc + log.timeSpent, 0) /
                          logs.length
                      )}{" "}
                      min
                    </p>
                  </div>
                  <RefreshCcw className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={siteFilter} onValueChange={setSiteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="Central Hospital">
                  Central Hospital
                </SelectItem>
                <SelectItem value="North Wing">North Wing</SelectItem>
                <SelectItem value="South Wing">South Wing</SelectItem>
              </SelectContent>
            </Select>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedLogs.length === filteredLogs.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLogs(filteredLogs.map((log) => log.id));
                        } else {
                          setSelectedLogs([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Pharmacist</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedLogs.includes(log.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLogs([...selectedLogs, log.id]);
                          } else {
                            setSelectedLogs(
                              selectedLogs.filter((id) => id !== log.id)
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.site}</TableCell>
                    <TableCell>{log.pharmacist}</TableCell>
                    <TableCell>{log.callerName}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>{log.timeSpent} min</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : log.status === "Pending Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : log.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {log.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {log.peerReview && (
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
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
              {selectedLogs.length > 0 && ` (${selectedLogs.length} selected)`}
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
    </div>
  );
};

export default AllLogs;
