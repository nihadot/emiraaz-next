export type AgentStatus = {
  working: boolean;
  notWorking: boolean;
  notAvailable: boolean;
  reportAgent: boolean;
};

export type AgentData = {
  name: string;
  country: string;
  languages: string[];
  joiningDate: string;
  resigningDate?: string;
  image?: {
    webp?: { url: string };
  };
};
