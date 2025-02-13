export interface Log {
    id: number;
    date: string;
    callerName: string;
    pharmacist: string;
    type: string;
    status: string;
    site: string;
    timeSpent: number;
    priority: string;
    peerReview: boolean;
  }