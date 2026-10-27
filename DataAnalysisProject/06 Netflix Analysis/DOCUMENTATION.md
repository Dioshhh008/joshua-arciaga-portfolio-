# Netflix Titles Analysis - Documentation

## Problem Statement / Dataset Description

This analysis explores a catalogue of 50 TV titles to understand their age ratings, release years, and—most importantly—how many are available on Netflix. The dataset has 5 columns: Titles, Year, Rating (7+, 16+, 18+), IMDB_Rating (8.0–9.5), and Netflix (0/1 flag). No missing values or duplicates; no cleaning needed. The small size (50 titles) means conclusions describe this sample, not the whole streaming market.

## Type of Analysis and Rationale

**Exploratory & Comparative Analysis** using:
- **Value counts for categorical fields**: Rating distribution (categorical) and Netflix availability (binary flag—mean = proportion).
- **Groupby averages**: Compare IMDB ratings by Netflix availability.
- **Histogram with KDE for IMDB_Rating**: Continuous variable—shows centre, spread, shape (tight cluster 8.4–9.0).
- **Bar chart for titles per Year**: Year is discrete and sparse (0–6/year); bars show real counts without implying continuity.
- **Box plot of IMDB_Rating by Netflix availability**: Compares full distributions (median, IQR, range)—averages alone would hide variability differences.
- **Horizontal bar chart for Top 10 titles**: Long text labels need horizontal layout; fixed 0–10 axis prevents visual exaggeration.
- **Pie chart for Netflix availability**: Exactly two categories forming a whole—ideal for pie.
- **Correlation heatmap**: Year, IMDB_Rating, Netflix—all pairwise relationships in one grid.

## Summary of Findings

- **38.0% of titles (19 of 50) are on Netflix**; 62% are not.
- **Catalogue skews mature**: 18+ = 27, 16+ = 19, 7+ = 4.
- **IMDB ratings cluster tightly** between 8.0 and 9.5 (mean **8.72**)—a "best of" list, not full spectrum.
- **Availability is NOT driven by rating**: Non-Netflix titles actually average slightly higher (8.76 vs 8.66).
- **Newer titles far more likely on Netflix**: Year vs Netflix correlation **0.43**.
- **Release output grows over time**, peaking in 2013 (6 titles); modern titles dominate.

## Conclusions & Recommendations

- The Netflix library here is a subset of a broader, equally well-rated catalogue; missing high-rated titles (e.g., Chernobyl, The Wire, The Sopranos) are acquisition candidates.
- Because availability rises with recency, licensing appears focused on newer content.

## Limitations

Only 50 titles (small, non-random sample); results describe this list, not the whole streaming market; single snapshot with no time dimension.