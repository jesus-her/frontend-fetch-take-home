import BottomTabs from "@/components/bottom-tabs";
import CustomNavbar from "@/components/custom-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center px-4 lg:px-8 max-w-7xl mx-auto  mt-20 mb-28 gap-8">
      <CustomNavbar />
      {children}
      {/* <BottomTabs /> */}
    </main>
  );
}
