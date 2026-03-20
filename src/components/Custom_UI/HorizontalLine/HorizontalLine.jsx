import { cn } from '@/lib/utils';

const HorizontalLine = ({ text }) => {
  return (
    <div className={cn("flex w-full items-center my-3", text && "gap-2")}>
      <span className='border-t border-slate-400 flex-grow'></span>
      {text && <span className='text-center text-slate-600 text-sm'>{text}</span>}
      <span className='border-t border-slate-400 flex-grow'></span>
    </div>
  );
};

export default HorizontalLine;