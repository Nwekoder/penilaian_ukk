import Button from './components/Button';
import LinkButton from './components/LinkButton';
import React from 'react';

export default function Export() {
    const [nP, setNP] = React.useState([])
    const [nK, setNK] = React.useState([])
    const [nS, setNS] = React.useState([])
    const [exporting, setExporting] = React.useState(false);

    React.useEffect(() => {
        const P = localStorage.getItem('data_nilai_pengetahuan')
        const K = localStorage.getItem('data_nilai_keterampilan')
        const S = localStorage.getItem('data_nilai_sikap')

        if (P) {
            setNP(JSON.parse(P))
        }
        if (K) {
            setNK(JSON.parse(K))
        }
        if (S) {
            setNS(JSON.parse(S))
        }
    }, [])

    function exportP() {
        setExporting(true);

        const headers = Object.keys(nP[0]);
        const rows = nP.map(obj => headers.map(header => obj[header]).join(','));
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'data_penilaian_pengetahuan.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExporting(false);
    }
    function exportK() {
        setExporting(true);

        const headers = Object.keys(nK[0]);
        const rows = nK.map(obj => headers.map(header => obj[header]).join(','));
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'data_penilaian_keterampilan.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExporting(false);
    }
    function exportS() {
        setExporting(true);

        const headers = Object.keys(nS[0]);
        const rows = nS.map(obj => headers.map(header => obj[header]).join(','));
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'data_penilaian_sikap.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExporting(false);
    }

    return (
        <div className="flex items-center flex-col gap-3 justify-center w-full h-screen overflow-hidden">
            {nP !== [] && (
                <Button onClick={exportP}>Export Aspek Pengetahuan</Button>
            )}
            {nK !== [] && (
                <Button onClick={exportK}>Export Aspek Keterampilan</Button>
            )}
            {nS !== [] && (
                <Button onClick={exportS}>Export Aspek Sikap</Button>
            )}
            <LinkButton href="/">Back</LinkButton>
        </div>
    )
}