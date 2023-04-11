import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

const SoalContext = React.createContext([]);

function ImportSoalModal({ modalState }) {
    const fileRef = React.useRef(null);
    const [soalData, setSoalData] = useContext(SoalContext);

    function processFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            const csv = reader.result;
            const rows = csv.trim().split('\n');
            const headers = rows[0].split(',').map((header) => header.trim().replace(/"/g, ''));
            const soal = [];

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',').map((value) => value.trim().replace(/"/g, ''));
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    row[headers[j]] = values[j];
                }
                soal.push(row);
            }

            setSoalData(soal);
            modalState(false);
            localStorage.setItem('data_soal_sikap', JSON.stringify(soal))
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

export default function SoalSikap() {
    const [importSiswa, setImportSoal] = React.useState(false);
    const [soalData, setSoalData] = useState([]);

    React.useEffect(() => {
        setSoalData(JSON.parse(localStorage.getItem('data_soal_sikap')) || [])
    }, [])

    function clearSoal() {
        setSoalData([])
        localStorage.removeItem('data_soal_sikap')
    }

    return (
        <SoalContext.Provider value={[soalData, setSoalData]}>
            <div className='w-full relative overflow-hidden h-screen flex items-center flex-col justify-center'>
                <div className='w-5/6 mx-auto flex flex-col overflow-auto'>
                    <div className='flex gap-4 ml-auto'>
                        <LinkButton href="/daftar-soal">Back</LinkButton>
                        <Button type='button' onClick={() => setImportSoal(true)}>Import Data Soal</Button>
                        <Button type='button' onClick={clearSoal}>Clear Soal</Button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Soal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {soalData.map((soal) => (
                                <tr key={soal.Id}>
                                    <td>{soal.Id}</td>
                                    <td>{soal.soal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {importSiswa && (
                    <ImportSoalModal modalState={setImportSoal} />
                )}
            </div>
        </SoalContext.Provider>
    );
}
