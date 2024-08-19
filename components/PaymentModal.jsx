import {useEffect, useState} from "react"
import Emulator from "@/libs/emulator"

let listener = undefined

/**
 * @param {Object} props
 * @param {Function} props.onCancel
 * @param {Function} props.resetTimeout
 * @param {Number} props.productId
 * @param {String} props.name
 * @param {Number} props.total
*/
export default function PaymentModal(props) {
	const [status, setStatus] = useState()
	
	if(!listener) listener = e => {
		if(e.key == "y") {
			setStatus("payed")
			fetch("/api/orders", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({productId: props.productId, name: props.name, total: props.total})
			})
			Emulator.BankCardPurchase()
			console.log("Успешно")
			Emulator.Vend()
		}
		else if(e.key == "n") {
			setStatus("error")
			Emulator.BankCardPurchase()
			console.log("Ошибка")
		}
		props.resetTimeout()
	}

	useEffect(() => {console.log("Приложите карту"); document.addEventListener("keydown", listener)}, [])
	useEffect(() => {
		if(status == "payed") {document.removeEventListener("keydown", listener); listener = undefined}
	}, [status])

	return (
		<div className="fixed top-0 h-full w-full">
			{
				status === undefined ? (
					<>
						<div className="h-full w-full bg-[#f5d009] flex flex-col gap-2 justify-center items-center text-3xl">
							<img src="card.svg" alt="card" width={150} />
							<h1>Приложите карту</h1>
							<h1>к терминалу</h1>
						</div>
						<div className="fixed top-0 h-full w-full flex flex-col justify-end p-4">
							<button
								onClick={() => {Emulator.StopCashin(); Emulator.BankCardCancel(); props.resetTimeout(); props.onCancel()}}
								className="w-full py-4 flex justify-center items-center bg-white rounded-2xl"
							>
								Отмена
							</button>
						</div>
					</>
				) : status == "payed" ? (
					<div className="h-full w-full bg-[#f5d009] flex flex-col gap-2 justify-center items-center">
						<img src="bold-cup.svg" alt="card" width={100} />
						<h1 className="text-3xl">Напиток готов!</h1>
						<h1 className="text-2xl">вы можете забрать его</h1>
					</div>
				) : status == "error" ? (
					<>
						<div className="h-full w-full bg-[#f03b3b] flex flex-col gap-6 justify-center items-center text-3xl text-white">
							<img src="error.png" alt="error" width={150} />
							<h1>Оплата не прошла</h1>
						</div>
						<div className="fixed top-0 h-full w-full flex flex-col gap-4 justify-end p-4">
							<button
								onClick={() => {props.resetTimeout(); setStatus(undefined)}}
								className="w-full py-4 flex justify-center items-center bg-white text-[#f03b3b] rounded-2xl"
							>
								Попробовать ещё раз
							</button>
							<button
								onClick={() => {props.resetTimeout(); document.removeEventListener("keydown", listener); props.onCancel()}}
								className="w-full py-4 flex justify-center items-center border-[1px] border-white text-white rounded-2xl"
							>
								Отмена
							</button>
						</div>
					</>
				) : <></>
			}
		</div>
	)
}