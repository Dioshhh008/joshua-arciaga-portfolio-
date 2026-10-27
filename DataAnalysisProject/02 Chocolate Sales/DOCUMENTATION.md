# Chocolate Sales Analysis - Documentation

## Problem Statement / Dataset Description

This analysis examines 1,094 chocolate sales transactions from 2022 to identify the strongest markets, products, and sales people, examine monthly trends, and test whether order value relates to shipment volume. The dataset contains 6 columns: Sales Person, Country, Product, Date, Amount, and Boxes Shipped. No missing values; Date is already datetime format.

## Type of Analysis and Rationale

**Descriptive & Trend Analysis** using:
- **Groupby sums by Country/Product/Person**: Revenue is a sum (not average) because the question is "which market brings the most money overall." Sorting ranks performance.
- **Monthly aggregation with line chart**: Month is an ordered time variable—a line chart emphasizes trend and direction over time, which a bar chart would obscure.
- **Scatter plot (Boxes Shipped vs Amount, coloured by Country)**: Two numeric variables—scatter plot reveals whether they move together; colour adds a third dimension.
- **Histogram with KDE for Amount**: Shows how order values are distributed (uniform, bell-shaped, skewed).
- **Correlation heatmap**: Quantifies the linear relationship between Amount and Boxes Shipped.

## Summary of Findings

- **Total sales: 6,183,625** across 177,007 boxes; average order **5,652.31**.
- **Country revenue is evenly spread**: Australia 1.14M (top) to New Zealand 0.95M (bottom)—all within ~20%.
- **Products are close in revenue**: Smooth Sliky Salty 349,692 (best) to 70% Dark Bites 211,610 (worst)—no single hero product.
- **Sales people vary most**: Ches Bonnell 320,901 (best) vs Wilone O'Kielt 138,523 (worst)—a 2.3× gap.
- **Monthly sales fluctuate in narrow band** (674k–896k) with no clear trend; peak January (896k), low April (674k).
- **Revenue and boxes shipped are essentially uncorrelated (-0.02)**—Amount is not simply boxes × price.

## Conclusions & Recommendations

- The business is geographically and product-wise diversified; no single market or product carries it, lowering concentration risk.
- The clearest performance gaps are at the individual salesperson level—coaching could focus there.
- The near-zero Amount/Boxes correlation is suspicious and should be checked with the data owner (possible synthetic data or inconsistent pricing).

## Limitations

Only 8 months of data; small per-person samples; the Amount/Boxes anomaly prevents any firm price-volume conclusion.