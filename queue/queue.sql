/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : queue

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-09-10 20:09:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for odqueue
-- ----------------------------
DROP TABLE IF EXISTS `odqueue`;
CREATE TABLE `odqueue` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
