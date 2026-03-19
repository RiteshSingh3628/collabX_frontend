import { ChevronLeft } from "lucide-react";
import Link from 'next/link';
export const PageTitle = ({ title, backLink }) => {
  return <div className="flex items-center">
    {backLink && <Link href={`/dashboard/${backLink}`} className="cursor-pointer">
        <ChevronLeft className="mr-2" />
    </Link>}
    <h1 className="text-xl font-medium md:text-2xl">{title}</h1>
  </div>
}

