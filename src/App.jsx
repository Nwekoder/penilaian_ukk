import LinkButton from "./components/LinkButton"

export default function App() {
  return (
    <div className='flex items-center justify-center flex-col gap-3 w-full h-screen'>
      <LinkButton href='/daftar-siswa'>Daftar Siswa</LinkButton>
      <LinkButton href='/daftar-soal'>Daftar Soal</LinkButton>
      <LinkButton href='/penilaian'>Penilaian</LinkButton>
      <LinkButton href='/export'>Export Nilai</LinkButton>
    </div>
  )
}