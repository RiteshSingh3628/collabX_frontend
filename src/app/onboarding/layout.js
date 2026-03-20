import Header from "@/components/common/Header";

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
    </div>
  );
}
