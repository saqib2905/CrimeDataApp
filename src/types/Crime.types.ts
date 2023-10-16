interface OutcomeStatus {
  category: string;
  date: string;
}

interface CrimeType {
  category: string;
  context?: string;
  month: string;
  location: {
    street: {
      name: string;
    };
  };
  outcome_status: OutcomeStatus | null;
}
export default CrimeType;
