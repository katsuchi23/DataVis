# 🌍 World Happiness Data Visualization Project

An interactive data visualization project exploring the factors that contribute to national happiness using the 2024 World Happiness Report data.

## 📊 Project Overview

This project analyzes happiness data from 156 countries to answer the key research question: **"What makes countries happy, and does money really buy happiness?"**

## 🗂️ Project Structure

```
datavis/
├── data/                           # Data files
│   ├── pone.0322287.s001.xlsx     # Excel file with happiness data
│   └── world_happiness.csv         # CSV version (legacy)
├── scripts/                        # Analysis scripts
│   └── main.ipynb                 # Jupyter notebook with all visualizations
├── static/                         # Website files
│   └── index.html                 # Main website HTML
├── style/                          # CSS and JavaScript
│   ├── main.css                   # Website styles
│   └── main.js                    # Interactive functionality
├── requirements.txt                # Python dependencies
├── serve.py                       # Simple web server script
└── README.md                      # This file
```

## 🚀 Getting Started

### Quick Start - View the Website

**The easiest way to explore the project:**

```bash
python serve.py
```

This will automatically:
- Start a local web server
- Open your browser to the interactive website
- Display all visualizations and insights in a beautiful interface

**Or view manually:**
```bash
cd static
python -m http.server 8000
# Then visit http://localhost:8000
```

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/rey/random_projects/datavis
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/Mac
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Analysis

**Option 1: Jupyter Notebook (Recommended)**
```bash
jupyter notebook scripts/main.ipynb
```

This will open the interactive notebook where you can:
- Run all cells to generate visualizations
- Explore the data interactively
- Modify analyses as needed

**Option 2: View the Website**
```bash
python serve.py
```

This will:
- Start a local web server on port 8000
- Automatically open your browser to view the website
- Display all insights and findings in an interactive format

## 📈 Visualizations Included

1. **Global Happiness Map** - Interactive choropleth showing happiness distribution worldwide
2. **Rankings Comparison** - Top 10 vs Bottom 10 countries
3. **Correlation Heatmap** - Relationships between all factors
4. **Factor Contributions** - Stacked bar chart showing what makes countries happy
5. **Radar Chart** - Profile comparison of happy vs unhappy countries
6. **GDP vs Happiness** - Scatter plot with regression analysis
7. **Diminishing Returns** - Binned analysis showing money's declining impact
8. **Multi-dimensional Analysis** - Interactive bubble chart
9. **Factor Importance** - Ranked correlation strengths
10. **Scatter Matrix** - Pairwise relationships between all factors

## 🔑 Key Findings

### What Makes Countries Happy?

1. **GDP per capita** (r ≈ 0.78) - Strong positive correlation
2. **Social Support** (r ≈ 0.77) - Almost as important as GDP
3. **Healthy Life Expectancy** (r ≈ 0.78) - Critical for happiness
4. **Freedom** (r ≈ 0.56) - Significant impact
5. **Low Corruption** (r ≈ 0.43) - Moderate impact
6. **Generosity** (r ≈ 0.15) - Weaker but positive correlation

### Does Money Buy Happiness?

**Answer: Yes, BUT with important caveats**

✅ **Money helps when:**
- Moving from poverty to basic economic security (biggest impact)
- Combined with strong social support systems
- Used to improve health and life expectancy
- Enables personal freedom and choices

⚠️ **Money alone isn't enough because:**
- Diminishing returns beyond moderate wealth
- Social support matters almost as much as GDP
- Countries with similar GDP can have very different happiness
- How money is distributed matters (social programs, community)

**Conclusion:** Money provides the foundation, but social factors build the house of happiness!

## 📚 Data Sources

- **Primary Data:** World Happiness Report 2024
- **Dataset:** 156 countries
- **Metrics:** 
  - Happiness Score (Gallup World Poll)
  - GDP per capita
  - Social support
  - Healthy life expectancy
  - Freedom to make life choices
  - Generosity
  - Perceptions of corruption

## 🛠️ Technologies Used

### Analysis
- **Python 3.10+**
- **pandas** - Data manipulation
- **matplotlib** - Static visualizations
- **seaborn** - Statistical visualizations
- **plotly** - Interactive charts
- **scipy** - Statistical analysis
- **openpyxl** - Excel file reading

### Website
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **JavaScript** - Interactivity
- **No frameworks** - Vanilla JS for simplicity

## 📝 Usage Examples

### Run the Jupyter Notebook
```bash
# Activate virtual environment
source venv/bin/activate

# Start Jupyter
jupyter notebook scripts/main.ipynb

# Run all cells in order
```

### View the Website
```bash
# Start the local server
python serve.py

# Or manually:
cd static
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎨 Website Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Navigation** - Animated scrolling between sections
- **Interactive Tabs** - Multiple visualization views
- **Modern UI** - Clean, professional design
- **Data Cards** - Easy-to-read factor explanations
- **Mobile Menu** - Hamburger menu for small screens

## 📊 Customization

### Adding New Visualizations

1. Generate visualization in Jupyter notebook
2. Export as PNG/HTML
3. Add to appropriate section in `index.html`
4. Update JavaScript in `main.js` if interactive

### Modifying Styles

Edit `style/main.css`:
- Colors are defined in CSS variables at the top
- Responsive breakpoints at 768px and 480px
- Uses CSS Grid and Flexbox for layouts

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Key areas for improvement:
- Adding more interactive visualizations
- Implementing real-time data loading
- Adding comparison tools
- Time-series analysis across years

## 📄 License

This project is for educational purposes. Data from World Happiness Report is publicly available.

## 🙏 Acknowledgments

- World Happiness Report team for the data
- Gallup World Poll for survey methodology
- All the amazing data visualization libraries used

## 📞 Contact

For questions or suggestions about this project, please create an issue or reach out!

---

**Happy exploring! 🌍✨**
