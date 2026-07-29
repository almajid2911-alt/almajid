document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // DATA CONFIGURATION
    // ==========================================================================
    const regionalData = {
        satui: {
            title: "Area Satui (Tanah Laut/Barat)",
            color: "#3b82f6",
            technicians: "30 Orang",
            workzones: "2 STO",
            workzoneDetail: "Satui (STI), Kintap (KIP)",
            volume: "110 Order/Day",
            sla: "98.6%"
        },
        batulicin: {
            title: "Area Batulicin (Tanah Bumbu/Utara)",
            color: "#10b981",
            technicians: "39 Orang",
            workzones: "2 STO",
            workzoneDetail: "Batulicin (BLC), Pagatan (PGT)",
            volume: "185 Order/Day",
            sla: "99.1%"
        },
        kotabaru: {
            title: "Area Kotabaru (Timur/Pulau)",
            color: "#a855f7",
            technicians: "24 Orang",
            workzones: "2 STO",
            workzoneDetail: "Serongga (SER), Stagen (STI)",
            volume: "125 Order/Day",
            sla: "98.3%"
        }
    };

    const dashboardTabsData = {
        sla: {
            title: "Tren KPI IOAN Bulanan (Branch Banjarmasin)",
            metrics: [
                { name: "Average KPI IOAN", desc: "Pencapaian KPI I-OAN Branch Banjarmasin", value: "98.39%", trend: "+0.2% MoM", isUp: true },
                { name: "Assurance Guarantee", desc: "Jaminan Kualitas Layanan Teknik", value: "92.25%", trend: "Target Met", isUp: true },
                { name: "Service Availability", desc: "Ketersediaan Layanan Pelanggan", value: "96.42%", trend: "Target Met", isUp: true }
            ],
            legend: "Realisasi vs Target (95.0%)",
            chart: [
                { label: "Mar", value: "98.1%" },
                { label: "Apr", value: "98.4%" },
                { label: "May", value: "98.2%" },
                { label: "Jun", value: "98.5%" },
                { label: "Jul", value: "98.39%" }
            ]
        },
        mttr: {
            title: "Pencapaian KPI Provisioning (Pasang Baru)",
            metrics: [
                { name: "Provisioning Success (PS)", desc: "Keberhasilan pasang baru tepat waktu", value: "98.6%", trend: "+0.3% MoM", isUp: true },
                { name: "Field Force Guarantee (FFG)", desc: "Jaminan kehandalan teknisi lapangan", value: "98.1%", trend: "Excellent", isUp: true },
                { name: "Time to Install (TTI)", desc: "Kecepatan waktu instalasi perangkat", value: "99.2%", trend: "Target Met", isUp: true }
            ],
            legend: "Realisasi vs Target Minimum (98.0%)",
            chart: [
                { label: "Mar", value: "98.1%" },
                { label: "Apr", value: "98.3%" },
                { label: "May", value: "98.0%" },
                { label: "Jun", value: "98.5%" },
                { label: "Jul", value: "98.6%" }
            ]
        }
    };

    // ==========================================================================
    // HERO STAT COUNTER ANIMATION
    // ==========================================================================
    const statNumbers = document.querySelectorAll(".stat-number");
    
    const startCounter = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"), 10);
            let current = 0;
            const duration = 1500; // ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                current += 1;
                if (current >= target) {
                    stat.textContent = target + (target === 93 || target === 14 ? "+" : "");
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, stepTime);
        });
    };
    
    // Auto start counter shortly after load
    setTimeout(startCounter, 300);

    // ==========================================================================
    // INTERACTIVE SVG MAP LOGIC
    // ==========================================================================
    const mapRegions = document.querySelectorAll(".map-region");
    const regionTitle = document.getElementById("region-title");
    const valTechnicians = document.getElementById("val-technicians");
    const valWorkzones = document.getElementById("val-workzones");
    const valVolume = document.getElementById("val-volume");
    const valSla = document.getElementById("val-sla");

    const updateRegionCard = (regionKey) => {
        const data = regionalData[regionKey];
        if (!data) return;

        // Add fading transition effect
        const card = document.getElementById("region-card");
        card.style.opacity = 0;
        card.style.transform = "translateY(10px)";
        
        setTimeout(() => {
            regionTitle.innerHTML = `<span style="background-color: ${data.color};"></span> ${data.title}`;
            valTechnicians.textContent = data.technicians;
            valWorkzones.textContent = data.workzones;
            valWorkzones.nextElementSibling.textContent = `Workzone (${data.workzoneDetail})`;
            valVolume.textContent = data.volume;
            valSla.textContent = data.sla;
            
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, 200);
    };

    mapRegions.forEach(region => {
        region.addEventListener("click", function() {
            // Remove active class from all
            mapRegions.forEach(r => r.classList.remove("active"));
            
            // Add to clicked
            this.classList.add("active");
            
            // Update Details
            const regionKey = this.getAttribute("data-region");
            updateRegionCard(regionKey);
        });

        region.addEventListener("mouseenter", function() {
            // Optional: highlight region on hover
        });
    });

    // Initialize with Satui (default active class in HTML)
    updateRegionCard("satui");


    // ==========================================================================
    // OPERATIONS DASHBOARD TABS & CHARTS LOGIC
    // ==========================================================================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const chartTitleElement = document.getElementById("chart-panel-title");
    const metricsContainer = document.getElementById("dash-metrics-container");
    const chartContainer = document.getElementById("chart-container");

    const renderDashboard = (tabKey) => {
        const data = dashboardTabsData[tabKey];
        if (!data) return;

        // 1. Update Title
        chartTitleElement.textContent = data.title;

        // 2. Update Metrics Rows
        metricsContainer.innerHTML = data.metrics.map(m => `
            <div class="metric-row" style="opacity: 0; transform: translateX(-10px); transition: var(--transition);">
                <div class="metric-info">
                    <span class="metric-name">${m.name}</span>
                    <span class="metric-desc">${m.desc}</span>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span class="metric-value">${m.value}</span>
                    <span class="metric-trend ${m.isUp ? 'trend-up' : 'trend-down'}">${m.trend}</span>
                </div>
            </div>
        `).join('');

        // Trigger metric row entrance animations
        setTimeout(() => {
            const rows = metricsContainer.querySelectorAll(".metric-row");
            rows.forEach((row, i) => {
                setTimeout(() => {
                    row.style.opacity = 1;
                    row.style.transform = "translateX(0)";
                }, i * 100);
            });
        }, 50);

        // 3. Update Chart Content (Visual Bars)
        chartContainer.innerHTML = data.chart.map(c => {
            // Parse numerical height for styles (e.g. 98.2% -> 98.2, 2,000 WO -> 2000)
            let heightPercent = 0;
            if (c.value.includes("%")) {
                heightPercent = parseFloat(c.value);
            } else if (c.value.includes("Jam")) {
                const val = parseFloat(c.value);
                heightPercent = Math.max(10, Math.min(100, (val / 3.0) * 100)); 
            } else if (c.value.includes("WO")) {
                // Remove commas before parsing (e.g. 2,000 -> 2000)
                const val = parseInt(c.value.replace(/,/g, ''), 10);
                // Scale based on maximum expected volume
                const maxExpected = tabKey === 'tickets' ? 2200 : 950;
                heightPercent = Math.max(10, Math.min(100, (val / maxExpected) * 100));
            }

            return `
                <div class="chart-bar-wrapper">
                    <div class="chart-value-hover" style="--height: ${heightPercent}%">${c.value}</div>
                    <div class="chart-bar-container">
                        <div class="chart-bar" style="height: 0%; --target-height: ${heightPercent}%"></div>
                    </div>
                    <span class="chart-label">${c.label}</span>
                </div>
            `;
        }).join('');

        // Trigger chart bar growth animation after rendering
        setTimeout(() => {
            const bars = chartContainer.querySelectorAll(".chart-bar");
            bars.forEach(bar => {
                const target = bar.style.getPropertyValue("--target-height");
                bar.style.height = target;
            });
        }, 100);
    };

    tabButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            tabButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            
            const tabKey = this.getAttribute("data-tab");
            renderDashboard(tabKey);
        });
    });

    // Initialize Dashboard with SLA
    renderDashboard("sla");


    // ==========================================================================
    // CONTACT FORM HANDLER (SIMULATED SUBMIT WITH DYNAMIC FEEDBACK)
    // ==========================================================================
    const contactForm = document.getElementById("portfolio-contact-form");
    const feedbackBox = document.getElementById("form-msg-feedback");
    const submitBtn = document.getElementById("btn-submit-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Disable button & show spinner state
            submitBtn.disabled = true;
            const origContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `Mengirimkan... <span class="dashboard-pulse" style="width:8px; height:8px; display:inline-block; margin-left:5px;"></span>`;

            const name = document.getElementById("contact-name").value;
            const email = document.getElementById("contact-email").value;

            // Simulate Network Request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origContent;

                // Show Success Feedback
                feedbackBox.className = "form-feedback success";
                feedbackBox.textContent = `Halo ${name}! Pesan simulasi Anda telah terkirim. Dalam versi live, notifikasi akan dikirim ke muhammad.majid@telkomakses.co.id. Terima kasih!`;
                feedbackBox.style.display = "block";

                // Reset Form
                contactForm.reset();

                // Fade out feedback after 8 seconds
                setTimeout(() => {
                    feedbackBox.style.opacity = 0;
                    setTimeout(() => {
                        feedbackBox.style.display = "none";
                        feedbackBox.style.opacity = 1;
                    }, 500);
                }, 8000);

            }, 1500);
        });
    }

    // ==========================================================================
    // NAVIGATION LINK HIGHLIGHT ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 180)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
});
