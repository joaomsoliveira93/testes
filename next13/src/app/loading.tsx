import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
    return (

        <main className="fixed z-10 mr-1 top-14 right-2 w-[calc(100%-310px)] h-[calc(100%-65px)] p-2 shadow-md  text-black dark:bg-gray-400 bg-white rounded-md text-center">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <CircularProgress style={{ height: 80, width: 80 }} />
                <h2 className="font-bold text-xl mt-2">A carregar</h2>
            </div>
        </main>
    )
}
