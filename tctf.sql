-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 03 Kas 2022, 18:30:27
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
  `solves` int(11) NOT NULL DEFAULT 0,
  `hidden` tinyint(1) NOT NULL,
  `type` text NOT NULL,
  `dMaxSubmissions` int(11) DEFAULT NULL,
  `dMinPoints` int(11) DEFAULT NULL,
  `author` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `body`, `flag`, `points`, `category`, `solves`, `hidden`, `type`, `dMaxSubmissions`, `dMinPoints`, `author`, `created_at`, `updated_at`) VALUES
('3b553aed-ee73-4a2c-b7f7-0e32bc5822d8', 'aaa', '<p>aaa</p>', 'FLAG{CLASHROYALECOKSACMAOYUN}', 11, 'Tersine Mühendislik', 0, 0, '', 0, 0, 'omertheroot', '2022-10-25 09:07:29', '2022-10-25 13:04:05'),
('6fef6a51-abb5-41a3-ba29-7f89c15b4cf8', 'aaaa', '<p>aaaaaaaaaaaaa</p>', 'FLAG{grrrrr}', 10, 'Web Güvenliği', 0, 0, '', 0, 0, 'omertheroot', '2022-10-25 09:03:57', '2022-10-25 13:04:08'),
('70001484-af75-4617-ab41-b95da5ddf032', 'deneme', '<p>asdasdsad</p>', 'FLAG{CLASHROYALEBUYUKTURCLASHOFCLANS}', 222, 'Tersine Mühendislik', 0, 0, '', 0, 0, 'omertheroot', '2022-10-19 11:59:34', '2022-10-22 12:23:43'),
('74a5b3af-b765-41b7-8d8c-8811dbcf5fe0', 'MÜQ SORU HAHA', '<p>hihihiha</p>', 'FLAG{grrrrr}', 100, 'Oyun', 0, 0, '', 0, 0, 'omertheroot', '2022-10-19 12:18:48', '2022-10-22 12:23:46'),
('7fda802f-a3c4-4b87-b1c3-bbd4fd722301', 'HİHİHİHİA', '<p style=\"text-align: center;\">HİHİHHA GRRR</p>\n<p><s>HİHİHİH </s><strong>GRRR</strong></p>', 'FLAG{CLASHROYALECOKSACMAOYUN}', 132, 'Oyun', 0, 0, '', 0, 0, 'omertheroot', '2022-10-24 08:30:24', '2022-10-24 11:30:36'),
('98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'dinamik soru', '<p>DİNAMİK SORUUU</p>', 'FLAG{HEHEHEHAW}', 90, 'Tersine Mühendislik', 4, 0, 'Dinamik', 2, 90, 'omertheroot', '2022-10-28 17:04:36', '2022-11-01 12:12:26'),
('9b2d4ad1-07f7-4bbb-846b-69b09b5558e1', '2.soru süüü', '<p>yeyeyeeyeeyeeyeye</p>', 'FLAG{wowowoow}', 1000, 'Tersine Mühendislik', 0, 0, '', 0, 0, 'omertheroot', '2022-10-21 19:03:37', '2022-10-22 12:23:47'),
('b46ca937-7f83-4b6d-8b03-280dfd76fbe2', 'yeyeyeye', '<p style=\"text-align: center;\">aaasqwdqwdqwd</p>', 'FLAG{grrrrr}', 99, 'IoT', 0, 0, '', 0, 0, 'omertheroot', '2022-10-25 10:03:53', '2022-10-25 13:03:53'),
('d793ad25-657a-4586-8069-bb19ee7148de', 'ilksoru', '<p style=\"text-align: center;\">wow!</p>', 'FLAG{CLASHROYALEBUYUKTURCLASHOFCLANS}', 100, 'Binary Exploitation', 0, 0, '', 0, 0, 'omertheroot', '2022-10-19 12:19:50', '2022-10-22 19:00:01'),
('dd5fd7dd-cbfb-4475-a243-35f15bc1ce36', 'statik soru', '<p>hihihia</p>', 'FLAG{grrrrr}', 121, 'Web Güvenliği', 0, 0, 'Statik', NULL, NULL, 'omertheroot', '2022-10-28 17:14:33', '2022-10-28 20:14:33'),
('fc2fa16d-f9f6-4953-a219-c111ce1ce55f', 'deneme1', '<p>a</p>', 'FLAG{grrrrr}', 100, 'kaategori', 0, 0, '', 0, 0, 'omertheroot', '2022-10-19 12:24:40', '2022-10-22 12:23:51');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `costs`
--

CREATE TABLE `costs` (
  `id` int(11) NOT NULL,
  `teamId` text NOT NULL,
  `userId` int(11) NOT NULL,
  `type` text NOT NULL,
  `toTeam` tinyint(1) NOT NULL,
  `cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hints`
--

CREATE TABLE `hints` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL,
  `cost` int(11) NOT NULL,
  `hidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `endpoint` text NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `hidden` int(11) NOT NULL,
  `ejs` text NOT NULL,
  `priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `pages`
--

INSERT INTO `pages` (`id`, `name`, `endpoint`, `admin`, `hidden`, `ejs`, `priority`) VALUES
(1, 'Koşullar', '/kosullar', 0, 0, 'kosullar.ejs', 1),
(2, 'Kurullar', '/kurullar', 0, 0, 'kurullar.ejs', 2),
(3, 'Ödüller', '/oduller', 0, 0, 'oduller.ejs', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `solves`
--

CREATE TABLE `solves` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `teamId` text NOT NULL,
  `points` int(11) NOT NULL,
  `challengeId` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `solves`
--

INSERT INTO `solves` (`id`, `userId`, `teamId`, `points`, `challengeId`, `created_at`, `updated_at`) VALUES
(37, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', 100, '98fd3e0c-d413-4e07-ad1f-db66333dccbe', '2022-11-01 09:12:26', '2022-11-01 12:12:26');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `teamId` text NOT NULL,
  `challengeId` text NOT NULL,
  `flag` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `submissions`
--

INSERT INTO `submissions` (`id`, `userId`, `teamId`, `challengeId`, `flag`, `status`) VALUES
(1, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '3b553aed-ee73-4a2c-b7f7-0e32bc5822d8', 'aa', '0'),
(2, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '3b553aed-ee73-4a2c-b7f7-0e32bc5822d8', 'aa', 'Incorrect'),
(3, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '3b553aed-ee73-4a2c-b7f7-0e32bc5822d8', 'FLAG{CLASHROYALECOKSACMAOYUN}', 'Correct'),
(4, 42, '0ae3f811-e7ae-45cc-add2-c9de96ccd9b1', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(5, 43, '528b1a51-40a7-47f8-980d-1a53cba27b9b', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(6, 43, '528b1a51-40a7-47f8-980d-1a53cba27b9b', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(7, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(8, 38, '7440b142-00be-4f5d-a10a-2c00a41237b5', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(9, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(10, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(11, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '70001484-af75-4617-ab41-b95da5ddf032', 'a', 'Incorrect'),
(12, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'a', 'Incorrect'),
(13, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(14, 38, '7440b142-00be-4f5d-a10a-2c00a41237b5', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(15, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(16, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(17, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(18, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(19, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(20, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct'),
(21, 1, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', '98fd3e0c-d413-4e07-ad1f-db66333dccbe', 'FLAG{HEHEHEHAW}', 'Correct');

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
('0ae3f811-e7ae-45cc-add2-c9de96ccd9b1', 'adasdasdas', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'dasdasdasd', 'aaaaaaaaa', 42, '', 0, 0, 100, '2022-10-30 07:50:30', '2022-10-30 10:50:38'),
('17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'yes', 'kaptan', 32, '', 0, 0, 0, '2022-10-17 08:17:43', '2022-10-17 11:17:43'),
('3219f796-cf9f-4f60-9117-8dab7b20ee0c', 'asdasdasd', 'b40d03386fb8fd7dc6ca9c6f8d680dfc58d60fd6ea72c63f573cc5bfbb09695746a849c91517c235cdfeaca4e734208f184bc08aae06797748988e95928f80b1', 'asdasd', 'puandusur', 41, '', 0, 0, 90, '2022-10-30 07:16:10', '2022-10-30 10:16:16'),
('528b1a51-40a7-47f8-980d-1a53cba27b9b', 'denemeetakimm', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 'asdbkashdg', 43, '', 0, 0, 200, '2022-10-30 07:51:44', '2022-10-30 10:52:34'),
('60075195-5d88-4eba-9b51-19639079a2fb', 'asljdbaısd', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'lasjndld', 'yes', 40, '', 0, 0, 100, '2022-10-30 07:10:42', '2022-10-30 10:10:47'),
('7440b142-00be-4f5d-a10a-2c00a41237b5', 'dasdasds', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'd', 'denemeuser', 38, '', 0, 0, 300, '2022-10-30 07:15:30', '2022-11-01 11:53:30'),
('77f3cb1c-2160-4f06-b825-6a5bb0cb576d', 'denemetakim2', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', 'aaa', 'denemeuser12', 39, '', 0, 0, 100, '2022-10-30 07:09:51', '2022-10-30 10:10:04'),
('7d63aaa5-a22f-48c6-aeb7-108a19b47ce4', 'aaaa', 'b40d03386fb8fd7dc6ca9c6f8d680dfc58d60fd6ea72c63f573cc5bfbb09695746a849c91517c235cdfeaca4e734208f184bc08aae06797748988e95928f80b1', 'aaaaa', 'AAAAAAA', 37, '', 0, 0, 0, '2022-10-19 18:57:42', '2022-10-19 21:57:42'),
('c34d6117-b932-43fd-a121-8ff88b2f65c4', 'aa', 'b40d03386fb8fd7dc6ca9c6f8d680dfc58d60fd6ea72c63f573cc5bfbb09695746a849c91517c235cdfeaca4e734208f184bc08aae06797748988e95928f80b1', 'aa', 'omertheroot', 1, '', 0, 0, 2644, '2022-10-21 11:26:12', '2022-11-01 12:12:26'),
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
(1, 'omertheroot', 'faruksonmez1453@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'Ömer Faruk SÖNMEZ', 1, 0, 2644, 'c34d6117-b932-43fd-a121-8ff88b2f65c4', 'aa', 1, '2022-10-12 18:49:16', '2022-11-01 12:12:26'),
(31, 'uye', 'asdasdad@gmailc.om', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, '17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 0, '2022-10-17 08:16:38', '2022-10-17 11:17:48'),
(32, 'kaptan', 'adsadsadasdas@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, '17352d73-c4ac-4093-833e-ff5945467dcc', 'takim', 1, '2022-10-17 08:16:51', '2022-10-17 11:17:43'),
(33, 'takimkaptani1', 'asdyashd@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, 'da8e5e70-5387-47d7-886a-79fa98764675', 'takim1', 1, '2022-10-17 11:43:35', '2022-10-17 14:44:29'),
(34, 'kullanici1', 'ksagdaskd@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, 'da8e5e70-5387-47d7-886a-79fa98764675', 'takim1', 0, '2022-10-17 11:43:51', '2022-10-17 14:46:09'),
(35, 'admin', 'admin@bayraksende.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, NULL, NULL, 0, '2022-10-18 10:13:04', '2022-10-18 13:13:04'),
(36, 'takimolusturmauserxxx', 'aaaa@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 0, NULL, NULL, 0, '2022-10-19 17:52:45', '2022-10-19 20:59:11'),
(37, 'AAAAAAA', 'AAAAA@gmail.com', 'fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe', '', 0, 0, 0, '7d63aaa5-a22f-48c6-aeb7-108a19b47ce4', 'aaaa', 1, '2022-10-19 18:54:35', '2022-10-19 21:57:42'),
(38, 'denemeuser', 'aaa@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 300, '7440b142-00be-4f5d-a10a-2c00a41237b5', 'dasdasds', 1, '2022-10-25 08:18:40', '2022-11-01 11:53:30'),
(39, 'denemeuser12', 'aaaa2@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 1, 0, 100, '77f3cb1c-2160-4f06-b825-6a5bb0cb576d', 'denemetakim2', 1, '2022-10-30 07:09:35', '2022-10-30 10:45:34'),
(40, 'yes', 'aaanbdkasd@gmailc.om', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 100, '60075195-5d88-4eba-9b51-19639079a2fb', 'asljdbaısd', 1, '2022-10-30 07:10:34', '2022-10-30 10:10:47'),
(41, 'puandusur', 'aasdasdaa@gmail.com', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 90, '3219f796-cf9f-4f60-9117-8dab7b20ee0c', 'asdasdasd', 1, '2022-10-30 07:16:06', '2022-10-30 10:16:16'),
(42, 'aaaaaaaaa', 'aaasdasdasd@gmailc.om', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 100, '0ae3f811-e7ae-45cc-add2-c9de96ccd9b1', 'adasdasdas', 1, '2022-10-30 07:50:23', '2022-10-30 10:50:38'),
(43, 'asdbkashdg', 'asdasdasd@gmail.coom', 'b181a32764f27959e58c5faf876cf2299b3996402aaf0b2da9c982975fcbfdbe1ab52532824ed2c70d406de4fd3cbfe53e74edd9bb6593069a024ecc2c630ee7', '', 0, 0, 200, '528b1a51-40a7-47f8-980d-1a53cba27b9b', 'denemeetakimm', 1, '2022-10-30 07:51:34', '2022-10-30 10:52:34');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `costs`
--
ALTER TABLE `costs`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `hints`
--
ALTER TABLE `hints`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `solves`
--
ALTER TABLE `solves`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `submissions`
--
ALTER TABLE `submissions`
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
-- Tablo için AUTO_INCREMENT değeri `costs`
--
ALTER TABLE `costs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `hints`
--
ALTER TABLE `hints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `solves`
--
ALTER TABLE `solves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Tablo için AUTO_INCREMENT değeri `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
