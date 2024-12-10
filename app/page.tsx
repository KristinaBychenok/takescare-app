import Link from 'next/link'

export default function Home() {
  return (
    <div className="py-[126px]">
      <Link
        href={'/home-visits/making-appointment'}
        className="border p-4 hover:bg-white"
      >
        Go to Making Home Visits Page
      </Link>
    </div>
  )
}
