-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Okt 2021 pada 10.57
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_wilayah`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kabupaten_tb`
--

CREATE TABLE `kabupaten_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `provinsi_id` int(10) NOT NULL,
  `diresmikan` date NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kabupaten_tb`
--

INSERT INTO `kabupaten_tb` (`id`, `nama`, `provinsi_id`, `diresmikan`, `photo`) VALUES
(1, 'Kabupaten Kepulauan Seribu', 1, '2021-09-01', 'kabupaten-kepulauan-seribu.png'),
(2, 'Kabupaten Serang', 2, '2021-09-02', 'kabupaten-serang.png'),
(3, 'Kabupaten Bekasi', 3, '2021-09-03', 'kabupaten-bekasi.png'),
(4, 'Kabupaten Brebes', 4, '2021-09-04', 'kabupaten-brebes.png'),
(5, 'Kabupaten Gresik', 5, '2021-09-05', 'kabupaten-gresik.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `provinsi_tb`
--

CREATE TABLE `provinsi_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `diresmikan` date NOT NULL,
  `photo` varchar(255) NOT NULL,
  `pulau` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `provinsi_tb`
--

INSERT INTO `provinsi_tb` (`id`, `nama`, `diresmikan`, `photo`, `pulau`) VALUES
(1, 'DKI Jakarta', '2021-10-01', 'dki-jakarta.png', 'Jawa'),
(2, 'Banten', '2021-10-02', 'banten.png', 'Jawa'),
(3, 'Jawa Barat', '2021-10-03', 'jawa-barat.png', 'Jawa'),
(4, 'Jawa Tengah', '2021-10-04', 'jawa-tengah.png', 'Jawa'),
(5, 'Jawa Timur', '2021-10-05', 'jawa-timur.png', 'Jawa');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinsi_id` (`provinsi_id`);

--
-- Indeks untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD CONSTRAINT `kabupaten_tb_ibfk_1` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi_tb` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
