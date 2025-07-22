import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import {  Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();

    const [resumes, setresumes] = useState<Resume[]>([])

    const [laodingResumes, setlaodingResumes] = useState(false);


    

    const navigate = useNavigate();

    const [resumeurl, setresumeurl] = useState('')

    useEffect(()=>{
        if(!auth.isAuthenticated){
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated])


    useEffect( () =>{
      const loadResumes = async ()=>{

        setlaodingResumes(true);

        const resumes = (await kv.list('resume: *', true)) as KVItem[];

        const parsedResumes = resumes?.map((resume)=>(
          JSON.parse(resume.value) as Resume
        ))

        setresumes(parsedResumes || []);

        setlaodingResumes(false);


      }


      loadResumes();
    }, [])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>

    <section className="main-section"> 
      <div className="page-heading py-16">
        <h1>
          Track Your Application and Resume Ratings
        </h1>

        {!laodingResumes && resumes?.length === 0?(
          <h2>No resumes found. Upload your first resume to get feedback</h2>
        ):(
          <h2>
          Review your submissions and check AI-powered feedback.
        </h2>
        )}

        

      </div>


      {laodingResumes && (
        <div className=" flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" alt="" className=" w-[200px]" />
        </div>
      )}


    {!laodingResumes && resumes.length>0 &&(
      <div className="resumes-section">
    {
      resumes.map( (resume) =>(
        <ResumeCard key={resume.id} resume={resume}/>
      ))
    }
    </div>

)}


{!laodingResumes && resumes.length === 0 &&(
  <div className=" flex flex-col items-center justify-center mt-10 gap-4">
    <Link to='/upload' className=" primary-button w-fit text-xl font-semibold">
    Upload Resume
    </Link>
  </div>
)}
</section>




  </main>;
}
