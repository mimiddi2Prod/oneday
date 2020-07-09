/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-08 18:31:00
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
  `user_agent` varchar(255) DEFAULT NULL,
  `cate` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `order` varchar(255) DEFAULT NULL,
  `recommend` varchar(255) DEFAULT NULL,
  `navigation` varchar(255) DEFAULT NULL,
  `waterfall` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'youyueadmin', null, '2019-05-14 13:58:38', '2020-07-04 15:36:05', '0', null, 'cb1b43c3-1349-4ff4-9d6e-c762aed91a16', '2020-07-09 18:04:34', 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1', null, null, null, null, null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

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
INSERT INTO `category` VALUES ('9', 'dwq 111', 'xmspw', '0', '2020-06-19 11:30:16', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '989', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('2', '炒肉盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '999', '1', '1', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('3', '西红柿鸡蛋面', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '营养丰富', '1.00', 'xmspw', '1', '9966', '1', '0', '2020-07-02 11:07:18', '1');
INSERT INTO `goods` VALUES ('4', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '996', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('5', '鸡蛋盖浇饭带大家是大家', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '994', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('6', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '997', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('7', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '991', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('8', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '998', '1', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('9', '鸡蛋盖浇饭', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '营养丰富', '20.00', 'xmspw', '2', '999', '0', '2', '2019-07-17 17:14:50', '1');
INSERT INTO `goods` VALUES ('10', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '23.00', 'xmspw', '3', '316', '1', '43', '2019-07-30 18:10:19', '1');
INSERT INTO `goods` VALUES ('11', '阿文', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '32', '3.00', 'xmspw', '3', '44', '1', '43', '2019-07-30 18:16:02', '1');
INSERT INTO `goods` VALUES ('12', '他说他', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '特舒服', '3.00', 'xmspw', '3', '2443', '1', '3', '2019-07-30 18:19:45', '1');
INSERT INTO `goods` VALUES ('13', '1', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '2', '1.00', 'xmspw', '3', '991', '1', '1', '2020-03-07 15:25:09', '1');
INSERT INTO `goods` VALUES ('14', '借记卡金卡你2', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '环境开会看见', '10.00', 'xmspw', '2', '0', '1', '1', '2020-06-19 15:32:57', '1');
INSERT INTO `goods` VALUES ('15', '尽快把', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '开局良好开局', '10.00', 'xmspw', '2', '18', '1', '5', '2020-06-19 15:34:02', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------
INSERT INTO `goods_order` VALUES ('1', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', null, '1', null, 'test159246990466689087', '2020-06-18 16:45:05', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('2', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '17', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"威威\"}', '2.00', null, '5', null, 'test159246990466689087', '2020-06-18 16:45:05', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('3', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('4', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '10', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"热3432\"}', '9.00', null, '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('5', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159247043602471915', '2020-06-18 16:53:56', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('6', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('7', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '10', '3', '西红柿鸡蛋面', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"热3432\"}', '9.00', null, '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('8', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '7', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159247055887550258', '2020-06-18 16:55:59', '0', '0', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('9', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', null, '1', null, 'test159247124022795142', '2020-06-18 17:07:20', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('10', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', null, '1', null, 'test159247130313280011', '2020-06-18 17:08:23', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('11', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '16', '13', '1', '2', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"糖度\":\"半糖\",\"冰度\":\"50度\",\"第三\":\"七期\"}', '1.00', null, '1', null, 'test159247131318267986', '2020-06-18 17:08:33', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('12', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159247176581871184', '2020-06-18 17:16:06', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('13', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '8', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159247322292031447', '2020-06-18 17:40:23', '1', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('14', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '1', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159247458345664895', '2020-06-18 18:03:03', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('15', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '13', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热wewe5\"}', '222.00', null, '1', null, 'test159255193382189854', '2020-06-19 15:32:14', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('16', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '2', '2', '炒肉盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', null, '1', null, 'test159255193382189854', '2020-06-19 15:32:14', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('17', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '4', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159374653755060745', '2020-07-03 11:22:17', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('18', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159374653755060745', '2020-07-03 11:22:17', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('19', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384394354985515', '2020-07-04 14:25:43', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('20', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384394354985515', '2020-07-04 14:25:43', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('21', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384394426018495', '2020-07-04 14:25:44', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('22', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384394426018495', '2020-07-04 14:25:44', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('23', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384398468106411', '2020-07-04 14:26:25', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('24', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384398468106411', '2020-07-04 14:26:25', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('25', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384398544423766', '2020-07-04 14:26:25', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('26', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384398544423766', '2020-07-04 14:26:25', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('27', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384408399551332', '2020-07-04 14:28:04', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384408399551332', '2020-07-04 14:28:04', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('29', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384408473332641', '2020-07-04 14:28:05', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('30', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384408473332641', '2020-07-04 14:28:05', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('31', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384411709667736', '2020-07-04 14:28:37', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('32', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384411709667736', '2020-07-04 14:28:37', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('33', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384411776921576', '2020-07-04 14:28:38', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('34', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384411776921576', '2020-07-04 14:28:38', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('35', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384419986577280', '2020-07-04 14:30:00', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('36', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384419986577280', '2020-07-04 14:30:00', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('37', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384420061893976', '2020-07-04 14:30:01', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('38', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384420061893976', '2020-07-04 14:30:01', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('39', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384423824936175', '2020-07-04 14:30:38', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('40', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384423824936175', '2020-07-04 14:30:38', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('41', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '12', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热344\"}', '9.00', null, '1', null, 'test159384604555200647', '2020-07-04 15:00:46', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('42', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '5', '鸡蛋盖浇饭带大家是大家', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '2', null, 'test159384604555200647', '2020-07-04 15:00:46', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('43', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '14', '借记卡金卡你2', '环境开会看见', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_32_31_0.png', '\"\"', '10.00', null, '1', null, 'test159384604555200647', '2020-07-04 15:00:46', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('44', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '2', '2', '炒肉盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '6.00', null, '1', null, 'test159384604555200647', '2020-07-04 15:00:46', '0', '3', '1', '1', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('45', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159384676966617318', '2020-07-04 15:12:50', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('46', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '12', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热344\"}', '9.00', null, '1', null, 'test159384676966617318', '2020-07-04 15:12:50', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('47', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707164723', '2020-07-07 16:47:23', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('48', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707164910', '2020-07-07 16:49:10', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('49', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707165015', '2020-07-07 16:50:15', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('50', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '4', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411394587684819', '2020-07-07 17:25:46', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('51', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411394587684819', '2020-07-07 17:25:46', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('52', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '4', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411410954148592', '2020-07-07 17:28:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('53', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411410954148592', '2020-07-07 17:28:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('54', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159411410954148592', '2020-07-07 17:28:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('55', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '11', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热34343\"}', '9.00', null, '1', null, 'test159411410954148592', '2020-07-07 17:28:30', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('56', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '4', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411432716143464', '2020-07-07 17:32:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('57', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '6', '鸡蛋盖浇饭', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411432716143464', '2020-07-07 17:32:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('58', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159411432716143464', '2020-07-07 17:32:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('59', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '11', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热34343\"}', '9.00', null, '1', null, 'test159411432716143464', '2020-07-07 17:32:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('60', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '3', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"冰\"}', '6.00', null, '1', null, 'test159411438730422119', '2020-07-07 17:33:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('61', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '12', '3', '西红柿鸡蛋面', '营养丰富', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热344\"}', '9.00', null, '1', null, 'test159411438730422119', '2020-07-07 17:33:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('62', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '0', '5', '鸡蛋盖浇饭带大家是大家', '营养丰富', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '\"\"', '20.00', null, '1', null, 'test159411438730422119', '2020-07-07 17:33:07', '0', '3', '1', '0', 'Wxpay', null);
INSERT INTO `goods_order` VALUES ('63', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '3', null, '20200707175645', '2020-07-07 17:56:45', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('64', '', '4', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"正常冰\"}', '7.00', null, '1', null, '20200707175645', '2020-07-07 17:56:45', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('65', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707180424', '2020-07-07 18:04:24', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('66', '', '11', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热34343\"}', '9.00', null, '1', null, '20200707180424', '2020-07-07 18:04:24', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('67', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '6', null, '20200707182051', '2020-07-07 18:20:51', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('68', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '8', null, '20200707182117', '2020-07-07 18:21:17', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('69', '', '14', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热346\"}', '9.00', null, '1', null, '20200707182117', '2020-07-07 18:21:17', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('70', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707184417', '2020-07-07 18:44:17', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('71', '', '0', '1', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', null, '2', null, '20200707184417', '2020-07-07 18:44:17', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('72', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, '20200707184752', '2020-07-07 18:47:52', '0', '0', '0', '0', '', '2');
INSERT INTO `goods_order` VALUES ('73', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', null, '1', null, '20200707184752', '2020-07-07 18:47:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('74', '', '24', '15', '尽快把', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_15_33_17_0.jpg', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '10.00', null, '1', null, '20200707184752', '2020-07-07 18:47:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('75', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', null, '2', null, '20200707184752', '2020-07-07 18:47:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('76', '', '0', '5', '鸡蛋盖浇饭带大家是大家', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', null, '1', null, '20200707184752', '2020-07-07 18:47:52', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('77', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, 'sz20200708143348', '2020-07-08 14:33:48', '0', '0', '0', '0', '', '1');
INSERT INTO `goods_order` VALUES ('78', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '2', null, 'sz20200708143506', '2020-07-08 14:35:06', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('79', '', '0', '1', '鸡蛋盖浇饭', '', 'http://yanyanqiniu.youyueworld.com/goods_2019_12_24_15_40_57_0.jpg', '', '20.00', null, '2', null, 'sz20200708143506', '2020-07-08 14:35:06', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('80', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '1', null, 'sz20200708145314', '2020-07-08 14:53:14', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('81', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '1', null, 'sz20200708145856', '2020-07-08 14:58:56', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('82', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', null, '1', null, 'sz20200708145856', '2020-07-08 14:58:56', '0', '0', '0', '0', '', null);
INSERT INTO `goods_order` VALUES ('83', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '1.00', '1', null, 'sz20200708150026', '2020-07-08 15:00:26', '0', '0', '0', '0', '', '1');
INSERT INTO `goods_order` VALUES ('84', '', '15', '3', '西红柿鸡蛋面', '', 'http://onedayqiniu.minidope.com/goods_2020_6_19_11_21_11_0.png', '{\"冰度\":\"热7\"}', '1.00', '0.90', '3', null, 'sz20200708150026', '2020-07-08 15:00:26', '0', '0', '0', '0', '', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_sku
-- ----------------------------
INSERT INTO `goods_sku` VALUES ('1', '999', '5.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"半糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('2', '999', '6.00', '2', '{\"冰度\":\"冰\",\"甜度\":\"无糖\"}', '0000-00-00 00:00:00', '0');
INSERT INTO `goods_sku` VALUES ('3', '999', '6.00', '3', '{\"冰度\":\"冰\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('4', '999', '7.00', '3', '{\"冰度\":\"正常冰\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('5', '999', '9.00', '3', '{\"冰度\":\"热\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('6', '2', '34.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('7', '4', '23.00', '12', '{\"糖度\":\"多糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('8', '4', '3.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"50度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('9', '3', '22.00', '12', '{\"糖度\":\"单糖\",\"冰度\":\"100度\"}', '2019-07-30 18:19:45', '1');
INSERT INTO `goods_sku` VALUES ('10', '999', '9.00', '3', '{\"冰度\":\"热3432\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('11', '999', '9.00', '3', '{\"冰度\":\"热34343\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('12', '999', '9.00', '3', '{\"冰度\":\"热344\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('13', '999', '222.00', '3', '{\"冰度\":\"热wewe5\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('14', '999', '9.00', '3', '{\"冰度\":\"热346\"}', '2020-07-02 11:07:18', '1');
INSERT INTO `goods_sku` VALUES ('15', '15', '1.00', '3', '{\"冰度\":\"热7\"}', '2020-07-02 11:07:18', '1');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('206', 'test159384423824936175', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[39,40]', '2', '16.00', '16.00', '1', 'Wxpay', '2020-07-04 14:30:38', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('207', 'test159384604555200647', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[41,42,43,44]', '5', '65.00', '65.00', '1', 'Wxpay', '2020-07-04 15:00:46', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('208', 'test159384676966617318', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[45,46]', '2', '15.00', '15.00', '1', 'Wxpay', '2020-07-04 15:12:50', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('211', 'test159411394587684819', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[50,51]', '2', '40.00', '40.00', '0', 'Wxpay', '2020-07-07 17:25:46', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('212', 'test159411410954148592', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[52,53,54,55]', '4', '55.00', '55.00', '0', 'Wxpay', '2020-07-07 17:28:30', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('213', 'test159411432716143464', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[56,57,58,59]', '4', '55.00', '55.00', '0', 'Wxpay', '2020-07-07 17:32:07', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('214', 'test159411438730422119', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', '1', '[60,61,62]', '3', '35.00', '35.00', '0', 'Wxpay', '2020-07-07 17:33:07', '0000-00-00 00:00:00', '0', '3', '1', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('220', '20200707184752', '', '2', '[72,73,74,75,76]', '7', '80.90', '72.81', '1', '支付宝', '2020-07-07 18:47:52', '2020-07-07 18:47:52', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null);
INSERT INTO `goods_trade` VALUES ('221', 'sz20200708143348', '', '2', '[77]', '2', '2.00', '0.00', '1', '现金', '2020-07-08 14:33:48', '2020-07-08 14:33:48', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null);
INSERT INTO `goods_trade` VALUES ('222', 'sz20200708143506', '', '2', '[78,79]', '4', '42.00', '42.00', '1', '现金', '2020-07-08 14:35:06', '2020-07-08 14:35:06', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '1', '我要反结账拉');
INSERT INTO `goods_trade` VALUES ('223', 'sz20200708145314', '', '2', '[80]', '1', '0.90', '0.90', '1', '现金', '2020-07-08 14:53:14', '2020-07-08 14:53:14', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('224', 'sz20200708145856', '', '2', '[81,82]', '2', '1.90', '1.90', '1', '现金', '2020-07-08 14:58:56', '2020-07-08 14:58:56', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null);
INSERT INTO `goods_trade` VALUES ('225', 'sz20200708150026', '', '2', '[83,84]', '4', '3.70', '3.33', '1', '现金', '2020-07-08 15:00:26', '2020-07-08 15:00:26', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, '2', null);

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
INSERT INTO `user` VALUES ('28', 'o1ocv5ektU9hHLmbWQ0DFwN9I9OE', 'P7XZ1ZY0PsF2fJeBLyRzUw==', null, '2020-03-07 16:09:31', '2020-07-07 17:32:40', 'eMaTmCuf15941143608080eOnMJXZ', '2020-07-08 17:32:40', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/', null, null, null, null, null, null);

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
