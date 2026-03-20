const LoadingDots = () => {
  return (
    <span className="flex gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-black"></span>
    </span>
  );
};

export default LoadingDots;
