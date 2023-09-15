import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type props = {
    title: string;
    showBackButton: boolean;
    url: string;
}

export const PageHeader = ({ title, showBackButton, url }: props) => {
    return (
        <div className='flex gap-2 p-2'>
            {showBackButton && (
                <Link
                    href={url}
                    className="p-0.5 h-8 w-8 dark:bg-[#484B52] dark:text-white bg-slate-200 rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black">
                    <ArrowBackIcon />
                </Link>
            )}
            <p className="text-xl pt-0.5 font-bold">{title}</p>
        </div>
    )
}
