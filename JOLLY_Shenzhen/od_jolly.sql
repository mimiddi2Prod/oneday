/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-18 10:49:55
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
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-07-17 10:31:56', '1', null, null, 'feeaf9d3-9a6c-447c-947b-309e6395dfe1', '2020-07-17 22:31:56', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('2', '1001', 's1001', null, '2019-05-14 13:58:38', '2020-07-17 15:27:13', '3', '1', null, '50899fae-4433-4b0c-8d44-63e896f824e7', '2020-07-18 15:27:13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', null, null, null, null, null, null);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-23 13:54:08', '../../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-24 17:53:47', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-07-24 17:53:51', '', '2', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-07-24 17:54:11', '', '2', '0', 'category');
INSERT INTO `admin_menu` VALUES ('5', '订单', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'order');
INSERT INTO `admin_menu` VALUES ('6', '员工账号', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'account');
INSERT INTO `admin_menu` VALUES ('7', '餐品推荐', '2020-07-15 17:36:52', '../../images/logo.png', '0', '0', 'brunchBanner');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('12', '3', '13', '1', 'http://onedayqiniu.minidope.com/brunchBanner_2019_9_30_16_3_48_0.jpeg', '1', '1', '2019-09-30 16:03:57', '3', '0');
INSERT INTO `banner` VALUES ('13', '0', '0', '跳转客服', 'http://onedayqiniu.minidope.com/brunchBanner_2019_10_18_13_52_27_0.jpeg', '1', '3', '2019-10-18 13:52:33', '9', '1');
INSERT INTO `banner` VALUES ('14', '1', '3', '西红柿鸡蛋面', 'http://onedayqiniu.minidope.com/brunchBanner_2020_7_15_17_39_13_0.jpg', '1', '12', '2020-07-15 17:39:26', '1', '0');

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
INSERT INTO `category` VALUES ('1', '白斩鸡', 'szsn', '0', '2020-07-17 10:55:02', '0');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '985', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('2', '炒肉盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '937', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('3', '西红柿鸡蛋面', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '营养丰富', '21.00', 'szsn', '1', '9905', '0', '0', '2020-07-10 16:21:12', '1');
INSERT INTO `goods` VALUES ('4', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '992', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '990', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('6', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '996', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('7', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '989', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('8', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('9', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'szsn', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('10', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '23.00', 'szsn', '3', '311', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `goods` VALUES ('11', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '3.00', 'szsn', '3', '44', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `goods` VALUES ('12', '他说他', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '特舒服', '3.00', 'szsn', '3', '2441', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `goods` VALUES ('13', '11', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '2', '11.00', 'szsn', '1', '0', '1', '1', '2020-03-07 15:25:09', '1');
INSERT INTO `goods` VALUES ('14', '借记卡金卡你2', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '环境开会看见', '10.00', 'szsn', '2', '0', '1', '1', '2020-06-19 15:32:57', '1');
INSERT INTO `goods` VALUES ('15', '尽快把', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '开局良好开局', '10.00', 'szsn', '2', '16', '1', '5', '2020-06-19 15:34:02', '1');
INSERT INTO `goods` VALUES ('16', '吃的', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '好好吃', '23.00', 'szsn', '4', '2', '1', '1', '2020-07-09 18:07:45', '1');
INSERT INTO `goods` VALUES ('17', '测试商品', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '1212', '12.50', 'szsn', '1', '89', '1', '1', '2020-07-17 10:32:57', '1');
INSERT INTO `goods` VALUES ('18', '测试商品joker', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', ' why so serious?', '998.00', 'szsn', '1', '217', '1', '1', '2020-07-17 10:40:24', '1');
INSERT INTO `goods` VALUES ('19', 'ceshi ', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_52_56_0.png', 'ceshi ', '11.00', 'szsn', '7', '0', '1', '0', '2020-07-17 10:54:55', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;

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
INSERT INTO `goods_order` VALUES ('132', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200715141041', '2020-07-15 14:10:41', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('133', '', '0', '1', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200715141451', '2020-07-15 14:14:51', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('134', '', '0', '1', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200715141602', '2020-07-15 14:16:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('135', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200715141811', '2020-07-15 14:18:11', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('136', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200715142154', '2020-07-15 14:21:54', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('137', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', '10.00', '1', null, 'qt20200715142154', '2020-07-15 14:21:54', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('138', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, '20200715160746', '2020-07-15 16:07:46', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('139', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200715161623', '2020-07-15 16:16:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('140', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200715163002', '2020-07-15 16:30:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('141', '', '2', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', '3.60', '3', null, '20200715163002', '2020-07-15 16:30:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('142', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '2', null, '20200715163002', '2020-07-15 16:30:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('143', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200715163216', '2020-07-15 16:32:16', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('144', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, '20200715163216', '2020-07-15 16:32:16', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('145', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200715163627', '2020-07-15 16:36:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('146', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, '20200715163627', '2020-07-15 16:36:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('147', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '10.00', '2', null, '20200715163627', '2020-07-15 16:36:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('148', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, '20200715163627', '2020-07-15 16:36:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('149', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '15.40', '1', null, '20200715163627', '2020-07-15 16:36:27', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('150', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, '20200715164513', '2020-07-15 16:45:13', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('151', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200716170808', '2020-07-16 17:08:08', '0', '0', '0', '0', '', '1');
INSERT INTO `goods_order` VALUES ('152', '', '0', '6', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '2', null, '20200716170808', '2020-07-16 17:08:08', '0', '0', '0', '0', '', '1');
INSERT INTO `goods_order` VALUES ('153', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, '20200717101815', '2020-07-17 10:18:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('154', '', '2', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', '6.00', '1', null, '20200717101815', '2020-07-17 10:18:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('155', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '5.00', '5.00', '1', null, '20200717101815', '2020-07-17 10:18:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('156', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '5.00', '2.50', '1', null, '20200717101815', '2020-07-17 10:18:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('157', '', '2', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', '3.00', '1', null, '20200717101815', '2020-07-17 10:18:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('158', '', '47', '19', 'ceshi ', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_52_56_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '11.00', '11.00', '1', null, '20200717110331', '2020-07-17 11:03:31', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('159', '', '70', '19', 'ceshi ', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_52_56_0.png', '{\"糖度\":\"单糖\",\"冰度\":\"50度\",\"测试\":\"3\"}', '11.00', '11.00', '1', null, '20200717110331', '2020-07-17 11:03:31', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('160', '', '47', '19', 'ceshi ', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_52_56_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '11.00', '11.00', '2', null, '20200717110402', '2020-07-17 11:04:02', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('161', '', '47', '19', 'ceshi ', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_52_56_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '11.00', '11.00', '1', null, '20200717110519', '2020-07-17 11:05:19', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('162', '', '42', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '998.00', '99.80', '1', null, '20200717110718', '2020-07-17 11:07:18', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('163', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '2', null, '20200717110826', '2020-07-17 11:10:37', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('164', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717144312', '2020-07-17 14:43:12', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('165', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717144613', '2020-07-17 14:46:13', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('166', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '399.20', '1', null, '20200717144726', '2020-07-17 14:47:26', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('167', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '898.20', '2', null, '20200717151104', '2020-07-17 15:11:04', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('168', '', '41', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '998.00', '898.20', '3', null, '20200717151610', '2020-07-17 15:16:10', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('169', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '2', null, '20200717151610', '2020-07-17 15:16:10', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('170', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:07:09', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('171', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:07:09', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('172', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:07:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('173', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:07:21', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('174', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:07:22', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('175', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:07:22', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('176', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:08:18', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('177', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:08:18', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('178', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:08:19', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('179', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:08:19', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('180', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:10:56', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('181', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:10:56', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('182', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:13:12', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('183', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:13:12', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('184', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:13:32', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('185', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:13:32', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('186', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 16:16:25', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('187', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 16:16:25', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('188', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717162125', '2020-07-17 16:22:20', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('189', '', '41', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '998.00', '978.04', '1', null, '20200717154835', '2020-07-17 16:57:57', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('190', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '2', null, '20200717154835', '2020-07-17 16:57:57', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('191', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.20', '2', null, '20200717111246', '2020-07-17 17:49:16', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('192', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '25.00', '1', null, '20200717175032', '2020-07-17 17:50:44', '0', '0', '0', '0', '', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_pending_order
-- ----------------------------
INSERT INTO `goods_pending_order` VALUES ('104', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713142853', '2020-07-13 14:28:53', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('105', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713143003', '2020-07-13 14:30:03', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('106', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '0', null, 'qt20200713143041', '2020-07-13 14:30:41', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('107', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '123.00', '10', null, 'qt20200713143107', '2020-07-13 14:31:07', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('108', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 10:52:58', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('109', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '3', null, 'qt20200714105422', '2020-07-14 10:54:22', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('111', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '1', null, 'qt20200714143907', '2020-07-14 14:39:07', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('112', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714144407', '2020-07-14 14:44:07', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('113', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '1', null, 'qt20200714144413', '2020-07-14 14:44:13', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('114', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '0.69', '0', null, 'qt20200714144413', '2020-07-14 14:44:30', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('115', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '3.00', '1', null, 'qt20200714144413', '2020-07-14 14:44:30', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('116', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714144413', '2020-07-14 14:45:24', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('117', '', '0', '7', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714144413', '2020-07-14 14:45:24', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('118', '', '26', '16', '吃的', '', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '{\"糖度\":\"多糖\"}', '23.00', '23.00', '0', null, 'qt20200714144413', '2020-07-14 14:45:58', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('119', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '2', null, 'qt20200714105258', '2020-07-14 16:15:09', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('120', '', '16', '13', '11', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '11.00', '11.00', '1', null, 'qt20200714165203', '2020-07-14 16:52:03', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('121', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165203', '2020-07-14 16:52:03', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('122', '', '8', '12', '他说他', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '3.00', '3.00', '1', null, 'qt20200714165309', '2020-07-14 16:53:09', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('123', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, 'qt20200714165434', '2020-07-14 16:54:34', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('124', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '23.00', '23.00', '1', null, 'qt20200714165640', '2020-07-14 16:56:40', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('125', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '90.00', '10', null, 'qt20200714165836', '2020-07-14 16:58:36', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('126', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('127', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('128', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('129', '', '0', '14', '借记卡金卡你2', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '', '10.00', '10.00', '7', null, 'qt20200714165836', '2020-07-14 16:59:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('130', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '1', null, 'qt20200714170146', '2020-07-14 17:01:46', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('131', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '4', null, 'qt20200714170515', '2020-07-14 17:05:15', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('132', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '3', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('133', '', '0', '4', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('134', '', '0', '7', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('135', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('136', '', '0', '8', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('137', '', '0', '6', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', '20.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('138', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', '10.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('139', '', '8', '12', '他说他', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '3.00', '3.00', '2', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('140', '', '0', '10', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '23.00', '23.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('141', '', '0', '11', '阿文', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '3.00', '3.00', '1', null, 'qt20200714171721', '2020-07-14 17:17:21', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('142', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717110756', '2020-07-17 11:07:56', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('143', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '2', null, '20200717110826', '2020-07-17 11:08:26', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('144', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '6', null, '20200717111110', '2020-07-17 11:11:10', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('145', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717111110', '2020-07-17 11:11:34', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('146', '', '1', '2', '炒肉盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '20.00', '20.00', '2', null, '20200717111246', '2020-07-17 11:12:46', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('147', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '49.00', '0', null, '20200717152427', '2020-07-17 15:24:27', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('148', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717153353', '2020-07-17 15:33:53', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('149', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '898.20', '0', null, '20200717153353', '2020-07-17 15:33:53', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('150', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717153426', '2020-07-17 15:34:26', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('151', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '898.20', '0', null, '20200717153426', '2020-07-17 15:34:26', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('152', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717153541', '2020-07-17 15:35:41', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('153', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '898.20', '0', null, '20200717153541', '2020-07-17 15:35:41', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('154', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717153601', '2020-07-17 15:36:01', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('155', '', '46', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '998.00', '898.20', '0', null, '20200717153601', '2020-07-17 15:36:01', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('156', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717153937', '2020-07-17 15:39:37', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('157', '', '40', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"100度\"}', '998.00', '978.04', '0', null, '20200717153937', '2020-07-17 15:39:37', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('158', '', '41', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '998.00', '978.04', '0', null, '20200717154217', '2020-07-17 15:42:17', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('159', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717154217', '2020-07-17 15:42:17', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('160', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717154217', '2020-07-17 15:42:17', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('161', '', '42', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '998.00', '978.04', '0', null, '20200717154523', '2020-07-17 15:45:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('162', '', '45', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '998.00', '998.00', '0', null, '20200717154523', '2020-07-17 15:45:23', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('163', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717154624', '2020-07-17 15:46:24', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('164', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717154705', '2020-07-17 15:47:05', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('165', '', '41', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '998.00', '978.04', '1', null, '20200717154835', '2020-07-17 15:48:35', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('166', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '2', null, '20200717154835', '2020-07-17 15:48:35', '0', '0', '0', '0', '', null, null);
INSERT INTO `goods_pending_order` VALUES ('167', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717162125', '2020-07-17 16:21:25', '0', '0', '0', '0', '', null, '?3');
INSERT INTO `goods_pending_order` VALUES ('168', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717165815', '2020-07-17 16:58:15', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('169', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717173513', '2020-07-17 17:35:13', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('170', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717173539', '2020-07-17 17:35:39', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('171', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '0', null, '20200717173634', '2020-07-17 17:36:34', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('172', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717173746', '2020-07-17 17:37:46', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('173', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717175032', '2020-07-17 17:50:32', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('174', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '122.00', '0', null, '20200717175112', '2020-07-17 17:51:12', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('175', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '2.00', '9', null, '20200717180208', '2020-07-17 18:02:08', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('176', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717183728', '2020-07-17 18:37:28', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('177', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717183728', '2020-07-17 18:37:28', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('178', '', '26', '16', '吃的', '', 'http://onedayqiniu.minidope.com/goods_2020_7_9_17_59_40_0.png', '{\"糖度\":\"多糖\"}', '23.00', '32.00', '2', null, '20200717184713', '2020-07-17 18:47:13', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('179', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717192706', '2020-07-17 19:27:06', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('180', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717192706', '2020-07-17 19:27:06', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('181', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '2', null, '20200717192709', '2020-07-17 19:27:09', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('182', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717192706', '2020-07-18 10:13:34', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('183', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717192706', '2020-07-18 10:13:35', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('184', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717192706', '2020-07-18 10:13:51', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('185', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717192706', '2020-07-18 10:13:55', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('186', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717192706', '2020-07-18 10:13:55', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('187', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:14:09', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('188', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:14:15', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('189', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717184713', '2020-07-18 10:14:26', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('190', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:15:07', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('191', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717184713', '2020-07-18 10:16:15', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('192', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717184713', '2020-07-18 10:19:14', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('193', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:21:14', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('194', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:21:19', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('195', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:23:19', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('196', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '1', null, '20200717184713', '2020-07-18 10:23:44', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('197', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '0', null, '20200717184713', '2020-07-18 10:24:42', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('198', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '2', null, '20200717184713', '2020-07-18 10:34:38', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('199', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717184713', '2020-07-18 10:35:19', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('200', '', '38', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '998.00', '998.00', '1', null, '20200717184713', '2020-07-18 10:37:43', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('201', '', '29', '17', '测试商品', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_32_19_0.png', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '12.50', '12.50', '2', null, '20200717184713', '2020-07-18 10:37:43', '0', '0', '0', '0', '', null, '');
INSERT INTO `goods_pending_order` VALUES ('202', '', '43', '18', '测试商品joker', '', 'http://onedayqiniu.minidope.com/goods_2020_7_17_10_39_14_0.png', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '998.00', '998.00', '1', null, '20200717184713', '2020-07-18 10:37:43', '0', '0', '0', '0', '', null, '');

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
) ENGINE=InnoDB AUTO_INCREMENT=287 DEFAULT CHARSET=utf8;

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
INSERT INTO `goods_pending_trade` VALUES ('257', 'qt20200714170515', '', '2', '2020-07-14 17:05:15', '1', '0', 'admin', '21321', '3', '');
INSERT INTO `goods_pending_trade` VALUES ('258', 'qt20200714171721', '', '2', '2020-07-14 17:17:21', '1', '0', 'admin', '', '3', '');
INSERT INTO `goods_pending_trade` VALUES ('259', '20200717110756', '', '2', '2020-07-17 11:07:56', '1', '0', '1001', '挂单测试', '3', '');
INSERT INTO `goods_pending_trade` VALUES ('260', '20200717110826', '', '2', '2020-07-17 11:08:26', '1', '0', '1001', '挂单测试', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('261', '20200717111110', '', '2', '2020-07-17 11:11:10', '1', '0', '1001', '挂单测试', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('262', '20200717111246', '', '2', '2020-07-17 11:12:46', '0', '0', '1001', '11', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('263', '20200717152427', '', '2', '2020-07-17 15:24:27', '12', '0', '1001', '6', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('264', '20200717153353', '', '2', '2020-07-17 15:33:53', '2', '0', '1001', '带我去带我去带我去', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('265', '20200717153426', '', '2', '2020-07-17 15:34:26', '23', '0', '1001', '2222撒反对', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('266', '20200717153541', '', '2', '2020-07-17 15:35:41', '23', '0', '1001', '2222撒反对', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('267', '20200717153601', '', '2', '2020-07-17 15:36:01', '34', '0', '1001', '大撒大撒', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('268', '20200717153937', '', '2', '2020-07-17 15:39:37', '23', '0', '1001', '23桌请给三根筷子', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('269', '20200717154217', '', '2', '2020-07-17 15:42:17', '2', '0', '1001', '2号桌要加汽油的那个人，请给3跟筷子', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('270', '20200717154523', '', '2', '2020-07-17 15:45:23', '3', '0', '1001', '加汽油那个人要3根筷子', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('271', '20200717154624', '', '2', '2020-07-17 15:46:24', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('272', '20200717154705', '', '2', '2020-07-17 15:47:05', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('273', '20200717154835', '', '2', '2020-07-17 15:48:35', '2', '0', '1001', '加汽油那个人要求3根筷子！！！', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('274', '20200717162125', '', '2', '2020-07-17 16:21:25', '1', '0', '1001', '234242', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('275', '20200717165815', '', '2', '2020-07-17 16:58:15', '2', '0', '1001', '3343', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('276', '20200717173513', '', '2', '2020-07-17 17:35:13', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('277', '20200717173539', '', '2', '2020-07-17 17:35:39', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('278', '20200717173634', '', '2', '2020-07-17 17:36:34', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('279', '20200717173746', '', '2', '2020-07-17 17:37:46', '0', '0', '1001', '', '3', '');
INSERT INTO `goods_pending_trade` VALUES ('280', '20200717175032', '', '2', '2020-07-17 17:50:32', '0', '0', '1001', '', '2', null);
INSERT INTO `goods_pending_trade` VALUES ('281', '20200717175112', '', '2', '2020-07-17 17:51:12', '0', '0', '1001', '', '1', null);
INSERT INTO `goods_pending_trade` VALUES ('282', '20200717180208', '', '2', '2020-07-17 18:02:08', '0', '0', '1001', '', '3', '而且');
INSERT INTO `goods_pending_trade` VALUES ('283', '20200717183728', '', '2', '2020-07-17 18:37:28', '0', '0', '1001', '', '3', '而且3');
INSERT INTO `goods_pending_trade` VALUES ('284', '20200717184713', '', '2', '2020-07-17 18:47:13', '0', '0', '1001', '', '3', '撒旦撒旦');
INSERT INTO `goods_pending_trade` VALUES ('285', '20200717192706', '', '2', '2020-07-17 19:27:06', '0', '0', '1001', '', '3', '作废了');
INSERT INTO `goods_pending_trade` VALUES ('286', '20200717192709', '', '2', '2020-07-17 19:27:09', '0', '0', '1001', '', '1', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

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
INSERT INTO `goods_sku` VALUES ('29', '0', '0.00', '17', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('30', '0', '0.00', '17', '{\"糖度\":\"半糖\",\"冰度\":\"50度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('31', '0', '0.00', '17', '{\"糖度\":\"半糖\",\"冰度\":\"100度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('32', '0', '0.00', '17', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('33', '0', '0.00', '17', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('34', '0', '0.00', '17', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('35', '0', '0.00', '17', '{\"糖度\":\"单糖\",\"冰度\":\"0度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('36', '0', '0.00', '17', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('37', '0', '0.00', '17', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2020-07-17 10:32:57', '1');
INSERT INTO `goods_sku` VALUES ('38', '0', '998.00', '18', '{\"糖度\":\"半糖\",\"冰度\":\"0度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('39', '0', '998.00', '18', '{\"糖度\":\"半糖\",\"冰度\":\"50度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('40', '0', '998.00', '18', '{\"糖度\":\"半糖\",\"冰度\":\"100度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('41', '0', '998.00', '18', '{\"糖度\":\"多糖\",\"冰度\":\"0度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('42', '0', '998.00', '18', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('43', '0', '998.00', '18', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('44', '0', '998.00', '18', '{\"糖度\":\"单糖\",\"冰度\":\"0度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('45', '0', '998.00', '18', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('46', '0', '998.00', '18', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2020-07-17 10:40:24', '1');
INSERT INTO `goods_sku` VALUES ('47', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('48', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('49', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"0度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('50', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('51', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('52', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('53', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('54', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('55', '0', '11.00', '19', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('56', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('57', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"0度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('58', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"0度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('59', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('60', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('61', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('62', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('63', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('64', '0', '11.00', '19', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('65', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"0度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('66', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"0度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('67', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"0度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('68', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"50度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('69', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"50度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('70', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"50度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('71', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"100度\",\"测试\":\"1\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('72', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"100度\",\"测试\":\"2\"}', '2020-07-17 10:54:55', '1');
INSERT INTO `goods_sku` VALUES ('73', '0', '11.00', '19', '{\"糖度\":\"单糖\",\"冰度\":\"100度\",\"测试\":\"3\"}', '2020-07-17 10:54:55', '1');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('228', 'qt20200709163644', '', '2', '[89,90,91]', '4', '0.00', '12.00', '12.00', '1', '现金', '2020-07-09 16:36:44', '2020-07-09 16:36:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', '', '', '11.00', null);
INSERT INTO `goods_trade` VALUES ('229', 'qt20200709171747', '', '2', '[92]', '2', '0.00', '2.00', '0.00', '1', '现金', '2020-07-09 17:17:47', '2020-07-09 17:17:47', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '', null, null);
INSERT INTO `goods_trade` VALUES ('230', 'test159434794908302582', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[93]', '1', '0.00', '6.00', '6.00', '0', 'Wxpay', '2020-07-10 10:25:49', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('231', 'test159434828833550763', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[94]', '1', '0.00', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 10:31:30', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('232', 'test159434836310647221', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[95]', '2', '0.00', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:32:43', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('233', 'test159434841969462324', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[96]', '2', '0.00', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:33:40', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('234', 'test159434894936443815', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[97]', '2', '0.00', '40.00', '40.00', '0', 'Wxpay', '2020-07-10 10:42:29', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('235', 'test159434930026270360', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[98]', '3', '0.00', '60.00', '60.00', '0', 'Wxpay', '2020-07-10 10:48:21', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('236', 'test159435034044568671', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[99]', '1', '0.00', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:05:41', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, null);
INSERT INTO `goods_trade` VALUES ('237', 'test159435089071509223', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[100]', '8', '0.00', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:14:51', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('238', 'test159435104009135747', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[101]', '1', '0.00', '20.00', '20.00', '0', 'Wxpay', '2020-07-10 11:17:20', '0000-00-00 00:00:00', '0', '9', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('239', 'test159435108221687807', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[102]', '8', '0.00', '160.00', '160.00', '0', 'Wxpay', '2020-07-10 11:18:02', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, null, null, null);
INSERT INTO `goods_trade` VALUES ('240', 'qt20200710143912', '', '2', '[103]', '1', '0.00', '0.12', '0.11', '1', '现金', '2020-07-10 14:39:12', '2020-07-10 14:39:12', '0', '12', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '', null, null);
INSERT INTO `goods_trade` VALUES ('241', 'qt20200714155502', '', '2', '[104]', '2', '0.00', '46.00', '5.06', '1', '微信', '2020-07-14 15:55:02', '2020-07-14 15:55:02', '0', '1212', '12', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '2222的撒大苏打');
INSERT INTO `goods_trade` VALUES ('242', 'qt20200714162605', '', '2', '[105,106,107]', '6', '0.00', '82.00', '9.84', '1', '支付宝', '2020-07-14 16:26:05', '2020-07-14 16:26:05', '0', '2', '2', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('243', 'qt20200713143107', '', '2', '[108]', '10', '0.00', '1230.00', '984.00', '1', '支付宝', '2020-07-14 16:46:27', '2020-07-14 16:46:27', '0', '2', '22', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('244', 'qt20200714105258', '', '2', '[109,110]', '4', '0.00', '44.00', '35.21', '1', '微信', '2020-07-14 16:48:18', '2020-07-14 16:48:18', '0', '2', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('245', 'qt20200714105422', '', '2', '[111]', '3', '0.00', '33.00', '3.96', '1', '现金', '2020-07-14 16:49:59', '2020-07-14 16:49:59', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '22');
INSERT INTO `goods_trade` VALUES ('246', 'qt20200714143907', '', '2', '[112]', '1', '0.00', '10.00', '10.00', '1', '现金', '2020-07-14 16:50:08', '2020-07-14 16:50:08', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('247', 'qt20200714165203', '', '2', '[113,114]', '3', '0.00', '51.00', '6.12', '1', '微信', '2020-07-14 16:52:12', '2020-07-14 16:52:12', '0', '11', '12', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '22');
INSERT INTO `goods_trade` VALUES ('248', 'qt20200714165309', '', '2', '[115]', '1', '0.00', '3.00', '3.00', '1', '现金', '2020-07-14 16:53:13', '2020-07-14 16:53:13', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('249', 'qt20200714165434', '', '2', '[116]', '2', '0.00', '40.00', '34.00', '1', '现金', '2020-07-14 16:54:39', '2020-07-14 16:54:39', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('250', 'qt20200714165640', '', '2', '[117]', '1', '0.00', '23.00', '23.00', '1', '现金', '2020-07-14 16:56:45', '2020-07-14 16:56:45', '0', '0', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('251', 'qt20200714165836', '', '2', '[118,119,120,121,122]', '20', '0.00', '1030.00', '1030.00', '1', '微信', '2020-07-14 17:01:08', '2020-07-14 17:01:08', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null, '1001', '10.00', '');
INSERT INTO `goods_trade` VALUES ('252', 'qt20200714170146', '', '2', '[123]', '1', '0.00', '20.00', '9.00', '1', '现金', '2020-07-14 17:01:52', '2020-07-14 17:01:52', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '456', '1001', '20.00', '');
INSERT INTO `goods_trade` VALUES ('253', 'qt20200714170625', '', '2', '[124,125]', '4', '0.00', '70.00', '70.00', '1', '现金', '2020-07-14 17:06:25', '2020-07-14 17:06:25', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '123', '1001', '70.00', '');
INSERT INTO `goods_trade` VALUES ('254', 'qt20200714170655', '', '2', '[126]', '6', '0.00', '120.00', '120.00', '1', '现金', '2020-07-14 17:06:55', '2020-07-14 17:06:55', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('255', 'test159471969436701083', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[127]', '2', '0.00', '40.00', '40.00', '0', 'Wxpay', '2020-07-14 17:41:35', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, null);
INSERT INTO `goods_trade` VALUES ('256', 'qt20200715111057', '', '2', '[128]', '2', '0.00', '40.00', '40.00', '1', '现金', '2020-07-15 11:10:57', '2020-07-15 11:10:57', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('257', 'qt20200715115158', '', '2', '[129,130,131]', '5', '0.00', '86.00', '43.00', '1', '现金', '2020-07-15 12:51:58', '2020-07-15 11:51:58', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('258', 'qt20200715141041', '', '2', '[132]', '1', '0.00', '20.00', '20.00', '1', '现金', '2020-07-15 14:10:41', '2020-07-15 14:10:41', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('259', 'qt20200715141451', '', '2', '[133]', '1', '0.00', '20.00', '20.00', '1', '现金', '2020-07-15 14:14:51', '2020-07-15 14:14:51', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('260', 'qt20200715141602', '', '2', '[134]', '1', '0.00', '20.00', '20.00', '1', '现金', '2020-07-15 14:16:02', '2020-07-15 14:16:02', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('261', 'qt20200715141811', '', '2', '[135]', '2', '0.00', '40.00', '40.00', '1', '现金', '2020-07-15 14:18:11', '2020-07-15 14:18:11', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('262', 'qt20200715142154', '', '2', '[136,137]', '3', '0.00', '50.00', '50.00', '1', '现金', '2020-07-15 14:21:54', '2020-07-15 14:21:54', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('263', '20200715160746', '', '2', '[138]', '1', '0.00', '20.00', '20.00', '1', '现金', '2020-07-15 16:07:46', '2020-07-15 16:07:46', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('264', '20200715161623', '', '2', '[139]', '2', '0.00', '40.00', '40.00', '1', '现金', '2020-07-15 16:16:23', '2020-07-15 16:16:23', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('265', '20200715163002', '', '2', '[140,141,142]', '7', '0.00', '90.80', '45.40', '1', '现金', '2020-07-15 16:30:02', '2020-07-15 16:30:02', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('266', '20200715163216', '', '2', '[143,144]', '3', '0.00', '60.00', '60.00', '1', '现金', '2020-07-15 16:32:16', '2020-07-15 16:32:16', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('267', '20200715163627', '', '2', '[145,146,147,148,149]', '7', '0.00', '115.40', '57.70', '1', '现金', '2020-07-15 16:36:27', '2020-07-15 16:36:27', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '打5折，跳楼价，血亏');
INSERT INTO `goods_trade` VALUES ('268', '20200715164513', '', '2', '[150]', '1', '0.00', '20.00', '10.00', '1', '现金', '2020-07-16 01:45:13', '2020-07-15 16:45:13', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('269', '20200716170808', '', '2', '[151,152]', '4', '0.00', '80.00', '80.00', '1', '现金', '2020-07-16 17:08:08', '2020-07-16 17:08:08', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null, '1001', '40.00', '');
INSERT INTO `goods_trade` VALUES ('270', '20200717101815', '', '2', '[153,154,155,156,157]', '5', '0.00', '36.50', '18.25', '1', '支付宝', '2020-07-17 10:18:15', '2020-07-17 10:18:15', '0', '23', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '整单再打半价');
INSERT INTO `goods_trade` VALUES ('271', '20200717110331', '', '2', '[158,159]', '2', '0.00', '22.00', '22.00', '1', '支付宝', '2020-07-17 11:03:31', '2020-07-17 11:03:31', '0', '1', '22', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('272', '20200717110402', '', '2', '[160]', '2', '0.00', '22.00', '19.80', '1', '现金', '2020-07-17 11:04:02', '2020-07-17 11:04:02', '0', '10', '22', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '456');
INSERT INTO `goods_trade` VALUES ('273', '20200717110519', '', '2', '[161]', '1', '0.00', '11.00', '9.90', '1', '现金', '2020-07-17 11:05:19', '2020-07-17 11:05:19', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('274', '20200717110718', '', '2', '[162]', '1', '0.00', '99.80', '84.83', '1', '现金', '2020-07-17 11:07:18', '2020-07-17 11:07:18', '0', '1', '2', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '打折测试');
INSERT INTO `goods_trade` VALUES ('275', '20200717110826', '', '2', '[163]', '2', '0.00', '25.00', '25.00', '1', '现金', '2020-07-17 11:10:37', '2020-07-17 11:10:37', '0', '1', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('276', '20200717144312', '', '2', '[164]', '1', '0.00', '998.00', '998.00', '1', '现金', '2020-07-17 14:43:12', '2020-07-17 14:43:12', '0', '12', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('277', '20200717144613', '', '2', '[165]', '1', '0.00', '998.00', '499.00', '1', '支付宝', '2020-07-17 14:46:13', '2020-07-17 14:46:13', '0', '2', '12', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '2额');
INSERT INTO `goods_trade` VALUES ('278', '20200717144726', '', '2', '[166]', '1', '0.00', '399.20', '239.52', '1', '现金', '2020-07-17 14:47:26', '2020-07-17 14:47:26', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('279', '20200717151104', '', '2', '[167]', '2', '1996.00', '1796.40', '359.28', '1', '支付宝', '2020-07-17 15:11:04', '2020-07-17 15:11:04', '0', '1', '2', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('280', '20200717151610', '', '2', '[168,169]', '5', '4990.00', '4690.60', '4596.79', '1', '支付宝', '2020-07-17 15:16:10', '2020-07-17 15:16:10', '0', '1', '2', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '整单打98折 ');
INSERT INTO `goods_trade` VALUES ('281', '20200717111110', '', '2', '[186,187]', '7', '87.50', '87.50', '87.50', '1', '现金', '2020-07-17 16:16:26', '2020-07-17 16:16:26', '0', '1', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('282', '20200717162125', '', '2', '[188]', '1', '998.00', '998.00', '998.00', '1', '现金', '2020-07-17 16:22:20', '2020-07-17 16:22:20', '0', '1', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('283', '20200717154835', '', '2', '[189,190]', '3', '2994.00', '2974.04', '2974.00', '1', '微信', '2020-07-17 16:57:57', '2020-07-17 16:57:57', '0', '2', '9', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('284', '20200717111246', '', '2', '[191]', '2', '40.00', '40.40', '40.40', '1', '现金', '2020-07-17 17:49:16', '2020-07-17 17:49:16', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');
INSERT INTO `goods_trade` VALUES ('285', '20200717175032', '', '2', '[192]', '1', '12.50', '25.00', '25.00', '1', '现金', '2020-07-17 17:50:44', '2020-07-17 17:50:44', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '');

-- ----------------------------
-- Table structure for home_data
-- ----------------------------
DROP TABLE IF EXISTS `home_data`;
CREATE TABLE `home_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` date DEFAULT NULL COMMENT '当日时间',
  `mini_program_income` decimal(10,2) DEFAULT NULL COMMENT '当日小程序收入',
  `reception_income` decimal(10,2) DEFAULT NULL COMMENT '当日前台收入',
  `actually_income` decimal(10,2) DEFAULT NULL COMMENT '当日总营收',
  `refund_price` decimal(10,2) DEFAULT NULL COMMENT '当日退款',
  `refund_order_number` int(11) DEFAULT NULL COMMENT '当日反结账+退货 数',
  `order_number` int(12) DEFAULT NULL COMMENT '当日订单总数',
  `increase_user` varchar(255) DEFAULT NULL COMMENT '当日小程序新增用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=702 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of home_data
-- ----------------------------
INSERT INTO `home_data` VALUES ('2', '2020-07-15', '0.00', '60.00', '61.63', '22.00', '0', '6', '0');
INSERT INTO `home_data` VALUES ('700', '2020-07-16', '0.00', '90.00', '90.00', '40.00', '1', '2', '0');
INSERT INTO `home_data` VALUES ('701', '2020-07-17', '0.00', '179.78', '179.78', '0.00', '0', '6', '0');

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
INSERT INTO `user` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'nDZpuXD17uNUk2JKmgMMiQ==', null, '2020-03-07 16:09:31', '2020-07-17 16:02:23', 'IaSc06qa1594972943170i4udwhjh', '2020-07-18 16:02:23', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null);

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
