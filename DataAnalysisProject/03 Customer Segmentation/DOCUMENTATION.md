# Customer Segmentation Analysis - Documentation

## Problem Statement / Dataset Description

This analysis cleans and enriches a 2,240-customer marketing dataset, profiles customers by age, spending, education, family, and campaign response, and builds a spending-based segmentation. The original dataset has 29 columns including demographics (Year_Birth, Education, Marital_Status, Income), per-product spending (MntWines, MntFruits, etc.), five campaign acceptance flags (AcceptedCmp1-5), and Response to the last campaign. Only Income had 24 missing values (~1%), which were dropped, leaving 2,216 complete rows.

## Type of Analysis and Rationale

**Data Cleaning, Feature Engineering & Segmentation** using:
- **Missing value handling**: Only 24 rows affected (~1%), so dropping is simpler and safer than imputing.
- **Feature engineering**: 
  - `Age = 2025 - Year_Birth` (interpretable feature)
  - `Total Spent` = sum of 6 product columns (single customer value metric)
  - `Total Campaign Accepted` = sum of 5 campaign flags (0–5 count)
  - `Children = Kidhome + Teenhome` (single household-size feature)
- **Descriptive statistics & distributions**: Histograms for Age and Total Spent reveal skew and outliers.
- **Groupby averages by Education/Marital Status/Children**: Categorical comparisons of spending.
- **Campaign acceptance counts & Response rate**: Bar and pie charts for campaign performance.
- **Scatter plot (Income vs Total Spent, coloured by Response)**: Two numeric variables + group label.
- **Correlation heatmap**: Key numeric variables to see which features move together.
- **Spending quartile segmentation (`pd.qcut`)**: Divides customers into 4 equal-size segments (Low, Medium, High, Very High) for actionable targeting.

## Summary of Findings

- **Spending is right-skewed**: Median **397** vs Mean **607**—a minority of big spenders drives total revenue.
- **Spending rises with education**: PhD 677, Graduation 622 vs Basic 82.
- **Family size strongly reduces spending**: 0 children **1,105** vs 1 child 475 vs 2 children 247.
- **Campaign acceptance**: Campaigns 3/4/5 ~162–164; Campaign 1 = 142; Campaign 2 = only **30** (clear under-performer).
- **Last-campaign response rate: 15.0%** (333 of 2,216).
- **Total Spent strongly tied to**: NumCatalogPurchases (0.78), NumStorePurchases (0.68), Income (0.67).
- **Quartile segmentation** yields four equal segments of **554 customers each**.

## Conclusions & Recommendations

- Prioritize high-income, well-educated, childless customers who buy through catalogue/store—they are the core revenue group.
- Campaign 2 performed poorly (30 acceptances) and should be redesigned or retired.
- Reuse the four spending segments (Low → Very High) for tiered targeting.

## Limitations

Ages up to 132 and Income of 666,666 are clear outliers needing cleaning; 'Absurd'/'YOLO' marital categories are noise; correlations show association, not causation.