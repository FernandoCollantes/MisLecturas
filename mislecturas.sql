-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2026 a las 02:02:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mislecturas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `status` enum('pending','reading','finished') DEFAULT 'pending',
  `rating` int(11) DEFAULT 0 CHECK (`rating` >= 0 and `rating` <= 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `finished_at` date DEFAULT NULL,
  `review` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `user_id`, `title`, `author`, `status`, `rating`, `created_at`, `finished_at`, `review`) VALUES
(1, 1, 'Clean Code', 'Robert C. Martin', 'reading', 0, '2026-02-17 20:57:45', NULL, NULL),
(2, 1, 'The Pragmatic Programmer', 'Andrew Hunt', 'finished', 5, '2026-02-17 20:57:45', NULL, NULL),
(3, 2, '1984', 'George Orwell', 'finished', 5, '2026-02-17 20:57:45', NULL, NULL),
(4, 2, 'Brave New World', 'Aldous Huxley', 'pending', 0, '2026-02-17 20:57:45', NULL, NULL),
(5, 3, 'El Señor de Los Anillos', 'J.R.R Tolkien', 'finished', 0, '2026-01-10 23:00:00', '2026-02-11', 'Sin dudarlo una de las mejores lecturas de acción y aventuras de todos los tiempos.'),
(7, 1, 'Test Book 1771374009329', 'Test Author', 'pending', 0, '2026-02-18 00:20:09', NULL, ''),
(8, 3, '100 años de soledad', 'Gabriel García Márquez', 'reading', 0, '2026-02-13 23:00:00', NULL, ''),
(9, 3, 'Omertá', 'Mario Puzo', 'pending', 0, '2026-02-17 23:00:00', NULL, ''),
(10, 3, 'La Odisea', 'Homero', 'finished', 0, '2026-02-18 00:24:31', '2026-02-18', ''),
(11, 3, 'Matar a un Ruiseñor', 'Harper Lee', 'pending', 0, '2026-02-18 00:25:50', NULL, ''),
(12, 3, 'El nombre de la rosa', 'Umberto Eco', 'finished', 0, '2025-12-03 23:00:00', '2026-02-03', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'alice_reader', 'alice@example.com', '$2b$10$SampleHashForPassword123AliceHashesVariables', '2026-02-17 20:57:44'),
(2, 'bob_bookworm', 'bob@example.com', '$2b$10$SampleHashForPassword123BobHashesVariables', '2026-02-17 20:57:44'),
(3, 'FernandoCollantes', 'fernandocollantes.24@campuscamara.es', '$2b$10$LLrzUn5/u4SDGn2Lejd9QeM8sDyPjzpns.xhCjFttM2tlTEUbJjgy', '2026-02-17 21:41:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
