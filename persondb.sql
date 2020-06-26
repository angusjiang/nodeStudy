-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-02-14 10:18:36
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `persondb`
--

-- --------------------------------------------------------

--
-- 表的结构 `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 NOT NULL,
  `createtime` bigint(64) NOT NULL,
  `author` varchar(200) CHARACTER SET utf8 NOT NULL,
  `content` varchar(200) CHARACTER SET utf8 NOT NULL,
  `form` varchar(200) CHARACTER SET utf8 NOT NULL,
  `modifytime` bigint(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `articles`
--

INSERT INTO `articles` (`id`, `title`, `createtime`, `author`, `content`, `form`, `modifytime`) VALUES
(2, '这是标题', 0, '', '这是内容', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `sex` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `test`
--

INSERT INTO `test` (`id`, `name`, `sex`) VALUES
(1, 'jxj', 1);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) CHARACTER SET utf8 NOT NULL,
  `usex` int(2) NOT NULL,
  `upwd` varchar(100) CHARACTER SET utf8 NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `uid_2` (`uid`),
  KEY `uid_3` (`uid`),
  KEY `uid_4` (`uid`),
  KEY `uid_5` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`uid`, `uname`, `usex`, `upwd`, `admin`) VALUES
(1, 'angus', 0, 'jxj', 0),
(2, 'angus111', 0, '123', 0),
(3, 'angus222', 0, '123', 0),
(4, '123', 0, '123', 0),
(5, 'hehe', 0, 'jxj', 0),
(6, '呵呵', 0, '123', 0),
(7, '啊啊', 0, '123', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
