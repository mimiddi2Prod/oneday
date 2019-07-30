/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-07-30 18:26:56
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
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-23 13:54:08', '../../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-24 17:53:47', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-07-24 17:53:51', '', '2', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-07-24 17:54:11', '', '2', '0', 'category');
INSERT INTO `admin_menu` VALUES ('5', '订单', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'order');
INSERT INTO `admin_menu` VALUES ('6', '品牌管理', '2019-07-24 17:54:43', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('7', '品牌管理', '2019-07-24 17:54:44', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('8', '品牌管理', '2019-07-24 17:54:45', '../../images/logo.png', '0', '0', '');

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
  `stock` int(12) DEFAULT NULL,
  `status` int(2) NOT NULL COMMENT '0 下架 1 上架',
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods
-- ----------------------------
INSERT INTO `restaurant_goods` VALUES ('1', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('2', '炒肉盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('3', '西红柿鸡蛋面', '/images/A.png', '营养丰富', '20.00', 'xmspw', '1', '999', '1', '0', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('4', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('6', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('7', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('8', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('9', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods` VALUES ('10', '阿文', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_10_7_0.png', '32', '23.00', 'xmspw', '3', '324', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `restaurant_goods` VALUES ('11', '阿文', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_10_7_0.png', '32', '3.00', 'xmspw', '3', '45', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `restaurant_goods` VALUES ('12', '他说他', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_19_12_0.png', '特舒服', '3.00', 'xmspw', '3', '2443', '1', '3', '2019-07-30 18:19:45', '1');

-- ----------------------------
-- Table structure for restaurant_goods_order
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_order`;
CREATE TABLE `restaurant_goods_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` int(12) NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_order
-- ----------------------------
INSERT INTO `restaurant_goods_order` VALUES ('10', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '3', '3', '{\"冰度\":\"冰\"}', '6.00', '2', null, '231', '2019-07-26 11:09:23');
INSERT INTO `restaurant_goods_order` VALUES ('11', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '0', '1', '\"\"', '20.00', '1', null, '231', '2019-07-26 11:09:23');
INSERT INTO `restaurant_goods_order` VALUES ('12', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '2', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', '1', null, '231', '2019-07-26 11:09:23');
INSERT INTO `restaurant_goods_order` VALUES ('13', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '3', '3', '{\"冰度\":\"冰\"}', '6.00', '2', null, '231', '2019-07-26 11:09:23');
INSERT INTO `restaurant_goods_order` VALUES ('14', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '0', '1', '\"\"', '20.00', '1', null, '231', '2019-07-26 11:09:23');
INSERT INTO `restaurant_goods_order` VALUES ('15', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '3', '3', '{\"冰度\":\"冰\"}', '6.00', '3', null, '231', '2019-07-26 13:53:24');
INSERT INTO `restaurant_goods_order` VALUES ('16', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '2', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', '2', null, '231', '2019-07-26 13:53:24');

-- ----------------------------
-- Table structure for restaurant_goods_sku
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_sku`;
CREATE TABLE `restaurant_goods_sku` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `stock` int(12) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_sku
-- ----------------------------
INSERT INTO `restaurant_goods_sku` VALUES ('1', '999', '5.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('2', '999', '6.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('3', '999', '6.00', '3', '{\"冰度\":\"冰\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('4', '999', '7.00', '3', '{\"冰度\":\"正常冰\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('5', '999', '9.00', '3', '{\"冰度\":\"热\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('6', '2', '34.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `restaurant_goods_sku` VALUES ('7', '4', '23.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `restaurant_goods_sku` VALUES ('8', '4', '3.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `restaurant_goods_sku` VALUES ('9', '3', '22.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');

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
INSERT INTO `restaurant_user` VALUES ('2', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '', null, null, '2019-07-19 17:42:09', 'CCbWVagq8fig2Us2cXDDxQ==', '2019-07-30 18:23:07', null, '0');

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
