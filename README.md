# 倒班日历 APP - 开发项目文档

<div align="center">

![Flutter](https://img.shields.io/badge/Flutter-3.0+-blue.svg)
![Dart](https://img.shields.io/badge/Dart-3.0+-blue.svg)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**一款专为倒班工作者设计的智能排班日历应用**

[功能特性](#功能特性) • [项目文档](#项目文档) • [快速开始](#快速开始) • [开发计划](#开发计划)

</div>

---

## 📖 项目简介

倒班日历是一款专为需要倒班工作的人群设计的智能日历应用，支持自动排班、智能提醒、统计分析等功能。使用 Flutter 框架开发，支持 iOS 和 Android 双平台。

### 🎯 目标用户

- 👨‍⚕️ 医护人员（医生、护士）
- 👷 制造业工人（钢铁厂、化工厂）
- 👮 公安消防人员
- 🚇 交通运输从业者（地铁、高铁、航空）
- 💼 客服行业人员
- 🔧 其他需要倒班的工作者

---

## ✨ 功能特性

### 核心功能

#### 📅 智能排班
- ✅ 自动周期排班（一键生成全年班表）
- ✅ 自定义排班规则
- ✅ 拖拽调整班次
- ✅ 批量修改功能
- ✅ 快速换班

#### 🗓️ 多视图日历
- ✅ 月视图（主视图）
- ✅ 周视图
- ✅ 日视图
- ✅ 列表视图
- ✅ 农历与节假日显示

#### ⏰ 智能提醒
- ✅ 根据班次自动设置闹钟
- ✅ 提前提醒（可自定义时间）
- ✅ 自定义铃声
- ✅ 振动模式
- ✅ 条件提醒

#### 🎨 班次管理
- ✅ 自定义班次类型
- ✅ 班次颜色和图标
- ✅ 班次时间设置
- ✅ 班次模板
- ✅ 休息日标记

#### 📊 统计分析
- ✅ 工作日统计
- ✅ 休息日统计
- ✅ 夜班次数统计
- ✅ 工时统计
- ✅ 可视化图表

#### 📝 记事备忘
- ✅ 每日记事
- ✅ 待办事项
- ✅ 重要事件标记
- ✅ 倒数日提醒

#### 🔄 数据管理
- ✅ 本地数据存储
- ✅ 数据备份与恢复
- ✅ 数据导入导出
- ⭕ 云端同步（计划中）

#### 🤝 分享协作
- ✅ 班表截图分享
- ✅ 二维码分享
- ⭕ 同事换班申请（计划中）
- ⭕ 组织内班表共享（计划中）

---

## 📚 项目文档

本项目包含完整的开发文档，帮助你快速上手：

| 文档 | 说明 | 链接 |
|------|------|------|
| 📋 项目分析 | 竞品分析、功能设计、技术选型 | [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) |
| 📐 开发规范 | 代码规范、命名规范、Git工作流 | [DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md) |
| 🏗️ 搭建指南 | 环境配置、项目初始化、脚手架 | [SETUP_GUIDE.md](./SETUP_GUIDE.md) |
| 🗺️ 开发路线图 | 详细任务清单、时间规划、里程碑 | [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) |

### 文档概览

#### 1. 项目分析文档
深入分析了三款参考应用（倒班助手、排班日历、指尖时光），总结核心功能点，设计了完整的功能模块和技术架构。

#### 2. 开发规范文档
涵盖了代码规范、项目结构、Git工作流、命名规范、注释规范、测试规范、UI/UX规范、性能优化、安全规范和发布规范等10大部分。

#### 3. 搭建指南文档
详细的开发环境准备、项目初始化、目录结构搭建、依赖配置、基础文件创建等步骤说明。

#### 4. 开发路线图文档
包含14周的详细开发计划，分为5个阶段，超过200项具体任务，帮助你有序推进项目开发。

---

## 🚀 快速开始

### 环境要求

- Flutter SDK: 3.0+
- Dart SDK: 3.0+
- Android Studio / VS Code
- iOS: macOS + Xcode
- Android: Android SDK

### 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd shift_calendar

# 2. 安装依赖
flutter pub get

# 3. 生成代码（Hive适配器等）
flutter pub run build_runner build --delete-conflicting-outputs

# 4. 运行项目
flutter run
```

### 测试

```bash
# 运行所有测试
flutter test

# 测试覆盖率
flutter test --coverage

# 运行集成测试
flutter test integration_test
```

### 构建发布版本

```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# iOS
flutter build ios --release
```

---

## 🏗️ 技术架构

### 技术栈

| 类别 | 技术选型 |
|------|---------|
| 框架 | Flutter 3.0+ |
| 语言 | Dart 3.0+ |
| 架构 | Clean Architecture + MVVM |
| 状态管理 | Provider / Riverpod |
| 本地存储 | Hive + SharedPreferences |
| 通知 | flutter_local_notifications |
| 日历组件 | table_calendar |
| 图表 | fl_chart |

### 项目结构

```
lib/
├── core/              # 核心层（常量、主题、工具）
├── data/              # 数据层（模型、仓库、数据源）
├── domain/            # 领域层（实体、用例）
└── presentation/      # 表现层（页面、组件、状态管理）
```

详细架构设计请查看 [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)

---

## 📅 开发计划

### 开发阶段

| 阶段 | 周期 | 主要内容 | 状态 |
|------|------|---------|------|
| 阶段一 | Week 1-2 | 基础框架搭建 | 📋 规划中 |
| 阶段二 | Week 3-6 | 核心功能开发 | 📋 规划中 |
| 阶段三 | Week 7-10 | 高级功能开发 | 📋 规划中 |
| 阶段四 | Week 11-12 | 优化与测试 | 📋 规划中 |
| 阶段五 | Week 13-14 | 发布准备 | 📋 规划中 |

### 里程碑

- **M1**: 基础框架完成（Week 2）
- **M2**: 核心功能完成（Week 6）
- **M3**: 完整功能开发（Week 10）
- **M4**: 测试优化完成（Week 12）
- **M5**: 正式发布（Week 14）

详细开发计划请查看 [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)

---

## 🎨 设计规范

### UI/UX原则

- 🎯 简洁直观：一目了然的班次信息
- 🎨 个性定制：支持自定义主题和颜色
- 📱 操作便捷：最少点击完成核心操作
- ♿ 无障碍：支持大字体、高对比度

### 主色调

```dart
primary: Color(0xFF2196F3)      // 蓝色
secondary: Color(0xFFFF9800)    // 橙色
success: Color(0xFF4CAF50)      // 绿色
warning: Color(0xFFFF9800)      // 橙色
error: Color(0xFFF44336)        // 红色
```

---

## 🧪 测试要求

### 测试覆盖率

- 单元测试覆盖率：≥ 80%
- 核心业务逻辑：100%
- Widget测试：关键流程
- 集成测试：完整业务流程

### 测试类型

```bash
test/
├── unit/              # 单元测试
├── widget/            # Widget测试
└── integration/       # 集成测试
```

---

## 📦 依赖管理

### 主要依赖

```yaml
# 状态管理
provider: ^6.1.1

# 本地存储
hive: ^2.2.3
hive_flutter: ^1.1.0

# 日历
table_calendar: ^3.0.9

# 通知
flutter_local_notifications: ^16.3.0

# UI组件
flutter_screenutil: ^5.9.0

# 图表
fl_chart: ^0.66.0
```

完整依赖列表请查看 [pubspec.yaml](./pubspec.yaml)

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### Commit规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

详细规范请查看 [DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md)

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

---

## 👥 团队

- **项目负责人**: [Your Name]
- **开发团队**: [Team Members]

---

## 📞 联系方式

- 项目地址: [GitHub Repository]
- 问题反馈: [GitHub Issues]
- 邮箱: [your-email@example.com]

---

## 🙏 致谢

感谢以下开源项目和参考应用：

- [Flutter](https://flutter.dev/)
- [Dart](https://dart.dev/)
- [Material Design](https://material.io/)
- 倒班助手 App
- 排班日历 App
- 指尖时光 App

---

## 📈 项目进展

[![GitHub stars](https://img.shields.io/github/stars/yourusername/shift_calendar?style=social)](https://github.com/yourusername/shift_calendar)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/shift_calendar?style=social)](https://github.com/yourusername/shift_calendar)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/shift_calendar)](https://github.com/yourusername/shift_calendar/issues)

---

## 🗺️ 路线图

### V1.0 (当前开发中)
- ✅ 基础框架
- ✅ 核心功能
- 🔄 高级功能
- 📋 测试优化

### V1.1 (计划中)
- 云端同步
- 性能优化
- 用户反馈改进

### V2.0 (未来规划)
- AI智能推荐
- 社交组织功能
- Web版本
- 桌面小组件

---

<div align="center">

**让倒班管理变得简单高效！**

Made with ❤️ by [Your Team]

</div>
