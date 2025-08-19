import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 export interface JobType {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  createdBy: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: any; // can be more specific if you know structure
  perksAndBenefits: any;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  isPaid: boolean;
  average_rating: number;
  total_reviews: number;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
}

  interface JobResponse {
  success: boolean;
  message: string;
  data: JobType[];   // 👈 this is the actual array
  errors: string|null;
  count: number;
}
 interface JobResponse2 {
  success: boolean;
  message: string;
  data: JobType;   // 👈 this is the actual array
  errors: String|null;
  count: number;
}


export const getJobApi = createApi({
  reducerPath: "getJopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<JobResponse, void>({
      query: () => "/opportunities/search ",
    }),

    getJobByid: builder.query<JobResponse2, string>({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByidQuery,
} = getJobApi;
