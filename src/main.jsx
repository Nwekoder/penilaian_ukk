import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App'
import DaftarSiswa from './DaftarSiswa'
import DaftarSoal from './DaftarSoal'
import Penilaian from './Penilaian'
import Pengetahuan from './Penilaian/Pengetahuan';
import Sikap from './Penilaian/Sikap';
import Keterampilan from './Penilaian/Keterampilan';
import SoalPengetahuan from './DaftarSoal/Pengetahuan';
import SoalSikap from './DaftarSoal/Sikap';
import SoalKeterampilan from './DaftarSoal/Keterampilan';
import Export from './Export'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/daftar-siswa',
    element: <DaftarSiswa />
  },
  {
    path: '/daftar-soal',
    element: <DaftarSoal />
  },
  {
    path: '/penilaian',
    element: <Penilaian />,
  },
  {
    path: '/penilaian/pengetahuan',
    element: <Pengetahuan />
  },
  {
    path: '/penilaian/sikap',
    element: <Sikap />
  },
  {
    path: '/penilaian/keterampilan',
    element: <Keterampilan />
  },
  {
    path: '/daftar-soal/pengetahuan',
    element: <SoalPengetahuan />
  },
  {
    path: '/daftar-soal/sikap',
    element: <SoalSikap />
  },
  {
    path: '/daftar-soal/keterampilan',
    element: <SoalKeterampilan />
  },
  {
    path: '/export',
    element: <Export />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
