import { Header } from "@/components/dashboard/header";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-2 flex flex-col gap-4 bg-main-bg">
      <div>
        
        <Header />
        </div>    
      <section>

    {children}
      </section>
    </main>;
}
