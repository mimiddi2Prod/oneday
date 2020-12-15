/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100119
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100119
File Encoding         : 65001

Date: 2020-12-15 20:27:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receiver` varchar(255) NOT NULL,
  `tel` varchar(16) NOT NULL,
  `province` text NOT NULL,
  `city` text NOT NULL,
  `area` text NOT NULL,
  `road` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------

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
  `type` int(1) NOT NULL COMMENT '1:god 2:admin',
  `position_id` int(12) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expire` timestamp NULL DEFAULT NULL,
  `cate` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `order` varchar(255) DEFAULT NULL,
  `recommend` varchar(255) DEFAULT NULL,
  `navigation` varchar(255) DEFAULT NULL,
  `waterfall` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-12-15 19:57:32', '0', null, 'a83d9659-f2b4-48ef-9351-54c922a54777', '2020-12-16 07:57:32', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('3', 'test11', 'test11', null, '2019-09-12 15:07:48', '2020-09-03 16:11:54', '2', null, 'df6ba934-63c5-43ed-9f00-d84f640215a1', '2020-09-04 04:11:54', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('8', 'admin', 'admin', null, '0000-00-00 00:00:00', '2020-07-01 11:01:07', '0', null, '6dc5d6f3-4ea8-4a7d-9d42-0fce4c408c7b', '2020-07-01 23:01:07', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('9', 'test', 'onedaytest', null, '2019-09-18 13:18:59', '2020-09-05 11:43:53', '0', null, 'bb7f1803-22ad-4ca4-9c20-7250e329a0ee', '2020-09-05 23:43:53', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('14', 'tina', 'tina', 'tina', '2019-10-12 11:21:23', '2020-07-31 20:24:49', '2', null, '850d7801-8e90-4e43-b884-63a152aa3c64', '2020-08-01 08:24:49', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('15', 'echo', 'echo', 'echo', '2019-10-12 11:22:00', '2019-10-12 11:22:30', '2', null, '87905b08-fce5-40ea-a03e-647fd7dac53d', '2019-10-12 23:22:30', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('17', 'jollyshop', 'jollyshop2019', 'jollyshop', '2019-10-18 12:00:52', '2020-08-29 11:04:04', '1', null, '9bcaab84-4d48-4bcd-83c8-ecdce2ec5000', '2020-08-29 23:04:04', '[[53,55,56],[58,70,71,68,66,73,75,61,57,67,72,74,76,60]]', '[15,16,17,18,19,20,21,22]', '1', '1', '1', '1');

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
  `app` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-08-14 11:09:39', '../../images/logo.png', '0', '0', 'home', 'restaurant');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-08-14 11:09:50', '../../images/logo.png', '0', '0', '', 'restaurant');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-08-14 11:09:50', '', '2', '0', 'goods', 'restaurant');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-08-14 11:09:51', '', '2', '0', 'category', 'restaurant');
INSERT INTO `admin_menu` VALUES ('6', '订单', '2019-08-14 11:09:51', '../../images/logo.png', '0', '0', 'order', 'restaurant');
INSERT INTO `admin_menu` VALUES ('7', '首页', '2019-08-14 11:09:39', '../../images/logo.png', '0', '0', 'home', 'shop');
INSERT INTO `admin_menu` VALUES ('8', '商品', '2019-08-14 11:09:50', '../../images/logo.png', '0', '0', '', 'shop');
INSERT INTO `admin_menu` VALUES ('9', '商品管理', '2019-08-14 11:29:14', '', '8', '0', 'goods', 'shop');
INSERT INTO `admin_menu` VALUES ('10', '分类管理', '2019-08-14 11:29:15', '', '8', '0', 'category', 'shop');
INSERT INTO `admin_menu` VALUES ('11', '订单', '2019-08-14 11:09:51', '../../images/logo.png', '0', '0', 'order', 'shop');
INSERT INTO `admin_menu` VALUES ('12', '品牌管理', '2019-08-14 11:49:21', '../../images/logo.png', '0', '0', 'brand', 'shop');
INSERT INTO `admin_menu` VALUES ('13', '推荐位管理', '2019-08-14 11:49:50', '../../images/logo.png', '0', '0', 'recommend', 'shop');
INSERT INTO `admin_menu` VALUES ('14', '导航管理', '2019-08-14 11:49:54', '../../images/logo.png', '0', '0', 'navigation', 'shop');
INSERT INTO `admin_menu` VALUES ('15', '瀑布流管理', '2019-08-14 11:51:13', '../../images/logo.png', '0', '0', 'waterfall', 'shop');
INSERT INTO `admin_menu` VALUES ('16', '客户管理', '2019-08-14 11:50:31', '../../images/logo.png', '0', '0', 'customer', 'shop');
INSERT INTO `admin_menu` VALUES ('17', '设置', '2019-08-14 11:50:33', '../../images/logo.png', '0', '0', '', 'shop');
INSERT INTO `admin_menu` VALUES ('18', '子账号管理', '2019-09-11 16:08:14', '../../images/logo.png', '17', '0', 'account', 'shop');
INSERT INTO `admin_menu` VALUES ('19', 'brunch', '2019-09-19 11:25:18', '../../images/logo.png', '0', '0', '', 'shop');
INSERT INTO `admin_menu` VALUES ('20', '银豹收银', '2019-09-19 11:26:17', '../../images/logo.png', '19', '0', 'yinbao', 'shop');
INSERT INTO `admin_menu` VALUES ('21', '餐品推荐', '2019-09-19 14:42:17', '../../images/logo.png', '19', '0', 'brunchBanner', 'shop');
INSERT INTO `admin_menu` VALUES ('22', '优惠券', '2020-02-11 11:47:05', '../../images/logo.png', '19', '0', 'coupon', 'shop');
INSERT INTO `admin_menu` VALUES ('23', '每日订单', '2020-02-11 11:45:48', '../../images/logo.png', '19', '0', 'brunchOrder', '');
INSERT INTO `admin_menu` VALUES ('24', '银豹订单', '2020-02-11 11:45:23', '../../images/logo.png', '19', '0', 'yinbaoOrder', 'shop');

-- ----------------------------
-- Table structure for advertisement
-- ----------------------------
DROP TABLE IF EXISTS `advertisement`;
CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '0 openning, 1 banner, ....',
  `url` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `sort` int(1) NOT NULL DEFAULT '0' COMMENT '0 min ->9 max',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 normal, 1 forbid',
  PRIMARY KEY (`id`),
  KEY `get_ad` (`type`,`state`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advertisement
-- ----------------------------

-- ----------------------------
-- Table structure for aftersale
-- ----------------------------
DROP TABLE IF EXISTS `aftersale`;
CREATE TABLE `aftersale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `refund` decimal(10,2) DEFAULT NULL COMMENT '退款金额',
  `total_refund` decimal(10,2) NOT NULL,
  `reason` text NOT NULL COMMENT '退款原因',
  `description` text COMMENT '售后说明',
  `image` text COMMENT '售后凭证',
  `address` text COMMENT '仅换货需要',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number` int(11) NOT NULL DEFAULT '1',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 正在申请售后 1 用户取消申请 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aftersale
-- ----------------------------

-- ----------------------------
-- Table structure for after_sale_notice
-- ----------------------------
DROP TABLE IF EXISTS `after_sale_notice`;
CREATE TABLE `after_sale_notice` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `user_id` int(16) NOT NULL,
  `have_after_sale_notice` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of after_sale_notice
-- ----------------------------

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `user_id` int(16) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 ok 1 forbid',
  `sort` int(1) NOT NULL DEFAULT '0' COMMENT '0 min 9 max',
  `desc` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_param_id_1` int(11) NOT NULL,
  `item_param_id_2` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(16) NOT NULL DEFAULT '0',
  `parent_id` int(16) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '0 大类， 1 子类',
  `home_nav` int(1) NOT NULL DEFAULT '1' COMMENT '是否在首页推荐导航 0 : true 1:false',
  `sort` int(1) NOT NULL COMMENT '0 min ->9 max',
  `describe` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `card_id` varchar(64) NOT NULL,
  `least_cost` decimal(10,2) NOT NULL,
  `reduce_cost` decimal(10,0) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `card_type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date_info_type` varchar(255) NOT NULL,
  `begin_timestamp` timestamp NULL DEFAULT NULL,
  `end_timestamp` timestamp NULL DEFAULT NULL,
  `fixed_term` varchar(255) DEFAULT NULL,
  `fixed_begin_term` varchar(255) DEFAULT NULL,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coupon
-- ----------------------------

-- ----------------------------
-- Table structure for coupon_user
-- ----------------------------
DROP TABLE IF EXISTS `coupon_user`;
CREATE TABLE `coupon_user` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `card_id` varchar(64) NOT NULL,
  `card_encrypt_code` varchar(255) NOT NULL,
  `openid` varchar(32) NOT NULL,
  `state` int(2) NOT NULL COMMENT '0:can use , 1:consume',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coupon_user
-- ----------------------------

-- ----------------------------
-- Table structure for group_buy
-- ----------------------------
DROP TABLE IF EXISTS `group_buy`;
CREATE TABLE `group_buy` (
  `id` int(64) NOT NULL AUTO_INCREMENT,
  `item_id` int(64) NOT NULL,
  `founded` int(1) NOT NULL DEFAULT '0' COMMENT '-1 团购失效 0 正在团购 1 团购成立',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_buy
-- ----------------------------

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '',
  `image` text NOT NULL COMMENT '"image":[ "url1", "url2", ...]',
  `url` varchar(255) NOT NULL,
  `qcl` int(1) NOT NULL DEFAULT '1' COMMENT '1 a, 2 b, 3 c',
  `price` decimal(10,2) NOT NULL,
  `describe` varchar(64) NOT NULL DEFAULT '',
  `type` int(2) NOT NULL DEFAULT '0' COMMENT '0 item, 1 topic, 2',
  `sort` int(1) NOT NULL DEFAULT '0',
  `state` int(1) NOT NULL DEFAULT '0',
  `specification_id_1` int(11) NOT NULL,
  `specification_id_2` int(11) NOT NULL,
  `user_id` int(16) NOT NULL DEFAULT '0',
  `category_id_1` int(16) NOT NULL DEFAULT '0',
  `category_id_2` int(16) NOT NULL DEFAULT '0',
  `category_id_3` int(16) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `brand_id` int(16) NOT NULL DEFAULT '0',
  `review_id` int(16) NOT NULL DEFAULT '0',
  `goods_info` text NOT NULL COMMENT '"image":[ "url1", "url2", ...]',
  `integral_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '积分商城要用',
  `group_id` int(11) NOT NULL DEFAULT '0' COMMENT '团购id 0 不是团购商品 1 是团购商品',
  PRIMARY KEY (`id`),
  KEY `get_list_by_brand` (`state`,`brand_id`,`integral_price`,`group_id`) USING BTREE,
  KEY `get_list_by_category` (`state`,`category_id_1`,`integral_price`,`group_id`) USING BTREE,
  KEY `get_waterfall_in_index` (`type`,`state`,`integral_price`,`group_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------

-- ----------------------------
-- Table structure for item_param
-- ----------------------------
DROP TABLE IF EXISTS `item_param`;
CREATE TABLE `item_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `specification_id` int(11) NOT NULL,
  `param` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_param
-- ----------------------------

-- ----------------------------
-- Table structure for item_price
-- ----------------------------
DROP TABLE IF EXISTS `item_price`;
CREATE TABLE `item_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_id_1` int(11) NOT NULL,
  `param_id_2` int(11) NOT NULL,
  `stock` int(16) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `item_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_price
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `open_id` varchar(64) NOT NULL,
  `item_id` int(11) NOT NULL,
  `goodsname` varchar(255) NOT NULL,
  `param_id_1` int(11) NOT NULL,
  `param_id_2` int(11) NOT NULL,
  `param_1` varchar(30) NOT NULL,
  `param_2` varchar(30) NOT NULL,
  `image` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(2) NOT NULL DEFAULT '0' COMMENT '-1 订单关闭（取消订单） 0 未支付（待支付） 1 已支付（待发货） 2已发货（待收货）3已收货（买家确认收货/物流送达后七天后自动确认收货 -- 待评价） 4订单完成（评价完成） ',
  `after_sale_state` int(1) NOT NULL DEFAULT '0' COMMENT '0 不在售后状态 1 退款中 2 退货退款中 3 换货中 4 已退款 5 已退货退款 6 已换货 7拒绝退款',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address_text` varchar(255) NOT NULL,
  `tel` varchar(16) NOT NULL,
  `receiver` varchar(128) NOT NULL,
  `single_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `postage` decimal(10,2) NOT NULL,
  `tradeId` varchar(32) NOT NULL COMMENT '订单号',
  `logistics_code` varchar(255) DEFAULT NULL COMMENT '物流查询',
  `have_cost_integral` int(2) NOT NULL DEFAULT '0' COMMENT '0: 不花费 1 花费',
  `integral_price` int(16) NOT NULL,
  `customer_uid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for paid
-- ----------------------------
DROP TABLE IF EXISTS `paid`;
CREATE TABLE `paid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_price_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `number` int(11) NOT NULL,
  `state` int(11) NOT NULL COMMENT '0 abandon 1 to pay,',
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of paid
-- ----------------------------

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `goods_manage` int(1) NOT NULL COMMENT '0 can do 1 don`t',
  `order_manage` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `info_manage` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `user_manage` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `order_update_price` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `order_refund` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `order_other` int(1) NOT NULL COMMENT '0 can do 1 dont',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of position
-- ----------------------------

-- ----------------------------
-- Table structure for remind_time
-- ----------------------------
DROP TABLE IF EXISTS `remind_time`;
CREATE TABLE `remind_time` (
  `id` int(2) NOT NULL,
  `remind_time` timestamp NULL DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of remind_time
-- ----------------------------
INSERT INTO `remind_time` VALUES ('1', '2020-08-29 14:57:53', 'order');

-- ----------------------------
-- Table structure for restaurant_banner
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_banner`;
CREATE TABLE `restaurant_banner` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(64) DEFAULT NULL,
  `goods_id` varchar(64) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(2) NOT NULL,
  `sort` int(16) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  `type` int(2) NOT NULL COMMENT '0:餐品 1客服 2无事件',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_banner
-- ----------------------------
INSERT INTO `restaurant_banner` VALUES ('52', '0', '0', '无事件', 'http://onedayqiniu.minidope.com/brunchBanner_2020_5_31_19_49_55_0.jpeg', '0', '3', '2020-05-31 19:49:27', '3', '2');
INSERT INTO `restaurant_banner` VALUES ('59', '0', '0', '无事件', 'http://onedayqiniu.minidope.com/brunchBanner_2020_7_5_18_55_25_0.jpeg', '1', '1', '2020-07-05 18:55:32', '3', '2');
INSERT INTO `restaurant_banner` VALUES ('60', '0', '0', '无事件', 'http://onedayqiniu.minidope.com/brunchBanner_2020_7_8_20_21_59_0.jpeg', '1', '2', '2020-07-08 20:22:06', '3', '2');
INSERT INTO `restaurant_banner` VALUES ('62', '1594283188415108183', '437812332229929900', '68元下午茶套餐', 'http://onedayqiniu.minidope.com/brunchBanner_2020_7_10_14_1_31_0.jpeg', '0', '1', '2020-07-10 14:01:59', '1', '0');
INSERT INTO `restaurant_banner` VALUES ('69', '0', '0', '无事件', 'http://onedayqiniu.minidope.com/brunchBanner_2020_7_24_14_21_35_0.jpeg', '0', '4', '2020-07-24 14:21:41', '3', '2');
INSERT INTO `restaurant_banner` VALUES ('74', '1594283188415108183', '825780101831397651', 'Jolly全日双人餐', 'http://onedayqiniu.minidope.com/brunchBanner_2020_8_13_10_1_25_0.jpeg', '0', '0', '2020-08-13 10:01:43', '1', '0');

-- ----------------------------
-- Table structure for restaurant_card
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_card`;
CREATE TABLE `restaurant_card` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `card_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `cardExt` text NOT NULL,
  `openid` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `begin_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `trade_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2530 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_card
-- ----------------------------
INSERT INTO `restaurant_card` VALUES ('2525', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'eIkL5sZAEIvaxXuaYuRZNCjJoPkbXwl1u+Ijw+I7qCs=', '{\"code\":\"\",\"openid\":\"\",\"nonce_str\":\"NlQW2VHTyfL7NoWT\",\"timestamp\":\"1581408313\",\"signature\":\"96ac987611b89f43a7008da3ef726e8646699c9c\"}', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '2020-02-11 16:05:16', '2019-07-23 00:00:00', '2020-02-29 23:59:59', '');
INSERT INTO `restaurant_card` VALUES ('2526', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'eIkL5sZAEIvaxXuaYuRZNBaAr0ed/CdYjlvQwKyyjgU=', '{\"code\":\"\",\"openid\":\"\",\"nonce_str\":\"LC0dOopKqCo6tKzB\",\"timestamp\":\"1581500119\",\"signature\":\"72846f35e474a0a7a1a709f50bfe14f2ddff425a\"}', 'oVSyv4jC7u1izxMuHP0Ne-S6vGsY', '2020-02-12 17:35:21', '2019-07-23 00:00:00', '2020-02-29 23:59:59', '');
INSERT INTO `restaurant_card` VALUES ('2527', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'eIkL5sZAEIvaxXuaYuRZNPHyLAKFqAvIyF01DKnL55E=', '{\"code\":\"\",\"openid\":\"\",\"nonce_str\":\"Ao91PPFeeTmb7arT\",\"timestamp\":\"1581503803\",\"signature\":\"63433c38f3f52eb2415210d06bffc2b4ac952b6e\"}', 'oVSyv4vSd2g-vokEhXWii7barUhI', '2020-02-12 18:36:47', '2019-07-23 00:00:00', '2020-02-29 23:59:59', '');
INSERT INTO `restaurant_card` VALUES ('2528', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'eIkL5sZAEIvaxXuaYuRZNHxraqUli8ozObd6LDqA6h4=', '{\"code\":\"\",\"openid\":\"\",\"nonce_str\":\"EzmkGWmrZyfzZCf4\",\"timestamp\":\"1581503808\",\"signature\":\"5a57258f033bf865fb1ef50103906c34fd3675ba\"}', 'oVSyv4vSd2g-vokEhXWii7barUhI', '2020-02-12 18:36:51', '2019-07-23 00:00:00', '2020-02-29 23:59:59', '');
INSERT INTO `restaurant_card` VALUES ('2529', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'eIkL5sZAEIvaxXuaYuRZNJvFUXuwMf0hkJ0f9iTz5rE=', '{\"code\":\"\",\"openid\":\"\",\"nonce_str\":\"XCfuHSsMxtM8Q0MH\",\"timestamp\":\"1581578733\",\"signature\":\"a5e21f376caa1f42ad7794714f0b0b7bb08eab14\"}', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '2020-02-13 15:25:37', '2019-07-23 00:00:00', '2020-02-29 23:59:59', '');

-- ----------------------------
-- Table structure for restaurant_card_info
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_card_info`;
CREATE TABLE `restaurant_card_info` (
  `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'opening newCustomer',
  `card_id` varchar(255) NOT NULL,
  `card_type` varchar(255) NOT NULL,
  `cash` text NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '优惠券使用状态 0 删除 1 可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_card_info
-- ----------------------------
INSERT INTO `restaurant_card_info` VALUES ('21', 'pmwdi1coc-xqWjnewTR1Em82nGIg', 'CASH', '{\"base_info\":{\"id\":\"pmwdi1coc-xqWjnewTR1Em82nGIg\",\"logo_url\":\"http://mmbiz.qpic.cn/mmbiz_png/WU6QvXpVJzPwn2PZgKj3yWOT45zm2DlwgNhwMDuYoVsRzLXfgXjA1SVicItg62gBIxSqxVFHFsLPvz7v4f2Q3Sw/0?wx_fmt=png\",\"code_type\":\"CODE_TYPE_QRCODE\",\"brand_name\":\"Oneday Jolly\",\"title\":\"满100减1代金券\",\"sub_title\":\"\",\"date_info\":{\"type\":\"DATE_TYPE_FIX_TIME_RANGE\",\"begin_timestamp\":1563811200,\"end_timestamp\":1582991999},\"color\":\"#D54036\",\"notice\":\"请到店内与店员确认后完成购买\",\"description\":\"Jolly 开业有礼\",\"location_id_list\":[],\"get_limit\":2,\"can_share\":true,\"can_give_friend\":true,\"status\":\"CARD_STATUS_VERIFY_OK\",\"sku\":{\"quantity\":58,\"total_quantity\":60},\"create_time\":1563879649,\"update_time\":1581343461,\"custom_url_name\":\"\",\"custom_url\":\"\",\"custom_url_sub_title\":\"\",\"use_all_locations\":true,\"area_code_list\":[]},\"least_cost\":10000,\"reduce_cost\":100,\"advanced_info\":{\"time_limit\":[{\"type\":\"MONDAY\"},{\"type\":\"TUESDAY\"},{\"type\":\"WEDNESDAY\"},{\"type\":\"THURSDAY\"},{\"type\":\"FRIDAY\"},{\"type\":\"SATURDAY\"},{\"type\":\"SUNDAY\"}],\"text_image_list\":[],\"business_service\":[],\"consume_share_card_list\":[],\"abstract\":{\"abstract\":\"Jolly 开业有礼\",\"icon_url_list\":[\"http://mmbiz.qpic.cn/mmbiz_jpg/WU6QvXpVJzMPEALY1vsRXuSeibIUJ8VhbZxS95WSgatqnicKxzNhvT5amNyFvpTGa9dqNSzY9M5y9AO8tdzicpz6Q/0?wx_fmt=jpeg\"]},\"use_condition\":{\"least_cost\":10000,\"can_use_with_other_discount\":false,\"can_use_with_membercard\":false},\"share_friends\":false}}', '2020-09-15 11:49:40', null, '0');

-- ----------------------------
-- Table structure for restaurant_category
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_category`;
CREATE TABLE `restaurant_category` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location_code` varchar(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_category
-- ----------------------------
INSERT INTO `restaurant_category` VALUES ('1568275399601392239', '甜品', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1568279585429681103', '苏打', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1568298367465952365', 'Brunch早午餐', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1569869512395692333', '下单前必看', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1578710652581467865', '意式咖啡', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1578710715068922686', '手冲咖啡', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1578711812465842988', 'All Day全天供应', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1578727942468338965', '冰酿', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1579447782571865752', '酒水', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1588180137523421765', '夏季限定', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1588180180862946560', '果茶', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1588180185064710012', '热饮', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1593231144526239701', '咖啡特调', 'xmspw', '0', '2020-12-15 20:01:54', '0');
INSERT INTO `restaurant_category` VALUES ('1594283188415108183', '全日套餐', 'xmspw', '0', '2020-12-15 20:01:54', '0');

-- ----------------------------
-- Table structure for restaurant_category_copy
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_category_copy`;
CREATE TABLE `restaurant_category_copy` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location_code` varchar(12) NOT NULL,
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_category_copy
-- ----------------------------
INSERT INTO `restaurant_category_copy` VALUES ('1', '盖浇面の人', 'xmspw', '0', '2019-08-03 18:57:48', '0');
INSERT INTO `restaurant_category_copy` VALUES ('2', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('3', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('5', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('7', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('10', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('13', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('14', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('15', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');
INSERT INTO `restaurant_category_copy` VALUES ('16', 'fe44', 'xmspw', '0', '2019-08-02 19:56:44', '0');

-- ----------------------------
-- Table structure for restaurant_goods
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods`;
CREATE TABLE `restaurant_goods` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `min_price` decimal(10,2) NOT NULL,
  `location_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `category_id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `stock` int(12) NOT NULL,
  `status` int(2) NOT NULL COMMENT '0 下架 1 上架',
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  `tag` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods
-- ----------------------------

-- ----------------------------
-- Table structure for restaurant_goods_copy
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_copy`;
CREATE TABLE `restaurant_goods_copy` (
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_copy
-- ----------------------------
INSERT INTO `restaurant_goods_copy` VALUES ('1', '鸡蛋盖浇饭', 'http://notwastingqiniu.minidope.com/goods_2019_8_3_16_33_22_0.png', '营养丰富', '34.00', 'xmspw', '2', '54', '1', '2', '2019-08-03 16:34:03', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('2', '炒肉盖浇饭', 'http://notwastingqiniu.minidope.com/goods_2019_8_3_16_23_59_0.png', '营养丰富', '3.00', 'xmspw', '2', '264', '1', '1', '2019-08-03 16:24:10', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('3', '西红柿鸡蛋面', 'http://notwastingqiniu.minidope.com/goods_2019_8_3_16_29_14_0.png', '营养丰富', '33.00', 'xmspw', '1', '44', '1', '1', '2019-08-03 16:29:48', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('4', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '1', '2019-08-03 16:41:10', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('5', '鸡蛋盖浇饭带大家是大家', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('6', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('7', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('8', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('9', '鸡蛋盖浇饭', '/images/A.png', '营养丰富', '20.00', 'xmspw', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('10', '阿文', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_10_7_0.png', '32', '23.00', 'xmspw', '3', '324', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('11', '阿文', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_10_7_0.png', '32', '3.00', 'xmspw', '3', '45', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('12', '他说他', 'http://notwastingqiniu.minidope.com/goods_2019_7_30_18_19_12_0.png', '特舒服', '3.00', 'xmspw', '3', '2443', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('13', 'tet', 'http://notwastingqiniu.minidope.com/goods_2019_8_2_14_55_35_0.png', 'tet', '2.00', 'xmspw', '1', '2147483647', '0', '3', '2019-08-02 14:55:56', '1');
INSERT INTO `restaurant_goods_copy` VALUES ('14', '2', 'http://notwastingqiniu.minidope.com/goods_2019_8_3_10_31_42_0.png', '33', '3.00', 'xmspw', '1', '6784', '1', '3', '2019-08-03 10:32:09', '1');

-- ----------------------------
-- Table structure for restaurant_goods_image
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_image`;
CREATE TABLE `restaurant_goods_image` (
  `productUid` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productBarcode` varchar(255) NOT NULL,
  `imageUrl` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_goods_image
-- ----------------------------

-- ----------------------------
-- Table structure for restaurant_goods_order
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_order`;
CREATE TABLE `restaurant_goods_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `style` int(11) NOT NULL COMMENT '0 堂食 1 外带',
  `yinbao_order_no` varchar(64) CHARACTER SET utf8 NOT NULL,
  `pay_status` int(2) NOT NULL COMMENT '0已支付 1未支付',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `pay_method` varchar(255) CHARACTER SET utf8 NOT NULL,
  `table_number` int(6) NOT NULL COMMENT '桌号',
  `customer_uid` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `restaurant_card_id` int(16) DEFAULT NULL COMMENT '优惠券使用id',
  PRIMARY KEY (`id`),
  KEY `tradeid_openid` (`open_id`,`trade_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69368 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_order
-- ----------------------------
INSERT INTO `restaurant_goods_order` VALUES ('69356', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '437230147526211713', 'Jolly手提杯袋', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/afe0aaf2-acf3-47c7-899b-4d3003f5adb0.jpeg', '\"\"', '12.00', '1', null, 'br_160022653155686109', '2020-09-16 11:22:12', '0', '', '1', '1', 'Wxpay', '666', '', null);
INSERT INTO `restaurant_goods_order` VALUES ('69357', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '825780101831397651', 'Jolly全日双人餐', '套餐包含：意式水牛沙拉、牛油果鸡肉三明治、奶油菌菇培根意面、明太子辣味薯条、夏季青豆汤', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/5c3f2aac-7e94-4572-a938-b794b2349a53.jpg', '\"\"', '168.00', '1', null, 'br_160022653155686109', '2020-09-16 11:22:12', '0', '', '1', '1', 'Wxpay', '666', '', null);
INSERT INTO `restaurant_goods_order` VALUES ('69358', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '437230147526211713', 'Jolly手提杯袋', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/afe0aaf2-acf3-47c7-899b-4d3003f5adb0.jpeg', '\"\"', '12.00', '1', null, 'br_160022666071715038', '2020-09-16 11:24:21', '0', '', '1', '1', 'Wxpay', '666', '', null);
INSERT INTO `restaurant_goods_order` VALUES ('69359', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '825780101831397651', 'Jolly全日双人餐', '套餐包含：意式水牛沙拉、牛油果鸡肉三明治、奶油菌菇培根意面、明太子辣味薯条、夏季青豆汤', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/5c3f2aac-7e94-4572-a938-b794b2349a53.jpg', '\"\"', '168.00', '1', null, 'br_160022666071715038', '2020-09-16 11:24:21', '0', '', '1', '1', 'Wxpay', '666', '', null);
INSERT INTO `restaurant_goods_order` VALUES ('69360', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '1130958241033482240', '蜜桃杯子', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/5003d18e-6511-42bf-938f-7483b03e43d1.jpg', '\"\"', '42.00', '1', null, 'br_160022780509118701y', '2020-09-16 11:43:25', '0', 'dsadsadsada', '0', '1', 'CustomerBalance', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69361', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '449494096439567143', '玫珑蜜瓜草莓戚风切件', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/c3739643-0f10-4442-97a6-ec1e0bfd50e6.jpg', '\"\"', '38.00', '1', null, 'br_160022780509118701y', '2020-09-16 11:43:25', '0', 'dsadsadsada', '0', '1', 'CustomerBalance', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69362', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '298079', '437812332229929900', '68元下午茶套餐', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/fe8fb39c-46a2-42c6-a95f-c03000c427db.png', '{\"奶油切件\":\"奶油切件\",\"饮品\":\"莓果果肉苏打\"}', '68.00', '1', null, 'br_160023982396211306', '2020-09-16 15:03:44', '0', '', '1', '1', 'Wxpay', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69363', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '298083', '770733141849353601', 'Jolly拼盘+咖啡', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/3edff721-6f91-4605-a54d-50cf278739bc.jpg', '{\"饮品\":\"拿铁（冰）\"}', '72.00', '1', null, 'br_160023982396211306', '2020-09-16 15:03:44', '0', '', '1', '1', 'Wxpay', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69364', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '1130958241033482240', '蜜桃杯子', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/5003d18e-6511-42bf-938f-7483b03e43d1.jpg', '\"\"', '42.00', '1', null, 'br_160023982396211306', '2020-09-16 15:03:44', '0', '', '1', '1', 'Wxpay', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69365', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '298079', '437812332229929900', '68元下午茶套餐', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/fe8fb39c-46a2-42c6-a95f-c03000c427db.png', '{\"奶油切件\":\"奶油切件\",\"饮品\":\"莓果果肉苏打\"}', '68.00', '1', null, 'br_160024004384043031y', '2020-09-16 15:07:23', '0', '3232', '0', '1', 'CustomerBalance', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69366', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '298083', '770733141849353601', 'Jolly拼盘+咖啡', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/3edff721-6f91-4605-a54d-50cf278739bc.jpg', '{\"饮品\":\"拿铁（冰）\"}', '72.00', '1', null, 'br_160024004384043031y', '2020-09-16 15:07:23', '0', '3232', '0', '1', 'CustomerBalance', '666', '264384128840125651', null);
INSERT INTO `restaurant_goods_order` VALUES ('69367', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '1130958241033482240', '蜜桃杯子', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/5003d18e-6511-42bf-938f-7483b03e43d1.jpg', '\"\"', '42.00', '1', null, 'br_160024004384043031y', '2020-09-16 15:07:23', '0', '3232', '0', '1', 'CustomerBalance', '666', '264384128840125651', null);

-- ----------------------------
-- Table structure for restaurant_goods_sku
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_sku`;
CREATE TABLE `restaurant_goods_sku` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `stock` int(12) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `goods_id` varchar(64) NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=298706 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_sku
-- ----------------------------
INSERT INTO `restaurant_goods_sku` VALUES ('298640', '99758', '36.00', '557119912618538439', '{\"温度\":\"少冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298641', '99758', '36.00', '557119912618538439', '{\"温度\":\"正常冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298642', '99463', '36.00', '587969064043780805', '{\"温度\":\"冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298643', '99463', '36.00', '587969064043780805', '{\"温度\":\"少冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298644', '99361', '36.00', '26214276675178338', '{\"温度\":\"少冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298645', '99361', '36.00', '26214276675178338', '{\"温度\":\"正常冰\"}', '2020-12-15 20:01:55', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298646', '1773', '30.00', '532150225893652954', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298647', '1773', '30.00', '532150225893652954', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298648', '99740', '36.00', '191907944318180113', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298649', '99740', '36.00', '191907944318180113', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298650', '99874', '38.00', '568340052712528116', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298651', '99874', '38.00', '568340052712528116', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298652', '864', '38.00', '836626783013168023', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298653', '864', '38.00', '836626783013168023', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298654', '898', '38.00', '552225148938128533', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298655', '898', '38.00', '552225148938128533', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298656', '910', '36.00', '44622525384847981', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298657', '926', '38.00', '866405725994896826', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298658', '926', '38.00', '866405725994896826', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298659', '-1', '32.00', '660124314993008345', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298660', '524', '32.00', '303130193713462836', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298661', '964', '38.00', '162812088842714559', '{\"温度\":\"冰\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298662', '964', '38.00', '162812088842714559', '{\"温度\":\"热\"}', '2020-12-15 20:01:56', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298663', '190', '48.00', '547172858489177198', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298664', '190', '48.00', '547172858489177198', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298665', '205', '48.00', '1133853638786027785', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298666', '205', '48.00', '1133853638786027785', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298667', '989', '48.00', '881466773291165393', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298668', '989', '48.00', '881466773291165393', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298669', '206', '48.00', '198602235551275973', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298670', '206', '48.00', '198602235551275973', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298671', '196', '58.00', '774331071748373773', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298672', '196', '58.00', '774331071748373773', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298673', '1200', '58.00', '2411678338638128', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298674', '1200', '58.00', '2411678338638128', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298675', '18', '58.00', '906431205672165718', '{\"温度\":\"热\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298676', '18', '58.00', '906431205672165718', '{\"温度\":\"冰\"}', '2020-12-15 20:01:57', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298677', '96', '168.00', '450281766656918224', '{\"熟度\":\"3分熟\"}', '2020-12-15 20:01:58', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298678', '96', '168.00', '450281766656918224', '{\"熟度\":\"5分熟\"}', '2020-12-15 20:01:58', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298679', '96', '168.00', '450281766656918224', '{\"熟度\":\"7分熟\"}', '2020-12-15 20:01:58', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298680', '96', '168.00', '450281766656918224', '{\"熟度\":\"全熟\"}', '2020-12-15 20:01:58', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298681', '656', '38.00', '249316197843371660', '{\"温度\":\"少冰\"}', '2020-12-15 20:01:59', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298682', '656', '38.00', '249316197843371660', '{\"温度\":\"正常冰\"}', '2020-12-15 20:01:59', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298683', '163', '36.00', '297326456220397946', '{\"温度\":\"少冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298684', '163', '36.00', '297326456220397946', '{\"温度\":\"正常冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298685', '199', '36.00', '1120362965424597600', '{\"温度\":\"少冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298686', '199', '36.00', '1120362965424597600', '{\"温度\":\"正常冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298687', '99608', '36.00', '379546668354496281', '{\"温度\":\"冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298688', '99608', '36.00', '379546668354496281', '{\"温度\":\"少冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298689', '247', '40.00', '701036508767257571', '{\"温度\":\"冰\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298690', '247', '40.00', '701036508767257571', '{\"温度\":\"热\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298691', '286', '38.00', '774087837519763686', '{\"温度\":\"热\"}', '2020-12-15 20:02:00', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298692', '0', '48.00', '668933267518262177', '{\"温度\":\"冰\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298693', '99940', '32.00', '164726519522856576', '{\"温度\":\"冰\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298694', '99965', '38.00', '1048862091337190581', '{\"温度\":\"正常冰\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298695', '959', '68.00', '437812332229929900', '{\"奶油切件\":\"奶油切件\",\"饮品\":\"莓橙鲜果茶\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298696', '959', '68.00', '437812332229929900', '{\"奶油切件\":\"奶油切件\",\"饮品\":\"莓果果肉苏打\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298697', '0', '72.00', '770733141849353601', '{\"饮品\":\"美式咖啡（热）\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298698', '0', '72.00', '770733141849353601', '{\"饮品\":\"美式咖啡（冰）\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298699', '0', '72.00', '770733141849353601', '{\"饮品\":\"拿铁（热）\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298700', '0', '72.00', '770733141849353601', '{\"饮品\":\"拿铁（冰）\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298701', '0', '72.00', '770733141849353601', '{\"饮品\":\"热水牛\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298702', '8', '198.00', '436611300565350024', '{\"4寸可2选1\":\"提拉米苏\",\"JOLLY炸物拼盘\":\"薯饼/香肠/鸡翅/薯格\",\"饮品\":\"莓果苏打（冰）& 纯热茶\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298703', '8', '198.00', '436611300565350024', '{\"4寸可2选1\":\"芝士厚金烧\",\"JOLLY炸物拼盘\":\"薯饼/香肠/鸡翅/薯格\",\"饮品\":\"莓果苏打（冰）& 纯热茶\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298704', '10', '252.00', '490181911190002831', '{\"餐前\":\"香草黄油面包\",\"沙拉\":\"Jolly花环水果沙拉\",\"主食\":\"甜橙鸭胸& 红酱意式土豆球&香煎三文鱼&柠檬鱼子酱\",\"甜品\":\"圣诞主题蛋糕\",\"酒\":\"干白葡萄酒（187ml）\"}', '2020-12-15 20:02:01', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('298705', '10', '252.00', '490181911190002831', '{\"餐前\":\"香草黄油面包\",\"沙拉\":\"Jolly花环水果沙拉\",\"主食\":\"甜橙鸭胸& 红酱意式土豆球&香煎三文鱼&柠檬鱼子酱\",\"甜品\":\"圣诞主题蛋糕\",\"酒\":\"干红葡萄酒（187ml）\"}', '2020-12-15 20:02:01', '0');

-- ----------------------------
-- Table structure for restaurant_search_history
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_search_history`;
CREATE TABLE `restaurant_search_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) NOT NULL,
  `key` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_search_history
-- ----------------------------

-- ----------------------------
-- Table structure for restaurant_subscribe_message
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_subscribe_message`;
CREATE TABLE `restaurant_subscribe_message` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `template_id` varchar(128) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_subscribe_message
-- ----------------------------

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
  `phone` varchar(16) DEFAULT NULL,
  `get_phone_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41445 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------
INSERT INTO `restaurant_user` VALUES ('41444', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '', null, null, '2020-09-16 11:18:05', 'GSruXdNDHrGprwb90QRS4Q==', '2020-12-15 20:23:02', null, '0', '13055257913', '2020-09-16 11:41:20');

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `best_review_detail_id` int(11) NOT NULL,
  `review_detail_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO `review` VALUES ('1', null, '1', null);
INSERT INTO `review` VALUES ('2', null, '5', null);

-- ----------------------------
-- Table structure for review_detail
-- ----------------------------
DROP TABLE IF EXISTS `review_detail`;
CREATE TABLE `review_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `image` text NOT NULL COMMENT '"image":[ ]',
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `param_id_1` int(11) NOT NULL,
  `param_id_2` int(11) NOT NULL,
  `param_1` varchar(30) NOT NULL,
  `param_2` varchar(30) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of review_detail
-- ----------------------------
INSERT INTO `review_detail` VALUES ('3', '%E5%9C%B0%E5%AF%B9%E5%9C%B0%E5%AF%BC%E5%BC%B9%F0%9F%98%80', '[\"http://onedayqiniu.minidope.com/review_2019_11_8_14_10_41_0.jpg\"]', '20', '2019-11-08 14:10:44', '797', '800', '红色', '小', '146');
INSERT INTO `review_detail` VALUES ('4', '%E5%92%B3%E5%92%B3%E5%92%B3%E5%8F%AF', '[]', '20', '2019-11-08 14:12:38', '798', '800', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('5', '%E6%88%91%E4%BB%AC', '[\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_0.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_1.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_2.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_3.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_4.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_5.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_6.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_7.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_8_14_16_3_8.jpg\"]', '20', '2019-11-08 14:16:08', '798', '800', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('6', '%E7%89%9B%E6%89%B9%3A-D%F0%9F%98%83%20', '[\"http://onedayqiniu.minidope.com/review_2019_11_9_17_36_41_0.jpg\"]', '36', '2019-11-09 17:36:44', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('7', '%E7%89%9B%E6%89%B9%3A-D%F0%9F%98%83%20', '[\"http://onedayqiniu.minidope.com/review_2019_11_9_17_36_41_0.jpg\"]', '36', '2019-11-09 17:36:45', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('8', '111', '[]', '36', '2019-11-09 17:39:23', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('9', '111', '[]', '36', '2019-11-09 17:39:23', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('10', '111', '[]', '36', '2019-11-09 17:39:23', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('11', '111', '[]', '36', '2019-11-09 17:39:23', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('12', '111', '[]', '36', '2019-11-09 17:39:24', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('13', '2qd', '[]', '36', '2019-11-09 17:39:57', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('14', '2qd', '[]', '36', '2019-11-09 17:39:57', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('15', '2qd', '[]', '36', '2019-11-09 17:39:57', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('16', '2qd', '[]', '36', '2019-11-09 17:39:58', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('17', '%E9%A2%9D2', '[]', '36', '2019-11-09 17:40:52', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('18', '%E9%A2%9D2', '[]', '36', '2019-11-09 17:40:52', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('19', '%E9%A2%9D2', '[]', '36', '2019-11-09 17:40:53', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('20', 'uuuu', '[]', '36', '2019-11-09 17:42:48', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('21', 'uuuu', '[]', '36', '2019-11-09 17:42:49', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('22', 'uuuu', '[]', '36', '2019-11-09 17:42:49', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('23', '%20%20%E5%8C%97', '[]', '36', '2019-11-09 17:43:44', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('24', '11', '[]', '36', '2019-11-09 17:47:09', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('25', '1', '[]', '36', '2019-11-09 17:47:47', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('26', 'e2', '[]', '36', '2019-11-09 17:50:16', '802', '805', '绿色', '小', '146');
INSERT INTO `review_detail` VALUES ('27', '%E7%9A%84%E8%AF%9D%E8%AF%95%E8%AF%95%E5%90%A7', '[\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_0.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_1.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_2.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_3.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_4.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_5.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_6.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_7.jpg\",\"http://onedayqiniu.minidope.com/review_2019_11_9_18_56_27_8.jpg\"]', '20', '2019-11-09 18:56:30', '802', '805', '绿色', '小', '146');

-- ----------------------------
-- Table structure for shop_queue
-- ----------------------------
DROP TABLE IF EXISTS `shop_queue`;
CREATE TABLE `shop_queue` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_queue
-- ----------------------------
INSERT INTO `shop_queue` VALUES ('1', 'g18me6et1601359486393', '2020-09-29 14:04:46', '2020-09-29 14:04:46');
INSERT INTO `shop_queue` VALUES ('2', '43wlpfj41601360068536', '2020-09-29 14:14:28', '2020-09-29 14:14:28');
INSERT INTO `shop_queue` VALUES ('3', '9v78xn5r1601360099303', '2020-09-29 14:14:59', '2020-09-29 14:17:46');
INSERT INTO `shop_queue` VALUES ('4', '6pz9pdgs1601360290528', '2020-09-29 14:18:10', '2020-09-29 14:18:10');
INSERT INTO `shop_queue` VALUES ('5', 'h7ucps5a1601360319438', '2020-09-29 14:18:39', '2020-09-29 14:18:39');
INSERT INTO `shop_queue` VALUES ('6', 'dwtb72el1601360334388', '2020-09-29 14:18:54', '2020-09-29 14:18:54');
INSERT INTO `shop_queue` VALUES ('7', 'mb59060a1601360360172', '2020-09-29 14:19:20', '2020-09-29 14:19:20');
INSERT INTO `shop_queue` VALUES ('8', '55zlf7nw1601360416788', '2020-09-29 14:20:16', '2020-09-29 14:20:16');
INSERT INTO `shop_queue` VALUES ('9', 'lf9fwpnw1601360458001', '2020-09-29 14:20:58', '2020-09-29 14:20:58');
INSERT INTO `shop_queue` VALUES ('10', 'm5tcidar1601360478532', '2020-09-29 14:21:18', '2020-09-29 14:21:18');
INSERT INTO `shop_queue` VALUES ('11', '6t5jcqhb1601360519480', '2020-09-29 14:21:59', '2020-09-29 14:21:59');
INSERT INTO `shop_queue` VALUES ('12', '44cj4e131601360651682', '2020-09-29 14:24:11', '2020-09-29 14:24:11');
INSERT INTO `shop_queue` VALUES ('13', 'x0l55ux41601360791785', '2020-09-29 14:26:31', '2020-09-29 14:26:31');

-- ----------------------------
-- Table structure for specification
-- ----------------------------
DROP TABLE IF EXISTS `specification`;
CREATE TABLE `specification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of specification
-- ----------------------------
INSERT INTO `specification` VALUES ('1', '颜色', '2019-06-18 11:03:42', '1');
INSERT INTO `specification` VALUES ('2', '尺寸', '2019-06-18 11:03:50', '1');
INSERT INTO `specification` VALUES ('3', '香型', '2019-09-21 14:59:18', '9');
INSERT INTO `specification` VALUES ('4', '型号', '2019-09-21 15:00:40', '9');
INSERT INTO `specification` VALUES ('5', '期刊', '2019-10-20 12:14:47', '17');
INSERT INTO `specification` VALUES ('6', '类型', '2020-04-07 15:05:51', '9');
INSERT INTO `specification` VALUES ('7', '30ml', '2020-06-08 10:52:54', '17');
INSERT INTO `specification` VALUES ('8', '30ml', '2020-06-08 10:53:00', '17');
INSERT INTO `specification` VALUES ('9', '30ml', '2020-06-08 10:53:20', '17');

-- ----------------------------
-- Table structure for specification_param
-- ----------------------------
DROP TABLE IF EXISTS `specification_param`;
CREATE TABLE `specification_param` (
  `id` int(64) NOT NULL AUTO_INCREMENT,
  `specification_id` int(64) NOT NULL,
  `param` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of specification_param
-- ----------------------------
INSERT INTO `specification_param` VALUES ('1', '1', '红色', '2019-05-07 14:19:58', '4');
INSERT INTO `specification_param` VALUES ('2', '1', '绿色', '2019-05-07 14:20:05', '4');
INSERT INTO `specification_param` VALUES ('3', '1', '蓝色', '2019-05-07 14:20:08', '4');
INSERT INTO `specification_param` VALUES ('4', '1', '黑色', '2019-05-07 14:20:22', '4');
INSERT INTO `specification_param` VALUES ('5', '1', '灰色', '2019-05-07 14:20:23', '4');
INSERT INTO `specification_param` VALUES ('6', '2', '大', '2019-05-07 14:20:43', '4');
INSERT INTO `specification_param` VALUES ('7', '2', '小', '2019-05-07 14:20:39', '4');
INSERT INTO `specification_param` VALUES ('8', '2', '中', '2019-05-07 14:20:55', '4');

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
  `user_name` varchar(64) NOT NULL,
  `open_id` varchar(64) NOT NULL,
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 normal, 1 forbid',
  `avatar` varchar(255) NOT NULL,
  `union_id` varchar(64) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '0 custom, 1 admin, 2 god',
  `address_id` int(11) DEFAULT NULL,
  `integral` int(64) NOT NULL DEFAULT '0',
  `session_key` varchar(255) NOT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `get_phone_time` timestamp NULL DEFAULT NULL,
  `customerUid` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('%E3%80%82%E3%80%82%E3%80%82', 'oHjV85X-ld1eKTRDPd3HjMW2_CxY', '2020-09-29 14:04:46', '2020-09-29 14:26:32', '1', '0', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicggrszbOFRE5siciaIFjUAYWiacpClj4saVxfFuSp0hibQTOG2vPN3zAAqHc2RHlqcTibQGg1SL9lz7w/132', '', '0', null, '0', '9eqCvz5drKmZ7lJCoO3jDA==', null, null, null);

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

-- ----------------------------
-- Table structure for yinbao_order
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_order`;
CREATE TABLE `yinbao_order` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `cashier` varchar(1000) DEFAULT NULL,
  `cashierUid` varchar(255) DEFAULT NULL,
  `customerUid` varchar(255) DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `discount` int(6) DEFAULT NULL,
  `invalid` int(6) DEFAULT NULL,
  `items` varchar(5000) DEFAULT NULL,
  `orderNo` varchar(255) DEFAULT NULL,
  `payments` varchar(1000) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `rounding` int(12) DEFAULT NULL,
  `serviceFee` int(12) DEFAULT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `ticketType` varchar(255) DEFAULT NULL,
  `totalAmount` int(12) DEFAULT NULL,
  `totalProfit` int(12) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `webOrderNo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_order
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_order_sellprice
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_order_sellprice`;
CREATE TABLE `yinbao_order_sellprice` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `total_price` decimal(10,2) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_order_sellprice
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_order_sellprice_today
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_order_sellprice_today`;
CREATE TABLE `yinbao_order_sellprice_today` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `total_price` decimal(10,2) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_order_sellprice_today
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_order_today
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_order_today`;
CREATE TABLE `yinbao_order_today` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `cashier` varchar(1000) DEFAULT NULL,
  `cashierUid` varchar(255) DEFAULT NULL,
  `customerUid` varchar(255) DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `discount` int(6) DEFAULT NULL,
  `invalid` int(6) DEFAULT NULL,
  `items` varchar(5000) DEFAULT NULL,
  `orderNo` varchar(255) DEFAULT NULL,
  `payments` varchar(1000) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `rounding` int(12) DEFAULT NULL,
  `serviceFee` int(12) DEFAULT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `ticketType` varchar(255) DEFAULT NULL,
  `totalAmount` int(12) DEFAULT NULL,
  `totalProfit` int(12) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `webOrderNo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_order_today
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_refund
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_refund`;
CREATE TABLE `yinbao_refund` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `total_refund` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_refund
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_sort
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_sort`;
CREATE TABLE `yinbao_sort` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(6) NOT NULL,
  `type` varchar(10) NOT NULL COMMENT '分类 || 商品',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_sort
-- ----------------------------

-- ----------------------------
-- Table structure for yinbao_update_time
-- ----------------------------
DROP TABLE IF EXISTS `yinbao_update_time`;
CREATE TABLE `yinbao_update_time` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `start_update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_update_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_update_time
-- ----------------------------
INSERT INTO `yinbao_update_time` VALUES ('1', '2019-09-13 00:00:00', '2038-01-01 00:00:00');
