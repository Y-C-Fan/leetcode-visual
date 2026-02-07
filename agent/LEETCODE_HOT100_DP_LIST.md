# LeetCode Hot 100 动态规划题目列表

## 概述

本文档记录 LeetCode Hot 100 中所有动态规划（DP）相关的题目，用于系统化地进行可视化开发。

## 动态规划题目列表

| 题号 | 题目名称 | 难度 | 可视化状态 | 文件名 |
|------|---------|------|-----------|--------|
| 518 | Coin Change II | Medium | ✅ 已完成 | 0518_coin_change_ii.html |
| 70 | Climbing Stairs | Easy | ✅ 已完成 | 0070_climbing_stairs.html |
| 198 | House Robber | Medium | ✅ 已完成 | 0198_house_robber.html |
| 213 | House Robber II | Medium | ✅ 已完成 | 0213_house_robber_ii.html |
| 139 | Word Break | Medium | ✅ 已完成 | 0139_word_break.html |
| 300 | Longest Increasing Subsequence | Medium | ✅ 已完成 | 0300_longest_increasing_subsequence.html |
| 152 | Maximum Product Subarray | Medium | ✅ 已完成 | 0152_maximum_product_subarray.html |
| 1143 | Longest Common Subsequence | Medium | ✅ 已完成 | 1143_longest_common_subsequence.html |
| 72 | Edit Distance | Hard | ✅ 已完成 | 0072_edit_distance.html |
| 322 | Coin Change | Medium | ✅ 已完成 | 0322_coin_change.html |
| 416 | Partition Equal Subset Sum | Medium | ✅ 已完成 | 0416_partition_equal_subset_sum.html |
| 120 | Triangle | Medium | ✅ 已完成 | 0120_triangle.html |
| 64 | Minimum Path Sum | Medium | ✅ 已完成 | 0064_minimum_path_sum.html |
| 62 | Unique Paths | Medium | ✅ 已完成 | 0062_unique_paths.html |
| 63 | Unique Paths II | Medium | ✅ 已完成 | 0063_unique_paths_ii.html |
| 97 | Interleaving String | Medium | ⏳ 待完成 | 0097_interleaving_string.html |
| 115 | Distinct Subsequences | Hard | ⏳ 待完成 | 0115_distinct_subsequences.html |
| 5 | Longest Palindromic Substring | Medium | ⏳ 待完成 | 0005_longest_palindromic_substring.html |
| 32 | Longest Valid Parentheses | Hard | ⏳ 待完成 | 0032_longest_valid_parentheses.html |
| 53 | Maximum Subarray | Easy | ⏳ 待完成 | 0053_maximum_subarray.html |
| 121 | Best Time to Buy and Sell Stock | Easy | ⏳ 待完成 | 0121_best_time_to_buy_and_sell_stock.html |
| 122 | Best Time to Buy and Sell Stock II | Medium | ⏳ 待完成 | 0122_best_time_to_buy_and_sell_stock_ii.html |
| 123 | Best Time to Buy and Sell Stock III | Hard | ⏳ 待完成 | 0123_best_time_to_buy_and_sell_stock_iii.html |
| 188 | Best Time to Buy and Sell Stock IV | Hard | ⏳ 待完成 | 0188_best_time_to_buy_and_sell_stock_iv.html |
| 309 | Best Time to Buy and Sell Stock with Cooldown | Medium | ⏳ 待完成 | 0309_best_time_to_buy_and_sell_stock_with_cooldown.html |
| 714 | Best Time to Buy and Sell Stock with Transaction Fee | Medium | ⏳ 待完成 | 0714_best_time_to_buy_and_sell_stock_with_transaction_fee.html |

## 动态规划分类

### 1. 背包问题
- 518 - Coin Change II (完全背包)
- 322 - Coin Change (完全背包)
- 416 - Partition Equal Subset Sum (0/1背包)

### 2. 子序列/子串问题
- 300 - Longest Increasing Subsequence
- 1143 - Longest Common Subsequence
- 5 - Longest Palindromic Substring
- 72 - Edit Distance
- 115 - Distinct Subsequences

### 3. 路径问题
- 62 - Unique Paths
- 63 - Unique Paths II
- 64 - Minimum Path Sum
- 120 - Triangle
- 97 - Interleaving String

### 4. 打家劫舍问题
- 198 - House Robber
- 213 - House Robber II

### 5. 股票买卖问题
- 121 - Best Time to Buy and Sell Stock
- 122 - Best Time to Buy and Sell Stock II
- 123 - Best Time to Buy and Sell Stock III
- 188 - Best Time to Buy and Sell Stock IV
- 309 - Best Time to Buy and Sell Stock with Cooldown
- 714 - Best Time to Buy and Sell Stock with Transaction Fee

### 6. 其他经典问题
- 70 - Climbing Stairs
- 139 - Word Break
- 152 - Maximum Product Subarray
- 32 - Longest Valid Parentheses
- 53 - Maximum Subarray

## 可视化优先级

### 高优先级（核心经典）
1. 70 - Climbing Stairs（入门级）
2. 198 - House Robber（经典状态转移）
3. 300 - Longest Increasing Subsequence（LIS经典）
4. 1143 - Longest Common Subsequence（LCS经典）
5. 5 - Longest Palindromic Substring（回文问题）

### 中优先级（扩展应用）
6. 62 - Unique Paths（路径问题）
7. 322 - Coin Change（背包问题）
8. 53 - Maximum Subarray（经典子数组）
9. 121 - Best Time to Buy and Sell Stock（股票入门）
10. 72 - Edit Distance（字符串编辑）

### 低优先级（进阶变种）
11. 其他题目

## 开发进度

- 已完成：14/25 (56%)
- 进行中：0/25 (0%)
- 待完成：11/25 (44%)

## 注意事项

1. **文件命名**：严格按照 `{题号}_{题目英文小写下划线分隔}.html` 格式
2. **题号格式**：统一使用 4 位数字，不足左侧补零
3. **可视化规范**：遵循 `LEETCODE_HOT100_VISUALIZATION_GUIDE.md` 中的开发规范
4. **统一风格**：使用 Tokyo Night 配色方案和 Material Design 原则
5. **键盘控制**：所有可视化页面支持键盘快捷键
   - **左箭头键 (←)**：上一步
   - **右箭头键 (→)**：下一步
   - **空格键**：播放/暂停（在自动播放模式下）

---

**最后更新**：2026-01-30
**维护者**：iFlow CLI