# Average Time Spent Analysis - Documentation

## Problem Statement / Dataset Description

This analysis examines how much time 1,000 users spend on three social platforms (Facebook, Instagram, YouTube) and how that relates to demographics, profession, income, and asset ownership. The dataset (`dummy_data.csv`) contains 1,000 rows and 12 columns including platform, demographics (Rural/Sub_Urban/Urban), gender, profession, age, time_spent, income, and boolean flags for debt, home ownership, and car ownership. The data is complete with no missing values or duplicates.

## Type of Analysis and Rationale

**Descriptive & Comparative Analysis** using:
- **Groupby averages (single & two-way)**: To compare average time spent across platforms, demographics, and professions. Two-way groupby (demographics × platform) reveals interaction effects—whether the best platform depends on where the user lives.
- **Percentages for boolean columns**: Mean of boolean columns gives ownership proportions, enabling size-independent comparison across groups.
- **Histograms with KDE**: To visualize the distribution of time spent and check for clustering or uniform spread.
- **Box plots**: To compare income distributions across platforms, showing medians and spread rather than just averages.
- **Correlation heatmap**: To test linear relationships between numeric variables (age, time_spent, income).
- **Visualizations**: Bar charts for categorical comparisons, grouped bars for interactions, pie charts for composition, box plots for distributions.

## Summary of Findings

- **Platform engagement is nearly identical**: Instagram 5.15, Facebook 5.06, YouTube 4.87 (average time spent). No platform clearly wins.
- **User base is balanced**: Instagram 36.3%, YouTube 33.0%, Facebook 30.7%.
- **Usage distribution is nearly uniform** from 1 to 9 units—no dominant usage level.
- **Location matters (interaction effect)**: Sub-urban users spend the most on every platform. Platform ranking flips by area (Facebook leads in rural, YouTube leads in urban).
- **Income is equal across platforms** (~14.7k–15.3k); ownership similar with YouTube users slightly higher (~56–57% car/home).
- **Age, income, and time spent are essentially uncorrelated** (all |r| < 0.09).

## Conclusions & Recommendations

- No platform clearly "wins" on engagement, so a consistent content strategy across platforms is reasonable, tuned by location.
- Since demographics and income do not separate usage, targeting should rely on behavioural signals rather than age or income.
- The interaction between demographics and platform suggests geo-targeted content could improve engagement.

## Limitations

The file is synthetic ('dummy_data') with rounded values, so results describe its internal patterns rather than real user behaviour.