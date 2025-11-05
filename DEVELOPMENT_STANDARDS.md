# 倒班日历APP - 开发执行规范

## 📋 目录

1. [代码规范](#代码规范)
2. [项目结构规范](#项目结构规范)
3. [Git工作流规范](#git工作流规范)
4. [命名规范](#命名规范)
5. [注释规范](#注释规范)
6. [测试规范](#测试规范)
7. [UI/UX规范](#uiux规范)
8. [性能优化规范](#性能优化规范)
9. [安全规范](#安全规范)
10. [发布规范](#发布规范)

---

## 1. 代码规范

### 1.1 Dart代码风格

遵循官方 [Effective Dart](https://dart.dev/guides/language/effective-dart) 规范

#### 基本原则
```dart
// ✅ 推荐
class ShiftCalendar {
  final String name;
  final DateTime startDate;

  const ShiftCalendar({
    required this.name,
    required this.startDate,
  });
}

// ❌ 不推荐
class shift_calendar {
  String Name;
  DateTime start_date;
}
```

#### 格式化
- 使用 `dart format` 自动格式化代码
- 行宽限制：80字符
- 使用2个空格缩进（不使用Tab）

#### 导入规范
```dart
// 1. Dart SDK导入
import 'dart:async';
import 'dart:io';

// 2. Flutter框架导入
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// 3. 第三方包导入
import 'package:provider/provider.dart';
import 'package:hive/hive.dart';

// 4. 项目内部导入
import 'package:shift_calendar/core/utils/date_helper.dart';
import 'package:shift_calendar/data/models/shift_model.dart';
```

### 1.2 代码质量要求

#### 必须使用的静态分析
```yaml
# analysis_options.yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    - always_declare_return_types
    - always_require_non_null_named_parameters
    - avoid_print
    - prefer_const_constructors
    - prefer_final_fields
    - require_trailing_commas
```

#### 代码复杂度限制
- 单个函数不超过50行
- 单个类不超过300行
- 圈复杂度不超过10
- 嵌套深度不超过4层

---

## 2. 项目结构规范

### 2.1 目录结构

```
shift_calendar/
├── lib/
│   ├── main.dart                    # 应用入口
│   ├── app.dart                     # 应用配置
│   │
│   ├── core/                        # 核心层
│   │   ├── constants/               # 常量
│   │   │   ├── app_constants.dart
│   │   │   ├── route_constants.dart
│   │   │   └── storage_constants.dart
│   │   ├── themes/                  # 主题
│   │   │   ├── app_theme.dart
│   │   │   ├── light_theme.dart
│   │   │   └── dark_theme.dart
│   │   ├── utils/                   # 工具类
│   │   │   ├── date_helper.dart
│   │   │   ├── validator.dart
│   │   │   └── logger.dart
│   │   ├── errors/                  # 错误处理
│   │   │   ├── exceptions.dart
│   │   │   └── failures.dart
│   │   └── extensions/              # 扩展方法
│   │       ├── date_extension.dart
│   │       └── string_extension.dart
│   │
│   ├── data/                        # 数据层
│   │   ├── models/                  # 数据模型
│   │   │   ├── shift_model.dart
│   │   │   ├── schedule_model.dart
│   │   │   └── user_model.dart
│   │   ├── repositories/            # 数据仓库实现
│   │   │   ├── shift_repository_impl.dart
│   │   │   └── schedule_repository_impl.dart
│   │   ├── datasources/             # 数据源
│   │   │   ├── local/
│   │   │   │   ├── shift_local_datasource.dart
│   │   │   │   └── hive_service.dart
│   │   │   └── remote/
│   │   │       └── api_service.dart
│   │   └── services/                # 业务服务
│   │       ├── notification_service.dart
│   │       └── sync_service.dart
│   │
│   ├── domain/                      # 领域层
│   │   ├── entities/                # 业务实体
│   │   │   ├── shift.dart
│   │   │   ├── schedule.dart
│   │   │   └── user.dart
│   │   ├── repositories/            # 仓库接口
│   │   │   ├── shift_repository.dart
│   │   │   └── schedule_repository.dart
│   │   └── usecases/                # 用例
│   │       ├── create_shift.dart
│   │       ├── get_schedule.dart
│   │       └── generate_schedule.dart
│   │
│   └── presentation/                # 表现层
│       ├── screens/                 # 页面
│       │   ├── home/
│       │   │   ├── home_screen.dart
│       │   │   └── home_provider.dart
│       │   ├── calendar/
│       │   │   ├── calendar_screen.dart
│       │   │   └── calendar_provider.dart
│       │   ├── shift/
│       │   │   ├── shift_list_screen.dart
│       │   │   ├── shift_edit_screen.dart
│       │   │   └── shift_provider.dart
│       │   └── settings/
│       │       ├── settings_screen.dart
│       │       └── settings_provider.dart
│       ├── widgets/                 # 通用组件
│       │   ├── common/
│       │   │   ├── custom_button.dart
│       │   │   ├── custom_card.dart
│       │   │   └── loading_widget.dart
│       │   └── calendar/
│       │       ├── calendar_view.dart
│       │       └── shift_cell.dart
│       └── routes/                  # 路由
│           └── app_router.dart
│
├── test/                            # 测试文件
│   ├── unit/
│   ├── widget/
│   └── integration/
│
├── assets/                          # 资源文件
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/                            # 文档
│   ├── api/
│   └── guides/
│
├── pubspec.yaml                     # 依赖配置
├── analysis_options.yaml            # 分析配置
└── README.md                        # 项目说明
```

### 2.2 文件命名规范

- 文件名使用小写+下划线：`shift_model.dart`
- 测试文件添加后缀：`shift_model_test.dart`
- 一个文件只包含一个主要类

---

## 3. Git工作流规范

### 3.1 分支管理

#### 分支类型
```
main              # 主分支，生产环境代码
├── develop       # 开发分支
├── feature/*     # 功能分支
├── bugfix/*      # 问题修复分支
├── hotfix/*      # 紧急修复分支
└── release/*     # 发布分支
```

#### 分支命名
```bash
feature/shift-management        # 功能：班次管理
feature/calendar-view          # 功能：日历视图
bugfix/notification-crash      # 修复：通知崩溃
hotfix/data-loss              # 紧急修复：数据丢失
release/v1.0.0                # 发布：1.0.0版本
```

### 3.2 提交规范

#### Commit Message格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type类型
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具变动

#### 示例
```bash
feat(calendar): 添加月视图日历组件

- 实现月视图日历展示
- 支持自定义班次颜色
- 添加日期点击事件

Closes #123
```

### 3.3 Code Review规范

#### Review清单
- [ ] 代码符合规范
- [ ] 功能完整实现
- [ ] 单元测试通过
- [ ] 无性能问题
- [ ] 无安全隐患
- [ ] 文档已更新

#### Review流程
1. 开发者提交PR
2. CI自动检查
3. 至少1人Review
4. 通过后合并
5. 删除功能分支

---

## 4. 命名规范

### 4.1 变量命名

```dart
// 类名：大驼峰 (PascalCase)
class ShiftCalendar {}

// 变量名：小驼峰 (camelCase)
String userName;
DateTime startDate;

// 常量：小驼峰 (camelCase)
const int maxShiftCount = 10;

// 私有变量：下划线开头
String _privateField;

// 布尔值：使用is/has/can开头
bool isActive;
bool hasData;
bool canEdit;
```

### 4.2 函数命名

```dart
// 动词开头，描述动作
void createShift() {}
Future<void> loadSchedule() async {}
bool validateDate(DateTime date) {}

// 获取数据：get开头
String getName() {}
Future<List<Shift>> getShiftList() async {}

// 设置数据：set开头
void setTheme(ThemeMode mode) {}
```

### 4.3 Widget命名

```dart
// 组件名：名词 + Widget/Screen/View
class ShiftCard extends StatelessWidget {}
class CalendarScreen extends StatefulWidget {}
class ScheduleView extends StatelessWidget {}
```

---

## 5. 注释规范

### 5.1 文件注释

```dart
/// 班次管理数据模型
///
/// 用于存储和管理班次信息，包括班次名称、时间、颜色等
///
/// Example:
/// ```dart
/// final shift = ShiftModel(
///   id: '1',
///   name: '早班',
///   startTime: '08:00',
///   endTime: '16:00',
/// );
/// ```
class ShiftModel {
  // ...
}
```

### 5.2 函数注释

```dart
/// 生成指定周期的排班计划
///
/// [startDate] 开始日期
/// [endDate] 结束日期
/// [pattern] 排班模式，例如 [早班, 中班, 晚班, 休息]
///
/// Returns: 生成的完整排班列表
///
/// Throws:
/// - [InvalidDateException] 当日期无效时抛出
/// - [InvalidPatternException] 当模式无效时抛出
Future<List<Schedule>> generateSchedule({
  required DateTime startDate,
  required DateTime endDate,
  required List<Shift> pattern,
}) async {
  // ...
}
```

### 5.3 TODO注释

```dart
// TODO(username): 添加数据验证逻辑
// FIXME: 修复日期计算错误
// HACK: 临时解决方案，需要重构
// NOTE: 这里使用特殊算法优化性能
```

---

## 6. 测试规范

### 6.1 测试覆盖率要求

- 单元测试覆盖率：≥ 80%
- 核心业务逻辑：100%
- UI测试：关键流程

### 6.2 测试文件组织

```dart
// test/unit/data/models/shift_model_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:shift_calendar/data/models/shift_model.dart';

void main() {
  group('ShiftModel', () {
    test('should create valid shift model', () {
      // Arrange
      final json = {'id': '1', 'name': '早班'};

      // Act
      final shift = ShiftModel.fromJson(json);

      // Assert
      expect(shift.id, '1');
      expect(shift.name, '早班');
    });

    test('should throw exception for invalid data', () {
      // Arrange
      final json = {'invalid': 'data'};

      // Act & Assert
      expect(
        () => ShiftModel.fromJson(json),
        throwsA(isA<FormatException>()),
      );
    });
  });
}
```

### 6.3 Widget测试

```dart
testWidgets('ShiftCard displays shift information', (tester) async {
  // Arrange
  final shift = Shift(name: '早班', color: Colors.blue);

  // Act
  await tester.pumpWidget(
    MaterialApp(
      home: ShiftCard(shift: shift),
    ),
  );

  // Assert
  expect(find.text('早班'), findsOneWidget);
  expect(find.byType(ShiftCard), findsOneWidget);
});
```

---

## 7. UI/UX规范

### 7.1 设计原则

#### Material Design 3
- 遵循Material Design 3设计规范
- 使用官方组件库
- 保持设计一致性

#### 响应式设计
```dart
// 使用 LayoutBuilder 适配不同屏幕
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return TabletLayout();
    } else {
      return MobileLayout();
    }
  },
)

// 使用 MediaQuery 获取屏幕信息
final screenWidth = MediaQuery.of(context).size.width;
```

### 7.2 颜色规范

```dart
// core/themes/app_colors.dart
class AppColors {
  // 主色调
  static const Color primary = Color(0xFF2196F3);
  static const Color primaryDark = Color(0xFF1976D2);
  static const Color primaryLight = Color(0xFF64B5F6);

  // 辅助色
  static const Color secondary = Color(0xFFFF9800);

  // 状态色
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFF9800);
  static const Color error = Color(0xFFF44336);
  static const Color info = Color(0xFF2196F3);

  // 中性色
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF757575);
  static const Color divider = Color(0xFFBDBDBD);
  static const Color background = Color(0xFFFAFAFA);
}
```

### 7.3 间距规范

```dart
// core/constants/spacing.dart
class Spacing {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
}
```

### 7.4 字体规范

```dart
// core/themes/text_styles.dart
class AppTextStyles {
  static const TextStyle h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    height: 1.2,
  );

  static const TextStyle h2 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    height: 1.3,
  );

  static const TextStyle body = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5,
  );

  static const TextStyle caption = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    height: 1.4,
  );
}
```

---

## 8. 性能优化规范

### 8.1 性能要求

- 应用启动时间：< 2秒
- 页面切换动画：60fps
- 内存占用：< 100MB（常规使用）
- APK大小：< 30MB（未拆包）

### 8.2 优化策略

#### Widget优化
```dart
// ✅ 使用const构造函数
const Text('Hello');

// ✅ 拆分Widget，避免整体重建
class ParentWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const StaticHeader(),  // 不会重建
        DynamicContent(),       // 仅此部分重建
      ],
    );
  }
}

// ✅ 使用ListView.builder而非ListView
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
)
```

#### 图片优化
```dart
// 使用缓存图片
CachedNetworkImage(
  imageUrl: url,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
)

// 优化图片尺寸
Image.asset(
  'assets/image.png',
  width: 100,
  height: 100,
  fit: BoxFit.cover,
  cacheWidth: 200,  // 内存优化
)
```

---

## 9. 安全规范

### 9.1 数据安全

```dart
// ✅ 敏感数据加密存储
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();
await storage.write(key: 'token', value: sensitiveData);

// ✅ 使用HTTPS通信
final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  validateStatus: (status) => status! < 500,
));
```

### 9.2 输入验证

```dart
// 验证用户输入
String? validateShiftName(String? value) {
  if (value == null || value.isEmpty) {
    return '班次名称不能为空';
  }
  if (value.length > 20) {
    return '班次名称不能超过20个字符';
  }
  return null;
}
```

### 9.3 权限管理

```dart
// 动态申请权限
import 'package:permission_handler/permission_handler.dart';

Future<bool> requestNotificationPermission() async {
  final status = await Permission.notification.request();
  return status.isGranted;
}
```

---

## 10. 发布规范

### 10.1 版本号规范

遵循语义化版本 (Semantic Versioning)：`MAJOR.MINOR.PATCH`

```yaml
# pubspec.yaml
version: 1.2.3+10
#        │ │ │  └── Build Number
#        │ │ └──── PATCH：修复bug
#        │ └────── MINOR：新功能（向下兼容）
#        └──────── MAJOR：重大变更（不兼容）
```

### 10.2 发布前检查清单

#### 代码质量
- [ ] 通过所有单元测试
- [ ] 通过静态代码分析
- [ ] Code Review已完成
- [ ] 无已知严重bug

#### 功能验证
- [ ] 核心功能测试通过
- [ ] 在真机上测试
- [ ] iOS和Android双端验证
- [ ] 不同屏幕尺寸适配

#### 性能检查
- [ ] 内存泄漏检查
- [ ] 启动时间检查
- [ ] 流畅度测试（60fps）
- [ ] 电池消耗测试

#### 文档更新
- [ ] CHANGELOG.md已更新
- [ ] README.md已更新
- [ ] API文档已更新
- [ ] 用户手册已更新

### 10.3 构建发布

```bash
# 清理构建缓存
flutter clean

# 获取依赖
flutter pub get

# 运行测试
flutter test

# 构建Android APK
flutter build apk --release

# 构建Android App Bundle
flutter build appbundle --release

# 构建iOS
flutter build ios --release
```

### 10.4 应用商店发布

#### Google Play
- 准备应用截图（至少2张）
- 编写应用描述（多语言）
- 设置隐私政策链接
- 填写内容分级问卷

#### App Store
- 准备应用截图（各尺寸）
- 编写应用描述（多语言）
- 设置应用分类
- 准备审核说明

---

## 📝 附录

### A. 推荐工具

**开发工具：**
- Android Studio / VS Code
- Flutter DevTools
- Git

**设计工具：**
- Figma
- Adobe XD

**测试工具：**
- Flutter Test
- Integration Test
- Firebase Test Lab

**性能分析：**
- Flutter Performance
- Android Profiler
- Xcode Instruments

### B. 学习资源

- [Flutter官方文档](https://flutter.dev/docs)
- [Dart语言指南](https://dart.dev/guides)
- [Material Design](https://material.io/design)
- [Effective Dart](https://dart.dev/guides/language/effective-dart)

---

*文档创建时间：2025-11-05*
*版本：v1.0*
*维护者：开发团队*
