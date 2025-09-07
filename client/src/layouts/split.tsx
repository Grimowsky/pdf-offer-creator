export default function SplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative flex h-screen w-1/2">{children}</div>;
}
