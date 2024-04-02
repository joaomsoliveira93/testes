import { ThemeButton } from "../ui/themeButton";

export const Header = () => {
  return (
    <header className='bg-gray-10 p-4 shadow-md shadow-slate-800 dark:shadow-slate-500 '>
      <nav className='container flex items-center justify-between w-full'>
        <ul className='flex gap-6 text-gray-500'>
          <li>
            <a className="dark:text-white" href="/">Home</a>
          </li>
          <li>
            <a className="dark:text-white" href="/profile">Profile</a>
          </li>
          <li>
            <a className="dark:text-white" href="/blog">Blog</a>
          </li>
        </ul>
        <ThemeButton/>
      </nav>
    </header>
  );
};
