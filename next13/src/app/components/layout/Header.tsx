import { ThemeButton } from '../ui/ThemeButton'

export const Header = () => {
  return (
    <nav className= "p-5 fixed flex items-center justify-end dark:bg-[#484B52] bg-slate-200 h-12 w-full" >    
    <ThemeButton />
    </nav>   
  )
}
