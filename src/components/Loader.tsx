export default function Loader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img src="/pokeball.png" alt="Pokeball" className="animate-bounce w-16" />
      <p className="font-bold animate-pulse">loading...</p>
    </div>
  )
}
