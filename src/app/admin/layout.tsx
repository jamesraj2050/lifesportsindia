export const metadata = {
  title: "Admin | Life Sports India",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--lsi-ivory)] text-[color:var(--lsi-ink)]">
      {children}
    </div>
  );
}
