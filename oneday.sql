/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-07-20 17:44:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(12) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `register_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_login_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` varchar(255) NOT NULL DEFAULT '' COMMENT '0 god 1 admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', '2019-07-20 14:28:12', '2019-07-20 16:13:26', '0');

-- ----------------------------
-- Table structure for admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `sup_id` int(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-20 17:06:49', '../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-20 17:07:20', '../images/logo.png', '0', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('3', '商品列表', '2019-07-20 17:07:52', '', '2', '0', 'goods');

-- ----------------------------
-- Table structure for restaurant_category
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_category`;
CREATE TABLE `restaurant_category` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location_code` varchar(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_category
-- ----------------------------
INSERT INTO `restaurant_category` VALUES ('1', '汤面', 'xmspw', '0', '2019-07-17 17:20:24', '1');
INSERT INTO `restaurant_category` VALUES ('2', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('3', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('4', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('5', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('6', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('7', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `restaurant_category` VALUES ('8', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');

-- ----------------------------
-- Table structure for restaurant_goods
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods`;
CREATE TABLE `restaurant_goods` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `min_price` decimal(10,2) NOT NULL,
  `location_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `category_id` int(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods
-- ----------------------------
INSERT INTO `restaurant_goods` VALUES ('1', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('2', '炒肉盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('3', '西红柿鸡蛋面', '/images/A.png', '营养丰富', '20.00', 'xmspw', '1', '0', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('4', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('6', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('7', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('8', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('9', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '2', '2019-07-17 17:14:50', '1');

-- ----------------------------
-- Table structure for restaurant_goods_order
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_order`;
CREATE TABLE `restaurant_goods_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_order
-- ----------------------------
INSERT INTO `restaurant_goods_order` VALUES ('1', null, '3', '2019-07-20 12:06:19', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('2', null, '1', '2019-07-20 12:06:19', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '20.00', '2', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('3', null, '3', '2019-07-20 13:57:52', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('4', null, '1', '2019-07-20 13:57:52', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '20.00', '2', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('5', null, '3', '2019-07-20 13:58:23', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('6', null, '1', '2019-07-20 13:58:23', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '20.00', '2', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('7', null, '3', '2019-07-20 14:00:08', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('8', null, '3', '2019-07-20 14:05:24', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');
INSERT INTO `restaurant_goods_order` VALUES ('9', null, '3', '2019-07-20 14:06:58', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '6.00', '1', null, '231');

-- ----------------------------
-- Table structure for restaurant_goods_param
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_param`;
CREATE TABLE `restaurant_goods_param` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `param` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_param
-- ----------------------------
INSERT INTO `restaurant_goods_param` VALUES ('1', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '2019-07-17 19:21:56', '0');
INSERT INTO `restaurant_goods_param` VALUES ('2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '2019-07-17 19:21:56', '0');
INSERT INTO `restaurant_goods_param` VALUES ('3', '{\"冰度\":\"冰\"}', '2019-07-17 19:21:56', '0');
INSERT INTO `restaurant_goods_param` VALUES ('4', '{\"冰度\":\"正常冰\"}', '2019-07-17 19:21:56', '0');
INSERT INTO `restaurant_goods_param` VALUES ('5', '{\"冰度\":\"热\"}', '2019-07-17 19:21:56', '0');

-- ----------------------------
-- Table structure for restaurant_goods_sku
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_sku`;
CREATE TABLE `restaurant_goods_sku` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `stock` int(12) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `goods_param_id` int(10) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_sku
-- ----------------------------
INSERT INTO `restaurant_goods_sku` VALUES ('1', '999', '5.00', '1', '2', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('2', '999', '6.00', '2', '2', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('3', '999', '6.00', '3', '3', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('4', '999', '7.00', '4', '3', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('5', '999', '9.00', '5', '3', '0000-00-00 00:00:00', '0');

-- ----------------------------
-- Table structure for restaurant_user
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_user`;
CREATE TABLE `restaurant_user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(64) NOT NULL,
  `union_id` varchar(64) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `session_key` varchar(255) NOT NULL,
  `last_login_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `address_id` int(12) DEFAULT NULL,
  `integral` int(12) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------
INSERT INTO `restaurant_user` VALUES ('2', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '', null, null, '2019-07-19 17:42:09', 'UyCnbZfBvgMPVu7bhu+4Pg==', '2019-07-20 14:16:06', null, '0');

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(12) NOT NULL,
  `test` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('1', 'success');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `union_id` varchar(64) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for wow_cat
-- ----------------------------
DROP TABLE IF EXISTS `wow_cat`;
CREATE TABLE `wow_cat` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `appid` varchar(64) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wow_cat
-- ----------------------------
INSERT INTO `wow_cat` VALUES ('1', 'restaurant', 'wx14dd6120d4882a81', '4a70772c68e8b62a606bf6973cacf7ac', '2019-07-17 16:24:11');

-- ----------------------------
-- Table structure for wow_dog
-- ----------------------------
DROP TABLE IF EXISTS `wow_dog`;
CREATE TABLE `wow_dog` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `mch_id` int(32) NOT NULL,
  `pay_api_key` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wow_dog
-- ----------------------------
INSERT INTO `wow_dog` VALUES ('1', '1508603281', '81ef119935811ab9339b8c802a2ffc7B', '2019-07-17 16:34:22', 'jolly');
