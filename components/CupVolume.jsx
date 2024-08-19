/**
 * @param {Object} props
 * @param {Number} props.volume
 * @param {Number} props.width
 * @param {Function} props.onSelected
 * @param {Boolean} props.active
*/
export default function CupVolume(props) {
	return (
		<button
			onClick={() => props.onSelected(props.volume)}
			className={`${props.active ? "bg-[#f5d009]" : "bg-[#f3f3f3]"} rounded-lg flex flex-col p-3 justify-center items-center gap-4`}
		>
			<img src="cup.svg" width={props.width} alt="cup" />
			<p>{props.volume} мл.</p>
		</button>
	)
}