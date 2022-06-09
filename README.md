# NavalBattleTBS
### 某海战tbs游戏

一个以海战为主题的回合制策略游戏  
暂无正式名称

[苍穹瞎琢磨的脑洞](https://docs.qq.com/doc/DS3NBbmFaQ0puZVBq?ADPUBNO=27118&ADSESSION=1653785142&ADTAG=CLIENT.QQ.5797_.0&ADUIN=1393908967&tdsourcetag=s_pcqq_send_grpfile&u=a83db04db48f4b698fb1fc522c0f1364)




## Commit 规范

### 示例

	[更改] a1.0.1: 改善开场动画

	### 更改 ###

	* 将 Beginning.update_xxx 合并为一个 Animation() 函数，各个parts通过名称读取不同的参数，以在不同的时间入场、出场
	* 添加了 Beginning.time 属性，用于存储开场动画关键帧的时刻

	### 资源 ###

	* 调整了 部分开场动画贴图的颜色

	### 文档 ###

	* 向 README 文件添加了 Commit规范 相关说明

---------

[] 和 ### ### 中的类型:

* [新增] 添加了 新的 资源 / 程序 文件
* [修复] 修复了 **上一个版本中 未解决 / 未发现** 的问题
* [更改] 修改了 程序

* [资源] 修改了 资源文件
* [文档] 添加了 注释 / 说明文档
* [文件] 修改了 文件名 / 移动了 文件位置


