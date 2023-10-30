import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { UserMenu } from './UserMenu'

export const Header = ({ fluid }) => {
	return (
		<header className='sm:w-screen sm:pl-3 sm:pr-7 sm:mt-2'>
			<nav className="bg-[#292D33] fixed sm:sticky z-20 w-full top-0 left-0 text-white max-sm:py-2 px-4 sm:pt-1 sm:mb-5 border-white sm:rounded-lg">
				<div
					className={clsx(
						'flex items-center justify-between px-2',
						!fluid && 'max-w-screen-xl mx-auto'
					)}
				>
					<Link
						className="flex items-end flex-col"
						href="/"
					>
						<Image
							src="/images/BarberBuddyTextLogoWhite.svg"
							alt="logo"
							width="0"
							height="0"
							className="w-[208px] h-auto mb-0 hidden sm:flex"
							priority
						/>
						<Image
							src="/images/mostacheLogoWhite.svg"
							alt="logo"
							width="0"
							height="0"
							className="w-[48px] h-auto"
							priority
						/>
					</Link>
					<UserMenu />
				</div>
			</nav>
		</header>
	)
}
