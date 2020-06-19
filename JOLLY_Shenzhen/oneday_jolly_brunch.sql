/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday_jolly_brunch

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-06-19 10:22:47
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-06-18 18:06:40', '0', null, '', '0000-00-00 00:00:00', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('3', 'test11', 'test11', null, '2019-09-12 15:07:48', '2019-10-31 15:48:17', '2', null, '', '0000-00-00 00:00:00', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('7', '1001', '1001', '1001', '2019-09-17 12:13:31', '2019-09-30 11:55:38', '1', null, '', '0000-00-00 00:00:00', '[[40],[41]]', '[11]', null, null, null, null);
INSERT INTO `admin` VALUES ('8', 'admin', 'admin', null, '0000-00-00 00:00:00', '2020-06-19 10:09:10', '0', null, '62bf9608-7f0e-4856-bd7d-75f257df95ba', '2020-06-19 22:09:10', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('9', 'test', 'onedaytest', null, '2019-09-18 13:18:59', '2019-10-17 10:31:13', '0', null, '', '0000-00-00 00:00:00', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('10', '001', '001', '001', '2019-09-18 15:35:50', '2019-09-18 15:36:12', '1', null, '', '0000-00-00 00:00:00', '[[45],[46]]', '[14]', null, null, null, null);
INSERT INTO `admin` VALUES ('13', 'jollyshop', 'jollyshop1002', 'jollyshop', '2019-10-03 22:29:42', '2019-10-03 22:29:42', '1', null, null, null, '[[53,55,54,56],[58,57,61,59,60]]', '[15,16,17,18,19,20,21]', null, null, null, null);
INSERT INTO `admin` VALUES ('14', 'tina', 'tina', 'tina', '2019-10-12 11:21:23', '2019-10-15 16:59:38', '2', null, '', '0000-00-00 00:00:00', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('15', 'echo', 'echo', 'echo', '2019-10-12 11:22:00', '2019-10-12 11:22:30', '2', null, '', '0000-00-00 00:00:00', null, null, null, null, null, null);
INSERT INTO `admin` VALUES ('16', '11', '11', '11', '2019-11-02 17:34:37', '2019-11-02 18:18:24', '1', null, '', '0000-00-00 00:00:00', '[[55],[57,61]]', '[18]', '0', '1', '1', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '首页', '2019-07-23 13:54:08', '../../images/logo.png', '0', '0', 'home');
INSERT INTO `admin_menu` VALUES ('2', '商品', '2019-07-24 17:53:47', '../../images/logo.png', '0', '0', '');
INSERT INTO `admin_menu` VALUES ('3', '商品管理', '2019-07-24 17:53:51', '', '2', '0', 'goods');
INSERT INTO `admin_menu` VALUES ('4', '分类管理', '2019-07-24 17:54:11', '', '2', '0', 'category');
INSERT INTO `admin_menu` VALUES ('5', '订单', '2019-07-24 17:54:14', '../../images/logo.png', '0', '0', 'order');

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
INSERT INTO `category` VALUES ('1', '汤面', 'xmspw', '0', '2019-07-17 17:20:24', '1');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '993', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('2', '炒肉盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('3', '西红柿鸡蛋面', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '1', '989', '1', '0', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('4', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '997', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('6', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('7', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '991', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('8', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('9', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('10', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '23.00', 'xmspw', '3', '316', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `goods` VALUES ('11', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '3.00', 'xmspw', '3', '44', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `goods` VALUES ('12', '他说他', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '特舒服', '3.00', 'xmspw', '3', '2443', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `goods` VALUES ('13', '1', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '2', '1.00', 'xmspw', '3', '991', '1', '1', '2020-03-07 15:25:09', '1');

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
  `number` int(10) NOT NULL,
  `coupon` float(10,2) DEFAULT NULL,
  `trade_id` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '订单id',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `take_meal_style` int(11) NOT NULL COMMENT '0 堂食 1 外带',
  `table_number` int(3) NOT NULL COMMENT '桌位号',
  `dinners_number` int(3) NOT NULL COMMENT '用餐人数',
  `pay_status` int(2) NOT NULL COMMENT '0已支付 1未支付',
  `pay_method` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '支付方式 微信支付/余额支付',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------
INSERT INTO `goods_order` VALUES ('1', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', '1', null, 'test159246990466689087', '2020-06-18 16:45:05', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('2', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '17', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2.00', '1', null, 'test159246990466689087', '2020-06-18 16:45:05', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('3', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\"}', '6.00', '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('4', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '10', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"热3432\"}', '9.00', '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('5', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('6', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\"}', '6.00', '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('7', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '10', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"热3432\"}', '9.00', '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('8', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay');
INSERT INTO `goods_order` VALUES ('9', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', '1', null, 'test159247124022795142', '2020-06-18 17:07:20', '0', '3', '1', '1', 'Wxpay');
INSERT INTO `goods_order` VALUES ('10', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', '1', null, 'test159247130313280011', '2020-06-18 17:08:23', '0', '3', '1', '1', 'Wxpay');
INSERT INTO `goods_order` VALUES ('11', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', '1', null, 'test159247131318267986', '2020-06-18 17:08:33', '0', '3', '1', '1', 'Wxpay');
INSERT INTO `goods_order` VALUES ('12', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', '2', null, 'test159247176581871184', '2020-06-18 17:16:06', '0', '3', '1', '1', 'Wxpay');
INSERT INTO `goods_order` VALUES ('13', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '8', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', '1', null, 'test159247322292031447', '2020-06-18 17:40:23', '1', '3', '1', '1', 'Wxpay');
INSERT INTO `goods_order` VALUES ('14', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', '1', null, 'test159247458345664895', '2020-06-18 18:03:03', '0', '3', '1', '1', 'Wxpay');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_sku
-- ----------------------------
INSERT INTO `goods_sku` VALUES ('1', '999', '5.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('2', '999', '6.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('3', '999', '6.00', '3', '{\"冰度\":\"冰\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('4', '999', '7.00', '3', '{\"冰度\":\"正常冰\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('5', '999', '9.00', '3', '{\"冰度\":\"热\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('6', '2', '34.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('7', '4', '23.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('8', '4', '3.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('9', '3', '22.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('10', '999', '9.00', '3', '{\"冰度\":\"热3432\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('11', '999', '9.00', '3', '{\"冰度\":\"热34343\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('12', '999', '9.00', '3', '{\"冰度\":\"热344\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('13', '999', '9.00', '3', '{\"冰度\":\"热wewe5\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('14', '999', '9.00', '3', '{\"冰度\":\"热346\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('15', '15', '15.00', '3', '{\"冰度\":\"热7\"}', '0000-00-00 00:00:00', '15');
INSERT INTO `goods_sku` VALUES ('16', '3', '1.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('17', '3', '2.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('18', '3', '3.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('19', '3', '4.00', '13', '{\"糖度\":\"半糖\",\"冰度\":\"100度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('20', '3', '5.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('21', '3', '6.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('22', '3', '7.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"第三\":\"七期\"}', '2020-03-07 15:25:09', '1');
INSERT INTO `goods_sku` VALUES ('23', '3', '8.00', '13', '{\"糖度\":\"多糖\",\"冰度\":\"100度\",\"第三\":\"威威\"}', '2020-03-07 15:25:09', '1');

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
INSERT INTO `user` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'CsJyKkJ3HwU1JbYEj+SsNA==', null, '2020-03-07 16:09:31', '2020-06-18 18:02:40', '33c5zVR41592474560115LDpnezT8', '2020-06-19 18:02:40', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null);

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
