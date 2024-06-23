import useColorMode from "@/hooks/useColorMode";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <label
        className="hover:dark:bg-primary hover:bg-secondary relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
            }
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
          <span className="dark:hidden ">
           <LightModeIcon/>
          </span>
          <span className="hidden dark:inline-block ">
            <DarkModeIcon/>
          </span>
      </label>
    </li>
  );
};

export default DarkModeSwitcher;
