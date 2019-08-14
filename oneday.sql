/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : oneday

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2019-08-14 15:03:53
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of restaurant_user
-- ----------------------------
INSERT INTO `restaurant_user` VALUES ('2', 'oTapG43y69Y_L_RWRDESkAgzBy4Y', '', null, null, '2019-07-19 17:42:09', '7Xa0Lt0bYxhdbHt8XusZTw==', '2019-08-01 15:52:43', null, '0');
INSERT INTO `restaurant_user` VALUES ('3', 'oVSyv4gm5CHUKH7O8MOYkX7ssVhI', '', null, null, '2019-08-02 14:58:46', '0CjHc1nbiv/IbHj87r5v+Q==', '2019-08-14 10:24:22', null, '0');

-- ----------------------------
-- Table structure for shop_ad
-- ----------------------------
DROP TABLE IF EXISTS `shop_ad`;
CREATE TABLE `shop_ad` (
  `id` int(12) NOT NULL,
  `type` int(1) NOT NULL,
  `url` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `sort` int(4) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(4) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_ad
-- ----------------------------

-- ----------------------------
-- Table structure for shop_address
-- ----------------------------
DROP TABLE IF EXISTS `shop_address`;
CREATE TABLE `shop_address` (
  `id` int(11) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `tel` varchar(16) NOT NULL,
  `province` text NOT NULL,
  `city` text NOT NULL,
  `area` text NOT NULL,
  `road` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_address
-- ----------------------------

-- ----------------------------
-- Table structure for shop_brand
-- ----------------------------
DROP TABLE IF EXISTS `shop_brand`;
CREATE TABLE `shop_brand` (
  `id` int(12) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  `describe` text NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_brand
-- ----------------------------

-- ----------------------------
-- Table structure for shop_cart
-- ----------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `goods_param_id_1` int(12) NOT NULL,
  `goods_param_id_2` int(12) NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_cart
-- ----------------------------

-- ----------------------------
-- Table structure for shop_category
-- ----------------------------
DROP TABLE IF EXISTS `shop_category`;
CREATE TABLE `shop_category` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `parent_id` int(16) NOT NULL,
  `type` int(1) NOT NULL,
  `home_nav` int(1) NOT NULL,
  `sort` int(4) NOT NULL,
  `describe` text,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_category
-- ----------------------------

-- ----------------------------
-- Table structure for shop_goods
-- ----------------------------
DROP TABLE IF EXISTS `shop_goods`;
CREATE TABLE `shop_goods` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `min_price` decimal(10,2) NOT NULL,
  `stock` varchar(255) NOT NULL,
  `describe` text NOT NULL,
  `type` int(2) NOT NULL COMMENT '0 goods 1 topic',
  `goods_info` text NOT NULL,
  `sort` int(12) NOT NULL,
  `status` int(1) NOT NULL,
  `specification_id_1` int(12) NOT NULL,
  `specification_id_2` int(12) NOT NULL,
  `category_id` int(16) NOT NULL,
  `brand_id` int(16) NOT NULL,
  `review_id` int(16) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  `location_code` varchar(255) NOT NULL,
  `integral_price` int(10) NOT NULL,
  `group_id` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_goods
-- ----------------------------

-- ----------------------------
-- Table structure for shop_goods_param
-- ----------------------------
DROP TABLE IF EXISTS `shop_goods_param`;
CREATE TABLE `shop_goods_param` (
  `id` int(12) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `specification_id` int(12) NOT NULL,
  `param` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_goods_param
-- ----------------------------

-- ----------------------------
-- Table structure for shop_goods_price
-- ----------------------------
DROP TABLE IF EXISTS `shop_goods_price`;
CREATE TABLE `shop_goods_price` (
  `id` int(12) NOT NULL,
  `param_id_1` int(12) NOT NULL,
  `param_id_2` int(12) NOT NULL,
  `stock` int(16) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_goods_price
-- ----------------------------

-- ----------------------------
-- Table structure for shop_group_buy
-- ----------------------------
DROP TABLE IF EXISTS `shop_group_buy`;
CREATE TABLE `shop_group_buy` (
  `id` int(64) NOT NULL,
  `goods_id` int(64) NOT NULL,
  `founded` int(1) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_group_buy
-- ----------------------------

-- ----------------------------
-- Table structure for shop_order
-- ----------------------------
DROP TABLE IF EXISTS `shop_order`;
CREATE TABLE `shop_order` (
  `id` int(12) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `param_id_1` int(12) NOT NULL,
  `param_id_2` int(12) NOT NULL,
  `param_1` varchar(255) NOT NULL,
  `param_2` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `number` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(2) NOT NULL,
  `after_sale_status` int(2) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `address_text` varchar(255) NOT NULL,
  `tel` varchar(16) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `single_price` decimal(10,2) NOT NULL,
  `postage` decimal(10,2) NOT NULL,
  `trade_id` varchar(32) NOT NULL,
  `logistics_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_order
-- ----------------------------

-- ----------------------------
-- Table structure for shop_paid
-- ----------------------------
DROP TABLE IF EXISTS `shop_paid`;
CREATE TABLE `shop_paid` (
  `id` int(12) NOT NULL,
  `goods_price_id` int(12) NOT NULL,
  `number` int(12) NOT NULL,
  `status` int(12) NOT NULL,
  `order_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_paid
-- ----------------------------

-- ----------------------------
-- Table structure for shop_review
-- ----------------------------
DROP TABLE IF EXISTS `shop_review`;
CREATE TABLE `shop_review` (
  `id` int(12) NOT NULL,
  `url` varchar(255) NOT NULL,
  `best_review_detail_id` int(12) NOT NULL,
  `review_detail_count` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_review
-- ----------------------------

-- ----------------------------
-- Table structure for shop_review_detail
-- ----------------------------
DROP TABLE IF EXISTS `shop_review_detail`;
CREATE TABLE `shop_review_detail` (
  `id` int(12) NOT NULL,
  `text` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `param_id_1` int(12) NOT NULL,
  `param_id_2` int(12) NOT NULL,
  `param_1` varchar(255) NOT NULL,
  `param_2` varchar(255) NOT NULL,
  `goods_id` int(12) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_review_detail
-- ----------------------------

-- ----------------------------
-- Table structure for shop_specification
-- ----------------------------
DROP TABLE IF EXISTS `shop_specification`;
CREATE TABLE `shop_specification` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_specification
-- ----------------------------

-- ----------------------------
-- Table structure for shop_specification_param
-- ----------------------------
DROP TABLE IF EXISTS `shop_specification_param`;
CREATE TABLE `shop_specification_param` (
  `id` int(64) NOT NULL,
  `specification_id` int(64) NOT NULL,
  `param` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_specification_param
-- ----------------------------

-- ----------------------------
-- Table structure for shop_user
-- ----------------------------
DROP TABLE IF EXISTS `shop_user`;
CREATE TABLE `shop_user` (
  `id` int(12) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `open_id` varchar(64) NOT NULL,
  `register_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_login_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `avatar` varchar(255) NOT NULL,
  `address_id` varchar(255) DEFAULT NULL,
  `integral` int(64) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_user
-- ----------------------------
INSERT INTO `shop_user` VALUES ('0', '%E3%80%82%E3%80%82%E3%80%82', 'oHjV85X-ld1eKTRDPd3HjMW2_CxY', '2019-08-13 18:45:08', '2019-08-14 10:37:09', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKicggrszbOFRE5siciaIFjUAYWiacpClj4saVxfFuSp0hibQTOG2vPN3zAALibxOyuEibhAxntqS8uMUekQ/132', null, '0', '');

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
