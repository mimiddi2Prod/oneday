/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday_wechat

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-09-05 15:28:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for subscribe_message
-- ----------------------------
DROP TABLE IF EXISTS `subscribe_message`;
CREATE TABLE `subscribe_message` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `appid` varchar(255) NOT NULL,
  `sort` int(2) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `appidindex` (`appid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscribe_message
-- ----------------------------
INSERT INTO `subscribe_message` VALUES ('1', 'hi  欢迎关注Jolly；），很开心与你相遇', 'wx9a7f04eeea0842be', '0', '2020-01-15 13:18:13');
INSERT INTO `subscribe_message` VALUES ('2', '如果正巧你在Jolly可以连接我们的无线网络', 'wx9a7f04eeea0842be', '1', '2020-01-15 13:18:55');
INSERT INTO `subscribe_message` VALUES ('3', '账户：oneday jolly2F/3F 密码：oneday830', 'wx9a7f04eeea0842be', '2', '2020-01-15 13:19:14');
INSERT INTO `subscribe_message` VALUES ('4', 'Hi  感谢遇见，Enjoy a nice day with oneday ：）', 'wx21cf2922d0a597b4', '0', '2020-07-21 14:45:40');
INSERT INTO `subscribe_message` VALUES ('5', '厦门店及大理店进入公众 “厦门oneday设计师民宿”，点击左下角   “民宿预定”', 'wx21cf2922d0a597b4', '1', '2020-07-21 14:45:40');
INSERT INTO `subscribe_message` VALUES ('6', '点击   “XX店优惠订”  即可优惠价入住oneday民宿的设计型房间噢：）', 'wx21cf2922d0a597b4', '2', '2020-07-21 14:45:40');

-- ----------------------------
-- Table structure for wechat_access_token
-- ----------------------------
DROP TABLE IF EXISTS `wechat_access_token`;
CREATE TABLE `wechat_access_token` (
  `appid` varchar(255) CHARACTER SET utf8 NOT NULL,
  `AccessToken` varchar(255) NOT NULL,
  PRIMARY KEY (`appid`),
  UNIQUE KEY `appidindex` (`appid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of wechat_access_token
-- ----------------------------
INSERT INTO `wechat_access_token` VALUES ('wx21cf2922d0a597b4', '{\"accessToken\":\"36_J1yg-pKrzbQ5ElPUtIu_iq9cEuqKW09DGG30aA3L6RwGHoBa2I26M3ZmGC5R6gjHaVqgH8lcpOJNyrSyDL6iPglOM5vnwLdiGxJN6RfErIYcD7zfbFVcF_m5krR83Z1c-OQgf9dW1hNPe7wjZHDaAHAOWS\",\"expireTime\":1599292659227}');
INSERT INTO `wechat_access_token` VALUES ('wx9a7f04eeea0842be', '{\"accessToken\":\"36_J1yg-pKrzbQ5ElPUtIu_iq9cEuqKW09DGG30aA3L6RwGHoBa2I26M3ZmGC5R6gjHaVqgH8lcpOJNyrSyDL6iPglOM5vnwLdiGxJN6RfErIYcD7zfbFVcF_m5krR83Z1c-OQgf9dW1hNPe7wjZHDaAHAOWS\",\"expireTime\":1599292659227}');

-- ----------------------------
-- Table structure for wechat_config
-- ----------------------------
DROP TABLE IF EXISTS `wechat_config`;
CREATE TABLE `wechat_config` (
  `appid` varchar(255) CHARACTER SET utf8 NOT NULL,
  `secret` varchar(255) CHARACTER SET utf8 NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 NOT NULL,
  `encoding_aes_key` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  UNIQUE KEY `appidindex` (`appid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of wechat_config
-- ----------------------------
INSERT INTO `wechat_config` VALUES ('wx21cf2922d0a597b4', '3d7ed9894c6616365a0ddce67f616702', 'helloonedayonehome', '2473JFfDO6CeCJcuSHlrrUMD8dt36joVSHkKUmVlHQa');
INSERT INTO `wechat_config` VALUES ('wx9a7f04eeea0842be', '4a70772c68e8b62a606bf6973cacf7ac', 'hellooneday', null);

-- ----------------------------
-- Table structure for wechat_ticket
-- ----------------------------
DROP TABLE IF EXISTS `wechat_ticket`;
CREATE TABLE `wechat_ticket` (
  `appid` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Ticket` varchar(255) CHARACTER SET utf8 NOT NULL,
  UNIQUE KEY `appidandtype` (`appid`,`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of wechat_ticket
-- ----------------------------
INSERT INTO `wechat_ticket` VALUES ('wx9a7f04eeea0842be', 'wx_card', '{\"ticket\":\"9KwiourQPRN3vx3Nn1c_icqspS1iqgVMXkf-YPzlceUlUYGqt8Cijwau1rRqxJxqWKfklTvFCTwFnVQDYwXRDA\",\"expireTime\":1581585923090}');
INSERT INTO `wechat_ticket` VALUES ('wx21cf2922d0a597b4', 'wx_card', '{\"ticket\":\"9KwiourQPRN3vx3Nn1c_icqspS1iqgVMXkf-YPzlceUlUYGqt8Cijwau1rRqxJxqWKfklTvFCTwFnVQDYwXRDA\",\"expireTime\":1581585923090}');
