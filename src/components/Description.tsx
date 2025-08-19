import { useParams } from "react-router-dom";
import { useGetJobByidQuery } from "../services/getJobs";
import { useEffect, useState } from "react";
import type { JobType } from "../services/getJobs";
import {Error} from "./Error";
import {Loading} from "./Loading";
import  {NotFound} from "./NotFound";
import { Link } from "react-router-dom";
export const Description = () => {
  const [job, setjobs] = useState<JobType>();
  const { id } = useParams(); // id is string | undefined

   if (!id) {
    return <NotFound message="Invalid job ID." action={<Link to="/">Go back home</Link>} />;
  }

  const { data, error, isLoading } = useGetJobByidQuery(id ?? "", {
    skip: !id,                               
  });
  console.log("data", data);
  useEffect(() => {
    if (error || isLoading) console.log(11);
    else if (data) setjobs(data.data);
  }, [data]);
  
  if (error) {
    return <Error message="Failed to load job details."/>;
  }
  if (isLoading) {
    return <Loading />;
  }

  const colorMap = ["  text-[ #FFB836]", " text-red-200", " text-green-200"];
  const borderMap = [
    " border border-blue-200 ",
    " border border-red-200 ",
    " border border-green-200",
  ];
  const bgMap = [" bg-blue-200 ", " bg-red-100 ", " bg-green-100"];

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="flex p-3 gap-4 flex-row">
      <div className="p-1  basis-5/7">
        <div className="mb-5">
          <div className="font-extrabold mt-3 mb-2">Description</div>
          <div>{job.description}</div>
        </div>
        <div className="mb-5">
          <div className="font-extrabold mt-3 mb-2"> Responsibility </div>
          <div>
            <div className="flex">
              <img src="/check.png" className="h-4 mt-1 mr-1" alt="" />
              <p>{job.responsibilities}</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div>
            <p className="font-extrabold mt-3 mb-2">Ideal Candidate We Want</p>
          </div>
          <div className="flex">
            <span className="font-bold mr-2">.</span>
            <div className="flex pt-1"> {job.idealCandidate}</div>
          </div>
        </div>
        <div>
          <div>
            <p className="font-extrabold ">When and Where</p>
          </div>
          <div className="flex">
            <img src="/location.png" className="h-9 pb-2 mr-1" alt="" />
            {job.whenAndWhere}
          </div>
        </div>
      </div>
      <div className=" basis-2/7 ">
        <div className="mb-4">
          <div className="mb-1 font-bold ">About</div>
          <div>
            <div className="flex gap-2 mb-2">
              <div className="flex align-items-end pt-4">
                <img className="h-7  " src="/postedon.png" alt="" />
              </div>
              <div>
                <p>Posted On</p>
                <p className="font-bold">{new Date(job.datePosted).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="flex align-items-end pt-4">
                <img className="h-7  " src="/deadline.png" alt="" />
              </div>
              <div>
                <p>Dead line</p>
                <p className="font-bold">{new Date(job.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="flex align-items-end pt-4">
                <img className="h-7  " src="/location.png" alt="" />
              </div>
              <div>
                <p>Locaton </p>
                <p className="font-bold">{job.location}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2 ">
              <div className="flex align-items-end pt-4">
                <img className="h-7  " src="/starteddate.png" alt="" />
              </div>
              <div>
                <p>Start Date</p>
                <p className="font-bold">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2 ">
              <div className="flex align-items-end pt-4">
                <img className="h-7  " src="/end.png" alt="" />
              </div>
              <div>
                <p>End Date</p>
                <p className="font-bold"> {new Date(job.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="font-extrabold">catagory</div>
          <div className="gap-2">
            {job.categories.map((c, ind) => (
              <button
                key={ind}
                className={
                  "mr-2 rounded-xl p-1 " +
                  colorMap[ind % 3] +
                  borderMap[(ind + 1) % 3] +
                  bgMap[(ind + 1) % 3]
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <div className="font-extrabold">Requirement</div>
          <div>
            {job.requiredSkills.map((c, ind) => (
              <button
                key={ind}
                className={
                  "  p-1 mr-1 mb-1 text-[#4640DE] bg-blue-200  border border-blue-200"
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};