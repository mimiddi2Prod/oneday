/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : od_jolly

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2020-07-26 18:08:18
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods_order
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_trade
-- ----------------------------
INSERT INTO `goods_trade` VALUES ('23', '20200726180319', '', '2', '[27]', '100', '1.00', '1.00', '0.75', '1', '余额', '2020-07-26 18:03:19', '2020-07-26 18:03:19', '0', '0', '0', null, null, '0000-00-00 00:00:00', null, null, '0', null, null, null, '1001', null, '', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of home_data
-- ----------------------------
INSERT INTO `home_data` VALUES ('6', '2020-07-26', '0.00', '0.00', '0.00', '0', '0.00', '0', '0', '0', '0.00', '0.00', '0', '0.00', '0.75', '1', '0.00', '0', '0.75');

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
