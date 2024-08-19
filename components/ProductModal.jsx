import {IoMdClose} from "react-icons/io"
import {useEffect, useState} from "react"
import CupVolume from "./CupVolume"

/**
 * @param {Object} props
 * @param {Object} props.product
 * @param {String} props.product.name
 * @param {String} props.product.image
 * @param {Number} props.product.price
 * @param {Number} props.total
 * @param {Function} props.setTotal
 * @param {Function} props.onCancel
 * @param {Function} props.resetTimeout
 * @param {Function} props.setPaying
*/
export default function ProductModal(props) {
	const [selectedVolume, setSelectedVolume] = useState(200)

	useEffect(() => {props.setTotal(props.product.price * selectedVolume / 200)}, [selectedVolume])

	return (
		<div className="fixed flex flex-col top-0 bg-black bg-opacity-60 h-full w-full">
			<div className="h-1/6" />
			<div className="flex-1 flex flex-col justify-between bg-white rounded-t-2xl px-3 pb-3">
				<div className="flex flex-col gap-6">
					<div className="flex justify-center">
						<button
							onClick={() => {props.resetTimeout(); props.onCancel()}}
							className="rounded-b-2xl bg-[#fafafa] border-[1px] border-neutral-300 w-36 h-16 flex justify-center items-center"
						>
							<IoMdClose size={35} className="text-[#d8d8d8]" />
						</button>
					</div>
					<div className="flex justify-center">
						<img src={props.product.image} width={170} alt={props.product.name} />
					</div>
					<h1 className="text-4xl text-center">{props.product.name}</h1>
					<div className="grid grid-cols-3 gap-3">
						{
							Object.entries({200: 40, 300: 50, 400: 60}).map(e => (
								<CupVolume
									key={e[0]}
									volume={e[0]}
									width={e[1]}
									onSelected={v => {props.resetTimeout(); setSelectedVolume(v)}}
									active={selectedVolume == e[0]}
								/>
							))
						}
					</div>
				</div>
				<button
					onClick={() => {props.resetTimeout(); props.setPaying(true)}}
					className="flex justify-between rounded-2xl bg-[#f5d009] p-4 items-center"
				>
					<p className="text-lg">Оплатить</p>
					<p className="text-2xl font-bold">{props.total / 100}₽</p>
				</button>
			</div>
		</div>
	)
}