"use client"
import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import Category from "@/components/Category"
import Product from "@/components/Product"
import ProductModal from "@/components/ProductModal"
import PaymentModal from "@/components/PaymentModal"

let timeout = undefined

export default function Page() {
	const {data: categories, error, isLoading} = useQuery({
		queryFn: () => fetch("/api/categories?include=products").then(r => r.json()),
		queryKey: ["categories"]
	})

	const [active, setActive] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState(1)
	const [selectedProduct, setSelectedProduct] = useState()
	const [paying, setPaying] = useState(false)
	const [total, setTotal] = useState()

	const resetTimeout = () => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			setActive(false)
			setPaying(false)
			setSelectedProduct(undefined)
			setSelectedCategoryId(1)
		}, 60000)
	}

	return (
		!active ? (
			<div className="h-full flex flex-col justify-end p-5">
				<button
					onClick={() => {setActive(true); resetTimeout()}}
					className="bg-[#f5d009] p-10 rounded-2xl"
				>
					Нажмите, чтобы начать
				</button>
			</div>
		) : (
			<>
				<div className="h-full bg-[#efccb9] flex flex-col">
					<div className="px-3 py-6 flex justify-between items-center">
						<h1 className="text-2xl">Выбор напитка</h1>
						<button className="flex bg-white rounded-2xl min-w-40">
							<div className="flex py-3 px-3 justify-center aspect-square bg-[#f5d009] rounded-2xl">
								<img src="telephone.svg" width={20} alt="telephone" />
							</div>
							<div className="text-[10px] px-2 py-3">
								Вход / регистрация
							</div>
						</button>
					</div>
					<div className="flex-grow flex flex-col bg-[#f2f2f2] rounded-3xl">
						<div className="grid grid-cols-4">
							{
								!isLoading && categories.map(c => (
									<Category
										key={c.id}
										{...c}
										onSelected={() => {resetTimeout(); setSelectedCategoryId(c.id)}}
										active={selectedCategoryId == c.id}
									/>
								))
							}
						</div>
						<div className="flex-1 bg-white shadow-black shadow-xl px-2 py-8 flex flex-col gap-8">
							<h2 className="text-3xl">{!isLoading && categories.find(c => c.id == selectedCategoryId).name}</h2>
							<div className="grid grid-cols-3 gap-3">
								{
									!isLoading && categories.find(c => c.id == selectedCategoryId).products.map(p => (
										<Product key={p.id} {...p} onSelected={() => {resetTimeout(); setSelectedProduct(p)}} />
									))
								}
							</div>
						</div>
					</div>
				</div>
				{
					selectedProduct && (
						<ProductModal
							product={selectedProduct}
							onCancel={() => setSelectedProduct(undefined)}
							resetTimeout={resetTimeout}
							setTotal={setTotal}
							total={total}
							setPaying={setPaying}
						/>
					)
				}
				{
					paying && (
						<PaymentModal
							onCancel={() => setPaying(false)}
							resetTimeout={resetTimeout}
							productId={selectedProduct.id}
							name={selectedProduct.name}
							total={total}
						/>
					)
				}
			</>
		)
	)
}