import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Video } from "lucide-react"
import Sidebar from "./Sidebar"
import SideContent from "./SideContent"

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={32} color="#ffffff" cursor={'pointer'}/>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#1a1d2c] text-white border-none">
            <div className='flex gap-3 pl-5'>
                <Video size={34} color="#ffffff" />
                <p className='font-bold text-white text-2xl '>Zoom</p>
            </div>
            <div className="sidestyle">
                <SideContent />
            </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar