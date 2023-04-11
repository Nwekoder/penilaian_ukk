import LinkButton from "./components/LinkButton";

export default function Penilaian() {
    return (
        <div className='flex items-center justify-center flex-col gap-3 w-full h-screen'>
            <LinkButton href='/penilaian/pengetahuan'>Aspek Pengetahuan</LinkButton>
            <LinkButton href='/penilaian/keterampilan'>Aspek Keterampilan</LinkButton>
            <LinkButton href='/penilaian/sikap'>Aspek Sikap</LinkButton>
            <LinkButton href='/'>Kembali</LinkButton>
        </div>
    )
}