import { cn } from "@/lib/utils";

interface HomeCardProps {
    icon: React.ReactNode;
    title: string;
    discription: string;
    handleClick: () => void;
    className: string;
  }

const HomeCard = ({className,handleClick,title,discription,icon}: HomeCardProps) => {
  return (
    <div className={cn('min-h-[260px] w-full bg-[#fe742d] flex flex-col justify-between cursor-pointer pl-5 py-7 rounded-3xl', className)} onClick={handleClick}>
        {icon}
        <div>
            <p className='text-4xl font-extrabold'>{title}</p>
            <p className='text-xl'>{discription}</p>
        </div>
    </div>
  )
}

export default HomeCard
