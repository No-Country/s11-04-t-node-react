import check from '@/public/images/checkIcon.svg'
import error from '@/public/images/errorIcon.svg'

import Image from 'next/image'

export const Notification = ({ notification }) => {
	const { messageType, message } = notification
	const visibility = message === '' && 'hidden'
	const errorStyle =
		'h-10 px-1 sm:px-2 border border-red-600 bg-red-100 rounded-2xl flex items-center gap-2 sm:gap-10 text-red-700 text-sm my-2 sm:my-4'
	const successStyle =
		'h-10 px-1 sm:px-2 border border-green-600 bg-lime-50 rounded-2xl flex items-center gap-2 sm:gap-10 text-green-800 text-sm my-2 sm:my-4'

	return (
		<div
			style={{ visibility: visibility }}
			className={messageType === 'success' ? successStyle : errorStyle}
		>
			<Image
				height={32}
				src={messageType === 'success' ? check : error}
				alt="message_type_icon"
			/>
			<p>{message}</p>
		</div>
	)
}
