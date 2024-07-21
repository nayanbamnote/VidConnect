'use client'
import { cn } from '@/lib/utils'
import { SidebarConstant } from './SidebarConstant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const SideContent = () => {
  const pathname = usePathname();
  return (
    <>
    {SidebarConstant.map((link)=>{
        const isActive = link.route === pathname;
        return(
        <Link href={link.route} key={link.route} className={cn('text-white flex gap-2 w-full py-2 rounded-md pl-3 ',{
          'bg-[#0d78f9]' : isActive
        })}>
          {link.icon}
          <span>{link.label}</span>
        </Link>
      )})}
    </>
  )
}

export default SideContent