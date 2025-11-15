document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const investigateBtn = document.getElementById('investigateBtn');
    const newsText = document.getElementById('newsText');
    const validationMessageDiv = document.getElementById('validationMessage');
    const resultContainer = document.getElementById('result-container');
    resultContainer.setAttribute('aria-live', 'polite');
    const loadingDiv = document.getElementById('loading');
    const exampleBtns = document.querySelectorAll('.example-btn');
    const animatedElements = document.querySelectorAll('.fade-in-up');

    const API_URL = 'https://projeto-senac-f43t.onrender.com/investigate';

    const displayValidationMessage = (message) => {
        validationMessageDiv.textContent = message;
        validationMessageDiv.style.display = 'block';
    };

    const clearValidationMessage = () => {
        validationMessageDiv.textContent = '';
        validationMessageDiv.style.display = 'none';
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const investigateNews = async () => {
        clearValidationMessage();
        const text = newsText.value.trim();
        if (!text) {
            displayValidationMessage('Please, provide a lead for the investigation.');
            return;
        }

        loadingDiv.style.display = 'flex';
        investigateBtn.disabled = true;
        exampleBtns.forEach(btn => btn.disabled = true);
        resultContainer.innerHTML = '';

        let requestBody = {};
        try {
            new URL(text);
            requestBody = { url: text };
        } catch (_) {
            requestBody = { text: text };
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Unknown server error.' }));
                throw new Error(errorData.detail || 'The server response was not successful.');
            }

            const result = await response.json();
            displayResult(result);

        } catch (error) {
            
            displayError(error.message);
        } finally {
            loadingDiv.style.display = 'none';
            investigateBtn.disabled = false;
            exampleBtns.forEach(btn => btn.disabled = false);
        }
    };

    const displayError = (message) => {
        clearValidationMessage();
        resultContainer.innerHTML = `
            <div class="result-card error glass-morphism">
                <div class="result-header">
                    <span class="verdict-icon">❌</span>
                    <h2 class="verdict-title">An Error Occurred!</h2>
                </div>
                <div class="result-body">
                    <p>It was not possible to complete the investigation. Please try again.</p>
                    <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 1rem;">Details: ${message}</p>
                </div>
            </div>
        `;
    };

    const displayResult = (result) => {
        const { verdict, event_summary, key_points, sources } = result;

        const keyPointsHtml = key_points.map(point => `
            <li class="key-point-item">
                <span class="key-point-icon">🎯</span>
                <p>${point}</p>
            </li>`).join('');

        const sourcesHtml = sources.map(source => `
            <div class="source-item">
                <a href="${source.link}" target="_blank" rel="noopener noreferrer">${source.title}</a>
                <p>${source.snippet}</p>
            </div>`).join('');

        resultContainer.innerHTML = `
            <div class="result-card ${verdict.toLowerCase()} glass-morphism">
                <div class="result-header">
                    <span class="verdict-icon">${getVerdictIcon(verdict)}</span>
                    <h2 class="verdict-title">Verdict: ${verdict}</h2>
                </div>
                <div class="result-body">
                    <section class="result-section">
                        <div class="collapsible-header" tabindex="0" role="button" aria-expanded="true" aria-controls="summary-content" data-target="summary-content">
                            <h3>📄 Investigation Summary</h3>
                            <span class="collapse-icon">▼</span>
                        </div>
                        <div class="collapsible-content" id="summary-content">
                            <p>${event_summary}</p>
                        </div>
                    </section>
                    <section class="result-section">
                        <div class="collapsible-header" tabindex="0" role="button" aria-expanded="true" aria-controls="keypoints-content" data-target="keypoints-content">
                            <h3>✨ Key Points</h3>
                            <span class="collapse-icon">▼</span>
                        </div>
                        <div class="collapsible-content" id="keypoints-content">
                            <ul class="key-points-list">${keyPointsHtml}</ul>
                        </div>
                    </section>
                    <section class="result-section">
                        <div class="collapsible-header" tabindex="0" role="button" aria-expanded="true" aria-controls="sources-content" data-target="sources-content">
                            <h3>🔗 Consulted Sources</h3>
                            <span class="collapse-icon">▼</span>
                        </div>
                        <div class="collapsible-content" id="sources-content">
                            <div class="sources-list">${sourcesHtml}</div>
                        </div>
                    </section>
                </div>
            </div>
        `;

        resultContainer.querySelectorAll('.collapsible-header').forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.dataset.target;
                const content = document.getElementById(targetId);
                const icon = header.querySelector('.collapse-icon');

                if (content.classList.contains('collapsed')) {
                    content.classList.remove('collapsed');
                    icon.textContent = '▼';
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    content.classList.add('collapsed');
                    icon.textContent = '►';
                    header.setAttribute('aria-expanded', 'false');
                }
            });

            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { 
                    e.preventDefault(); 
                    header.click(); 
                }
            });
        });
    };

    const getVerdictIcon = (verdict) => {
        switch (verdict.toUpperCase()) {
            case 'CONFIRMED': return '✅';
            case 'FALSE': return '❌';
            case 'INACCURATE': return '⚠️';
            case 'INSUFFICIENT': return '❓';
            default: return '🔎';
        }
    };

    const loadExample = (type) => {
        const examples = {
            plane_crash: 'Small aircraft crashes in Vinhedo, in the interior of São Paulo',
            fire: 'Large fire hits the National Museum in Rio de Janeiro',
            oil_spill: 'Oil stains appear on beaches in northeastern Brazil',
            celebrity_fake_death: 'Actor Sylvester Stallone dies at 71 years old',
            miracle_cure: 'Boldo tea cures cancer in 24 hours, says university study',
            political_rumor: 'President of Central Bank announces he will confiscate Brazilians\' savings'
        };
        if (examples[type]) {
            newsText.value = examples[type];
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            
            toggleTheme();
        });
    } else {
        
    };

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('#investigateBtn')) {
            
            investigateNews();
        }
        else if (target.matches('.example-btn')) {
            const exampleType = target.dataset.example;
            
            loadExample(exampleType);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            
            investigateNews();
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
    });

    
});
