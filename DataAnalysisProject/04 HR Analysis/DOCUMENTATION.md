# HR Employee Attrition Analysis - Documentation

## Problem Statement / Dataset Description

This analysis explores what distinguishes employees who leave from those who stay using a 1,470-employee HR dataset with 35 columns. The target variable is Attrition (Yes/No). After cleaning—dropping 3 constant columns (EmployeeCount, StandardHours, Over18), renaming to snake_case, and cleaning BusinessTravel labels—the dataset has 32 columns, no missing values, and no duplicates. Overall attrition rate is 16.1% (237 of 1,470).

## Type of Analysis and Rationale

**Comparative & Diagnostic Analysis** using:
- **Constant column detection**: `df.describe()` revealed zero-variance columns (std = 0) which add no information.
- **Value counts for categorical drivers**: Department, Gender, BusinessTravel, JobRole, WorkLifeBalance.
- **Grouped count plots**: Compare Yes/No attrition split within each category, showing both volumes and rates.
- **Box plots for numeric distributions by Attrition**: Monthly Income and Age—comparing full distributions (median, spread) rather than just averages.
- **Attrition rate by Job Role**: Computed as % who left per role (essential because roles differ greatly in size).
- **Correlation heatmap of all numeric variables**: With ~26 numeric columns, a heatmap is the only practical way to scan all pairwise relationships.

## Summary of Findings

- **Overall attrition: 16.1%** (237 of 1,470); class imbalance typical for HR data.
- **Overtime is the strongest signal**: 30.5% attrition with overtime vs 10.4% without.
- **Leavers earn less**: Median monthly income **3,202** vs **5,204** for stayers.
- **Leavers are younger**: Median age **32** vs **36**—early-career staff leave more often.
- **Work-Life Balance rating 1**: ~31.2% attrition vs 14–18% for ratings 2–4.
- **By Department**: Sales 20.6%, HR 19.0%, R&D 13.8%.
- **By Job Role**: Sales Representative highest risk **39.8%**; Research Director lowest 2.5%.
- **Gender gap small**: Male 17.0% vs Female 14.8%.
- **Seniority & pay rise with age**: Age vs TotalWorkingYears 0.68; Age vs MonthlyIncome 0.50.

## Conclusions & Recommendations

- Focus retention on early-career, lower-paid staff who work overtime—especially Sales Representatives.
- Reducing overtime and improving work-life balance are the highest-value levers (both strongly associated with leaving).
- A compensation review for lower-paid roles may help.

## Limitations

Single snapshot with no time dimension; correlations describe association, not cause; outcome is imbalanced (16%), which must be handled in any predictive model.