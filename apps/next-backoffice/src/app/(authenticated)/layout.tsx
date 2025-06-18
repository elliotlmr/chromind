import Link from "next/link";
import Image from "next/image";
import DisconnectButton from "./components/DisconnectButton";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen">
      <aside className="w-64 bg-stone-800 text-white h-screen fixed top-0 left-0">
        <div>
          <Link href="/">
            <Image src="/vercel.svg" alt="logo" width={100} height={100} />
          </Link>
          <DisconnectButton />
        </div>
      </aside>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}
