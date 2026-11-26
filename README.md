# GT 5 Pro 手表应用

面向 HUAWEI WATCH GT 5 Pro 圆屏的轻量应用集合。每个应用都是独立的 DevEco Studio 工程，可以单独打开、预览和修改。目前收录的第一个应用是[腕上课表](schedule/)。

## 腕上课表

抬腕就能看到当天上什么课、几点开始、去哪个教室。课名放在圆屏中央最宽的位置，长课名可分两行；教室和时间排在下方。应用用 HML、CSS 和 JavaScript 编写，课表保存在本地，浏览时无需联网或登录。

- 点**日期两侧的箭头**切换日期。旧卡片滑出的同时，新一天的卡片从另一侧进入，周日和周一之间可以循环翻页。
- 在卡片上**向上滑看下一门，向下滑看上一门**。当天有多门课时显示页码，空课日单独显示提示。

仓库内置一周虚构课表，涵盖多门课、单门课和空课日。第一次打开是周一的「观星入门」；在卡片上向上滑，可以看到第二门「纸飞机实验」。

## 在电脑上预览

1. 准备 DevEco Studio 和 HarmonyOS SDK。本工程的目标 SDK 为 `6.0.2(22)`。Windows 下建议在不含空格的目录（如 `C:\Dev`）运行以下命令。

   ```sh
   git clone https://github.com/castlale/gt5pro-watch.git
   ```

2. 用 DevEco Studio 打开克隆后的 **`gt5pro-watch/schedule`** 目录，等待工程同步完成。
3. 打开 [index.hml](schedule/entry/src/main/js/MainAbility/pages/index/index.hml)，展开右侧 **Previewer**，查看 **LiteWearable** 圆屏。可以用鼠标点日期箭头，也可以在卡片上按住鼠标快速向上或向下拖动。

当前验证范围为 Windows 上的 DevEco 构建和圆屏预览。GT 5 Pro 真机上的安装、手势手感和动画流畅度仍待验证。

## 修改课表或界面

| 想修改什么 | 对应文件 |
| --- | --- |
| 星期、课程名、节次、时间、教室和颜色 | [index.js](schedule/entry/src/main/js/MainAbility/pages/index/index.js) 中的 `week` 数组 |
| 卡片结构、校区文字、手势绑定 | [index.hml](schedule/entry/src/main/js/MainAbility/pages/index/index.hml) |
| 字号、间距、颜色和翻页动画 | [index.css](schedule/entry/src/main/js/MainAbility/pages/index/index.css) |

每一天的 `lessons` 按上课顺序排列。课名的 `name` 数组可以写一行或两行；空课日使用空数组，并在 `note` 里写当天的提示。

## 反馈

欢迎通过 [Issues](https://github.com/castlale/gt5pro-watch/issues) 反馈显示或手势问题。如果是在真机上发现的，请附上手表型号、系统版本和复现步骤；课表内容可以用仓库里的虚构课程代替。
