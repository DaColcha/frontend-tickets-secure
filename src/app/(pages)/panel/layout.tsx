import NavbarAdmin from "@/components/Panel/NavbarAdmin";

export default function LayoutPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarAdmin />
      {children}
    </section>
  );
}
