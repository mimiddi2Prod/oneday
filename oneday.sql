/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-08-28 15:05:11
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '张三', '020-81167888', '广东省', '广州市', '海珠区', '新港中路397号', '14', '2019-08-23 17:14:41');
INSERT INTO `address` VALUES ('2', '张三', '020-81167888', '广东省', '广州市', '海珠区', '新港中路397号', '1', '2019-08-27 11:47:47');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2019-08-28 10:37:14', '0', null, 'f371f1d4-72ea-4952-8535-cf7df74278eb', '2019-08-28 22:37:14');

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
INSERT INTO `admin_menu` VALUES ('18', '子账号管理', '2019-08-14 12:01:37', '../../images/logo.png', '17', '0', 'account', 'shop');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advertisement
-- ----------------------------
INSERT INTO `advertisement` VALUES ('3', '1', '../goods/goods?id=23', 'http://notwastingqiniu.minidope.com/ad_2019_8_16_18_44_2_0.jpg', '22', '2', '2019-08-16 18:44:12', '1', '0');
INSERT INTO `advertisement` VALUES ('4', '0', '../goods/goods?id=23', 'http://notwastingqiniu.minidope.com/ad_2019_8_16_18_45_24_0.png', '2', '2', '2019-08-16 18:45:34', '1', '0');

-- ----------------------------
-- Table structure for aftersale
-- ----------------------------
DROP TABLE IF EXISTS `aftersale`;
CREATE TABLE `aftersale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `refund` decimal(10,2) DEFAULT NULL COMMENT '退款金额',
  `reason` text NOT NULL COMMENT '退款原因',
  `description` text COMMENT '售后说明',
  `image` text COMMENT '售后凭证',
  `address` text COMMENT '仅换货需要',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number` int(11) NOT NULL DEFAULT '1',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 正在申请售后 1 用户取消申请 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aftersale
-- ----------------------------
INSERT INTO `aftersale` VALUES ('1', '2', '0.10', '退运费', '', '[]', '', '2019-08-24 11:38:12', '1', '0');
INSERT INTO `aftersale` VALUES ('2', '1', '27.00', '退运费', '', '[]', '', '2019-08-24 14:36:43', '1', '0');
INSERT INTO `aftersale` VALUES ('3', '10', '11.00', '退运费', '', '[]', '', '2019-08-27 18:31:17', '1', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------
INSERT INTO `brand` VALUES ('8', 'http://notwastingqiniu.minidope.com/brand_2019_8_15_17_27_54_0.jpg', '/pages/brandDetail/brandDetail', '喵！', '122.00', '0', '2019-08-15 17:31:32', '0', '1', '喵喵喵？？？');

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('31', '分类1', 'http://notwastingqiniu.minidope.com/category_2019_8_15_17_32_8_0.jpg', '', '2019-08-15 17:32:09', '0', '0', '0', '1', '1', '分类哦');
INSERT INTO `category` VALUES ('32', '分类1子类1', 'http://notwastingqiniu.minidope.com/category_2019_8_15_17_32_30_0.png', '/pages/category/category', '2019-08-15 17:32:31', '0', '31', '1', '0', '2', '');
INSERT INTO `category` VALUES ('33', '分类1子类2', 'http://notwastingqiniu.minidope.com/category_2019_8_15_17_32_48_0.jpg', '/pages/category/category', '2019-08-15 17:32:49', '0', '31', '1', '1', '2', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('23', '第一商品', '[\"http://notwastingqiniu.minidope.com/goods_2019_8_15_17_42_7_0.png\",\"http://notwastingqiniu.minidope.com/goods_2019_8_15_17_42_7_1.jpg\"]', '../goods/goods', '0', '16.00', '啊啊啊1!!!!', '1', '0', '0', '1', '2', '0', '32', '0', '0', '2019-08-15 17:43:07', '8', '0', '[\"http://notwastingqiniu.minidope.com/goodsInfo_2019_8_15_17_42_46_0.png\",\"http://notwastingqiniu.minidope.com/goodsInfo_2019_8_15_17_42_46_1.jpg\"]', '0.00', '0');
INSERT INTO `item` VALUES ('24', 's s  s ', '[\"http://notwastingqiniu.minidope.com/goods_2019_8_16_18_50_20_0.jpg\"]', '../goods/goods', '0', '2.00', 's s s s ', '0', '0', '0', '1', '2', '0', '32', '0', '0', '2019-08-16 18:53:44', '8', '0', '[\"http://notwastingqiniu.minidope.com/goodsInfo_2019_8_16_18_50_58_0.jpg\"]', '0.00', '0');
INSERT INTO `item` VALUES ('25', '1', '[\"http://notwastingqiniu.minidope.com/goods_2019_8_16_18_56_28_0.png\"]', '../goods/goods', '0', '2.00', '1', '0', '0', '0', '1', '2', '0', '32', '0', '0', '2019-08-16 18:56:56', '8', '0', '[\"http://notwastingqiniu.minidope.com/goodsInfo_2019_8_16_18_56_54_0.jpg\"]', '0.00', '0');
INSERT INTO `item` VALUES ('26', '1', '[\"http://notwastingqiniu.minidope.com/goods_2019_8_16_18_58_16_0.jpg\"]', '../goods/goods', '0', '3.00', '2', '0', '0', '0', '1', '2', '0', '32', '0', '0', '2019-08-16 18:58:46', '8', '0', '[\"http://notwastingqiniu.minidope.com/goodsInfo_2019_8_16_18_58_44_0.jpg\"]', '0.00', '0');
INSERT INTO `item` VALUES ('27', 'test', '[\"http://onedayqiniu.minidope.com/goods_2019_8_27_11_43_24_0.png\",\"http://onedayqiniu.minidope.com/goods_2019_8_27_11_43_29_0.jpg\"]', '../goods/goods', '0', '21.00', 'testbbbbbbbbbbbbbbb', '0', '0', '0', '1', '2', '0', '33', '0', '0', '2019-08-27 11:44:48', '8', '0', '[\"http://onedayqiniu.minidope.com/goodsInfo_2019_8_27_11_44_37_0.png\",\"http://onedayqiniu.minidope.com/goodsInfo_2019_8_27_11_44_42_0.jpg\"]', '0.00', '0');
INSERT INTO `item` VALUES ('28', '11', '[\"http://onedayqiniu.minidope.com/goods_2019_8_27_14_21_43_0.jpg\"]', '../goods/goods', '0', '2.00', '22', '1', '0', '0', '1', '2', '0', '32', '0', '0', '2019-08-27 14:22:41', '8', '0', '[\"http://onedayqiniu.minidope.com/goodsInfo_2019_8_27_14_22_37_0.jpg\"]', '0.00', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_param
-- ----------------------------
INSERT INTO `item_param` VALUES ('176', '23', '1', '红色', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_15_17_43_2_0.jpg', '0', '2019-08-15 17:43:07');
INSERT INTO `item_param` VALUES ('177', '23', '1', '绿色', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_15_17_43_5_0.png', '0', '2019-08-15 17:43:07');
INSERT INTO `item_param` VALUES ('178', '23', '2', '大', '', '0', '2019-08-15 17:43:07');
INSERT INTO `item_param` VALUES ('179', '23', '2', '小', '', '0', '2019-08-15 17:43:07');
INSERT INTO `item_param` VALUES ('180', '24', '1', '黑色', '', '0', '2019-08-16 18:53:44');
INSERT INTO `item_param` VALUES ('181', '24', '2', '小', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_16_18_53_30_0.jpg', '0', '2019-08-16 18:53:44');
INSERT INTO `item_param` VALUES ('182', '25', '1', '红色', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_16_18_56_48_0.jpg', '0', '2019-08-16 18:56:56');
INSERT INTO `item_param` VALUES ('183', '25', '2', '大', '', '0', '2019-08-16 18:56:56');
INSERT INTO `item_param` VALUES ('184', '26', '1', '绿色', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_16_18_58_39_0.jpg', '0', '2019-08-16 18:58:46');
INSERT INTO `item_param` VALUES ('185', '26', '2', '小', '', '0', '2019-08-16 18:58:46');
INSERT INTO `item_param` VALUES ('186', '27', '1', '绿色', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_11_44_18_0.jpg', '0', '2019-08-27 11:44:48');
INSERT INTO `item_param` VALUES ('187', '27', '1', '蓝色', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_11_44_21_0.png', '0', '2019-08-27 11:44:48');
INSERT INTO `item_param` VALUES ('188', '27', '2', '小', '', '0', '2019-08-27 11:44:48');
INSERT INTO `item_param` VALUES ('189', '27', '2', '中', '', '0', '2019-08-27 11:44:48');
INSERT INTO `item_param` VALUES ('190', '28', '1', '黑色', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '0', '2019-08-27 14:22:41');
INSERT INTO `item_param` VALUES ('191', '28', '1', '灰色', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_9_0.jpg', '0', '2019-08-27 14:22:41');
INSERT INTO `item_param` VALUES ('192', '28', '2', '中', '', '0', '2019-08-27 14:22:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_price
-- ----------------------------
INSERT INTO `item_price` VALUES ('167', '176', '178', '121', '16.00', '23', '2019-08-21 14:16:34', '0');
INSERT INTO `item_price` VALUES ('168', '177', '179', '21', '27.00', '23', '2019-08-24 11:00:05', '0');
INSERT INTO `item_price` VALUES ('169', '176', '179', '23', '36.00', '23', '2019-08-21 14:16:34', '0');
INSERT INTO `item_price` VALUES ('170', '177', '178', '233', '36.00', '23', '2019-08-21 14:16:34', '0');
INSERT INTO `item_price` VALUES ('171', '180', '181', '1', '2.00', '24', '2019-08-21 14:16:34', '0');
INSERT INTO `item_price` VALUES ('172', '182', '183', '0', '0.10', '25', '2019-08-24 11:34:37', '0');
INSERT INTO `item_price` VALUES ('173', '184', '185', '1', '3.00', '26', '2019-08-27 18:47:09', '0');
INSERT INTO `item_price` VALUES ('174', '186', '189', '2', '21.00', '27', '2019-08-27 11:44:48', '0');
INSERT INTO `item_price` VALUES ('175', '186', '188', '2', '22.00', '27', '2019-08-27 11:44:48', '0');
INSERT INTO `item_price` VALUES ('176', '187', '189', '222', '23.00', '27', '2019-08-27 11:44:48', '0');
INSERT INTO `item_price` VALUES ('177', '187', '188', '22', '24.00', '27', '2019-08-27 11:44:48', '0');
INSERT INTO `item_price` VALUES ('178', '191', '192', '0', '2.00', '28', '2019-08-27 17:13:36', '0');
INSERT INTO `item_price` VALUES ('179', '190', '192', '208', '11.00', '28', '2019-08-27 18:01:52', '0');

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
  `state` int(2) NOT NULL DEFAULT '0' COMMENT '-1 订单关闭（取消订单） 0 未支付（待支付） 1 已支付（待发货） 2已发货（待收货）3已收货（买家确认收货/物流送达后七天后自动确认收货 -- 待评价） 4订单完成（评价完成） 5售后（5退款、6退款退货、7换货）8售后完成（需要人工确认，5状态只要买家不满意，需继续跟进处理 8退款完成 9退款退货完成 10换货完成）',
  `after_sale_state` int(1) NOT NULL DEFAULT '0' COMMENT '0 不在售后状态 1 退款中 2 退货退款中 3 换货中 4 已退款 5 已退货退款 6 已换货',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address_text` varchar(255) NOT NULL,
  `tel` varchar(16) NOT NULL,
  `receiver` varchar(128) NOT NULL,
  `single_price` decimal(10,2) NOT NULL,
  `postage` decimal(10,2) NOT NULL,
  `tradeId` varchar(32) NOT NULL COMMENT '订单号',
  `logistics_code` varchar(255) DEFAULT NULL COMMENT '物流查询',
  `have_cost_integral` int(2) NOT NULL DEFAULT '0' COMMENT '0: 不花费 1 花费',
  `integral_price` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('6', '1', '28', '', '190', '192', '黑色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '1', '2019-08-27 16:10:54', '-1', '0', '2019-08-27 16:10:54', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '11.00', '0.00', 'nw_156689345087512405', null, '1', '22');
INSERT INTO `order` VALUES ('7', '1', '28', '', '191', '192', '灰色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_9_0.jpg', '1', '2019-08-27 17:10:26', '1', '0', '2019-08-27 17:10:26', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '2.00', '0.00', 'nw_156689702295569185', null, '1', '22');
INSERT INTO `order` VALUES ('8', '1', '28', '', '191', '192', '灰色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_9_0.jpg', '1', '2019-08-27 17:13:23', '1', '0', '2019-08-27 17:13:23', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '2.00', '0.00', 'nw_156689719941097961', null, '1', '22');
INSERT INTO `order` VALUES ('9', '1', '28', '', '190', '192', '黑色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '1', '2019-08-27 17:19:40', '1', '0', '2019-08-27 17:19:40', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '11.00', '0.00', 'nw_156689757688298744', null, '1', '22');
INSERT INTO `order` VALUES ('10', '1', '28', '', '190', '192', '黑色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '1', '2019-08-27 17:22:00', '3', '4', '2019-08-27 17:22:00', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '11.00', '0.00', 'nw_156689772683737707yb', '9895999672102', '1', '22');
INSERT INTO `order` VALUES ('11', '1', '28', '', '190', '192', '黑色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '1', '2019-08-27 18:01:20', '1', '0', '2019-08-27 18:01:20', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '11.00', '0.00', 'nw_156690008057287792yb', null, '0', '0');
INSERT INTO `order` VALUES ('12', '1', '28', '', '190', '192', '黑色', '中', 'http://onedayqiniu.minidope.com/goods_param_2019_8_27_14_22_5_0.png', '1', '2019-08-27 18:01:39', '1', '0', '2019-08-27 18:01:39', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '11.00', '0.00', 'nw_156690010604256449yb', null, '0', '0');
INSERT INTO `order` VALUES ('13', '1', '26', '', '184', '185', '绿色', '小', 'http://notwastingqiniu.minidope.com/goods_param_2019_8_16_18_58_39_0.jpg', '1', '2019-08-27 18:47:00', '1', '0', '2019-08-27 18:47:00', '广东省广州市海珠区新港中路397号', '020-81167888', '张三', '3.00', '0.00', 'nw_156690282017648095', null, '0', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of paid
-- ----------------------------
INSERT INTO `paid` VALUES ('7', '178', '1', '2019-08-27 17:11:48', '1', '1', '7');
INSERT INTO `paid` VALUES ('8', '178', '1', '2019-08-27 17:13:31', '1', '1', '8');
INSERT INTO `paid` VALUES ('9', '179', '1', '2019-08-27 17:19:46', '1', '1', '9');
INSERT INTO `paid` VALUES ('10', '179', '1', '2019-08-27 17:22:06', '1', '1', '10');
INSERT INTO `paid` VALUES ('11', '179', '1', '2019-08-27 18:01:20', '1', '1', '11');
INSERT INTO `paid` VALUES ('12', '179', '1', '2019-08-27 18:01:46', '1', '1', '12');
INSERT INTO `paid` VALUES ('13', '173', '1', '2019-08-27 18:47:00', '1', '1', '13');

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
INSERT INTO `restaurant_category` VALUES ('1565231722645370017', '测试分类', 'xmspw', '0', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_category` VALUES ('1565253909197998219', '仍然', 'xmspw', '0', '2019-08-14 10:31:07', '0');

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
INSERT INTO `restaurant_goods` VALUES ('244706959019475619', '测试商品', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '', '10.00', 'xmspw', '1565231722645370017', '0', '1', '0', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods` VALUES ('1024894850209216025', '柠檬苏打', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '111', '32.00', 'xmspw', '1565231722645370017', '0', '1', '0', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods` VALUES ('362325027959145552', '测试1', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '', '11.00', 'xmspw', '1565231722645370017', '0', '1', '0', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods` VALUES ('323862728586653407', '测试2', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/dd5be4a9-ef55-44e0-86a0-982b52dba5b0.jpg', '', '12.00', 'xmspw', '1565231722645370017', '0', '1', '0', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods` VALUES ('124760793601156781', '测试3', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/89ca8897-62ba-476b-afbb-8439a99c1fc5.jpg', '', '14.00', 'xmspw', '1565253909197998219', '0', '1', '0', '2019-08-14 10:31:07', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_order
-- ----------------------------
INSERT INTO `restaurant_goods_order` VALUES ('1', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '162', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('2', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '165', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '10.00', '2', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('3', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '166', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"常温\"}', '10.00', '1', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('4', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '167', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"100°C\"}', '10.00', '2', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('5', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '170', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '32.00', '1', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('6', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '171', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"常温\"}', '32.00', '2', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('7', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '169', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"常温\"}', '32.00', '1', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('8', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '1', null, '2019-08-14 10:20:50', '2019-08-14 10:20:54', '1');
INSERT INTO `restaurant_goods_order` VALUES ('9', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '178', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\",\"大小\":\"中杯\"}', '32.00', '2', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('10', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '179', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\",\"大小\":\"大杯\"}', '32.00', '2', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('11', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '181', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"常温\",\"大小\":\"大杯\"}', '32.00', '1', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('12', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '172', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('13', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '175', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '10.00', '2', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('14', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '1', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('15', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '323862728586653407', '测试2', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/dd5be4a9-ef55-44e0-86a0-982b52dba5b0.jpg', '\"\"', '12.00', '2', null, '2019-08-14 10:24:40', '2019-08-14 10:24:41', '0');
INSERT INTO `restaurant_goods_order` VALUES ('16', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '196', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-20 10:29:26', '2019-08-20 10:29:30', '0');
INSERT INTO `restaurant_goods_order` VALUES ('17', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '198', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"100°C\"}', '10.00', '1', null, '2019-08-20 10:29:26', '2019-08-20 10:29:30', '0');
INSERT INTO `restaurant_goods_order` VALUES ('18', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '2', null, '2019-08-20 10:29:26', '2019-08-20 10:29:30', '0');
INSERT INTO `restaurant_goods_order` VALUES ('19', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '323862728586653407', '测试2', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/dd5be4a9-ef55-44e0-86a0-982b52dba5b0.jpg', '\"\"', '12.00', '1', null, '2019-08-20 10:29:26', '2019-08-20 10:29:30', '0');
INSERT INTO `restaurant_goods_order` VALUES ('20', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '196', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-20 10:31:21', '2019-08-20 10:31:22', '0');
INSERT INTO `restaurant_goods_order` VALUES ('21', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '202', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '32.00', '1', null, '2019-08-20 10:31:21', '2019-08-20 10:31:22', '0');
INSERT INTO `restaurant_goods_order` VALUES ('22', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '2', null, '2019-08-20 10:31:21', '2019-08-20 10:31:22', '0');
INSERT INTO `restaurant_goods_order` VALUES ('23', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '323862728586653407', '测试2', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/dd5be4a9-ef55-44e0-86a0-982b52dba5b0.jpg', '\"\"', '12.00', '1', null, '2019-08-20 10:31:21', '2019-08-20 10:31:22', '0');
INSERT INTO `restaurant_goods_order` VALUES ('24', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '196', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-20 10:42:04', '2019-08-20 10:42:05', '1');
INSERT INTO `restaurant_goods_order` VALUES ('25', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '1', null, '2019-08-20 10:42:04', '2019-08-20 10:42:05', '1');
INSERT INTO `restaurant_goods_order` VALUES ('26', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '202', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '32.00', '1', null, '2019-08-20 10:42:34', '2019-08-20 10:42:35', '1');
INSERT INTO `restaurant_goods_order` VALUES ('27', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '1', null, '2019-08-20 10:42:34', '2019-08-20 10:42:35', '1');
INSERT INTO `restaurant_goods_order` VALUES ('28', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '323862728586653407', '测试2', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/dd5be4a9-ef55-44e0-86a0-982b52dba5b0.jpg', '\"\"', '12.00', '1', null, '2019-08-20 10:42:34', '2019-08-20 10:42:35', '1');
INSERT INTO `restaurant_goods_order` VALUES ('29', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '196', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-20 10:43:41', '2019-08-20 10:43:42', '1');
INSERT INTO `restaurant_goods_order` VALUES ('30', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '199', '244706959019475619', '测试商品', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/2ade3d11-f220-4207-b9dc-9fe52c5b8374.jpg', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '10.00', '1', null, '2019-08-20 10:43:41', '2019-08-20 10:43:42', '1');
INSERT INTO `restaurant_goods_order` VALUES ('31', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '202', '1024894850209216025', '柠檬苏打', '111', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/7a2f30eb-cd02-4640-8f9c-815d65cfec05.jpg', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '32.00', '1', null, '2019-08-20 10:43:41', '2019-08-20 10:43:42', '1');
INSERT INTO `restaurant_goods_order` VALUES ('32', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '0', '362325027959145552', '测试1', '', 'http://pospalstoreimg.area8.pospal.cn:80/productImages/3286726/895a5f9b-93b0-4926-bf20-9df402ed83c4.jpg', '\"\"', '11.00', '2', null, '2019-08-20 10:43:41', '2019-08-20 10:43:42', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of restaurant_goods_sku
-- ----------------------------
INSERT INTO `restaurant_goods_sku` VALUES ('196', '0', '10.00', '244706959019475619', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('197', '0', '10.00', '244706959019475619', '{\"甜度\":\"无糖\",\"温度\":\"常温\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('198', '0', '10.00', '244706959019475619', '{\"甜度\":\"无糖\",\"温度\":\"100°C\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('199', '0', '10.00', '244706959019475619', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('200', '0', '10.00', '244706959019475619', '{\"甜度\":\"三分糖\",\"温度\":\"常温\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('201', '0', '10.00', '244706959019475619', '{\"甜度\":\"三分糖\",\"温度\":\"100°C\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('202', '0', '32.00', '1024894850209216025', '{\"甜度\":\"无糖\",\"温度\":\"正常冰\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('203', '0', '32.00', '1024894850209216025', '{\"甜度\":\"无糖\",\"温度\":\"常温\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('204', '0', '32.00', '1024894850209216025', '{\"甜度\":\"三分糖\",\"温度\":\"正常冰\"}', '2019-08-14 10:31:07', '0');
INSERT INTO `restaurant_goods_sku` VALUES ('205', '0', '32.00', '1024894850209216025', '{\"甜度\":\"三分糖\",\"温度\":\"常温\"}', '2019-08-14 10:31:07', '0');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------
INSERT INTO `restaurant_user` VALUES ('2', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '', null, null, '2019-07-19 17:42:09', '7Xa0Lt0bYxhdbHt8XusZTw==', '2019-08-01 15:52:43', null, '0', null);
INSERT INTO `restaurant_user` VALUES ('3', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '', null, null, '2019-08-02 14:58:46', 'GoqIEItjUub82LLBPOjH1A==', '2019-08-23 16:02:17', null, '0', '13055257913');

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
  `customerUid` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('%E3%80%82%E3%80%82%E3%80%82', 'oHjV85X-ld1eKTRDPd3HjMW2_CxY', '2019-08-27 11:20:20', '2019-08-27 19:00:52', '1', '0', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicggrszbOFRE5siciaIFjUAYWiacpClj4saVxfFuSp0hibQTOG2vPN3zAALibxOyuEibhAxntqS8uMUekQ/132', '', '0', null, '0', 'Q8n7NR2OSG1TF/QLkeDAxQ==', '13055257913', '588697366193191383');

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
