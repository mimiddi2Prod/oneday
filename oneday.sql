/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-09-13 16:24:28
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2019-09-12 17:45:11', '0', null, 'a0d4ab3d-e497-4f56-9cf2-c873b6556707', '2019-09-13 05:45:11', null);
INSERT INTO `admin` VALUES ('2', 'test', 'test', 'xiaoh', '2019-09-11 18:50:36', '2019-09-12 11:44:43', '1', null, '89a132d6-dc2c-4de4-bf2f-00bf93a1a077', '2019-09-12 23:44:43', '[[31],[32]]');
INSERT INTO `admin` VALUES ('3', 'test11', 'test11', null, '2019-09-12 15:07:48', '2019-09-12 15:12:39', '2', null, '82dd1dbe-6af1-4682-8048-dbb734fb5674', '2019-09-13 03:12:39', null);

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
INSERT INTO `admin_menu` VALUES ('19', '银豹收银', '2019-09-11 16:08:05', '../../images/logo.png', '0', '0', 'yinbao', 'shop');

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
  PRIMARY KEY (`id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8;

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
  `after_sale_state` int(1) NOT NULL DEFAULT '0' COMMENT '0 不在售后状态 1 退款中 2 退货退款中 3 换货中 4 已退款 5 已退货退款 6 已换货',
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
  `stock` int(12) DEFAULT NULL,
  `status` int(2) NOT NULL COMMENT '0 下架 1 上架',
  `sort` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL
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
-- Table structure for restaurant_goods_order
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_goods_order`;
CREATE TABLE `restaurant_goods_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(32) CHARACTER SET utf8 NOT NULL,
  `goods_sku_id` int(12) DEFAULT NULL,
  `goods_id` varchar(64) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `param` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `style` int(11) NOT NULL COMMENT '0 堂食 1 外带',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_order
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_sku
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of review
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of review_detail
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of specification
-- ----------------------------
INSERT INTO `specification` VALUES ('1', '颜色', '2019-06-18 11:03:42', '1');
INSERT INTO `specification` VALUES ('2', '尺寸', '2019-06-18 11:03:50', '1');

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
INSERT INTO `user` VALUES ('%E3%80%82%E3%80%82%E3%80%82', 'oHjV85X-ld1eKTRDPd3HjMW2_CxY', '2019-09-05 17:03:26', '2019-09-11 19:27:26', '1', '0', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicggrszbOFRE5siciaIFjUAYWiacpClj4saVxfFuSp0hibQTOG2vPN3zAALibxOyuEibhAxntqS8uMUekQ/132', '', '0', null, '0', 'fBXfumhjmslgTe/WCqRR0g==', '13055257913', '2019-09-05 17:04:47', '588697366193191383');

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
  `items` varchar(2000) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_order_sellprice
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yinbao_refund
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
INSERT INTO `yinbao_update_time` VALUES ('1', '2019-08-01 00:00:00', '2019-09-12 00:00:00');
