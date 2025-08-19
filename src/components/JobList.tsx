import React from "react";
import Job from "./Job";
import NavBar from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import jobs from "../jobs.json";
import { useGetJobsQuery } from "../services/getJobs";
import type { JobType } from "../services/getJobs";
const JobList = () => {
  const [job1, setjobs] = useState<JobType[]>();
  const { data, isLoading, error } = useGetJobsQuery();
  const job = jobs["job_postings"];
  useEffect(() => {
    if (!isLoading && !error) setjobs(data?.data);
  }, [isLoading, error]);
  return (
    <div>
      <div className="w-full fixed">
        <NavBar />
      </div>
      <div className="grid grid-cols-12 pt-20">
        <div className=" col-span-10 md:col-span-10 pl-5 md:pl-20 lg:pl-35">
          <div className="pl-2 mb-10 flex justify-between grid-col-4">
            <div>
              <h1 className="font-[1000]   text-3xl non-italic ">
                Opportunities
              </h1>
              <p className="font-[200]"> Showing {job1?.length} results </p>
            </div>
          </div>

          {job1?.map((j, ind) => (
            <Job
              key={ind}
            Title={j.title}
            description={j.description}
            subtitle={j.location}
            photo={j.logoUrl}
            fields={j.categories}
            ind={j.id}
            opType={j.opType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
