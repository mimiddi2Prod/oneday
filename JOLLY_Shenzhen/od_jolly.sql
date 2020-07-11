/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-11 18:15:23
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-07-11 16:24:23', '1', null, null, 'b1d8bdcd-c7aa-4ee3-949d-a29984daebba', '2020-07-12 04:24:23', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('2', '1001', 's1001', null, '2019-05-14 13:58:38', '2020-07-04 15:36:05', '3', '2', null, 'e5db67dc-1ce9-4e11-98bd-a36e387ef0c3', '2020-07-10 14:51:22', 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('6', 'd2qwe', '2312', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '3', '0', null, null, null, null, null, null, null, null, null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-23 13:54:08', '../../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-24 17:53:47', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-07-24 17:53:51', '', '2', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-07-24 17:54:11', '', '2', '0', 'category');
INSERT INTO `admin_menu` VALUES ('5', '订单', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'order');
INSERT INTO `admin_menu` VALUES ('6', '员工账号', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'account');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('12', '3', '13', '1', 'http://onedayqiniu.minidope.com/brunchBanner_2019_9_30_16_3_48_0.jpeg', '1', '1', '2019-09-30 16:03:57', '3', '0');
INSERT INTO `banner` VALUES ('13', '0', '0', '跳转客服', 'http://onedayqiniu.minidope.com/brunchBanner_2019_10_18_13_52_27_0.jpeg', '1', '3', '2019-10-18 13:52:33', '9', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '白斩鸡', 'xmspw', '0', '2019-07-17 17:20:24', '1');
INSERT INTO `category` VALUES ('2', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('3', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('4', '盖浇饭2', 'xmspw', '1', '2020-06-19 10:19:20', '0');
INSERT INTO `category` VALUES ('5', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('6', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('7', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('8', '盖浇饭', 'xmspw', '1', '2019-07-17 18:48:13', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '989', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('2', '炒肉盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '995', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('3', '西红柿鸡蛋面', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '营养丰富', '21.00', 'xmspw', '1', '9902', '0', '0', '2020-07-10 16:21:12', '1');
INSERT INTO `goods` VALUES ('4', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '996', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '993', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('6', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '997', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('7', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '991', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('8', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('9', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('10', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '23.00', 'xmspw', '3', '316', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `goods` VALUES ('11', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '3.00', 'xmspw', '3', '44', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `goods` VALUES ('12', '他说他', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '特舒服', '3.00', 'xmspw', '3', '2443', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `goods` VALUES ('13', '11', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '2', '11.00', 'xmspw', '1', '991', '1', '1', '2020-03-07 15:25:09', '1');
INSERT INTO `goods` VALUES ('14', '借记卡金卡你2', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '环境开会看见', '10.00', 'xmspw', '2', '10', '1', '1', '2020-06-19 15:32:57', '1');
INSERT INTO `goods` VALUES ('15', '尽快把', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '开局良好开局', '10.00', 'xmspw', '2', '18', '1', '5', '2020-06-19 15:34:02', '1');
INSERT INTO `goods` VALUES ('16', '吃的', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '好好吃', '23.00', 'sz', '4', '2', '1', '1', '2020-07-09 18:07:45', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------
INSERT INTO `goods_order` VALUES ('89', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '2', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('90', '', '5', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热\"}', '9.00', '9.00', '1', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('91', '', '5', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热\"}', '9.00', '1.00', '1', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('92', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '2', null, 'qt20200709171747', '2020-07-09 17:17:47', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('93', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159434794908302582', '2020-07-10 10:25:49', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('94', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159434828833550763', '2020-07-10 10:31:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('95', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434836310647221', '2020-07-10 10:32:43', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('96', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434841969462324', '2020-07-10 10:33:40', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('97', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '5', '鸡蛋盖浇饭带大家是大家', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434894936443815', '2020-07-10 10:42:29', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('98', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '8', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '3', null, 'test159434930026270360', '2020-07-10 10:48:21', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('99', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159435034044568671', '2020-07-10 11:05:41', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('100', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '8', null, 'test159435089071509223', '2020-07-10 11:14:51', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('101', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159435104009135747', '2020-07-10 11:17:20', '0', '9', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('102', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '8', null, 'test159435108221687807', '2020-07-10 11:18:02', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('103', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '0.12', '1', null, 'qt20200710143912', '2020-07-10 14:39:12', '0', '0', '0', '0', '', null);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_pending_order
-- ----------------------------
INSERT INTO `goods_pending_order` VALUES ('89', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '2', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('90', '', '5', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热\"}', '9.00', '9.00', '1', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('91', '', '5', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热\"}', '9.00', '1.00', '1', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('92', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '2', null, 'qt20200709171747', '2020-07-09 17:17:47', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('93', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159434794908302582', '2020-07-10 10:25:49', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('94', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159434828833550763', '2020-07-10 10:31:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('95', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434836310647221', '2020-07-10 10:32:43', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('96', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434841969462324', '2020-07-10 10:33:40', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('97', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '5', '鸡蛋盖浇饭带大家是大家', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159434894936443815', '2020-07-10 10:42:29', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('98', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '8', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '3', null, 'test159434930026270360', '2020-07-10 10:48:21', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('99', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159435034044568671', '2020-07-10 11:05:41', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('100', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '8', null, 'test159435089071509223', '2020-07-10 11:14:51', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('101', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159435104009135747', '2020-07-10 11:17:20', '0', '9', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('102', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '8', null, 'test159435108221687807', '2020-07-10 11:18:02', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_pending_order` VALUES ('103', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '0.12', '1', null, 'qt20200710143912', '2020-07-10 14:39:12', '0', '0', '0', '0', '', null);

-- ----------------------------
-- Table structure for goods_pending_trade
-- ----------------------------
DROP TABLE IF EXISTS `goods_pending_trade`;
CREATE TABLE `goods_pending_trade` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `trade_id` varchar(32) NOT NULL COMMENT '订单号',
  `open_id` varchar(32) NOT NULL COMMENT '下单用户openid',
  `trade_platform` int(2) NOT NULL COMMENT '下单平台: 1 小程序下单 2 前台点单',
  `order_id_list` text NOT NULL COMMENT '这一订单的商品订单id列表 [1,2,3,...]',
  `goods_total_number` int(6) NOT NULL COMMENT '餐品总数',
  `goods_total_price` decimal(10,2) NOT NULL COMMENT '商品总价',
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_pending_trade
-- ----------------------------
INSERT INTO `goods_pending_trade` VALUES ('228', 'qt20200709163644', '', '2', '[89,90,91]', '4', '12.00', '12.00', '1', '现金', '2020-07-09 16:36:44', '2020-07-09 16:36:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', 'd2w', '1001', '12.00');
INSERT INTO `goods_pending_trade` VALUES ('229', 'qt20200709171747', '', '2', '[92]', '2', '2.00', '0.00', '1', '现金', '2020-07-09 17:17:47', '2020-07-09 17:17:47', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null);
INSERT INTO `goods_pending_trade` VALUES ('230', 'test159434794908302582', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[93]', '1', '6.00', '6.00', '0', 'Wxpay', '2020-07-10 10:25:49', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('231', 'test159434828833550763', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[94]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 10:31:30', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('232', 'test159434836310647221', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[95]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:32:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('233', 'test159434841969462324', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[96]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:33:40', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('234', 'test159434894936443815', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[97]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:42:29', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('235', 'test159434930026270360', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[98]', '3', '60.00', '60.00', '0', 'Wxpay', '2020-07-10 10:48:21', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('236', 'test159435034044568671', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[99]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:05:41', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('237', 'test159435089071509223', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[100]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:14:51', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('238', 'test159435104009135747', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[101]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:17:20', '0000-00-00 00:00:00', '0', '9', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('239', 'test159435108221687807', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[102]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:18:02', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_pending_trade` VALUES ('240', 'qt20200710143912', '', '2', '[103]', '1', '0.12', '0.11', '1', '现金', '2020-07-10 14:39:12', '2020-07-10 14:39:12', '0', '12', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, 'admin', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_sku
-- ----------------------------
INSERT INTO `goods_sku` VALUES ('1', '999', '5.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('2', '999', '6.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('6', '2', '34.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('7', '4', '23.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('8', '4', '3.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('9', '3', '22.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('16', '3', '1.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('17', '3', '2.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('18', '3', '3.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('19', '3', '4.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('20', '3', '5.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('21', '3', '6.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('22', '3', '7.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('23', '3', '8.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('24', '10', '10.00', '15', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2020-06-19 15:34:02', '1');
INSERT INTO `goods_sku` VALUES ('25', '10', '10.00', '15', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2020-06-19 15:34:02', '1');
INSERT INTO `goods_sku` VALUES ('26', '0', '0.00', '16', '{\"糖度\":\"多糖\"}', '2020-07-09 18:07:45', '1');
INSERT INTO `goods_sku` VALUES ('27', '0', '0.00', '3', '{\"冰度\":\"冰\"}', '2020-07-10 16:21:12', '1');
INSERT INTO `goods_sku` VALUES ('28', '0', '0.00', '3', '{\"冰度\":\"热\"}', '2020-07-10 16:21:12', '1');

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
  `goods_total_price` decimal(10,2) NOT NULL COMMENT '商品总价',
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('228', 'qt20200709163644', '', '2', '[89,90,91]', '4', '12.00', '12.00', '1', '现金', '2020-07-09 16:36:44', '2020-07-09 16:36:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', 'd2w', '1001', '12.00');
INSERT INTO `goods_trade` VALUES ('229', 'qt20200709171747', '', '2', '[92]', '2', '2.00', '0.00', '1', '现金', '2020-07-09 17:17:47', '2020-07-09 17:17:47', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null);
INSERT INTO `goods_trade` VALUES ('230', 'test159434794908302582', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[93]', '1', '6.00', '6.00', '0', 'Wxpay', '2020-07-10 10:25:49', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('231', 'test159434828833550763', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[94]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 10:31:30', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('232', 'test159434836310647221', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[95]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:32:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('233', 'test159434841969462324', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[96]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:33:40', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('234', 'test159434894936443815', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[97]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:42:29', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('235', 'test159434930026270360', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[98]', '3', '60.00', '60.00', '0', 'Wxpay', '2020-07-10 10:48:21', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('236', 'test159435034044568671', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[99]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:05:41', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('237', 'test159435089071509223', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[100]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:14:51', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('238', 'test159435104009135747', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[101]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:17:20', '0000-00-00 00:00:00', '0', '9', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('239', 'test159435108221687807', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[102]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:18:02', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('240', 'qt20200710143912', '', '2', '[103]', '1', '0.12', '0.11', '1', '现金', '2020-07-10 14:39:12', '2020-07-10 14:39:12', '0', '12', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, 'admin', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------
INSERT INTO `restaurant_user` VALUES ('2', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '', null, null, '2019-07-19 17:42:09', '7Xa0Lt0bYxhdbHt8XusZTw==', '2019-08-01 15:52:43', null, '0');
INSERT INTO `restaurant_user` VALUES ('3', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '', null, null, '2020-03-07 15:18:34', 'GaVl4l+r8es/EbhJRsZGdg==', '2020-03-07 15:48:18', null, '0');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'U9s4Fpo8D2juDeq+gCvDxQ==', null, '2020-03-07 16:09:31', '2020-07-10 11:59:06', 'lp3cO9H01594353546792unAr6ffh', '2020-07-11 11:59:06', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null);

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
