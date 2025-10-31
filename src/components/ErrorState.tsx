interface Props {
  message: string
}
export default function ErrorState({ message }: Props) {
  return (
    <div className="text-center py-20 text-gray-500 font-medium">
      {message}
    </div>
  )
}
