-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 22 Kas 2022, 14:07:41
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

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `config`
--

INSERT INTO `config` (`id`, `type`, `data`) VALUES
(1, 'paused', '1'),
(3, 'in_prod', '0');

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
-- Tablo için tablo yapısı `ortaokul_finish`
--

CREATE TABLE `ortaokul_finish` (
  `id` int(11) NOT NULL,
  `user` text NOT NULL,
  `start_time` date NOT NULL,
  `finish_time` date NOT NULL,
  `total_time` date NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ortaokul_sorular`
--

CREATE TABLE `ortaokul_sorular` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL,
  `A` text NOT NULL,
  `B` text NOT NULL,
  `C` text NOT NULL,
  `D` text NOT NULL,
  `answer` text NOT NULL,
  `points` int(11) NOT NULL
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
-- Tablo için tablo yapısı `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `seviye` text NOT NULL,
  `ogrbelgesi` text NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `mail`, `password`, `name`, `seviye`, `ogrbelgesi`, `isAdmin`, `isVerified`, `point`, `teamId`, `teamName`, `teamCaptain`, `created_at`, `updated_at`) VALUES
(50, 'admin', 'admin@ismail.com', '72e60c0b44ac13c135f26b42f21692499e4361e013e229c95a024361cac92c16d6840b7d5568565562cdce2db0852883b0bea268ecd9a8444805993c9834fca3', 'admin', 'lise', 'bc83cb35299d489583a48c1d5dbe9880.jpg', 1, 1, 0, NULL, NULL, 1, '2022-11-22 13:03:43', '2022-11-22 16:04:06');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `config`
--
ALTER TABLE `config`
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
-- Tablo için indeksler `ortaokul_finish`
--
ALTER TABLE `ortaokul_finish`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `ortaokul_sorular`
--
ALTER TABLE `ortaokul_sorular`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
-- Tablo için AUTO_INCREMENT değeri `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Tablo için AUTO_INCREMENT değeri `ortaokul_finish`
--
ALTER TABLE `ortaokul_finish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `ortaokul_sorular`
--
ALTER TABLE `ortaokul_sorular`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Tablo için AUTO_INCREMENT değeri `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
