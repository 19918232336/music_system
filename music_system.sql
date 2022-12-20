/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : music_system

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 02/12/2022 17:46:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL COMMENT '用户id',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `parents_id` int(0) NOT NULL DEFAULT 0 COMMENT '父级评论id',
  `reply_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '回复用户的用户名',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES (18, 2, '你好', 0, NULL, '2022-12-02 08:40:38', '2022-12-02 08:40:38');

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '封面地址',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '歌名',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作者',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '歌曲地址',
  `duration` double NOT NULL DEFAULT 0 COMMENT '时长',
  `view` int(0) NOT NULL DEFAULT 0 COMMENT '浏览量',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES (32, '5ed51215085ae960265727c08.jpg', '七里香', '周杰伦', '5ed51215085ae960265727c07.mp3', 297, 6, '2022-12-02 08:36:04', '2022-12-02 09:21:08');
INSERT INTO `music` VALUES (33, '5ed51215085ae960265727c09.jpg', '稻香', '周杰伦', '5ed51215085ae960265727c0a.mp3', 222, 2, '2022-12-02 08:36:51', '2022-12-02 09:20:08');
INSERT INTO `music` VALUES (34, '5ed51215085ae960265727c0c.jpg', '以父之名', '周杰伦', '5ed51215085ae960265727c0b.mp3', 362, 1, '2022-12-02 08:37:38', '2022-12-02 08:37:38');
INSERT INTO `music` VALUES (35, '5ed51215085ae960265727c0d.jpg', '千里之外', '周杰伦', '5ed51215085ae960265727c0e.mp3', 271, 1, '2022-12-02 08:38:30', '2022-12-02 08:38:30');
INSERT INTO `music` VALUES (36, '5ed51215085ae960265727c10.jpg', '青花瓷', '周杰伦', '5ed51215085ae960265727c0f.mp3', 242, 1, '2022-12-02 08:39:09', '2022-12-02 08:39:09');
INSERT INTO `music` VALUES (37, '5ed51215085ae960265727c11.jpg', '晴天', '周杰伦', '5ed51215085ae960265727c12.mp3', 270, 2, '2022-12-02 08:39:51', '2022-12-02 09:26:47');

-- ----------------------------
-- Table structure for music_tags
-- ----------------------------
DROP TABLE IF EXISTS `music_tags`;
CREATE TABLE `music_tags`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tag_id` int(0) NOT NULL COMMENT '标签id',
  `music_id` int(0) NOT NULL COMMENT '歌曲id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `music_id`(`music_id`) USING BTREE,
  INDEX `tag_id`(`tag_id`) USING BTREE,
  CONSTRAINT `music_tags_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `music_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of music_tags
-- ----------------------------
INSERT INTO `music_tags` VALUES (7, 25, 32, '2022-12-02 08:36:04', '2022-12-02 08:36:04');
INSERT INTO `music_tags` VALUES (8, 25, 33, '2022-12-02 08:36:52', '2022-12-02 08:36:52');
INSERT INTO `music_tags` VALUES (9, 25, 34, '2022-12-02 08:37:38', '2022-12-02 08:37:38');
INSERT INTO `music_tags` VALUES (10, 24, 35, '2022-12-02 08:38:30', '2022-12-02 08:38:30');
INSERT INTO `music_tags` VALUES (11, 24, 36, '2022-12-02 08:39:09', '2022-12-02 08:39:09');
INSERT INTO `music_tags` VALUES (12, 24, 37, '2022-12-02 08:39:51', '2022-12-02 08:39:51');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资讯标题',
  `content` varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资讯内容',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (23, '周杰伦在线唱歌获10亿点赞 线上演唱会才是未来？', '上周末，三场线上演唱会同时在三大不同平台上演，让原本枯燥的周末变得热闹非常。\n\n当天，天王周杰伦在快手举办首场线上演唱会，流量小生鹿晗则是在腾讯TME平台举办了近四年来的首次演唱会，抖音也是不甘示弱邀请了个人风格极其强烈的腾格尔热血开唱。当天的微博热搜榜更是直接被三人线上演唱会相关消息直接霸榜。\n\n这三场演唱会的受众覆盖了包括00后、90后、80后以及70后等多个年龄层次，不少人当天更是表示恨不得多长几个耳朵，这样就能把所有演唱会全听一遍了。\n\n而在演唱会结束后，各家粉丝也是开始争论谁的演唱会更受欢迎。与粉丝们喋喋不休的争论一起出现的，还有短视频平台流量的暴增。\n\n以周杰伦当天的演唱会数据来看，这场快手独家的周杰伦首场线上演唱会预约人数超2883万，最高同时在线人数超1129万，总点赞数更是高达10.5亿，直接创下快手在线音乐会新纪录。值得一提的是，演唱会热度的高涨，也将周杰伦的快手账号粉丝数带至5300万。', '2022-12-02 08:44:21', '2022-12-02 08:44:21');

-- ----------------------------
-- Table structure for recommends
-- ----------------------------
DROP TABLE IF EXISTS `recommends`;
CREATE TABLE `recommends`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `music_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '歌曲id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommends
-- ----------------------------
INSERT INTO `recommends` VALUES (1, '32', '2022-12-02 16:50:38', '2022-12-02 16:50:40');
INSERT INTO `recommends` VALUES (2, '34', '2022-12-02 16:50:52', '2022-12-02 16:50:57');
INSERT INTO `recommends` VALUES (3, '37', '2022-12-02 16:51:12', '2022-12-02 16:51:17');
INSERT INTO `recommends` VALUES (4, '36', '2022-12-02 16:51:28', '2022-12-02 16:51:31');
INSERT INTO `recommends` VALUES (5, '33', '2022-12-02 16:51:43', '2022-12-02 16:51:45');

-- ----------------------------
-- Table structure for swipers
-- ----------------------------
DROP TABLE IF EXISTS `swipers`;
CREATE TABLE `swipers`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '封面路径',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of swipers
-- ----------------------------
INSERT INTO `swipers` VALUES (12, '5ed51215085ae960265727c13.jpg', '2022-12-02 08:48:44', '2022-12-02 08:48:44');
INSERT INTO `swipers` VALUES (13, '5ed51215085ae960265727c14.jpg', '2022-12-02 08:48:53', '2022-12-02 08:48:53');
INSERT INTO `swipers` VALUES (14, '5ed51215085ae960265727c15.jpg', '2022-12-02 08:48:59', '2022-12-02 08:48:59');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标签名',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (24, '华语', '2022-12-02 08:35:20', '2022-12-02 08:35:20');
INSERT INTO `tags` VALUES (25, '流行', '2022-12-02 08:35:26', '2022-12-02 08:35:26');

-- ----------------------------
-- Table structure for user_musics
-- ----------------------------
DROP TABLE IF EXISTS `user_musics`;
CREATE TABLE `user_musics`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL COMMENT '用户id',
  `music_id` int(0) NOT NULL COMMENT '歌曲id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_musics
-- ----------------------------
INSERT INTO `user_musics` VALUES (18, 12, 32, '2022-12-02 09:19:08', '2022-12-02 09:19:08');
INSERT INTO `user_musics` VALUES (19, 12, 33, '2022-12-02 09:19:11', '2022-12-02 09:19:11');
INSERT INTO `user_musics` VALUES (20, 12, 34, '2022-12-02 09:19:12', '2022-12-02 09:19:12');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '头像地址',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `permissions` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为管理员',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '5ed51215085ae960265727c03.jpg', 'admin', 'admin', 1, '2022-11-19 05:26:38', '2022-12-02 08:32:49');
INSERT INTO `users` VALUES (12, '5ed51215085ae960265727c04.jpg', 'user', 'user', 0, '2022-12-02 08:33:48', '2022-12-02 08:33:48');

SET FOREIGN_KEY_CHECKS = 1;
