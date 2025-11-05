# 倒班日历APP - 开发脚手架搭建指南

## 📦 环境准备

### 1. 安装Flutter SDK

#### macOS
```bash
# 使用Homebrew安装
brew install --cask flutter

# 或者手动下载
cd ~/development
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:`pwd`/flutter/bin"
```

#### Windows
```powershell
# 下载Flutter SDK
# https://docs.flutter.dev/get-started/install/windows

# 添加到环境变量 PATH
# C:\src\flutter\bin
```

#### Linux
```bash
cd ~/development
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:$HOME/development/flutter/bin"
```

### 2. 验证Flutter环境

```bash
flutter doctor -v
```

确保以下项目正常：
- ✅ Flutter SDK
- ✅ Android toolchain
- ✅ Xcode (macOS)
- ✅ VS Code / Android Studio
- ✅ Connected devices

### 3. 配置编辑器

#### VS Code插件
```bash
code --install-extension Dart-Code.dart-code
code --install-extension Dart-Code.flutter
code --install-extension alexisvt.flutter-snippets
```

#### Android Studio插件
- Flutter Plugin
- Dart Plugin

---

## 🏗️ 项目初始化

### 1. 创建Flutter项目

```bash
# 创建项目
flutter create shift_calendar \
  --org com.shiftcalendar \
  --description "A professional shift calendar app for shift workers" \
  --platforms android,ios

# 进入项目目录
cd shift_calendar
```

### 2. 项目结构调整

```bash
# 创建核心目录结构
mkdir -p lib/core/{constants,themes,utils,errors,extensions}
mkdir -p lib/data/{models,repositories,datasources/{local,remote},services}
mkdir -p lib/domain/{entities,repositories,usecases}
mkdir -p lib/presentation/{screens,widgets/{common,calendar},routes}

# 创建测试目录
mkdir -p test/{unit,widget,integration}

# 创建资源目录
mkdir -p assets/{images,icons,fonts}

# 创建文档目录
mkdir -p docs/{api,guides}
```

### 3. 配置pubspec.yaml

```yaml
name: shift_calendar
description: A professional shift calendar app for shift workers
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # 状态管理
  provider: ^6.1.1

  # 本地存储
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  shared_preferences: ^2.2.2
  path_provider: ^2.1.1

  # 日期和日历
  intl: ^0.18.1
  table_calendar: ^3.0.9

  # 通知
  flutter_local_notifications: ^16.3.0
  timezone: ^0.9.2

  # UI组件
  flutter_screenutil: ^5.9.0
  fluttertoast: ^8.2.4
  flutter_slidable: ^3.0.1

  # 图表
  fl_chart: ^0.66.0

  # 工具
  uuid: ^4.3.3
  logger: ^2.0.2+1

  # 网络（可选）
  dio: ^5.4.0

  # 安全存储
  flutter_secure_storage: ^9.0.0

  # 权限
  permission_handler: ^11.2.0

  # 图片
  cached_network_image: ^3.3.1

  # 国际化
  flutter_localizations:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter

  # 代码生成
  hive_generator: ^2.0.1
  build_runner: ^2.4.7

  # 代码规范
  flutter_lints: ^3.0.1

  # Mock测试
  mockito: ^5.4.4

  # 集成测试
  integration_test:
    sdk: flutter

flutter:
  uses-material-design: true

  assets:
    - assets/images/
    - assets/icons/

  fonts:
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700
```

### 4. 安装依赖

```bash
flutter pub get
```

---

## 📁 创建基础文件

### 1. 主题配置

创建 `lib/core/themes/app_theme.dart`:

```dart
import 'package:flutter/material.dart';

class AppTheme {
  // 颜色定义
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFFFF9800);

  // 浅色主题
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: Brightness.light,
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      filled: true,
    ),
  );

  // 深色主题
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: Brightness.dark,
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  );
}
```

### 2. 常量定义

创建 `lib/core/constants/app_constants.dart`:

```dart
class AppConstants {
  // 应用信息
  static const String appName = '倒班日历';
  static const String appVersion = '1.0.0';

  // 存储Key
  static const String keyThemeMode = 'theme_mode';
  static const String keyLanguage = 'language';
  static const String keyFirstLaunch = 'first_launch';

  // 数据库
  static const String hiveBoxShift = 'shifts';
  static const String hiveBoxSchedule = 'schedules';
  static const String hiveBoxSettings = 'settings';

  // 日期格式
  static const String dateFormatYMD = 'yyyy-MM-dd';
  static const String dateFormatFull = 'yyyy年MM月dd日';
  static const String timeFormat = 'HH:mm';

  // 限制
  static const int maxShiftNameLength = 20;
  static const int maxShiftCount = 50;
}
```

### 3. 工具类

创建 `lib/core/utils/date_helper.dart`:

```dart
import 'package:intl/intl.dart';

class DateHelper {
  /// 格式化日期
  static String formatDate(DateTime date, {String pattern = 'yyyy-MM-dd'}) {
    return DateFormat(pattern).format(date);
  }

  /// 获取当前日期（不含时间）
  static DateTime today() {
    final now = DateTime.now();
    return DateTime(now.year, now.month, now.day);
  }

  /// 判断是否为同一天
  static bool isSameDay(DateTime a, DateTime b) {
    return a.year == b.year && a.month == b.month && a.day == b.day;
  }

  /// 获取月份第一天
  static DateTime getFirstDayOfMonth(DateTime date) {
    return DateTime(date.year, date.month, 1);
  }

  /// 获取月份最后一天
  static DateTime getLastDayOfMonth(DateTime date) {
    return DateTime(date.year, date.month + 1, 0);
  }

  /// 获取两个日期之间的天数
  static int getDaysBetween(DateTime start, DateTime end) {
    return end.difference(start).inDays;
  }
}
```

### 4. 数据模型

创建 `lib/data/models/shift_model.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';

part 'shift_model.g.dart';

@HiveType(typeId: 0)
class ShiftModel extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String name;

  @HiveField(2)
  final String? startTime;

  @HiveField(3)
  final String? endTime;

  @HiveField(4)
  final int colorValue;

  @HiveField(5)
  final String? icon;

  @HiveField(6)
  final bool isRest;

  ShiftModel({
    required this.id,
    required this.name,
    this.startTime,
    this.endTime,
    required this.colorValue,
    this.icon,
    this.isRest = false,
  });

  Color get color => Color(colorValue);

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'startTime': startTime,
      'endTime': endTime,
      'colorValue': colorValue,
      'icon': icon,
      'isRest': isRest,
    };
  }

  factory ShiftModel.fromJson(Map<String, dynamic> json) {
    return ShiftModel(
      id: json['id'] as String,
      name: json['name'] as String,
      startTime: json['startTime'] as String?,
      endTime: json['endTime'] as String?,
      colorValue: json['colorValue'] as int,
      icon: json['icon'] as String?,
      isRest: json['isRest'] as bool? ?? false,
    );
  }
}
```

### 5. 应用入口

更新 `lib/main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:provider/provider.dart';

import 'core/themes/app_theme.dart';
import 'presentation/screens/home/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 初始化Hive
  await Hive.initFlutter();

  // 注册Hive适配器
  // Hive.registerAdapter(ShiftModelAdapter());

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp(
          title: '倒班日历',
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: ThemeMode.system,
          home: const HomeScreen(),
          debugShowCheckedModeBanner: false,
        );
      },
    );
  }
}
```

### 6. 首页框架

创建 `lib/presentation/screens/home/home_screen.dart`:

```dart
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const CalendarPage(),
    const ShiftPage(),
    const StatisticsPage(),
    const SettingsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.calendar_today_outlined),
            selectedIcon: Icon(Icons.calendar_today),
            label: '日历',
          ),
          NavigationDestination(
            icon: Icon(Icons.access_time_outlined),
            selectedIcon: Icon(Icons.access_time),
            label: '班次',
          ),
          NavigationDestination(
            icon: Icon(Icons.analytics_outlined),
            selectedIcon: Icon(Icons.analytics),
            label: '统计',
          ),
          NavigationDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings),
            label: '设置',
          ),
        ],
      ),
    );
  }
}

// 临时占位页面
class CalendarPage extends StatelessWidget {
  const CalendarPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('日历页面'));
  }
}

class ShiftPage extends StatelessWidget {
  const ShiftPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('班次页面'));
  }
}

class StatisticsPage extends StatelessWidget {
  const StatisticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('统计页面'));
  }
}

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('设置页面'));
  }
}
```

---

## 🔧 配置文件

### 1. analysis_options.yaml

```yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    # 代码风格
    - always_declare_return_types
    - always_require_non_null_named_parameters
    - annotate_overrides
    - avoid_print
    - avoid_unnecessary_containers
    - prefer_const_constructors
    - prefer_const_declarations
    - prefer_const_literals_to_create_immutables
    - prefer_final_fields
    - prefer_final_locals
    - require_trailing_commas
    - sort_constructors_first
    - use_key_in_widget_constructors

    # 错误处理
    - avoid_catches_without_on_clauses
    - avoid_catching_errors

    # 性能
    - avoid_function_literals_in_foreach_calls
    - use_to_and_as_if_applicable

analyzer:
  exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
  errors:
    invalid_annotation_target: ignore
```

### 2. .gitignore

```gitignore
# Miscellaneous
*.class
*.log
*.pyc
*.swp
.DS_Store
.atom/
.buildlog/
.history
.svn/
migrate_working_dir/

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# VS Code related
.vscode/

# Flutter/Dart/Pub related
**/doc/api/
**/ios/Flutter/.last_build_id
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
.packages
.pub-cache/
.pub/
/build/

# Symbolication related
app.*.symbols

# Obfuscation related
app.*.map.json

# Android Studio will place build artifacts here
/android/app/debug
/android/app/profile
/android/app/release

# iOS related
**/ios/**/*.mode1v3
**/ios/**/*.mode2v3
**/ios/**/*.moved-aside
**/ios/**/*.pbxuser
**/ios/**/*.perspectivev3
**/ios/**/*sync/
**/ios/**/.sconsign.dblite
**/ios/**/.tags*
**/ios/**/.vagrant/
**/ios/**/DerivedData/
**/ios/**/Icon?
**/ios/**/Pods/
**/ios/**/.symlinks/
**/ios/**/profile
**/ios/**/xcuserdata
**/ios/.generated/
**/ios/Flutter/App.framework
**/ios/Flutter/Flutter.framework
**/ios/Flutter/Flutter.podspec
**/ios/Flutter/Generated.xcconfig
**/ios/Flutter/ephemeral/
**/ios/Flutter/app.flx
**/ios/Flutter/app.zip
**/ios/Flutter/flutter_assets/
**/ios/Flutter/flutter_export_environment.sh
**/ios/ServiceDefinitions.json
**/ios/Runner/GeneratedPluginRegistrant.*

# Environment
.env
.env.*
```

---

## 🧪 测试框架

### 创建测试示例

创建 `test/unit/core/utils/date_helper_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:shift_calendar/core/utils/date_helper.dart';

void main() {
  group('DateHelper', () {
    test('formatDate should return correct format', () {
      final date = DateTime(2025, 1, 15);
      final result = DateHelper.formatDate(date);
      expect(result, '2025-01-15');
    });

    test('isSameDay should return true for same day', () {
      final date1 = DateTime(2025, 1, 15, 10, 30);
      final date2 = DateTime(2025, 1, 15, 14, 45);
      expect(DateHelper.isSameDay(date1, date2), true);
    });

    test('isSameDay should return false for different days', () {
      final date1 = DateTime(2025, 1, 15);
      final date2 = DateTime(2025, 1, 16);
      expect(DateHelper.isSameDay(date1, date2), false);
    });
  });
}
```

---

## ▶️ 运行项目

### 1. 生成代码（Hive适配器等）

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 2. 运行应用

```bash
# 运行调试版本
flutter run

# 运行发布版本
flutter run --release

# 指定设备
flutter run -d <device-id>
```

### 3. 运行测试

```bash
# 运行所有测试
flutter test

# 运行特定测试文件
flutter test test/unit/core/utils/date_helper_test.dart

# 测试覆盖率
flutter test --coverage
```

---

## 📱 平台特定配置

### Android配置

编辑 `android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 34

    defaultConfig {
        applicationId "com.shiftcalendar.shift_calendar"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            signingConfig signingConfigs.debug
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### iOS配置

编辑 `ios/Runner/Info.plist`:

```xml
<key>NSCalendarsUsageDescription</key>
<string>需要访问日历以创建排班提醒</string>
<key>NSRemindersUsageDescription</key>
<string>需要访问提醒以设置上班闹钟</string>
```

---

## 🚀 下一步

项目脚手架搭建完成后，可以开始：

1. ✅ 实现数据模型和本地存储
2. ✅ 开发日历视图组件
3. ✅ 实现班次管理功能
4. ✅ 添加智能排班算法
5. ✅ 集成通知提醒功能
6. ✅ 实现统计分析模块
7. ✅ 添加云端同步功能

详细开发计划请参考 `DEVELOPMENT_ROADMAP.md`

---

*文档创建时间：2025-11-05*
*版本：v1.0*
