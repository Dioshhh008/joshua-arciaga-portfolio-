# Marketing Campaign Analysis - Documentation

## Problem Statement / Dataset Description

This analysis focuses on higher-income customers (Income > 50,000) to understand their spending and campaign response. The source dataset has 2,240 rows × 29 columns (tab-separated CSV), same structure as the Customer Segmentation data. After filtering to Income > 50,000 (which also removes the 24 missing-income rows), **1,156 customers** remain (~52% of base). Engineered features: `Total Spend` (sum of 6 product columns) and `Accepted Total` (sum of 5 campaign flags).

## Type of Analysis and Rationale

**Targeted Segment Analysis** using:
- **Income-based filtering**: Campaign targets higher-income customers; the filter automatically removes missing-income rows (NaN fails `>` comparison).
- **Feature engineering**: `Total Spend` collapses 6 spend columns into one value metric; `Accepted Total` turns 5 flags into one count.
- **Responder vs Non-responder spend comparison**: Boolean filtering + mean answers the ROI question—how much do responders actually spend?
- **Groupby averages by Education/Marital Status**: Single-measure-across-categories comparisons within the high-income segment.
- **Histograms for Income & Total Spend**: Reveal shape—Income is left-censored at 50k; Total Spend is mildly right-skewed.
- **Campaign acceptance counts & grouped count plots by Education**: Show where responses come from and response *rates* per group.
- **Scatter plot (Income vs Total Spend, coloured by Response)**: Relationship between two numeric variables + responder clustering.
- **Correlation heatmap**: Selected numeric variables (Income, Total Spend, Recency, purchase channels, web visits).

## Summary of Findings

- **Responders spend ~1.5× more** than non-responders: **1,421** vs **941** average.
- **Segment response rate: 18.1%** (209 of 1,156)—above the full-base rate.
- **Campaign performance**: Campaigns 5 (162) and 4 (147) best; Campaign 1 (139); Campaign 3 (74); Campaign 2 worst (**26**).
- **Response rate rises with education**: PhD ~23.7%, 2n Cycle ~14.6%, Graduation ~16.4%.
- **Average spend by education is similar** within segment (947–1,051)—income, not education, mainly drives spending here.
- **More web visits track with lower Income (-0.30) and lower spend**, while catalogue purchases align with Income and Spend.

## Conclusions & Recommendations

- The high-income segment is valuable—responders worth ~1.5×—so targeted campaigns pay off.
- Replicate the Campaign 4/5 approach and redesign Campaign 2.
- Encourage catalogue purchases (they track with spending) and factor education level into audience prioritisation.

## Limitations

Income contains extreme outliers (max 666,666); the >50,000 filter excludes lower-income customers by design; associations are not causal.