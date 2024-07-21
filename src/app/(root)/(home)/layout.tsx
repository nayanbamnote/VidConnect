import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function homeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <Navbar />
            <div className="flex ">
                <Sidebar />
                <div className=" text-2xl font-semibold text-white w-full px-5 py-2">
                  {children}
                </div>
            </div>
           
        </div>
    );
  }
  