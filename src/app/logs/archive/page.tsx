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
  Archive,
  Eye,
  Calendar,
} from "lucide-react";

const ArchiveLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  // Sample archived data
  const archivedLogs = [
    {
      id: 1,
      date: "2024-01-10 14:30",
      callerName: "Dr. Smith",
      pharmacist: "Jane Doe",
      type: "Medicine Information",
      site: "Central Hospital",
      timeSpent: 20,
      archiveDate: "2025-02-01",
    },
    // Add more sample archived logs
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting ${format} for archived logs`);
    // Implement export functionality
  };

  const filteredLogs = archivedLogs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.pharmacist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSite = siteFilter === "all" ? true : log.site === siteFilter;
    const matchesYear =
      yearFilter === "all" ? true : log.date.startsWith(yearFilter);
    const matchesMonth =
      monthFilter === "all"
        ? true
        : log.date.startsWith(`${yearFilter}-${monthFilter}`);

    return matchesSearch && matchesSite && matchesYear && matchesMonth;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Archive className="h-6 w-6 text-blue-600" />
            <CardTitle>Archive Logs</CardTitle>
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
          <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search archived logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="01">January</SelectItem>
                <SelectItem value="02">February</SelectItem>
                {/* Add other months */}
              </SelectContent>
            </Select>
            <Select value={siteFilter} onValueChange={setSiteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select site" />
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
          </div>

          {/* Archive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Total Archived</div>
                <div className="text-2xl font-bold">{filteredLogs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Latest Archive Date</div>
                <div className="text-2xl font-bold">
                  {filteredLogs.length > 0
                    ? new Date(
                        Math.max(
                          ...filteredLogs.map((log) =>
                            new Date(log.archiveDate).getTime()
                          )
                        )
                      ).toLocaleDateString()
                    : "N/A"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">Archive Size</div>
                <div className="text-2xl font-bold">
                  {`${(filteredLogs.length * 0.1).toFixed(1)} MB`}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Archive Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Original Date</TableHead>
                  <TableHead>Archive Date</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Pharmacist</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(log.archiveDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{log.site}</TableCell>
                    <TableCell>{log.pharmacist}</TableCell>
                    <TableCell>{log.callerName}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>{log.timeSpent} min</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {archivedLogs.length} archived
              logs
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

export default ArchiveLogs;