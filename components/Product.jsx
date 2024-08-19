/**
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.image
 * @param {Number} props.price
 * @param {Function} props.onSelected
*/
export default function Product(props) {
	return (
		<button
			onClick={props.onSelected}
			className="rounded-2xl border-neutral-300 border-2 px-4 py-2 flex flex-col items-center"
		>
			<img src={props.image} width={90} alt={props.name} />
			<p>{props.name}</p>
			<p>от <span className="text-xl font-bold">{props.price / 100}₽</span></p>
		</button>
	)
}