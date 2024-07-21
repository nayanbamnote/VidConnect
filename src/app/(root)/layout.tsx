import StreamVideoProvider from "../../../provider/StreamClientProvider";

export default function rootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <StreamVideoProvider>
           {children}
        </StreamVideoProvider>
    );
  }
  