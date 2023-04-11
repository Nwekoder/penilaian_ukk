import React, { useState, useContext } from 'react';
import Button from './components/Button';
import LinkButton from './components/LinkButton';

const SiswaContext = React.createContext([]);

function ImportSiswaModal({ modalState }) {
    const fileRef = React.useRef(null);
    const [siswaData, setSiswaData] = useContext(SiswaContext);

    function processFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            const csv = reader.result;
            const rows = csv.trim().split('\n');
            const headers = rows[0].split(',').map((header) => header.trim().replace(/"/g, ''));
            const siswa = [];

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',').map((value) => value.trim().replace(/"/g, ''));
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    row[headers[j]] = values[j];
                }
                siswa.push(row);
            }

            setSiswaData(siswa);
            modalState(false);
            localStorage.setItem('data_siswa', JSON.stringify(siswa))
        };
        reader.readAsText(file);
    }

    return (
        <div className='absolute w-full h-full left-0 top-0 bg-black bg-opacity-70'>
            <button onClick={() => modalState(false)} className='absolute w-8 h-8 bg-white flex items-center justify-center rounded-sm right-3 top-3'></button>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 rounded-lg flex items-center justify-center h-4/5 bg-white'>
                <input type='file' accept='.csv' onChange={(e) => processFile(e.currentTarget.files[0])} className='hidden' ref={fileRef} />
                <Button type='button' onClick={() => fileRef.current.click()}>Import CSV</Button>
            </div>
        </div>
    );
}

export default function DaftarSiswa() {
    const [importSiswa, setImportSiswa] = React.useState(false);
    const [siswaData, setSiswaData] = useState([]);

    React.useEffect(() => {
        setSiswaData(JSON.parse(localStorage.getItem('data_siswa')) || [])
    }, [])

    function clearSiswa() {
        setSiswaData([])
        localStorage.removeItem('data_siswa')
    }

    return (
        <SiswaContext.Provider value={[siswaData, setSiswaData]}>
            <div className='w-full relative overflow-hidden h-screen flex items-center flex-col justify-center'>
                <div className='w-5/6 mx-auto flex flex-col overflow-auto'>
                    <div className='flex gap-4 ml-auto'>
                        <LinkButton href="/">Back</LinkButton>
                        <Button type='button' onClick={() => setImportSiswa(true)}>Import Data Siswa</Button>
                        <Button type='button' onClick={clearSiswa}>Clear Siswa</Button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswaData.map((siswa) => (
                                <tr key={siswa.id}>
                                    <td>{siswa.id}</td>
                                    <td>{siswa.nama}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {importSiswa && (
                    <ImportSiswaModal modalState={setImportSiswa} />
                )}
            </div>
        </SiswaContext.Provider>
    );
}
