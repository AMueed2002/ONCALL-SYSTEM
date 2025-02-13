"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Search,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define interfaces
interface Drug {
  id: number;
  name: string;
  code: string;
  type: string;
}

interface DrugSearchProps {
  onSelect: (drug: Drug) => void;
}

interface FormData {
  timeOfCall: string;
  site: string;
  callerName: string;
  callerDesignation: string;
  meetsCriteria: string;
  requestType: string;
  clinicDepartment: string;
  urgencyLevel: string;
  inquiryDetails: string;
  patientId: string;
  patientName: string;
  patientDOB: string;
  patientWard: string;
  selectedDrugs: Drug[];
  peerReview: boolean;
  clinicalImpact: string;
  interventionType: string;
  timeSpent: string;
  hospitalVisit: boolean;
  milesTraveled: string;
  compensatoryRest: boolean;
  restTime: string;
  notifyTeams: string[];
  callTriage: boolean;
  siteManagerReview: boolean;
  followUpRequired: boolean;
  followUpDate: string;
  resolution: string;
}

// Drug search component
const DrugSearch = ({ onSelect }: DrugSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Drug[]>([]);

  // Simulated drug search
  const searchDrugs = async (term: string) => {
    // This would be replaced with actual API call to drug database
    const mockResults: Drug[] = [
      { id: 1, name: "Paracetamol", code: "PAR001", type: "BNF" },
      { id: 2, name: "Ibuprofen", code: "IBU001", type: "BNF" },
    ];
    setResults(mockResults);
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          placeholder="Search for drugs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchDrugs(e.target.value);
          }}
        />
        <Button variant="outline" onClick={() => searchDrugs(searchTerm)}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {results.length > 0 && (
        <div className="border rounded-md p-2">
          {results.map((drug) => (
            <div
              key={drug.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(drug)}
            >
              <span>{drug.name}</span>
              <Badge>{drug.type}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NewLogForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1 - Basic Details
    timeOfCall: "",
    site: "",
    callerName: "",
    callerDesignation: "",
    meetsCriteria: "",
    requestType: "",
    clinicDepartment: "",
    urgencyLevel: "normal",

    // Step 2 - Patient & Drug Details
    inquiryDetails: "",
    patientId: "",
    patientName: "",
    patientDOB: "",
    patientWard: "",
    selectedDrugs: [],
    peerReview: false,
    clinicalImpact: "",
    interventionType: "",

    // Step 3 - Resolution & Follow-up
    timeSpent: "",
    hospitalVisit: false,
    milesTraveled: "",
    compensatoryRest: false,
    restTime: "",
    notifyTeams: [],
    callTriage: false,
    siteManagerReview: false,
    followUpRequired: false,
    followUpDate: "",
    resolution: "",
  });

  // Fetch patient details when ID is entered
  useEffect(() => {
    if (formData.patientId) {
      fetchPatientDetails(formData.patientId);
    }
  }, [formData.patientId]);

  const fetchPatientDetails = async (id: string) => {
    try {
      // This would be replaced with actual PAS integration
      // Simulated API call
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          patientName: "John Smith",
          patientDOB: "1980-01-01",
          patientWard: "Ward A"
        }));
      }, 500);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrugSelect = (drug: Drug) => {
    setFormData(prev => ({
      ...prev,
      selectedDrugs: [...prev.selectedDrugs, drug]
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${
                step === num
                  ? "bg-blue-600 text-white"
                  : step > num
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }
            `}
          >
            {step > num ? <Check className="h-6 w-6" /> : num}
          </div>
          {num < 3 && (
            <div className="w-24 h-1 mx-2 bg-gray-200">
              <div
                className={`h-full ${
                  step > num ? "bg-green-500" : "bg-gray-200"
                }`}
                style={{ width: step > num ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="timeOfCall">Time of Call</Label>
          <Input
            id="timeOfCall"
            type="datetime-local"
            value={formData.timeOfCall}
            onChange={(e) => handleInputChange("timeOfCall", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="site">Site</Label>
          <Select
            value={formData.site}
            onValueChange={(value) => handleInputChange("site", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="central">Central Hospital</SelectItem>
              <SelectItem value="north">North Wing</SelectItem>
              <SelectItem value="south">South Wing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="callerName">Caller Name</Label>
          <Input
            id="callerName"
            placeholder="e.g. Dr. Smith"
            value={formData.callerName}
            onChange={(e) => handleInputChange("callerName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="callerDesignation">Caller Designation</Label>
          <Select
            value={formData.callerDesignation}
            onValueChange={(value) => handleInputChange("callerDesignation", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="nurse">Nurse</SelectItem>
              <SelectItem value="midwife">Midwife</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Meets On-Call Criteria?</Label>
        <RadioGroup
          value={formData.meetsCriteria}
          onValueChange={(value) => handleInputChange("meetsCriteria", value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="criteria-yes" />
            <Label htmlFor="criteria-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="criteria-no" />
            <Label htmlFor="criteria-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="requestType">Type of Request</Label>
          <Select
            value={formData.requestType}
            onValueChange={(value) => handleInputChange("requestType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medicine">Medicine Information</SelectItem>
              <SelectItem value="clinical">Clinical Advice</SelectItem>
              <SelectItem value="supply">Supply Issue</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgencyLevel">Urgency Level</Label>
          <Select
            value={formData.urgencyLevel}
            onValueChange={(value) => handleInputChange("urgencyLevel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="inquiryDetails">Inquiry Details</Label>
        <Textarea
          id="inquiryDetails"
          placeholder="Enter inquiry details..."
          value={formData.inquiryDetails}
          onChange={(e) => handleInputChange("inquiryDetails", e.target.value)}
          className="min-h-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient ID</Label>
          <Input
            id="patientId"
            placeholder="Enter patient ID"
            value={formData.patientId}
            onChange={(e) => handleInputChange("patientId", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            value={formData.patientName}
            disabled
            className="bg-gray-50"
          />
        </div>
      </div>

      {formData.patientName && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Patient details loaded from PAS system
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Drugs</Label>
        <DrugSearch onSelect={handleDrugSelect} />
        {formData.selectedDrugs.length > 0 && (
          <div className="mt-2 space-y-2">
            {formData.selectedDrugs.map((drug, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <span>{drug.name}</span>
                <Badge>{drug.type}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>For Discussion at Peer Review?</Label>
        <RadioGroup
          value={formData.peerReview.toString()}
          onValueChange={(value) =>
            handleInputChange("peerReview", value === "true")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="peer-yes" />
            <Label htmlFor="peer-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="peer-no" />
            <Label htmlFor="peer-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
          <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
          <Input
            id="timeSpent"
            type="number"
            placeholder="Enter time in minutes"
            value={formData.timeSpent}
            onChange={(e) => handleInputChange("timeSpent", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Hospital Visit Required?</Label>
          <RadioGroup
            value={formData.hospitalVisit.toString()}
            onValueChange={(value) =>
              handleInputChange("hospitalVisit", value === "true")
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="visit-yes" />
              <Label htmlFor="visit-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="visit-no" />
              <Label htmlFor="visit-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {formData.hospitalVisit && (
        <div className="space-y-2">
          <Label htmlFor="milesTraveled">Miles Traveled</Label>
          <Input
            id="milesTraveled"
            type="number"
            placeholder="Enter miles traveled"
            value={formData.milesTraveled}
            onChange={(e) => handleInputChange("milesTraveled", e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Compensatory Rest Taken?</Label>
        <RadioGroup
          value={formData.compensatoryRest.toString()}
          onValueChange={(value) =>
            handleInputChange("compensatoryRest", value === "true")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="rest-yes" />
            <Label htmlFor="rest-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="rest-no" />
            <Label htmlFor="rest-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.compensatoryRest && (
        <div className="space-y-2">
          <Label htmlFor="restTime">Rest Time (minutes)</Label>
          <Input
            id="restTime"
            type="number"
            placeholder="Enter rest time in minutes"
            value={formData.restTime}
            onChange={(e) => handleInputChange("restTime", e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Notify Teams</Label>
        <div className="grid grid-cols-2 gap-4">
          {["Respiratory", "Cardiology", "Emergency", "Pharmacy", "ICU", "Surgery"].map(
            (team) => (
              <div key={team} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`team-${team}`}
                  checked={formData.notifyTeams.includes(team)}
                  onChange={(e) => {
                    const newTeams = e.target.checked
                      ? [...formData.notifyTeams, team]
                      : formData.notifyTeams.filter((t) => t !== team);
                    handleInputChange("notifyTeams", newTeams);
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor={`team-${team}`}>{team}</Label>
              </div>
            )
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Follow-up Required?</Label>
        <RadioGroup
          value={formData.followUpRequired.toString()}
          onValueChange={(value) =>
            handleInputChange("followUpRequired", value === "true")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="followup-yes" />
            <Label htmlFor="followup-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="followup-no" />
            <Label htmlFor="followup-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.followUpRequired && (
        <div className="space-y-2">
          <Label htmlFor="followUpDate">Follow-up Date</Label>
          <Input
            id="followUpDate"
            type="datetime-local"
            value={formData.followUpDate}
            onChange={(e) => handleInputChange("followUpDate", e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="resolution">Resolution/Outcome</Label>
        <Textarea
          id="resolution"
          placeholder="Enter the resolution or outcome..."
          value={formData.resolution}
          onChange={(e) => handleInputChange("resolution", e.target.value)}
          className="min-h-32"
        />
      </div>

      <div className="space-y-2">
        <Label>Call Triage by Site Manager?</Label>
        <RadioGroup
          value={formData.callTriage.toString()}
          onValueChange={(value) =>
            handleInputChange("callTriage", value === "true")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="triage-yes" />
            <Label htmlFor="triage-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="triage-no" />
            <Label htmlFor="triage-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Site Manager Review Required?</Label>
        <RadioGroup
          value={formData.siteManagerReview.toString()}
          onValueChange={(value) =>
            handleInputChange("siteManagerReview", value === "true")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="review-yes" />
            <Label htmlFor="review-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="review-no" />
            <Label htmlFor="review-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return (
          formData.timeOfCall &&
          formData.site &&
          formData.callerName &&
          formData.callerDesignation &&
          formData.meetsCriteria &&
          formData.requestType
        );
      case 2:
        return formData.inquiryDetails && (formData.patientId || formData.selectedDrugs.length > 0);
      case 3:
        return formData.timeSpent && formData.resolution;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would integrate with your API
      console.log("Submitting form data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and redirect
      alert("On-call log created successfully!");
      // You might want to use your router to redirect
      // router.push('/logs/my-logs');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create on-call log. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>New On-Call Log</CardTitle>
        <CardDescription>
          {step === 1 && "Enter basic call details"}
          {step === 2 && "Add patient and drug information"}
          {step === 3 && "Complete final details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={() => {
            if (step < 3) {
              if (validateStep(step)) {
                setStep(step + 1);
              } else {
                alert("Please fill in all required fields before proceeding.");
              }
            } else {
              handleSubmit();
            }
          }}
        >
          {step < 3 ? (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            "Submit Log"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewLogForm;