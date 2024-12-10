import Image from 'next/image'

export const Footer = () => {
  return (
    <div className="w-full bg-inherit flex flex-row py-6 px-16 md:absolute bottom-0 items-center justify-between z-0">
      <div className="flex flex-col">
        <Image src={'/TC-logo.png'} alt="logo" width={191} height={48}></Image>
        <p className="font-normal text-sm text-grey-default">
          © www.takes-care.com 2024
        </p>
      </div>
    </div>
  )
}
