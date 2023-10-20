'use client'

import avatarPlaceholder from '@/public/images/barber_avatar.jpeg'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

export const UserMenu = () => {
	const user = JSON.parse(localStorage.getItem('user'))
	if (!user) {
		return
	}

	return (
		<Menu
			as="div"
			className="relative"
		>
			<Menu.Button className="flex flex-col items-center justify-center">
				<Image
					width={32}
					height={32}
					src={user.img ? user.img : avatarPlaceholder}
					alt="profile"
					className="border rounded-full mb-1"
				/>
				<div>
					<p>{user.fullName}</p>
					<p>Rol: {user.role}</p>
				</div>
			</Menu.Button>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
				className="absolute z-10 top-full right-0"
			>
				<Menu.Items>
					<div className="flex flex-col justify-start mt-2 sm:mt-2.5 gap-3 p-2 w-36 sm:w-[150px] bg-gradient-to-t from-zinc-600 to-slate-50 border border-gray-100/40 shadow-md text-[#292D33] rounded">
						<Menu.Item>
							<Link
								href="/panel/admin/perfil"
								className="flex items-center justify-start hover:text-white transition text-xl"
							>
								<p>Mi Perfil</p>
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								href="/"
								className="flex items-center justify-start hover:text-white transition text-xl"
							>
								<p>Salir</p>
							</Link>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
