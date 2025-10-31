interface Props {
  title: string
  price: number
  quantity: number
}

export default function SummaryCard({ title, price, quantity }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
      <p>{title}</p>
      <p className="text-sm text-gray-500">Qty: {quantity}</p>
      <hr className="my-2" />
      <p className="font-bold">Total: ₹{price * quantity}</p>
    </div>
  )
}
