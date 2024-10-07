import NavbarWrapper from "@/components/Navbar";

export default function LayoutLocalidades({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarWrapper />
      {children}
    </section>
  );
}
