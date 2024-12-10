export default function AppointmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex flex-row gap-5 py-[126px] h-screen overflow-hidden">
      {children}
    </div>
  )
}
