'use client'
// import Link from 'next/link'
import React, { useEffect } from 'react'
import LoginForm from './loginComponents/LoginForm'
import Image from 'next/image'

export default function LoginPage() {
	useEffect(() => {
		localStorage.clear()
	}, [])
	return (
		<div className="bg-[#292D33] w-screen min-h-screen text-white grid content-center justify-center">
			<section className="">
				<article className="relative">
					<div className="flex justify-center px-4">
						<div
							className="flex items-end flex-col"
							href="/panel"
						>
							<Image
								src="/images/BarberBuddyTextLogoWhite.svg"
								alt="logo"
								width="0"
								height="0"
								className="w-full h-auto mb-0"
							/>
							<Image
								src="/images/mostacheLogoWhite.svg"
								alt="logo"
								width="0"
								height="0"
								className="w-[59px] h-auto"
							/>
						</div>
					</div>
				</article>
				<LoginForm />
			</section>
		</div>
	)
}
