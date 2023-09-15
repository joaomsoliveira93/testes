import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { SidebarLink } from '../ui/SidebarLink';

export const Sidebar = ({open}:{open:boolean}) => {
  console.log(open)
  return (
    <div className="fixed top-[48px] sidebar w-0 md:w-72 dark:bg-[#484B52] shadow-xl z-30 shadow-black bg-slate-200  bottom-0 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <div className="flex items-center">

      </div>
      <div className="mt-10 ">
        <div>
          <SidebarLink title={"Clientes"} link={"/clientes"} icon={<GroupIcon />} />
        </div>

        <div>
          <p className="m-3 mt-4 uppercase">Administração</p>
          <SidebarLink title={"Utilizadores"} link={"/utilizadores"} icon={<GroupIcon />} />
        </div>

        <div className="absolute bottom-0 w-full">
          <SidebarLink title={"Definições"} link={"/settings"} icon={<SettingsIcon />} />
        </div>
      </div>
    </div>
  )
}
