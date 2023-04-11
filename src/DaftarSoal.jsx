import LinkButton from "./components/LinkButton";

export default function DaftarSoal() {
    return (
        <div className='flex items-center justify-center flex-col gap-3 w-full h-screen'>
            <LinkButton href='/daftar-soal/pengetahuan'>Soal Pengetahuan</LinkButton>
            <LinkButton href='/daftar-soal/keterampilan'>Soal Keterampilan</LinkButton>
            <LinkButton href='/daftar-soal/sikap'>Soal Sikap</LinkButton>
            <LinkButton href='/'>Kembali</LinkButton>
        </div>
    )
}