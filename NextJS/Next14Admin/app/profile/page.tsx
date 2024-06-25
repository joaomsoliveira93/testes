import Breadcrumb from "@/components/appLayout/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { getServerSession } from "next-auth/next";
import { Metadata } from "next";
import { options } from "../api/auth/[...nextauth]/options";
import ImgUpdate from "@/components/ui/imgUpdate/imgUpdate";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "This is Profile page",
  // other metadata
};

const Profile = async () => {
  const session = await getServerSession(options)
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width="0"
            height="0"
            priority
            style={{ width: '970px', height: '260px' }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <CameraAltOutlinedIcon />
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <ImgUpdate />
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {session?.user?.name}
            </h3>
            <p className="font-medium">{session?.user?.email}</p>
            <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  129K
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  2K
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                Hi there, I a full stack developer. I like help people build
                their dream SaaS/Website. The technlogies I&#34;m specializes is
                React JS, Next.js, Tailwind CSS, React-query, Redux, Zustand,
                Node.js, MongoDb, Postgres etc.
              </p>
            </div>

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <a
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <LinkedInIcon />
                </a>

                <a
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
