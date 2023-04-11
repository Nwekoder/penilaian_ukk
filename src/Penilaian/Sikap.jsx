import React from 'react'
import LinkButton from '../components/LinkButton'
import Button from '../components/Button'

export default function Skiap() {
    const [siswa, setSiswa] = React.useState([])
    const [selected, setSelected] = React.useState(null)
    const [modal, setModal] = React.useState(false)
    const [soal, setSoal] = React.useState([])

    React.useEffect(() => {
        if (localStorage.getItem('data_siswa')) {
            const listSiswa = JSON.parse(localStorage.getItem('data_siswa'))
            const nilaiSiswa = JSON.parse(localStorage.getItem('data_nilai_sikap'))

            setSiswa(listSiswa.filter((s) => !nilaiSiswa || !nilaiSiswa.some((n) => n.id_siswa === s.id)))
        }
        if (localStorage.getItem('data_soal_sikap')) {
            setSoal(JSON.parse(localStorage.getItem('data_soal_sikap')))
        }
    }, [])

    function selectSiswa(id) {
        setSelected(siswa.find(f => f.id == id))
        setSiswa(siswa.filter(f => f.id !== id))
        setModal(true)
    }

    function resetNilai() {
        localStorage.removeItem('data_nilai_sikap')
        if (localStorage.getItem('data_siswa')) {
            setSiswa(JSON.parse(localStorage.getItem('data_siswa')))
        }
    }

    return (
        <div className='flex relative items-center justify-center py-5 flex-col gap-3 w-full h-screen'>
            <LinkButton href="/penilaian">Back</LinkButton>
            <Button onClick={resetNilai}>Reset Nilai</Button>

            <div className="mt-3 flex flex-col gap-2 overflow-auto">
                {siswa && (
                    <>
                        {siswa.map((c, i) => (
                            <Button key={i} type="button" onClick={() => selectSiswa(c.id)}>{c.nama}</Button>
                        ))}
                    </>
                )}
            </div>

            {modal && (
                <Modal soal={soal} siswa={selected} modalState={setModal} />
            )}
        </div>
    )
}

function Modal({ siswa, modalState, soal }) {
    const [s, setS] = React.useState(0)
    const [nilai, setNilai] = React.useState([])

    function appendNilai(n) {
        setNilai([...nilai, n])
        if (s < soal.length - 1) {
            setS(s + 1)
        } else {
            setNilai([...nilai, n])
            const dataNilai = JSON.parse(localStorage.getItem('data_nilai_sikap')) || []
            localStorage.setItem('data_nilai_sikap', JSON.stringify([
                ...dataNilai,
                {
                    id_siswa: siswa.id,
                    nama_siswa: siswa.nama,
                    data_nilai: [...nilai, n]
                }
            ]))
            setNilai([])
            setS(0)
            modalState(false)
        }
    }

    return (
        <div className="absolute w-full h-screen top-0 left-0 bg-black bg-opacity-70">
            <div className='absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 rounded-lg flex items-center justify-center h-4/5 bg-white'>
                <p className="mb-5">Nama Siswa: {siswa.nama}</p>

                <p>Soal No. {s + 1}</p>
                <p className="text-sm w-5/6 mx-auto">{soal[s].soal}</p>

                <div className="absolute bottom-2 px-2 flex flex-col gap-1">
                    {soal[s].id_kat_penilaian == '1' && (
                        <>
                            <Button onClick={() => appendNilai('1')} type="button">Benar</Button>
                            <Button onClick={() => appendNilai('0')} type="button">Salah</Button>
                        </>
                    )}
                    {soal[s].id_kat_penilaian == '2' && (
                        <>
                            <Button onClick={() => appendNilai('3')} type="button">Sangat Kompeten</Button>
                            <Button onClick={() => appendNilai('2')} type="button">Kompeten</Button>
                            <Button onClick={() => appendNilai('1')} type="button">Cukup</Button>
                            <Button onClick={() => appendNilai('0')} type="button">Belum</Button>
                        </>
                    )}
                    {soal[s].id_kat_penilaian == '3' && (
                        <>
                            <Button onClick={() => appendNilai('3')} type="button">Sangat Baik</Button>
                            <Button onClick={() => appendNilai('2')} type="button">Baik</Button>
                            <Button onClick={() => appendNilai('1')} type="button">Cukup</Button>
                            <Button onClick={() => appendNilai('0')} type="button">Belum</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}