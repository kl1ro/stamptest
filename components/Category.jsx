/**
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.image
 * @param {Boolean} props.active
 * @param {Function} props.onSelected
*/
export default function Category(props) {
	return (
		<button
			onClick={props.onSelected}
			className={`${props.active ? "bg-white " : ""}flex flex-col gap-1 items-center px-2 pb-2 text-sm rounded-t-3xl`}
		>
			<img src={props.image} width={80} alt="category" />
			<p className="text-center">{props.name}</p>
		</button>
	)
}