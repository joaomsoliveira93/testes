import Breadcrumb from "@/components/appLayout/Breadcrumbs/Breadcrumb";
import ImgViewer from "@/components/ui/imgViewer";

type Params = {
    params: {
        proj: string;
    };
};

type request = {
    code: number,
    message: string,
    data: any
};

const Page = async ({ params }: Params) => {
    const { proj } = params

    let project=null
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/project/getProject/${proj}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
    });
    const data: request = await response.json();
    if (data.code===200){
        project = data.data
    }else{
        project = null
    }

    return (
        <>
            <Breadcrumb pageName="Detalhes do Projecto" />
            {project ? (
                <>
                    <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="px-7 pb-6 lg:pb-8 xl:pb-11.5">
                            <div className="mt-4">
                                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                    {project?.titlePT}
                                </h3>
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">
                                        {project?.institution}
                                    </h4>
                                    <p className="mt-4.5">
                                        {project?.tecnologies}
                                    </p>
                                    <p className="mt-4.5">
                                        {project?.detailsPT}
                                    </p>
                                </div>
                                <ImgViewer imgs={project.imgs} />
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <div role="status" className=" animate-pulse overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="px-7 pb-6 lg:pb-8 xl:pb-11.5">
                        <div className="mt-4">
                            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[30%] mb-4"></div>
                            </h3>
                            <div>
                                <h4 className="font-semibold text-black dark:text-white">
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[45%] mb-4"></div>
                                </h4>
                                <div className="mt-4.5">
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[65%] mb-4"></div>
                                </div>
                                <div className="mt-4.5">
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-4"></div>
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-4"></div>
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-4"></div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold text-black dark:text-white mb-4">
                                    <div className="h-4 dark:bg-white rounded-full bg-black max-w-[10%] mb-4"></div>
                                </h4>
                                <div className="relative w-full h-50 mb-4 ">
                                    <svg className="h-50 text-gray-200 dark:text-gray-600 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
