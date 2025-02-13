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
  Hospital,
} from "lucide-react";

const SiteLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSite, setSelectedSite] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - replace with actual data from your backend
  const sites = [
    { id: "central", name: "Central Hospital" },
    { id: "north", name: "North Wing" },
    { id: "south", name: "South Wing" },
  ];

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
      peerReview: true,
    },
    // Add more sample logs
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting ${format} for ${selectedSite}`);
    // Implement export functionality
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.pharmacist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSite =
      selectedSite === "all" ? true : log.site === selectedSite;
    const matchesDate = dateFilter === "all" ? true : true; // Implement date filtering
    const matchesStatus =
      statusFilter === "all" ? true : log.status === statusFilter;

    return matchesSearch && matchesSite && matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-blue-600" />
            <CardTitle>Site Logs</CardTitle>
          </div>
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
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger>
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {sites.map((site) => (
                  <SelectItem key={site.id} value={site.name}>
                    {site.name}
                  </SelectItem>
                ))}
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
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Total Logs</div>
                <div className="text-2xl font-bold">{filteredLogs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Pending Reviews</div>
                <div className="text-2xl font-bold">
                  {
                    filteredLogs.filter(
                      (log) => log.status === "Pending Review"
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Average Time</div>
                <div className="text-2xl font-bold">
                  {Math.round(
                    filteredLogs.reduce((acc, log) => acc + log.timeSpent, 0) /
                      filteredLogs.length
                  )}{" "}
                  min
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Peer Reviews</div>
                <div className="text-2xl font-bold">
                  {filteredLogs.filter((log) => log.peerReview).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Pharmacist</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
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
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {log.status}
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
    </div>
  );
};

export default SiteLogs;
