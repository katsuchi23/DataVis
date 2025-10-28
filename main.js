// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Visualization tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const vizPanels = document.querySelectorAll('.viz-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            vizPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.data-card, .insight-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Load visualization function
    window.loadVisualization = function(vizType) {
        const vizContainer = document.getElementById(`${vizType}-viz`);
        const placeholder = vizContainer.querySelector('.placeholder-content');
        
        // Show loading state
        placeholder.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading visualization...</p>
        `;
        
        // Map viz types to files
        const vizFiles = {
            'map': 'visualizations/map.html',
            'rankings': 'visualizations/rankings.html',
            'correlations': 'visualizations/correlations.html',
            'factors': 'visualizations/factors_stacked.html',
            'radar': 'visualizations/radar.html',
            'gdp': 'visualizations/gdp_scatter.html',
            'diminishing': 'visualizations/diminishing_returns.html',
            'bubble': 'visualizations/multidimensional.html',
            'importance': 'visualizations/factor_importance.html',
            'pillars': 'visualizations/four_pillars.html'
        };
        
        // Load actual visualization
        const vizFile = vizFiles[vizType];
        if (vizFile) {
            // Load the HTML file using iframe for better isolation
            vizContainer.innerHTML = `
                <iframe src="${vizFile}" 
                        style="width: 100%; height: 700px; border: none; border-radius: 10px;"
                        title="${vizType} visualization">
                </iframe>
            `;
        } else {
            // Fallback to static content for unsupported types
            setTimeout(() => {
                let content = '';
                
                switch(vizType) {
                case 'map':
                    content = `
                        <div style="text-align: center; padding: 2rem;">
                            <h4 style="margin-bottom: 1rem;">🗺️ Interactive World Map</h4>
                            <p style="color: #64748b; margin-bottom: 1.5rem;">
                                To see the interactive choropleth map, please run the Jupyter notebook 
                                and export the Plotly visualization.
                            </p>
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                        height: 400px; border-radius: 10px; display: flex; 
                                        align-items: center; justify-content: center; color: white;">
                                <div>
                                    <p style="font-size: 3rem; margin-bottom: 1rem;">🌍</p>
                                    <p style="font-size: 1.2rem;">Global Happiness Distribution Map</p>
                                </div>
                            </div>
                            <div style="margin-top: 1.5rem; text-align: left;">
                                <h5>Key Observations:</h5>
                                <ul style="list-style: none; padding-left: 0;">
                                    <li style="margin: 0.5rem 0;">✓ Nordic countries show highest happiness scores (7.5+)</li>
                                    <li style="margin: 0.5rem 0;">✓ Sub-Saharan Africa shows lower scores (3.0-4.5)</li>
                                    <li style="margin: 0.5rem 0;">✓ Clear geographic patterns emerge</li>
                                </ul>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'rankings':
                    content = `
                        <div style="padding: 1rem;">
                            <h4 style="margin-bottom: 1.5rem; text-align: center;">Top 10 vs Bottom 10 Countries</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                                <div>
                                    <h5 style="color: #10b981; margin-bottom: 1rem;">✓ Top 10 Happiest</h5>
                                    <ol style="padding-left: 1.5rem;">
                                        <li style="margin: 0.5rem 0;">Finland - 7.769</li>
                                        <li style="margin: 0.5rem 0;">Denmark - 7.600</li>
                                        <li style="margin: 0.5rem 0;">Norway - 7.554</li>
                                        <li style="margin: 0.5rem 0;">Iceland - 7.494</li>
                                        <li style="margin: 0.5rem 0;">Netherlands - 7.488</li>
                                        <li style="margin: 0.5rem 0;">Switzerland - 7.480</li>
                                        <li style="margin: 0.5rem 0;">Sweden - 7.343</li>
                                        <li style="margin: 0.5rem 0;">New Zealand - 7.307</li>
                                        <li style="margin: 0.5rem 0;">Canada - 7.278</li>
                                        <li style="margin: 0.5rem 0;">Austria - 7.246</li>
                                    </ol>
                                </div>
                                <div>
                                    <h5 style="color: #ef4444; margin-bottom: 1rem;">↓ Bottom 10 Countries</h5>
                                    <ol style="padding-left: 1.5rem;" start="147">
                                        <li style="margin: 0.5rem 0;">Malawi - 3.600</li>
                                        <li style="margin: 0.5rem 0;">Haiti - 3.597</li>
                                        <li style="margin: 0.5rem 0;">Botswana - 3.479</li>
                                        <li style="margin: 0.5rem 0;">Rwanda - 3.334</li>
                                        <li style="margin: 0.5rem 0;">Zimbabwe - 3.299</li>
                                        <li style="margin: 0.5rem 0;">Tanzania - 3.231</li>
                                        <li style="margin: 0.5rem 0;">Afghanistan - 3.203</li>
                                        <li style="margin: 0.5rem 0;">CAR - 3.083</li>
                                        <li style="margin: 0.5rem 0;">South Sudan - 2.853</li>
                                        <li style="margin: 0.5rem 0;">Burundi - 2.905</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'correlations':
                    content = `
                        <div style="padding: 1rem;">
                            <h4 style="margin-bottom: 1.5rem; text-align: center;">Correlation Matrix</h4>
                            <p style="text-align: center; color: #64748b; margin-bottom: 2rem;">
                                Showing how strongly each factor correlates with happiness
                            </p>
                            <div style="background: #f8fafc; padding: 2rem; border-radius: 10px;">
                                <div style="max-width: 600px; margin: 0 auto;">
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #10b981; color: white; border-radius: 5px; margin-bottom: 0.5rem;">
                                        <span>GDP per capita</span>
                                        <strong>0.780</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #10b981; color: white; border-radius: 5px; margin-bottom: 0.5rem;">
                                        <span>Healthy life expectancy</span>
                                        <strong>0.777</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #10b981; color: white; border-radius: 5px; margin-bottom: 0.5rem;">
                                        <span>Social support</span>
                                        <strong>0.768</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #3b82f6; color: white; border-radius: 5px; margin-bottom: 0.5rem;">
                                        <span>Freedom to make choices</span>
                                        <strong>0.560</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #3b82f6; color: white; border-radius: 5px; margin-bottom: 0.5rem;">
                                        <span>Perceptions of corruption</span>
                                        <strong>0.431</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f59e0b; color: white; border-radius: 5px;">
                                        <span>Generosity</span>
                                        <strong>0.147</strong>
                                    </div>
                                </div>
                                <p style="text-align: center; margin-top: 2rem; color: #64748b;">
                                    Higher values indicate stronger positive correlation with happiness
                                </p>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'factors':
                    content = `
                        <div style="padding: 1rem;">
                            <h4 style="margin-bottom: 1.5rem; text-align: center;">Factor Analysis</h4>
                            <p style="text-align: center; color: #64748b; margin-bottom: 2rem;">
                                Comparing how different factors contribute to happiness
                            </p>
                            <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); 
                                        padding: 3rem; border-radius: 10px; text-align: center;">
                                <p style="font-size: 2rem; margin-bottom: 1rem;">📊</p>
                                <p style="font-size: 1.1rem; color: #475569; margin-bottom: 1.5rem;">
                                    The happiest countries excel across multiple dimensions
                                </p>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem;">
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">💰</div>
                                        <strong>High GDP</strong>
                                    </div>
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🤝</div>
                                        <strong>Strong Support</strong>
                                    </div>
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🏥</div>
                                        <strong>Long Lives</strong>
                                    </div>
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🗽</div>
                                        <strong>Personal Freedom</strong>
                                    </div>
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">❤️</div>
                                        <strong>Generosity</strong>
                                    </div>
                                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚖️</div>
                                        <strong>Low Corruption</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'gdp':
                    content = `
                        <div style="padding: 1rem;">
                            <h4 style="margin-bottom: 1.5rem; text-align: center;">GDP vs Happiness Analysis</h4>
                            <div style="background: #f8fafc; padding: 2rem; border-radius: 10px;">
                                <div style="text-align: center; margin-bottom: 2rem;">
                                    <h5 style="color: #2563eb; margin-bottom: 1rem;">Key Finding</h5>
                                    <p style="font-size: 1.3rem; font-weight: 600; color: #0f172a;">
                                        Correlation: r = 0.780
                                    </p>
                                    <p style="color: #64748b; margin-top: 0.5rem;">
                                        GDP explains approximately 61% of variance in happiness scores
                                    </p>
                                </div>
                                
                                <div style="background: white; padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                                    <h5 style="margin-bottom: 1rem;">💡 The Diminishing Returns Effect</h5>
                                    <div style="display: flex; justify-content: space-around; text-align: center; margin-top: 1.5rem;">
                                        <div>
                                            <div style="font-size: 2rem; color: #ef4444;">📉</div>
                                            <p style="font-weight: 600; margin-top: 0.5rem;">Very Low GDP</p>
                                            <p style="color: #64748b;">Avg: 3.8</p>
                                        </div>
                                        <div>
                                            <div style="font-size: 2rem; color: #f59e0b;">📊</div>
                                            <p style="font-weight: 600; margin-top: 0.5rem;">Low GDP</p>
                                            <p style="color: #64748b;">Avg: 4.6</p>
                                        </div>
                                        <div>
                                            <div style="font-size: 2rem; color: #3b82f6;">📈</div>
                                            <p style="font-weight: 600; margin-top: 0.5rem;">Medium GDP</p>
                                            <p style="color: #64748b;">Avg: 5.4</p>
                                        </div>
                                        <div>
                                            <div style="font-size: 2rem; color: #10b981;">📊</div>
                                            <p style="font-weight: 600; margin-top: 0.5rem;">High GDP</p>
                                            <p style="color: #64748b;">Avg: 6.3</p>
                                        </div>
                                        <div>
                                            <div style="font-size: 2rem; color: #10b981;">📈</div>
                                            <p style="font-weight: 600; margin-top: 0.5rem;">Very High GDP</p>
                                            <p style="color: #64748b;">Avg: 6.9</p>
                                        </div>
                                    </div>
                                    <p style="text-align: center; margin-top: 1.5rem; color: #64748b; font-style: italic;">
                                        Notice: Gains are largest at lower GDP levels and smaller at higher levels
                                    </p>
                                </div>
                                
                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                            color: white; padding: 1.5rem; border-radius: 10px; text-align: center;">
                                    <p style="font-size: 1.2rem; font-weight: 600;">
                                        💰 Money matters most when escaping poverty
                                    </p>
                                    <p style="opacity: 0.9; margin-top: 0.5rem;">
                                        Beyond moderate wealth, other factors become more important
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
            
            vizContainer.innerHTML = content;
        }, 1000);
        }
    };

    // Add some interactivity to the hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading spinner styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Utility function to format numbers
function formatNumber(num) {
    return num.toFixed(3);
}

// Export functions for potential use
window.scrollToSection = scrollToSection;