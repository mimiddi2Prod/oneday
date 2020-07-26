/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-26 16:36:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(64) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_login_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` int(1) NOT NULL COMMENT '1:god 2:admin 3employee_account',
  `state` int(2) DEFAULT NULL COMMENT '0 删除 1 启用 2 禁用',
  `position_id` int(12) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expire` timestamp NULL DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `cate` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `order` varchar(255) DEFAULT NULL,
  `recommend` varchar(255) DEFAULT NULL,
  `navigation` varchar(255) DEFAULT NULL,
  `waterfall` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-07-26 12:14:03', '1', null, null, '6b1c5dc9-9cc2-4f38-ade9-68ab2ea74251', '2020-07-27 00:14:03', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('2', '1001', 's1001', null, '2019-05-14 13:58:38', '2020-07-26 16:01:58', '3', '1', null, 'd23a8260-c8f4-48d3-957e-7c7f89794221', '2020-07-27 16:01:58', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `sup_id` int(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-23 13:54:08', '../../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-24 17:53:47', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-07-24 17:53:51', '', '2', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-07-24 17:54:11', '', '2', '0', 'category');
INSERT INTO `admin_menu` VALUES ('5', '订单', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'order');
INSERT INTO `admin_menu` VALUES ('6', '用户', '2020-07-26 15:27:48', '../../images/logo.png', '0', '0', 'user');
INSERT INTO `admin_menu` VALUES ('7', '员工账号', '2020-07-26 15:27:30', '../../images/logo.png', '0', '0', 'account');
INSERT INTO `admin_menu` VALUES ('8', '餐品推荐', '2020-07-26 15:27:28', '../../images/logo.png', '0', '0', 'brunchBanner');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(64) DEFAULT NULL,
  `goods_id` varchar(64) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(2) NOT NULL,
  `sort` int(16) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  `type` int(2) NOT NULL COMMENT '0:餐品 1客服 2无事件 3优惠券',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location_code` varchar(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '测试分类', 'szsn', '1', '2020-07-21 14:14:29', '0');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', 'joker', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', 'why so serious？', '158.60', 'szsn', '1', '24', '1', '1', '2020-07-21 14:16:43', '1');

-- ----------------------------
-- Table structure for goods_order
-- ----------------------------
DROP TABLE IF EXISTS `goods_order`;
CREATE TABLE `goods_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` int(12) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL COMMENT '折扣价',
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '订单id',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `take_meal_style` int(11) NOT NULL COMMENT '0 堂食 1 外带',
  `table_number` int(3) NOT NULL COMMENT '桌位号',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `pay_status` int(2) NOT NULL COMMENT '0已支付 1未支付',
  `pay_method` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '支付方式 微信支付/余额支付',
  `return_number` int(6) DEFAULT NULL COMMENT '退货数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------
INSERT INTO `goods_order` VALUES ('1', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', null, '0.10', '0.45', '1', null, '20200722144440', '2020-07-22 15:44:26', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('2', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', null, '0.10', '0.55', '1', null, '20200722144440', '2020-07-22 15:44:26', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('3', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', null, '0.10', '0.10', '1', null, '20200722144440', '2020-07-22 15:44:26', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('4', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159558678838995312', '2020-07-24 18:33:08', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('5', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159558911428709342', '2020-07-24 19:11:54', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('6', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159558971936536469', '2020-07-24 19:21:59', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('7', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'br_159558976724897785y', '2020-07-24 19:22:47', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('8', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159559008440161775', '2020-07-24 19:28:04', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('9', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159559084324651410', '2020-07-24 19:40:43', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('10', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159559128290438943', '2020-07-24 19:48:02', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('11', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159559154813878370', '2020-07-24 19:52:28', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('12', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725155252', '2020-07-25 15:52:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('13', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725174648', '2020-07-25 17:46:48', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('14', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725174848', '2020-07-25 17:48:48', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('15', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725180357', '2020-07-25 18:03:57', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('16', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725181728', '2020-07-25 18:17:28', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('17', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725211430', '2020-07-25 21:14:30', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('18', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200725212236', '2020-07-25 21:22:36', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('19', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200726133210', '2020-07-26 13:32:10', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('20', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200726133244', '2020-07-26 13:32:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('21', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159574162299031912', '2020-07-26 13:33:43', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('22', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159574224570708380', '2020-07-26 13:44:05', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('23', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159574241076244870', '2020-07-26 13:46:50', '0', '3', '1', '1', 'Balance', null);
INSERT INTO `goods_order` VALUES ('24', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '1', 'joker', 'why so serious？', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, 'szsn159574252601577393', '2020-07-26 13:48:46', '0', '3', '1', '1', 'Balance', null);

-- ----------------------------
-- Table structure for goods_pending_order
-- ----------------------------
DROP TABLE IF EXISTS `goods_pending_order`;
CREATE TABLE `goods_pending_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` int(12) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL COMMENT '折扣价',
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '订单id',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `take_meal_style` int(11) NOT NULL COMMENT '0 堂食 1 外带',
  `table_number` int(3) NOT NULL COMMENT '桌位号',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `pay_status` int(2) NOT NULL COMMENT '0已支付 1未支付',
  `pay_method` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '支付方式 微信支付/余额支付',
  `return_number` int(6) DEFAULT NULL COMMENT '退货数量',
  `remark` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_pending_order
-- ----------------------------
INSERT INTO `goods_pending_order` VALUES ('1', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '', '0.10', '0.45', '1', null, '20200722144440', '2020-07-22 14:44:40', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('2', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '', '0.10', '0.55', '1', null, '20200722144440', '2020-07-22 14:44:40', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('3', '', '0', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '', '0.10', '0.10', '1', null, '20200722144440', '2020-07-22 14:44:40', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('4', '', '1', '1', 'joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_21_14_14_35_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '158.60', '158.60', '1', null, '20200722161058', '2020-07-22 16:10:58', '0', '0', '0', '0', '', null, '');

-- ----------------------------
-- Table structure for goods_pending_trade
-- ----------------------------
DROP TABLE IF EXISTS `goods_pending_trade`;
CREATE TABLE `goods_pending_trade` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `trade_id` varchar(32) NOT NULL COMMENT '订单号',
  `open_id` varchar(32) NOT NULL COMMENT '下单用户openid',
  `trade_platform` int(2) NOT NULL COMMENT '下单平台: 1 小程序下单 2 前台点单',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '下单时间',
  `table_number` int(4) NOT NULL COMMENT '桌位号',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `employee_account` varchar(255) DEFAULT NULL COMMENT '前台收银记录',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(11) NOT NULL COMMENT '状态  1 未支付 2 支付 3作废',
  `invalid_remark` varchar(255) DEFAULT NULL COMMENT '挂单作废备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_pending_trade
-- ----------------------------
INSERT INTO `goods_pending_trade` VALUES ('1', '20200722144440', '', '2', '2020-07-22 14:44:40', '1', '1', '1001', '1', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('2', '20200722161058', '', '2', '2020-07-22 16:10:58', '1', '1', '1001', '1', '1', null);

-- ----------------------------
-- Table structure for goods_sku
-- ----------------------------
DROP TABLE IF EXISTS `goods_sku`;
CREATE TABLE `goods_sku` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `stock` int(12) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_sku
-- ----------------------------
INSERT INTO `goods_sku` VALUES ('1', '0', '158.60', '1', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '2020-07-21 17:41:30', '1');

-- ----------------------------
-- Table structure for goods_trade
-- ----------------------------
DROP TABLE IF EXISTS `goods_trade`;
CREATE TABLE `goods_trade` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `trade_id` varchar(32) NOT NULL COMMENT '订单号',
  `open_id` varchar(32) NOT NULL COMMENT '下单用户openid',
  `trade_platform` int(2) NOT NULL COMMENT '下单平台: 1 小程序下单 2 前台点单',
  `order_id_list` text NOT NULL COMMENT '这一订单的商品订单id列表 [1,2,3,...]',
  `goods_total_number` int(6) NOT NULL COMMENT '餐品总数',
  `goods_total_original_price` decimal(10,2) NOT NULL COMMENT '商品原始总价',
  `goods_total_price` decimal(10,2) NOT NULL COMMENT '商品单独折扣后总价',
  `actually_total_price` decimal(10,2) NOT NULL COMMENT '实际支付总价 扣除优惠后 算配送费',
  `pay_status` int(2) NOT NULL COMMENT '支付状态：-2支付超时（每天凌晨计算一次就行） -1取消 0未付款 1已付款 2已收货',
  `pay_method` varchar(255) NOT NULL COMMENT '支付方式 微信支付/余额支付',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '下单时间',
  `pay_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '支付时间',
  `take_meal_style` int(2) NOT NULL COMMENT '0 堂食 1 外带',
  `table_number` int(4) NOT NULL COMMENT '桌位号',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `note` text COMMENT '订单备注',
  `expire_time` timestamp NULL DEFAULT NULL COMMENT '订单过期时间',
  `cancle_time` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '主动取消订单时间',
  `delivery_price` decimal(10,2) DEFAULT NULL COMMENT '配送费',
  `discount_price` decimal(10,2) DEFAULT NULL COMMENT '卡券 优惠价 或 前台点单直接减免',
  `is_delete` int(1) NOT NULL COMMENT '用户前端不展示该订单 0 不删除 1 删除',
  `card_id` int(12) DEFAULT NULL COMMENT '优惠卡券',
  `after_sale_type` int(2) DEFAULT NULL COMMENT '售后类型 0不在售后 1反结账 2退货',
  `after_sale_remark` text COMMENT '反结账备注',
  `employee_account` varchar(255) DEFAULT NULL COMMENT '前台收银记录',
  `after_sale_price` decimal(10,2) DEFAULT NULL COMMENT '反结账为全款 退货为已退的价',
  `remark` varchar(255) DEFAULT NULL COMMENT '订单备注，区别于商品单品备注',
  `phone_number` varchar(16) DEFAULT NULL COMMENT '余额支付的会员号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('1', '20200722144440', '', '2', '[1,2,3]', '3', '0.30', '1.10', '1.10', '1', '现金', '2020-07-22 15:44:26', '2020-07-22 15:44:26', '0', '1', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, '', '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('2', 'szsn159558678838995312', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[4]', '1', '158.60', '158.60', '158.60', '0', 'Wxpay', '2020-07-24 18:33:08', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('3', 'szsn159558911428709342', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[5]', '1', '158.60', '158.60', '158.60', '0', 'Wxpay', '2020-07-24 19:11:54', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('4', 'szsn159558971936536469', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[6]', '1', '158.60', '158.60', '158.60', '0', 'Wxpay', '2020-07-24 19:21:59', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('5', 'br_159558976724897785y', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[7]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-24 19:22:47', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('6', 'szsn159559008440161775', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[8]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-24 19:28:04', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('7', 'szsn159559084324651410', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[9]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-24 19:40:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('8', 'szsn159559128290438943', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[10]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-24 19:48:02', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('9', 'szsn159559154813878370', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[11]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-24 19:52:28', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('10', '20200725155252', '', '2', '[12]', '1', '158.60', '158.60', '158.60', '1', '余额', '2020-07-25 15:52:52', '2020-07-25 15:52:52', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('11', '20200725174648', '', '2', '[13]', '1', '158.60', '158.60', '1.59', '1', '余额', '2020-07-25 17:46:48', '2020-07-25 17:46:48', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('12', '20200725174848', '', '2', '[14]', '1', '158.60', '158.60', '1.59', '1', '余额', '2020-07-25 17:48:48', '2020-07-25 17:48:48', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('13', '20200725180357', '', '2', '[15]', '1', '158.60', '158.60', '1.59', '1', '余额', '2020-07-25 18:03:57', '2020-07-25 18:03:57', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('14', '20200725181728', '', '2', '[16]', '1', '158.60', '158.60', '1.59', '1', '余额', '2020-07-25 18:17:28', '2020-07-25 18:17:28', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', 'e2e', '1001', '1.59', '', '13055257913');
INSERT INTO `goods_trade` VALUES ('15', '20200725211430', '', '2', '[17]', '1', '158.60', '158.60', '158.60', '1', '现金', '2020-07-25 21:14:30', '2020-07-25 21:14:30', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '222', '1001', '158.60', '', null);
INSERT INTO `goods_trade` VALUES ('16', '20200725212236', '', '2', '[18]', '1', '158.60', '158.60', '7.93', '1', '余额', '2020-07-25 21:22:36', '2020-07-25 21:22:36', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('17', '20200726133210', '', '2', '[19]', '1', '158.60', '158.60', '79.30', '1', '现金', '2020-07-26 13:32:10', '2020-07-26 13:32:10', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('18', '20200726133244', '', '2', '[20]', '1', '158.60', '158.60', '15.86', '1', '余额', '2020-07-26 13:32:44', '2020-07-26 13:32:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);
INSERT INTO `goods_trade` VALUES ('19', 'szsn159574162299031912', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[21]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-26 13:33:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('20', 'szsn159574224570708380', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[22]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-26 13:44:05', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('21', 'szsn159574241076244870', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[23]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-26 13:46:50', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('22', 'szsn159574252601577393', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', '1', '[24]', '1', '158.60', '158.60', '158.60', '1', 'Balance', '2020-07-26 13:48:46', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null, '13055257913');

-- ----------------------------
-- Table structure for home_data
-- ----------------------------
DROP TABLE IF EXISTS `home_data`;
CREATE TABLE `home_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` date DEFAULT NULL COMMENT '当日时间',
  `mini_program_income` decimal(10,2) NOT NULL COMMENT '当日小程序收入',
  `reception_income` decimal(10,2) NOT NULL COMMENT '当日前台收入',
  `actually_income` decimal(10,2) NOT NULL COMMENT '当日总营收（非余额部分） 前台+小程序收入-退款',
  `order_number` int(12) NOT NULL COMMENT '当日订单总数',
  `refund_price` decimal(10,2) NOT NULL COMMENT '当日退款',
  `refund_order_number` int(11) NOT NULL COMMENT '当日反结账+退货 数',
  `increase_user` int(32) NOT NULL COMMENT '当日小程序新增用户',
  `increase_member` int(32) NOT NULL COMMENT '当日注册为会员的',
  `member_recharge` decimal(10,2) NOT NULL COMMENT '会员充值',
  `member_recharge_handsel` decimal(10,2) NOT NULL COMMENT '会员充值赠送',
  `member_recharge_number` int(11) NOT NULL COMMENT '充值的笔数',
  `mini_program_income_balance` decimal(10,2) NOT NULL COMMENT '当日小程序余额下单部分',
  `reception_income_balance` decimal(10,2) NOT NULL COMMENT '当日前台余额下单部分',
  `order_number_balance` int(12) NOT NULL,
  `refund_price_balance` decimal(10,2) NOT NULL COMMENT '当日余额退款',
  `refund_order_number_balance` int(12) NOT NULL,
  `actually_income_balance` decimal(10,2) NOT NULL COMMENT '小程序余额+前台余额-退款余额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of home_data
-- ----------------------------
INSERT INTO `home_data` VALUES ('1', '2020-07-21', '0.00', '0.00', '0.00', '0', '0.00', '0', '1', '0', '0.00', '0.00', '0', '0.00', '0.00', '0', '0.00', '0', '0.00');
INSERT INTO `home_data` VALUES ('4', '2020-07-25', '0.00', '237.90', '79.30', '1', '158.60', '1', '0', '1', '1128.00', '536.00', '7', '634.40', '188.75', '10', '1.59', '1', '821.56');
INSERT INTO `home_data` VALUES ('5', '2020-07-26', '0.00', '79.30', '79.30', '1', '0.00', '0', '0', '0', '1100.00', '520.00', '2', '634.40', '15.86', '5', '0.00', '0', '650.26');

-- ----------------------------
-- Table structure for subscribe_message
-- ----------------------------
DROP TABLE IF EXISTS `subscribe_message`;
CREATE TABLE `subscribe_message` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `template_id` varchar(128) CHARACTER SET utf8 NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of subscribe_message
-- ----------------------------

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
  `openid` varchar(32) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  `unionid` varchar(255) DEFAULT NULL COMMENT '用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回',
  `register_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(255) NOT NULL COMMENT '登录态',
  `expire_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'token过期时间',
  `user_agent` text NOT NULL COMMENT '用户最后登录设备',
  `nick_name` text,
  `gender` varchar(2) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `avatar_url` text,
  `phone_number` varchar(16) DEFAULT NULL COMMENT '会员手机号 余额以该手机号为准 只提供小程序注册',
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '剩余余额',
  `total_balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '历史累计充值',
  `total_handsel` decimal(10,2) NOT NULL COMMENT '历史累计赠送',
  `get_phone_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'APLjfj0H7ojO0626QvDFrg==', null, '2020-07-21 14:16:53', '2020-07-21 16:40:02', 'pdaMhTWz15953208025000GbCUt50', '2020-07-22 16:40:02', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null, null, '0.00', '0.00', '0.00', null);
INSERT INTO `user` VALUES ('2', 'o-yn35edGw2vbn74Q8crwNvJ1z7Y', 'iTKBpiUzqnqK+3vLl/M9gQ==', null, '2020-07-21 16:41:59', '2020-07-26 13:33:14', 'OMSmww711595741594877RazTqFTL', '2020-07-27 13:33:14', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null, '13055257913', '1004.58', '1128.00', '536.00', '2020-07-25 18:21:17');

-- ----------------------------
-- Table structure for user_recharge_record
-- ----------------------------
DROP TABLE IF EXISTS `user_recharge_record`;
CREATE TABLE `user_recharge_record` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(16) NOT NULL COMMENT '会员充值记录 手机号码',
  `increment_balance` decimal(10,2) NOT NULL COMMENT '余额增量 正数增加 负数减少',
  `handsel_balance` decimal(10,2) NOT NULL COMMENT '充值赠送余额',
  `current_balance` decimal(10,2) NOT NULL COMMENT '充值后的当前余额',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `employee_account` int(12) NOT NULL COMMENT '前台收银记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_recharge_record
-- ----------------------------
INSERT INTO `user_recharge_record` VALUES ('3', '13055257913', '2.00', '4.00', '8530.20', '2020-07-25 15:07:11', '1001');
INSERT INTO `user_recharge_record` VALUES ('4', '13055257913', '-2.00', '4.00', '8532.20', '2020-07-25 15:07:29', '1001');
INSERT INTO `user_recharge_record` VALUES ('5', '13055257913', '-2.00', '4.00', '8534.20', '2020-07-25 15:07:38', '1001');
INSERT INTO `user_recharge_record` VALUES ('6', '13055257913', '10.00', '2.00', '14.41', '2020-07-25 18:19:14', '1001');
INSERT INTO `user_recharge_record` VALUES ('7', '13055257913', '20.00', '2.00', '42.77', '2020-07-25 19:38:08', '1001');
INSERT INTO `user_recharge_record` VALUES ('8', '13055257913', '100.00', '20.00', '154.84', '2020-07-26 13:32:26', '1001');
INSERT INTO `user_recharge_record` VALUES ('9', '13055257913', '1000.00', '500.00', '1638.98', '2020-07-26 13:33:38', '1001');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wow_cat
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wow_dog
-- ----------------------------

-- ----------------------------
-- Table structure for yly_machine
-- ----------------------------
DROP TABLE IF EXISTS `yly_machine`;
CREATE TABLE `yly_machine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '所属位置 （前台/厨打）',
  `machine_code` varchar(255) NOT NULL COMMENT '易联云机器码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yly_machine
-- ----------------------------
INSERT INTO `yly_machine` VALUES ('1', '前台', '4004682517');
