-- -------------------------------------------------------------
-- TablePlus 6.8.0(654)
--
-- https://tableplus.com/
--
-- Database: fm_project
-- Generation Time: 2026-02-03 16:57:32.4890
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `agents`;
CREATE TABLE `agents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `level` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `account` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `payment_group` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `commission_plan_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `ix_agents_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `alembic_version`;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `commission_plan`;
CREATE TABLE `commission_plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `system_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `agent_level` varchar(50) DEFAULT NULL,
  `agent_name` varchar(50) DEFAULT NULL,
  `share_ratio` int NOT NULL,
  `rebate_live` decimal(5,2) NOT NULL,
  `rebate_elec` decimal(5,2) NOT NULL,
  `rebate_sport` decimal(5,2) NOT NULL,
  `rebate_lottery` decimal(5,2) NOT NULL,
  `rebate_chess` decimal(5,2) NOT NULL,
  `rebate_fish` decimal(5,2) NOT NULL,
  `settlement` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_commission_plan_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `commission_plan_log`;
CREATE TABLE `commission_plan_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `action` varchar(20) NOT NULL,
  `handler` varchar(50) NOT NULL DEFAULT 'system',
  `details` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_plan_id` (`plan_id`),
  CONSTRAINT `fk_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `commission_plan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  `agent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_users_username` (`username`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `agents` (`id`, `parent_id`, `level`, `username`, `account`, `name`, `status`, `payment_group`, `created_at`, `last_login_at`, `commission_plan_id`) VALUES
(1, 1, 1, 'agent_001', '0928123456', '王大尾', 'enabled', '常規會員', '2025-04-05 12:59:42', '2025-05-20 13:48:30', 1);

INSERT INTO `alembic_version` (`version_num`) VALUES
('e3d9c0e2755f');

INSERT INTO `commission_plan` (`id`, `system_type`, `name`, `agent_level`, `agent_name`, `share_ratio`, `rebate_live`, `rebate_elec`, `rebate_sport`, `rebate_lottery`, `rebate_chess`, `rebate_fish`, `settlement`) VALUES
(1, 'share', '合營計劃1', '1', 'FMCA', 10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(2, 'share', '合營計劃555', '2', 'XFW', 20, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(3, 'rebate', '返水計劃12', '1', 'XFW', 0, 0.80, 0.60, 0.50, 0.30, 0.30, 0.20, 'monthly'),
(4, 'share', '合營計劃1', '4', '總代理A', 30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(5, 'rebate', '合營計劃測試測試', '1', 'test123', 0, 2.00, 0.10, 0.20, 3.00, 1.00, 1.00, 'monthly'),
(6, 'share', '返水計劃1', '3', '總代理A', 90, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(7, 'share', 'testtest', '5', 'XFW', 90, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(8, 'share', '測試分潤test', '2', 'test123', 1, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(9, 'rebate', '測試分潤8888', 'any', 'W01', 0, 0.00, 0.20, 6.00, 0.50, 0.40, 0.30, 'weekly'),
(10, 'share', '測試分潤1222', '1', 'test123', 1, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(11, 'rebate', '測試分潤33', '1', 'FMCA', 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(12, 'share', '測試分潤334', '1', 'test123', 1, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(13, 'rebate', '測試分潤567', 'any', 'FMCA', 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(14, 'share', '測試分潤100', '1', 'W01', 2, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(15, 'rebate', '測試分潤667', '2', 'W02', 0, 0.50, 0.70, 0.40, 0.40, 0.30, 0.30, 'monthly'),
(16, 'share', '測試分潤564', '1', 'test123', 12, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(17, 'rebate', '測試分潤999', '5', 'W02', 0, 1.00, 2.00, 4.00, 7.00, 1.00, 1.00, 'weekly'),
(18, 'share', '測試分潤223', '3', 'FMCA', 10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(19, 'rebate', '測試分潤111111', '4', 'FMCA', 0, 1.00, 1.00, 0.00, 0.00, 0.00, 0.00, 'monthly'),
(20, 'share', '測試分潤8888888', 'any', 'any', 15, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(21, 'rebate', '測試分潤22', 'any', 'any', 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'weekly'),
(22, 'share', '測試分潤1233', '4', 'any', 90, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'monthly');

INSERT INTO `commission_plan_log` (`id`, `plan_id`, `action`, `handler`, `details`, `created_at`) VALUES
(1, 1, 'update', 'system', '{\"changes\": {\"system_type\": {\"old\": \"rebate\", \"new\": \"share\"}, \"share_ratio\": {\"old\": \"0\", \"new\": \"10\"}, \"rebate_live\": {\"old\": \"1.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"2.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"3.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"5.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"6.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"7.00\", \"new\": \"0.0\"}}}', '2026-02-03 02:54:38'),
(2, 2, 'update', 'ren', '{\"changes\": {\"name\": {\"old\": \"合營計劃2\", \"new\": \"合營計劃555\"}, \"agent_level\": {\"old\": \"lvl2\", \"new\": \"2\"}, \"agent_name\": {\"old\": \"代理B\", \"new\": \"XFW\"}, \"settlement\": {\"old\": \"weekly\", \"new\": \"monthly\"}, \"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:10:30'),
(3, 3, 'update', 'ren', '{\"changes\": {\"settlement\": {\"old\": \"daily\", \"new\": \"monthly\"}, \"rebate_live\": {\"old\": \"0.80\", \"new\": \"0.8\"}, \"rebate_elec\": {\"old\": \"0.60\", \"new\": \"0.6\"}, \"rebate_sport\": {\"old\": \"0.50\", \"new\": \"0.5\"}, \"rebate_lottery\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_chess\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_fish\": {\"old\": \"0.20\", \"new\": \"0.2\"}}}', '2026-02-03 03:11:38'),
(4, 4, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:12:11'),
(5, 1, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:12:28'),
(6, 1, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:12:57'),
(7, 1, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:13:28'),
(8, 3, 'update', 'ren', '{\"changes\": {\"name\": {\"old\": \"返水計劃1\", \"new\": \"返水計劃12\"}, \"agent_level\": {\"old\": \"lvl1\", \"new\": \"1\"}, \"agent_name\": {\"old\": \"總代理A\", \"new\": \"XFW\"}, \"rebate_live\": {\"old\": \"0.80\", \"new\": \"0.8\"}, \"rebate_elec\": {\"old\": \"0.60\", \"new\": \"0.6\"}, \"rebate_sport\": {\"old\": \"0.50\", \"new\": \"0.5\"}, \"rebate_lottery\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_chess\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_fish\": {\"old\": \"0.20\", \"new\": \"0.2\"}}}', '2026-02-03 03:14:47'),
(9, 3, 'update', 'ren', '{\"changes\": {\"settlement\": {\"old\": \"weekly\", \"new\": \"monthly\"}, \"rebate_live\": {\"old\": \"0.80\", \"new\": \"0.8\"}, \"rebate_elec\": {\"old\": \"0.60\", \"new\": \"0.6\"}, \"rebate_sport\": {\"old\": \"0.50\", \"new\": \"0.5\"}, \"rebate_lottery\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_chess\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_fish\": {\"old\": \"0.20\", \"new\": \"0.2\"}}}', '2026-02-03 03:16:15'),
(10, 3, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.80\", \"new\": \"0.8\"}, \"rebate_elec\": {\"old\": \"0.60\", \"new\": \"0.6\"}, \"rebate_sport\": {\"old\": \"0.50\", \"new\": \"0.5\"}, \"rebate_lottery\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_chess\": {\"old\": \"0.30\", \"new\": \"0.3\"}, \"rebate_fish\": {\"old\": \"0.20\", \"new\": \"0.2\"}}}', '2026-02-03 03:16:22'),
(11, 8, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤test\", \"agent_level\": \"2\", \"agent_name\": \"test123\", \"share_ratio\": 1, \"settlement\": \"monthly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 03:18:38'),
(12, 8, 'update', 'ren', '{\"changes\": {\"settlement\": {\"old\": \"monthly\", \"new\": \"weekly\"}, \"rebate_live\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_elec\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_sport\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_lottery\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_chess\": {\"old\": \"0.00\", \"new\": \"0.0\"}, \"rebate_fish\": {\"old\": \"0.00\", \"new\": \"0.0\"}}}', '2026-02-03 03:21:33'),
(13, 7, 'update', 'ren', '{\"changes\": {\"settlement\": {\"old\": \"monthly\", \"new\": \"weekly\"}}}', '2026-02-03 03:43:50'),
(14, 5, 'update', 'ren', '{\"changes\": {\"share_ratio\": {\"old\": \"20\", \"new\": \"0\"}, \"rebate_live\": {\"old\": \"1.00\", \"new\": \"2.00\"}}}', '2026-02-03 03:44:12'),
(15, 9, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤8888\", \"agent_level\": \"any\", \"agent_name\": \"W01\", \"share_ratio\": 0, \"settlement\": \"weekly\", \"rebate_live\": 0.1, \"rebate_elec\": 2.0, \"rebate_sport\": 6.0, \"rebate_lottery\": 0.5, \"rebate_chess\": 0.4, \"rebate_fish\": 0.3}}', '2026-02-03 03:45:26'),
(16, 9, 'update', 'ren', '{\"changes\": {\"rebate_live\": {\"old\": \"0.10\", \"new\": \"0.00\"}, \"rebate_elec\": {\"old\": \"2.00\", \"new\": \"0.20\"}}}', '2026-02-03 03:46:01'),
(17, 6, 'update', 'ren', '{\"changes\": {\"agent_level\": {\"old\": \"lvl1\", \"new\": \"3\"}}}', '2026-02-03 03:47:32'),
(18, 4, 'update', 'ren', '{\"changes\": {\"agent_level\": {\"old\": \"lvl1\", \"new\": \"4\"}}}', '2026-02-03 03:47:43'),
(19, 1, 'update', 'ren', '{\"changes\": {\"agent_level\": {\"old\": \"lvl1\", \"new\": \"1\"}}}', '2026-02-03 03:50:58'),
(20, 10, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤1222\", \"agent_level\": \"1\", \"agent_name\": \"test123\", \"share_ratio\": 1, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 03:56:45'),
(21, 11, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤33\", \"agent_level\": \"1\", \"agent_name\": \"FMCA\", \"share_ratio\": 0, \"settlement\": \"monthly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 03:57:15'),
(22, 13, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤567\", \"agent_level\": \"any\", \"agent_name\": \"FMCA\", \"share_ratio\": 0, \"settlement\": \"monthly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 03:59:24'),
(23, 14, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤100\", \"agent_level\": \"1\", \"agent_name\": \"W01\", \"share_ratio\": 2, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 03:59:43'),
(24, 15, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤667\", \"agent_level\": \"2\", \"agent_name\": \"W02\", \"share_ratio\": 0, \"settlement\": \"monthly\", \"rebate_live\": 0.5, \"rebate_elec\": 0.7, \"rebate_sport\": 0.4, \"rebate_lottery\": 0.4, \"rebate_chess\": 0.3, \"rebate_fish\": 0.3}}', '2026-02-03 07:46:32'),
(25, 16, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤564\", \"agent_level\": \"1\", \"agent_name\": \"test123\", \"share_ratio\": 12, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:46:56'),
(26, 17, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤999\", \"agent_level\": \"5\", \"agent_name\": \"W02\", \"share_ratio\": 0, \"settlement\": \"weekly\", \"rebate_live\": 1.0, \"rebate_elec\": 2.0, \"rebate_sport\": 4.0, \"rebate_lottery\": 7.0, \"rebate_chess\": 1.0, \"rebate_fish\": 1.0}}', '2026-02-03 07:47:42'),
(27, 18, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤223\", \"agent_level\": \"3\", \"agent_name\": \"FMCA\", \"share_ratio\": 10, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:48:15'),
(28, 19, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤111111\", \"agent_level\": \"4\", \"agent_name\": \"FMCA\", \"share_ratio\": 0, \"settlement\": \"monthly\", \"rebate_live\": 1.0, \"rebate_elec\": 1.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:48:39'),
(29, 20, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤8888888\", \"agent_level\": \"any\", \"agent_name\": \"any\", \"share_ratio\": 15, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:49:12'),
(30, 21, 'create', 'ren', '{\"created\": {\"system_type\": \"rebate\", \"name\": \"測試分潤22\", \"agent_level\": \"any\", \"agent_name\": \"any\", \"share_ratio\": 0, \"settlement\": \"weekly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:49:32'),
(31, 22, 'create', 'ren', '{\"created\": {\"system_type\": \"share\", \"name\": \"測試分潤1233\", \"agent_level\": \"4\", \"agent_name\": \"any\", \"share_ratio\": 90, \"settlement\": \"monthly\", \"rebate_live\": 0.0, \"rebate_elec\": 0.0, \"rebate_sport\": 0.0, \"rebate_lottery\": 0.0, \"rebate_chess\": 0.0, \"rebate_fish\": 0.0}}', '2026-02-03 07:50:01');

INSERT INTO `users` (`id`, `username`, `hashed_password`, `is_active`, `role`, `created_at`, `updated_at`, `agent_id`) VALUES
(1, 'ren', '$2b$12$GJf/RZZ6zj7bIb1syndxkuwsaJ.QXJ/cxm0xtOlbfystD/kV/a6QG', 1, 'admin', '2026-02-02 03:13:06', NULL, 1),
(2, 'rentest', '$2b$12$1oMNRQ94rwM744EDGnpU.OBCjb1Rt9dwWWy0y8ecqdllkDEi.F03W', 1, 'admin', '2026-02-02 03:20:56', NULL, NULL),
(3, 'test123', '$2b$12$rSlRvE1OKTfPJn3zIwPTV.vUxxvNxREENgeueAZkUAaXB5P9NewsS', 1, 'admin', '2026-02-02 03:30:28', NULL, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;