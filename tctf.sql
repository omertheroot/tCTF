-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 17 Eki 2022, 15:34:10
-- Sunucu sürümü: 10.4.22-MariaDB
-- PHP Sürümü: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `tctf`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `challenges`
--

CREATE TABLE `challenges` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `body` text NOT NULL,
  `flag` text NOT NULL,
  `points` int(11) NOT NULL,
  `category` text NOT NULL,
  `author` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `body`, `flag`, `points`, `category`, `author`, `created_at`, `updated_at`) VALUES
('', 'first challange', 'lorem ipsum dolor sit amet hehehe', 'FLAG{first_flag}', 110, 'Web Güvenliği', 'omertheroot', '2022-10-16 18:58:07', '2022-10-16 22:09:52');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `solves`
--

CREATE TABLE `solves` (
  `id` int(11) NOT NULL,
  `solvedByUser` int(11) NOT NULL,
  `solvedByTeam` text NOT NULL,
  `points` int(11) NOT NULL,
  `challengeId` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `teams`
--

CREATE TABLE `teams` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `description` text NOT NULL,
  `captain` text NOT NULL,
  `captainId` int(11) NOT NULL,
  `members` text NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  `isHidden` tinyint(1) NOT NULL,
  `points` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `teams`
--

INSERT INTO `teams` (`id`, `name`, `password`, `description`, `captain`, `captainId`, `members`, `isVerified`, `isHidden`, `points`, `created_at`, `updated_at`) VALUES
('17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'yes', 'kaptan', 32, '', 0, 0, 0, '2022-10-17 08:17:43', '2022-10-17 11:17:43'),
('da8e5e70-5387-47d7-886a-79fa98764675', 'takim1', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'asdasdasd', 'takimkaptani1', 33, '', 0, 0, 0, '2022-10-17 11:44:29', '2022-10-17 14:46:42');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `mail` varchar(90) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `name` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  `point` int(11) NOT NULL,
  `teamId` text DEFAULT NULL,
  `teamName` text DEFAULT NULL,
  `teamCaptain` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `mail`, `password`, `name`, `isAdmin`, `isVerified`, `point`, `teamId`, `teamName`, `teamCaptain`, `created_at`, `updated_at`) VALUES
(1, 'omertheroot', 'faruksonmez1453@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'Ömer Faruk SÖNMEZ', 1, 0, 0, '0', '', 0, '2022-10-12 18:49:16', '2022-10-16 22:15:12'),
(31, 'uye', 'asdasdad@gmailc.om', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, '17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 0, '2022-10-17 08:16:38', '2022-10-17 11:17:48'),
(32, 'kaptan', 'adsadsadasdas@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, '17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 1, '2022-10-17 08:16:51', '2022-10-17 11:17:43'),
(33, 'takimkaptani1', 'asdyashd@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, 'da8e5e70-5387-47d7-886a-79fa98764675', 'takim1', 1, '2022-10-17 11:43:35', '2022-10-17 14:44:29'),
(34, 'kullanici1', 'ksagdaskd@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, 'da8e5e70-5387-47d7-886a-79fa98764675', 'takim1', 0, '2022-10-17 11:43:51', '2022-10-17 14:46:09');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `solves`
--
ALTER TABLE `solves`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `solves`
--
ALTER TABLE `solves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
