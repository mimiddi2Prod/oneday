/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday_wechat

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-11-02 15:10:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_button_id` int(11) NOT NULL COMMENT '二级菜单对应的父按钮id，二级菜单用sub_button',
  `type` varchar(255) NOT NULL COMMENT '点击触发：click， 小程序：miniprogram， 网页：view',
  `key` varchar(255) NOT NULL COMMENT 'click等点击类型必须',
  `url` varchar(255) NOT NULL COMMENT '微信旧版本不适配小程序，用于跳转网页 view、miniprogram类型必须',
  `miniappid` varchar(255) NOT NULL COMMENT '小程序appid(获取数据后字段应转为appid）  miniprogram类型必须',
  `pagepath` varchar(255) NOT NULL COMMENT '小程序路径 miniprogram类型必须',
  `sort` int(12) NOT NULL COMMENT '菜单排序， 不同菜单组 自己比较',
  `appid` varchar(255) NOT NULL COMMENT '对应的微信公众号appid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '民宿预定', '0', '', '', '', '', '', '1', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('2', '设计咨询', '0', '', '', '', '', '', '2', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('3', '更多关于', '0', '', '', '', '', '', '3', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('4', '客房预定', '1', 'miniprogram', '', 'https://weibo.com/u/5576287865', 'wxba832bcb326b64f3', 'zh_jdgjb/pages/blank/blank', '1', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('5', '民宿改造与合作', '2', 'click', 'item2_2', '', '', '', '1', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('6', 'ONETE', '3', 'click', 'item3_1', '', '', '', '1', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('7', 'ONEDAY品牌', '3', 'view', '', 'https://mp.weixin.qq.com/s/CTCDB647EWaNZzp2QwOlfg', '', '', '2', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('8', 'ONEDAYJOLLY', '3', 'view', '', 'https://mp.weixin.qq.com/s/44MLQq5Sh4l824F_ht33DA', '', '', '3', 'wx21cf2922d0a597b4');
INSERT INTO `menu` VALUES ('9', '招聘', '3', 'click', 'item3_4', '', '', '', '4', 'wx21cf2922d0a597b4');

-- ----------------------------
-- Table structure for menu_click
-- ----------------------------
DROP TABLE IF EXISTS `menu_click`;
CREATE TABLE `menu_click` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL COMMENT '按钮的key',
  `image` varchar(255) NOT NULL COMMENT '应进行encodeURIComponent 保证换行生效',
  `message` varchar(255) NOT NULL,
  `sort` int(6) NOT NULL,
  `appid` varchar(255) NOT NULL COMMENT '公众号appid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu_click
-- ----------------------------
INSERT INTO `menu_click` VALUES ('1', 'item1_1', './images/item1_1.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('2', 'item1_2', './images/item1_2.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('3', 'item1_3', './images/item1_3.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('4', 'item1_4', './images/item1_4.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('5', 'item1_5', './images/item1_5.jpg', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('6', 'item2_1', '', '%E5%85%B3%E4%BA%8E%E8%AE%BE%E8%AE%A1%E6%94%B9%E9%80%A0%EF%BC%8C%E5%8F%AF%E6%B7%BB%E5%8A%A0%E5%BE%AE%E4%BF%A1%EF%BC%9Asm278118152%20%E6%88%96%20tina7640%20%E6%B2%9F%E9%80%9A%EF%BC%9A%EF%BC%89', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('7', 'item2_2', './images/item2_2.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('8', 'item3_1', './images/item3_1.png', '', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('9', 'item3_4', '', '%E7%AE%80%E5%8E%86%E9%82%AE%E7%AE%B1%EF%BC%9Aoneday830%40163.com%0A%E6%9C%8D%E5%8A%A1%E6%8A%95%E8%AF%89%EF%BC%9Aoneday830%40163.com', '0', 'wx21cf2922d0a597b4');
INSERT INTO `menu_click` VALUES ('10', 'item3_5', './images/item3_5.jpg', '', '0', 'wx21cf2922d0a597b4');

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
INSERT INTO `subscribe_message` VALUES ('1', '1', 'wx9a7f04eeea0842be', '0', '2020-01-15 13:18:13');
INSERT INTO `subscribe_message` VALUES ('2', '1', 'wx9a7f04eeea0842be', '1', '2020-01-15 13:18:55');
INSERT INTO `subscribe_message` VALUES ('3', '1', 'wx9a7f04eeea0842be', '2', '2020-01-15 13:19:14');
INSERT INTO `subscribe_message` VALUES ('4', 'HELLO%20%E6%AC%A2%E8%BF%8E%E6%82%A8%E6%9D%A5Jolly%0A%E8%BF%99%E6%98%AF%E4%B8%80%E6%95%B4%E6%A0%8B%E7%8B%AC%E7%AB%8B%E8%80%8C%E5%B9%BD%E9%9D%99%E7%9A%84%E7%99%BD%E8%89%B2%E5%9F%8E%E5%A0%A1%0A%E6%BB%A1%E8%B6%B3%E6%82%A8%E5%AF%B9%E7%90%86%E6%83%B3%E7%94%9F%E6%B4%BB%E5%90%91%E5%BE%80%E7%9A%84%E2%80%9C%E6%83%AC%E6%84%8F%E2%80%9D%E4%B8%8E%E2%80%9C%E6%84%89%E6%82%A6%E2%80%9D%0A%20%0A%E6%88%91%E4%BB%AC%E6%9C%89%0ACafe%2BBrunch%2BShop%2BPlay%2BPhotography%0A%E7%AD%89%E5%A4%9A%E7%A7%8D%E5%88%86%E4%BA%AB%E6%96%B9%E5%BC%8F%E4%B8%BA%E4%B8%80%E4%BD%93%E7%9A%84%E5%85%A8%E6%96%B0%E7%BB%BC%E5%90%88%E7%BE%8E%E5%AD%A6%E7%A9%BA%E9%97%B4%0A%E5%B8%8C%E6%9C%9B%E9%80%9A%E8%BF%87%E6%96%B0%E6%97%A7%E4%BA%A4%E6%B1%87%EF%BC%8C%E7%BB%99%E6%82%A8%E6%97%B6%E7%A9%BA%E7%A2%B0%E6%92%9E%E7%9A%84%E5%A5%87%E5%A6%99%E6%84%9F%E5%8F%97%0A%E4%B8%80%E8%B5%B7%E6%8E%A2%E7%B4%A2%EF%BC%8C%E7%BE%8E%E5%A5%BD%E7%94%9F%E6%B4%BB%E5%90%A7%0A%20%0AEnjoy%20a%20nice%20day%20with%20Oneday', 'wx21cf2922d0a597b4', '0', '2020-07-21 14:45:40');
INSERT INTO `subscribe_message` VALUES ('5', '%E5%A6%82%E6%9E%9C%E6%AD%A3%E5%B7%A7%E4%BD%A0%E5%9C%A8Jolly%E5%8F%AF%E4%BB%A5%E8%BF%9E%E6%8E%A5%E6%88%91%E4%BB%AC%E7%9A%84%E6%97%A0%E7%BA%BF%E7%BD%91%E7%BB%9C%0A%20%0A%E8%B4%A6%E6%88%B7%EF%BC%9Aoneday%20jolly2F%2F3F%0A%E5%AF%86%E7%A0%81%EF%BC%9Aoneday830', 'wx21cf2922d0a597b4', '1', '2020-07-21 14:45:40');
INSERT INTO `subscribe_message` VALUES ('6', 'Jolly8%E8%8B%B1%E5%AF%B8ins%E7%AE%80%E7%BA%A6%E6%97%A5%E5%BC%8F%E8%9B%8B%E7%B3%956.5%E6%8A%98%E4%B8%8A%E7%BA%BF%E4%B8%AD%EF%BC%8C%E5%8F%AF%E5%89%8D%E5%BE%80%E5%A4%A7%E4%BC%97%E7%82%B9%E8%AF%84%E4%B8%8B%E5%8D%95%E6%8A%A2%E8%B4%ADhttp%3A%2F%2Fm.dianping.com%2Fappshare%2Fshop%2Fk1k9t9HpNDlJop4A', 'wx21cf2922d0a597b4', '2', '2020-07-21 14:45:40');

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
INSERT INTO `wechat_access_token` VALUES ('wx9a7f04eeea0842be', '{\"accessToken\":\"37_eCx7RUJSVxuUuRunwK7VsFLr5JJNu3T8hRWbUOg6jSQ1kZ1UoJ00NBijpzp4pGs5xhIxdyQppiRrGvixG5xGbgULaoUZ-K1pScSbF-ALhNDHvq8yK_TJWx75ZuQGlbatOLvN6Ou7uVJ66fkKJMHiAIASVQ\",\"expireTime\":1599300832316}');

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
INSERT INTO `wechat_ticket` VALUES ('wx9a7f04eeea0842be', 'wx_card', '{\"ticket\":\"9KwiourQPRN3vx3Nn1c_icqspS1iqgVMXkf-YPzlceWTHw_fu6e1vYflpVTCjTk5nvf5Aozfx5to0l6C59Qm2g\",\"expireTime\":1599304447692}');
INSERT INTO `wechat_ticket` VALUES ('wx21cf2922d0a597b4', 'wx_card', '{\"ticket\":\"9KwiourQPRN3vx3Nn1c_icqspS1iqgVMXkf-YPzlceUlUYGqt8Cijwau1rRqxJxqWKfklTvFCTwFnVQDYwXRDA\",\"expireTime\":1581585923090}');
