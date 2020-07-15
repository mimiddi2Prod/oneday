/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-15 12:02:45
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
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-07-15 09:58:12', '1', null, null, 'c9d9bb9c-8d3c-4f3e-b01d-22917044c2ee', '2020-07-16 09:58:12', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('2', '1001', 's1001', null, '2019-05-14 13:58:38', '2020-07-15 12:02:09', '3', '1', null, 'c713b517-79db-44c6-b2dc-b250cdb79bfe', '2020-07-16 12:02:09', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
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
INSERT INTO `category` VALUES ('1', '白斩鸡', 'szsn', '0', '2019-07-17 17:20:24', '1');
INSERT INTO `category` VALUES ('2', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('3', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('4', '盖浇饭2', 'szsn', '1', '2020-06-19 10:19:20', '0');
INSERT INTO `category` VALUES ('5', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('6', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('7', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');
INSERT INTO `category` VALUES ('8', '盖浇饭', 'szsn', '1', '2019-07-17 18:48:13', '1');

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
INSERT INTO `goods` VALUES ('1', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '987', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('2', '炒肉盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '959', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('3', '西红柿鸡蛋面', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '营养丰富', '21.00', 'szsn', '1', '9905', '0', '0', '2020-07-10 16:21:12', '1');
INSERT INTO `goods` VALUES ('4', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '994', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '991', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('6', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '996', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('7', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '988', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('8', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '997', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('9', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('10', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '23.00', 'szsn', '3', '310', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `goods` VALUES ('11', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '3.00', 'szsn', '3', '43', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `goods` VALUES ('12', '他说他', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '特舒服', '3.00', 'szsn', '3', '2439', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `goods` VALUES ('13', '11', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '2', '11.00', 'szsn', '1', '0', '1', '1', '2020-03-07 15:25:09', '1');
INSERT INTO `goods` VALUES ('14', '借记卡金卡你2', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '环境开会看见', '10.00', 'szsn', '2', '0', '1', '1', '2020-06-19 15:32:57', '1');
INSERT INTO `goods` VALUES ('15', '尽快把', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '开局良好开局', '10.00', 'szsn', '2', '16', '1', '5', '2020-06-19 15:34:02', '1');
INSERT INTO `goods` VALUES ('16', '吃的', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '好好吃', '23.00', 'szsn', '4', '2', '1', '1', '2020-07-09 18:07:45', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------
INSERT INTO `goods_order` VALUES ('89', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '2', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', '2');
INSERT INTO `goods_order` VALUES ('90', '', '5', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热\"}', '9.00', '9.00', '1', null, 'qt20200709163644', '2020-07-09 16:36:44', '0', '0', '0', '0', '', '1');
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
INSERT INTO `goods_order` VALUES ('104', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '23.00', '23.00', '2', null, 'qt20200714155502', '2020-07-14 15:55:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('105', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714162605', '2020-07-14 16:26:05', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('106', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '2', null, 'qt20200714162605', '2020-07-14 16:26:05', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('107', '', '0', '1', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '2', null, 'qt20200714162605', '2020-07-14 16:26:05', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('108', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '123.00', '10', null, 'qt20200713143107', '2020-07-14 16:46:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('109', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 16:48:18', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('110', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 16:48:18', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('111', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '3', null, 'qt20200714105422', '2020-07-14 16:49:59', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('112', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', null, '10.00', '10.00', '1', null, 'qt20200714143907', '2020-07-14 16:50:08', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('113', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '1', null, 'qt20200714165203', '2020-07-14 16:52:12', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('114', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165203', '2020-07-14 16:52:12', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('115', '', '8', '12', '他说他', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '3.00', '3.00', '1', null, 'qt20200714165309', '2020-07-14 16:53:13', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('116', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165434', '2020-07-14 16:54:39', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('117', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', null, '23.00', '23.00', '1', null, 'qt20200714165640', '2020-07-14 16:56:45', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('118', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '90.00', '10', null, 'qt20200714165836', '2020-07-14 17:01:08', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('119', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 17:01:08', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('120', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', null, '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 17:01:08', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('121', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', null, '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 17:01:08', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('122', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', null, '10.00', '10.00', '7', null, 'qt20200714165836', '2020-07-14 17:01:08', '0', '0', '0', '0', '', '1');
INSERT INTO `goods_order` VALUES ('123', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714170146', '2020-07-14 17:01:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('124', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '3', null, 'qt20200714170625', '2020-07-14 17:06:25', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('125', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '1', null, 'qt20200714170625', '2020-07-14 17:06:25', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('126', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '6', null, 'qt20200714170655', '2020-07-14 17:06:55', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('127', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159471969436701083', '2020-07-14 17:41:35', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('128', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200715111057', '2020-07-15 11:10:57', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('129', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200715115158', '2020-07-15 11:51:58', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('130', '', '0', '7', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '2', null, 'qt20200715115158', '2020-07-15 11:51:58', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('131', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', '6.00', '1', null, 'qt20200715115158', '2020-07-15 11:51:58', '0', '0', '0', '0', '', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_pending_order
-- ----------------------------
INSERT INTO `goods_pending_order` VALUES ('104', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713142853', '2020-07-13 14:28:53', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('105', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713143003', '2020-07-13 14:30:03', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('106', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713143041', '2020-07-13 14:30:41', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('107', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '123.00', '10', null, 'qt20200713143107', '2020-07-13 14:31:07', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('108', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 10:52:58', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('109', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '3', null, 'qt20200714105422', '2020-07-14 10:54:22', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('111', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '1', null, 'qt20200714143907', '2020-07-14 14:39:07', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('112', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714144407', '2020-07-14 14:44:07', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('113', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '1', null, 'qt20200714144413', '2020-07-14 14:44:13', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('114', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '0.69', '0', null, 'qt20200714144413', '2020-07-14 14:44:30', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('115', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '3.00', '1', null, 'qt20200714144413', '2020-07-14 14:44:30', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('116', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714144413', '2020-07-14 14:45:24', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('117', '', '0', '7', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714144413', '2020-07-14 14:45:24', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('118', '', '26', '16', '吃的', '', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '{\"糖度\":\"多糖\"}', '23.00', '23.00', '0', null, 'qt20200714144413', '2020-07-14 14:45:58', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('119', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 16:15:09', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('120', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '1', null, 'qt20200714165203', '2020-07-14 16:52:03', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('121', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165203', '2020-07-14 16:52:03', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('122', '', '8', '12', '他说他', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '3.00', '3.00', '1', null, 'qt20200714165309', '2020-07-14 16:53:09', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('123', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165434', '2020-07-14 16:54:34', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('124', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '23.00', '23.00', '1', null, 'qt20200714165640', '2020-07-14 16:56:40', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('125', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '90.00', '10', null, 'qt20200714165836', '2020-07-14 16:58:36', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('126', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('127', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('128', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('129', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '7', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('130', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714170146', '2020-07-14 17:01:46', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('131', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '4', null, 'qt20200714170515', '2020-07-14 17:05:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('132', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '3', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('133', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('134', '', '0', '7', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('135', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('136', '', '0', '8', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('137', '', '0', '6', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('138', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', '10.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('139', '', '8', '12', '他说他', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '3.00', '3.00', '2', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('140', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '23.00', '23.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_pending_order` VALUES ('141', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '3.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_pending_trade
-- ----------------------------
INSERT INTO `goods_pending_trade` VALUES ('241', 'qt20200713142853', '', '2', '2020-07-13 14:28:53', '12', '0', 'admin', '12222', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('242', 'qt20200713143003', '', '2', '2020-07-13 14:30:03', '0', '0', 'admin', null, '1', null);
INSERT INTO `goods_pending_trade` VALUES ('243', 'qt20200713143041', '', '2', '2020-07-13 14:30:41', '0', '0', 'admin', null, '1', null);
INSERT INTO `goods_pending_trade` VALUES ('244', 'qt20200713143107', '', '2', '2020-07-13 14:31:07', '11', '0', 'admin', null, '2', null);
INSERT INTO `goods_pending_trade` VALUES ('245', 'qt20200714105258', '', '2', '2020-07-14 10:52:58', '22', '0', 'admin', null, '2', null);
INSERT INTO `goods_pending_trade` VALUES ('246', 'qt20200714105422', '', '2', '2020-07-14 10:54:22', '22', '0', 'admin', '为而外呃额额', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('248', 'qt20200714143907', '', '2', '2020-07-14 14:39:07', '1', '0', 'admin', '22订单点', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('249', 'qt20200714144407', '', '2', '2020-07-14 14:44:07', '2', '0', 'admin', '33', '3', '的2都1的呃呃');
INSERT INTO `goods_pending_trade` VALUES ('250', 'qt20200714144413', '', '2', '2020-07-14 14:44:13', '1', '0', 'admin', '22', '3', '低洼瞧得起我的');
INSERT INTO `goods_pending_trade` VALUES ('251', 'qt20200714165203', '', '2', '2020-07-14 16:52:03', '0', '0', 'admin', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('252', 'qt20200714165309', '', '2', '2020-07-14 16:53:09', '0', '0', 'admin', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('253', 'qt20200714165434', '', '2', '2020-07-14 16:54:34', '0', '0', 'admin', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('254', 'qt20200714165640', '', '2', '2020-07-14 16:56:40', '0', '0', 'admin', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('255', 'qt20200714165836', '', '2', '2020-07-14 16:58:36', '2', '0', 'admin', '草泥马', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('256', 'qt20200714170146', '', '2', '2020-07-14 17:01:46', '0', '0', 'admin', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('257', 'qt20200714170515', '', '2', '2020-07-14 17:05:15', '1', '0', 'admin', '21321', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('258', 'qt20200714171721', '', '2', '2020-07-14 17:17:21', '1', '0', 'admin', '', '1', null);

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
  `remark` varchar(255) DEFAULT NULL COMMENT '订单备注，区别于商品单品备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('228', 'qt20200709163644', '', '2', '[89,90,91]', '4', '12.00', '12.00', '1', '现金', '2020-07-09 16:36:44', '2020-07-09 16:36:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', '', '', '11.00', null);
INSERT INTO `goods_trade` VALUES ('229', 'qt20200709171747', '', '2', '[92]', '2', '2.00', '0.00', '1', '现金', '2020-07-09 17:17:47', '2020-07-09 17:17:47', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '', null, null);
INSERT INTO `goods_trade` VALUES ('230', 'test159434794908302582', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[93]', '1', '6.00', '6.00', '0', 'Wxpay', '2020-07-10 10:25:49', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('231', 'test159434828833550763', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[94]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 10:31:30', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('232', 'test159434836310647221', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[95]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:32:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('233', 'test159434841969462324', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[96]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:33:40', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('234', 'test159434894936443815', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[97]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:42:29', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('235', 'test159434930026270360', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[98]', '3', '60.00', '60.00', '0', 'Wxpay', '2020-07-10 10:48:21', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('236', 'test159435034044568671', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[99]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:05:41', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, null);
INSERT INTO `goods_trade` VALUES ('237', 'test159435089071509223', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[100]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:14:51', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('238', 'test159435104009135747', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[101]', '1', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:17:20', '0000-00-00 00:00:00', '0', '9', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('239', 'test159435108221687807', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[102]', '8', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:18:02', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('240', 'qt20200710143912', '', '2', '[103]', '1', '0.12', '0.11', '1', '现金', '2020-07-10 14:39:12', '2020-07-10 14:39:12', '0', '12', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '', null, null);
INSERT INTO `goods_trade` VALUES ('241', 'qt20200714155502', '', '2', '[104]', '2', '46.00', '5.06', '1', '微信', '2020-07-14 15:55:02', '2020-07-14 15:55:02', '0', '1212', '12', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '2222的撒大苏打');
INSERT INTO `goods_trade` VALUES ('242', 'qt20200714162605', '', '2', '[105,106,107]', '6', '82.00', '9.84', '1', '支付宝', '2020-07-14 16:26:05', '2020-07-14 16:26:05', '0', '2', '2', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('243', 'qt20200713143107', '', '2', '[108]', '10', '1230.00', '984.00', '1', '支付宝', '2020-07-14 16:46:27', '2020-07-14 16:46:27', '0', '2', '22', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('244', 'qt20200714105258', '', '2', '[109,110]', '4', '44.00', '35.21', '1', '微信', '2020-07-14 16:48:18', '2020-07-14 16:48:18', '0', '2', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('245', 'qt20200714105422', '', '2', '[111]', '3', '33.00', '3.96', '1', '现金', '2020-07-14 16:49:59', '2020-07-14 16:49:59', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '22');
INSERT INTO `goods_trade` VALUES ('246', 'qt20200714143907', '', '2', '[112]', '1', '10.00', '10.00', '1', '现金', '2020-07-14 16:50:08', '2020-07-14 16:50:08', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('247', 'qt20200714165203', '', '2', '[113,114]', '3', '51.00', '6.12', '1', '微信', '2020-07-14 16:52:12', '2020-07-14 16:52:12', '0', '11', '12', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '22');
INSERT INTO `goods_trade` VALUES ('248', 'qt20200714165309', '', '2', '[115]', '1', '3.00', '3.00', '1', '现金', '2020-07-14 16:53:13', '2020-07-14 16:53:13', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('249', 'qt20200714165434', '', '2', '[116]', '2', '40.00', '34.00', '1', '现金', '2020-07-14 16:54:39', '2020-07-14 16:54:39', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('250', 'qt20200714165640', '', '2', '[117]', '1', '23.00', '23.00', '1', '现金', '2020-07-14 16:56:45', '2020-07-14 16:56:45', '0', '0', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('251', 'qt20200714165836', '', '2', '[118,119,120,121,122]', '20', '1030.00', '1030.00', '1', '微信', '2020-07-14 17:01:08', '2020-07-14 17:01:08', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null, '1001', '10.00', '');
INSERT INTO `goods_trade` VALUES ('252', 'qt20200714170146', '', '2', '[123]', '1', '20.00', '9.00', '1', '现金', '2020-07-14 17:01:52', '2020-07-14 17:01:52', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '456', '1001', '20.00', '');
INSERT INTO `goods_trade` VALUES ('253', 'qt20200714170625', '', '2', '[124,125]', '4', '70.00', '70.00', '1', '现金', '2020-07-14 17:06:25', '2020-07-14 17:06:25', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '123', '1001', '70.00', '');
INSERT INTO `goods_trade` VALUES ('254', 'qt20200714170655', '', '2', '[126]', '6', '120.00', '120.00', '1', '现金', '2020-07-14 17:06:55', '2020-07-14 17:06:55', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('255', 'test159471969436701083', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[127]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-14 17:41:35', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, null);
INSERT INTO `goods_trade` VALUES ('256', 'qt20200715111057', '', '2', '[128]', '2', '40.00', '40.00', '1', '现金', '2020-07-15 11:10:57', '2020-07-15 11:10:57', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('257', 'qt20200715115158', '', '2', '[129,130,131]', '5', '86.00', '43.00', '1', '现金', '2020-07-15 12:51:58', '2020-07-15 11:51:58', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');

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
INSERT INTO `user` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'vt0iMPe+o7yVBBlWZsGsGw==', null, '2020-03-07 16:09:31', '2020-07-14 17:41:12', 'ixXWkEzQ1594719672507YQr8rMw8', '2020-07-15 17:41:12', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null);

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
