"""
Export visualizations from Jupyter notebook to HTML files for the website
Run this after executing all cells in the notebook
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from scipy import stats
import os

# Create directory for exported visualizations
os.makedirs('static/visualizations', exist_ok=True)

print("Loading data...")
# Load 2024 World Happiness data from Excel file
df = pd.read_excel('data/pone.0322287.s001.xlsx', sheet_name='2024')

print("Generating visualizations...")

# Define factor columns
factor_cols = ['GDP per capita', 'Social support', 'Healthy life expectancy', 
               'Freedom to make life choices', 'Generosity', 'Perceptions of corruption']

# Get top and bottom countries
top10 = df.nlargest(10, 'Score')
bottom10 = df.nsmallest(10, 'Score')
top15 = df.nlargest(15, 'Score')

# ============================================================================
# 1. Global Happiness Map
# ============================================================================
print("1. Creating global map...")
fig1 = px.choropleth(
    df,
    locations="Country or region",
    locationmode="country names",
    color="Score",
    hover_name="Country or region",
    hover_data={
        'Score': ':.3f',
        'GDP per capita': ':.3f',
        'Social support': ':.3f'
    },
    color_continuous_scale="RdYlGn",
    title="World Happiness Score Distribution (2024)",
    labels={'Score': 'Happiness Score'}
)
fig1.update_layout(height=600)
fig1.write_html('static/visualizations/map.html')

# ============================================================================
# 2. Top 10 vs Bottom 10 (Plotly version for interactivity)
# ============================================================================
print("2. Creating rankings comparison...")
fig2 = make_subplots(
    rows=1, cols=2,
    subplot_titles=('Top 10 Happiest Countries', 'Bottom 10 Least Happy Countries'),
    horizontal_spacing=0.15
)

# Top 10
fig2.add_trace(
    go.Bar(
        y=top10['Country or region'][::-1],
        x=top10['Score'][::-1],
        orientation='h',
        marker=dict(color='green', opacity=0.7),
        name='Top 10',
        text=top10['Score'][::-1].round(3),
        textposition='outside'
    ),
    row=1, col=1
)

# Bottom 10
fig2.add_trace(
    go.Bar(
        y=bottom10['Country or region'],
        x=bottom10['Score'],
        orientation='h',
        marker=dict(color='red', opacity=0.7),
        name='Bottom 10',
        text=bottom10['Score'].round(3),
        textposition='outside'
    ),
    row=1, col=2
)

fig2.update_layout(
    height=600,
    showlegend=False,
    title_text="Happiness Rankings: Top 10 vs Bottom 10"
)
fig2.update_xaxes(title_text="Happiness Score", row=1, col=1)
fig2.update_xaxes(title_text="Happiness Score", row=1, col=2)

fig2.write_html('static/visualizations/rankings.html')

# ============================================================================
# 3. Correlation Heatmap (Plotly version)
# ============================================================================
print("3. Creating correlation heatmap...")
factors = ['Score', 'GDP per capita', 'Social support', 'Healthy life expectancy', 
           'Freedom to make life choices', 'Generosity', 'Perceptions of corruption']
correlation_matrix = df[factors].corr()

fig3 = go.Figure(data=go.Heatmap(
    z=correlation_matrix.values,
    x=correlation_matrix.columns,
    y=correlation_matrix.columns,
    colorscale='RdBu',
    zmid=0,
    text=correlation_matrix.values.round(3),
    texttemplate='%{text}',
    textfont={"size": 10},
    colorbar=dict(title="Correlation")
))

fig3.update_layout(
    title='Correlation Between Happiness and Key Factors',
    height=700,
    width=800,
    xaxis={'side': 'bottom'}
)
fig3.write_html('static/visualizations/correlations.html')

# ============================================================================
# 4. Stacked Bar Chart - Factor Contributions
# ============================================================================
print("4. Creating factor contributions chart...")
fig4 = go.Figure()

colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']

for i, factor in enumerate(factor_cols):
    fig4.add_trace(go.Bar(
        name=factor,
        x=top15['Country or region'],
        y=top15[factor],
        marker_color=colors[i]
    ))

fig4.update_layout(
    barmode='stack',
    title='What Makes the Happiest Countries Happy? (Factor Breakdown)',
    xaxis_title='Country',
    yaxis_title='Contribution to Happiness',
    height=600,
    showlegend=True,
    legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02)
)
fig4.write_html('static/visualizations/factors_stacked.html')

# ============================================================================
# 5. Radar Chart - Top vs Bottom
# ============================================================================
print("5. Creating radar chart...")
top10_avg = top10[factor_cols].mean()
bottom10_avg = bottom10[factor_cols].mean()

categories = ['GDP per capita', 'Social support', 'Life expectancy', 
              'Freedom', 'Generosity', 'Low corruption']

fig5 = go.Figure()

fig5.add_trace(go.Scatterpolar(
    r=top10_avg.values,
    theta=categories,
    fill='toself',
    name='Top 10 Happiest',
    line_color='green'
))

fig5.add_trace(go.Scatterpolar(
    r=bottom10_avg.values,
    theta=categories,
    fill='toself',
    name='Bottom 10 Least Happy',
    line_color='red'
))

fig5.update_layout(
    polar=dict(radialaxis=dict(visible=True, range=[0, 1.5])),
    showlegend=True,
    title='Average Profile: Happiest vs Least Happy Countries',
    height=600
)
fig5.write_html('static/visualizations/radar.html')

# ============================================================================
# 6. GDP vs Happiness Scatter
# ============================================================================
print("6. Creating GDP vs Happiness scatter...")
slope, intercept, r_value, p_value, std_err = stats.linregress(df['GDP per capita'], df['Score'])

fig6 = px.scatter(
    df,
    x='GDP per capita',
    y='Score',
    color='Social support',
    size='Healthy life expectancy',
    hover_name='Country or region',
    hover_data={
        'GDP per capita': ':.3f',
        'Score': ':.3f',
        'Social support': ':.3f',
        'Healthy life expectancy': ':.3f'
    },
    color_continuous_scale='Viridis',
    title=f'Does Money Buy Happiness?<br>GDP vs Happiness (R² = {r_value**2:.3f})',
    labels={
        'GDP per capita': 'GDP per Capita',
        'Score': 'Happiness Score',
        'Social support': 'Social Support'
    }
)

# Add regression line
x_range = [df['GDP per capita'].min(), df['GDP per capita'].max()]
y_range = [slope * x + intercept for x in x_range]
fig6.add_trace(go.Scatter(
    x=x_range,
    y=y_range,
    mode='lines',
    name=f'Trend line (R² = {r_value**2:.3f})',
    line=dict(color='red', dash='dash', width=2)
))

fig6.update_layout(height=700)
fig6.write_html('static/visualizations/gdp_scatter.html')

# ============================================================================
# 7. Diminishing Returns Analysis
# ============================================================================
print("7. Creating diminishing returns chart...")
df['GDP_bin'] = pd.cut(df['GDP per capita'], bins=5, labels=['Very Low', 'Low', 'Medium', 'High', 'Very High'])
gdp_happiness = df.groupby('GDP_bin', observed=True).agg({
    'Score': 'mean',
    'Country or region': 'count'
}).reset_index()
gdp_happiness.columns = ['GDP Category', 'Avg Happiness', 'Number of Countries']

fig7 = go.Figure()

fig7.add_trace(go.Bar(
    x=gdp_happiness['GDP Category'],
    y=gdp_happiness['Avg Happiness'],
    marker_color=['#ef4444', '#f59e0b', '#fbbf24', '#34d399', '#10b981'],
    text=gdp_happiness['Avg Happiness'].round(2),
    textposition='outside',
    name='Average Happiness',
    hovertemplate='<b>%{x}</b><br>Avg Happiness: %{y:.2f}<br>Countries: %{customdata}<extra></extra>',
    customdata=gdp_happiness['Number of Countries']
))

fig7.update_layout(
    title='Diminishing Returns: Average Happiness by GDP Category',
    xaxis_title='GDP Category',
    yaxis_title='Average Happiness Score',
    height=500,
    showlegend=False
)
fig7.write_html('static/visualizations/diminishing_returns.html')

# ============================================================================
# 8. Multi-dimensional Bubble Chart
# ============================================================================
print("8. Creating multi-dimensional bubble chart...")
fig8 = px.scatter(
    df,
    x='GDP per capita',
    y='Score',
    size='Healthy life expectancy',
    color='Social support',
    hover_name='Country or region',
    hover_data={
        'GDP per capita': ':.3f',
        'Score': ':.3f',
        'Social support': ':.3f',
        'Freedom to make life choices': ':.3f',
        'Healthy life expectancy': ':.3f'
    },
    color_continuous_scale='Viridis',
    size_max=30,
    title='The Multi-Dimensional Nature of Happiness<br>Size = Life Expectancy | Color = Social Support',
    labels={
        'GDP per capita': 'GDP per Capita',
        'Score': 'Happiness Score',
        'Social support': 'Social Support'
    }
)

fig8.update_layout(height=700)
fig8.write_html('static/visualizations/multidimensional.html')

# ============================================================================
# 9. Factor Importance Bar Chart
# ============================================================================
print("9. Creating factor importance chart...")
correlations = df[factor_cols].corrwith(df['Score']).sort_values(ascending=False)

fig9 = go.Figure()

colors_bars = ['green' if x > 0 else 'red' for x in correlations]
fig9.add_trace(go.Bar(
    x=correlations.values,
    y=[col.replace('Perceptions of', 'Low').replace(' to make life choices', '') for col in correlations.index],
    orientation='h',
    marker_color=colors_bars,
    text=correlations.values.round(3),
    textposition='outside'
))

fig9.update_layout(
    title='Which Factors Matter Most for Happiness?<br>(Correlation Strength)',
    xaxis_title='Correlation with Happiness Score',
    height=500,
    showlegend=False
)
fig9.write_html('static/visualizations/factor_importance.html')

# ============================================================================
# 10. Four Pillars Summary
# ============================================================================
print("10. Creating four pillars summary...")
fig10 = make_subplots(
    rows=2, cols=2,
    subplot_titles=('GDP Impact on Happiness', 
                    'Social Support Impact',
                    'Life Expectancy Impact',
                    'Freedom Impact')
)

# GDP scatter
fig10.add_trace(
    go.Scatter(x=df['GDP per capita'], y=df['Score'], mode='markers',
               marker=dict(color='blue', size=8, opacity=0.6),
               name='GDP', showlegend=False),
    row=1, col=1
)

# Social Support scatter
fig10.add_trace(
    go.Scatter(x=df['Social support'], y=df['Score'], mode='markers',
               marker=dict(color='green', size=8, opacity=0.6),
               name='Social Support', showlegend=False),
    row=1, col=2
)

# Life Expectancy scatter
fig10.add_trace(
    go.Scatter(x=df['Healthy life expectancy'], y=df['Score'], mode='markers',
               marker=dict(color='orange', size=8, opacity=0.6),
               name='Life Expectancy', showlegend=False),
    row=2, col=1
)

# Freedom scatter
fig10.add_trace(
    go.Scatter(x=df['Freedom to make life choices'], y=df['Score'], mode='markers',
               marker=dict(color='purple', size=8, opacity=0.6),
               name='Freedom', showlegend=False),
    row=2, col=2
)

fig10.update_xaxes(title_text="GDP per Capita", row=1, col=1)
fig10.update_xaxes(title_text="Social Support", row=1, col=2)
fig10.update_xaxes(title_text="Life Expectancy", row=2, col=1)
fig10.update_xaxes(title_text="Freedom", row=2, col=2)

fig10.update_yaxes(title_text="Happiness", row=1, col=1)
fig10.update_yaxes(title_text="Happiness", row=1, col=2)
fig10.update_yaxes(title_text="Happiness", row=2, col=1)
fig10.update_yaxes(title_text="Happiness", row=2, col=2)

fig10.update_layout(
    title_text="The Four Pillars of Happiness: A Comparative View",
    height=800,
    showlegend=False
)
fig10.write_html('static/visualizations/four_pillars.html')

print("\n✅ All visualizations exported successfully!")
print(f"📁 Saved to: static/visualizations/")
print("\nGenerated files:")
print("  1. map.html - Global happiness map")
print("  2. rankings.html - Top vs bottom countries")
print("  3. correlations.html - Correlation heatmap")
print("  4. factors_stacked.html - Factor contributions")
print("  5. radar.html - Profile comparison")
print("  6. gdp_scatter.html - GDP vs happiness")
print("  7. diminishing_returns.html - GDP categories")
print("  8. multidimensional.html - Bubble chart")
print("  9. factor_importance.html - Factor rankings")
print("  10. four_pillars.html - Summary view")
