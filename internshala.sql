-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 16, 2021 at 12:08 PM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internshala`
--

-- --------------------------------------------------------

--
-- Table structure for table `employer_registration`
--

DROP TABLE IF EXISTS `employer_registration`;
CREATE TABLE IF NOT EXISTS `employer_registration` (
  `sno` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `phone` bigint(255) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `password` varchar(10000) NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employer_registration`
--

INSERT INTO `employer_registration` (`sno`, `email`, `phone`, `fname`, `lname`, `password`) VALUES
(16, 'rishikabisani5@gmail.com', 9826040653, 'Rishika', 'Bisani', '$2b$10$YOE8UA8.CQ8GRk4k9KxC/.GUR39KXdoyW9W3F/NE59Gz6c4Q2F9fi'),
(17, 'rb@gmail.com', 9826040653, 'Rishika', 'Bisani', '$2b$10$vOwSg6EW.AR1DPw3nA3QyObAH.hpUDLEbCq7qANq5dqRlfT2uZQ26');

-- --------------------------------------------------------

--
-- Table structure for table `internship`
--

DROP TABLE IF EXISTS `internship`;
CREATE TABLE IF NOT EXISTS `internship` (
  `sno` int(255) NOT NULL,
  `userid` int(255) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `internshiptype` varchar(255) NOT NULL,
  `covid19` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL,
  `city` varchar(255) NOT NULL,
  `openings` int(100) NOT NULL,
  `startdate` varchar(100) NOT NULL,
  `durationnumber` int(7) NOT NULL,
  `durationspan` varchar(50) NOT NULL,
  `responsibility` longtext NOT NULL,
  `stipend` varchar(255) NOT NULL,
  `currency_internship` varchar(255) NOT NULL,
  `amount_internship` int(255) NOT NULL,
  `fixed_span` varchar(100) NOT NULL,
  `nego_currency` varchar(100) NOT NULL,
  `nego_amount1` int(100) NOT NULL,
  `nego_amount2` int(100) NOT NULL,
  `nego_span` varchar(100) NOT NULL,
  `minperfo_currency` varchar(100) NOT NULL,
  `minperfo_amount` int(100) NOT NULL,
  `minperfo_span` varchar(100) NOT NULL,
  `incperfo_currency` varchar(100) NOT NULL,
  `incperfo_amount` int(100) NOT NULL,
  `incperfo_why` varchar(100) NOT NULL,
  `perks` longtext NOT NULL,
  `ppo` tinyint(1) NOT NULL,
  `skills required` mediumtext NOT NULL,
  `women` tinyint(1) NOT NULL,
  `questions` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `internship`
--

INSERT INTO `internship` (`sno`, `userid`, `profile`, `internshiptype`, `covid19`, `time`, `city`, `openings`, `startdate`, `durationnumber`, `durationspan`, `responsibility`, `stipend`, `currency_internship`, `amount_internship`, `fixed_span`, `nego_currency`, `nego_amount1`, `nego_amount2`, `nego_span`, `minperfo_currency`, `minperfo_amount`, `minperfo_span`, `incperfo_currency`, `incperfo_amount`, `incperfo_why`, `perks`, `ppo`, `skills required`, `women`, `questions`) VALUES
(1, 1, 'programmer', 'work from home', 'yes', '1 month', 'indore', 56, '11-09-2002', 45, 'week', ' I dontkno', '123', 'rs', 1234, 'idk', 'idk', 123, 123, 'asdf', 'asdf', 123, 'asdfg', 'sdfg', 1234, 'adsfgh', 'ASDFHYJUKI', 1, 'aZsexdrcftvjgykubh', 1, 'aDFSFNGHM');

-- --------------------------------------------------------

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS `preference`;
CREATE TABLE IF NOT EXISTS `preference` (
  `sno` int(255) NOT NULL AUTO_INCREMENT,
  `userid` bigint(255) NOT NULL,
  `internshiporjob` varchar(50) NOT NULL,
  `internshiptype` varchar(50) NOT NULL,
  `jobtype` varchar(50) NOT NULL,
  `preference1` varchar(50) NOT NULL,
  `preference2` varchar(50) NOT NULL,
  `preference3` varchar(50) NOT NULL,
  `yesno` varchar(10) NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `preference`
--

INSERT INTO `preference` (`sno`, `userid`, `internshiporjob`, `internshiptype`, `jobtype`, `preference1`, `preference2`, `preference3`, `yesno`) VALUES
(1, 3, 'on', 'undefined', 'undefined', 'programming', 'web design', 'machine learning', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `student_registeration`
--

DROP TABLE IF EXISTS `student_registeration`;
CREATE TABLE IF NOT EXISTS `student_registeration` (
  `sno` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_registeration`
--

INSERT INTO `student_registeration` (`sno`, `email`, `fname`, `lname`, `password`) VALUES
(2, 'rishikabisani5@gmail.com', 'Rishika', 'Bisani', '$2b$10$OxWrpORd4pDiI1KLLBCxhOx5aGW/FyRNBv0tAoukRpKReuQRf8kHu'),
(3, 'rishikabisani@littlelove.org.in', 'Rishika', 'Bisani', '$2b$10$dEC1YIT8a8ep8nSULLydCOT5LYq0rfISecNiBI.zkFb3C/9HTjo5W');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
