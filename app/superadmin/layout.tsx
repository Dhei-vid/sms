import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Header } from "@/components/dashboard/header";
import type { MenuItem } from "@/lib/types";

const superAdminHeaderMeta: MenuItem = {
  id: "superadmin",
  label: "Super Admin - DaraEd",
  icon: Settings01Icon,
  href: "/superadmin/main",
  roles: ["admin"],
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-2 flex flex-col gap-4 bg-main-bg min-h-screen">
      <div>
        <Header
          metaData={superAdminHeaderMeta}
          searchPlaceholder="Search schools"
        />
      </div>
      <section>{children}</section>
    </main>
  );
}
