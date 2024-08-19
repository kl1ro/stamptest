export default class Emulator {
	static StartCashin = () => console.log("Начинаю принимать наличные!")
	static StopCashin = () => console.log("Перестаю принимать наличные!")
	static BankCardPurchase = (e, amount, cb, display_cb) => {
		console.log("Обработка карты")
		console.log("Связь с банком")
	}
	static BankCardCancel = () => console.log("Отмена текущей попытки оплаты...")
	static Vend = () => console.log("Выдаю напиток!")
}