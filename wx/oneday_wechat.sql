/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : oneday_wechat

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2019-07-23 16:52:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for subscribe_message
-- ----------------------------
DROP TABLE IF EXISTS `subscribe_message`;
CREATE TABLE `subscribe_message` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `sort` int(2) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscribe_message
-- ----------------------------

-- ----------------------------
-- Table structure for wechat_qrcode
-- ----------------------------
DROP TABLE IF EXISTS `wechat_qrcode`;
CREATE TABLE `wechat_qrcode` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `number` int(6) NOT NULL,
  `url` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wechat_qrcode
-- ----------------------------
INSERT INTO `wechat_qrcode` VALUES ('1', '100', 'http://weixin.qq.com/q/02_hbj9Rr7dyl10000w03K', '2019-07-12 11:44:07');
INSERT INTO `wechat_qrcode` VALUES ('2', '101', 'http://weixin.qq.com/q/02pYAl8dr7dyl10000g035', '2019-07-12 11:44:07');
