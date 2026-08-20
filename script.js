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
    // AUTOMATION CATEGORY FILTER & WORKFLOW MODAL ENGINE
    // ==========================================================================
    const autoFilterBtns = document.querySelectorAll(".auto-filter-btn");
    const autoCards = document.querySelectorAll(".auto-card");

    // Filter cards
    autoFilterBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            autoFilterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");
            autoCards.forEach(card => {
                const cat = card.getAttribute("data-category");
                if (filter === "all" || cat === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    // Workflow Modal Data
    const workflowData = {
        "wa-ai": {
            icon: "🤖",
            title: "WhatsApp AI Conversational & Learning Agent",
            subtitle: "Full-Stack Customer Engagement, Auto-Learning & Lead Capture",
            steps: [
                {
                    name: "1. Real-Time Message Listener (Baileys Engine)",
                    desc: "Menerima pesan chat masuk 24/7 melalui multi-device WhatsApp socket dengan dukungan session recovery dan reconnect otomatis."
                },
                {
                    name: "2. Dual-Engine Intelligence (Local LLM + Gemini AI)",
                    desc: "Menganalisis intensi pertanyaan pelanggan, mencari kecocokan di database dinamis Google Sheets & riwayat pertanyaan yang telah dipelajari (`learned_qa.json`)."
                },
                {
                    name: "3. Auto-Lead Capture & Human Take-over",
                    desc: "Secara otomatis mencatat data prospek/tiket ke Google Sheet. Jika pelanggan meminta staf manusia, bot otomatis pause (`takeover.js`) dan meneruskan notifikasi instan ke admin."
                },
                {
                    name: "4. Autonomous Follow-Up Scheduler",
                    desc: "Melakukan follow-up terjadwal bagi calon pelanggan yang belum menyelesaikan pendaftaran, meningkatkan rasio konversi secara otomatis."
                }
            ],
            impactIcon: "📈",
            impactTitle: "Respon Instan < 2 Detik & Zero Lead Lost",
            impactDesc: "Mengurangi beban CS manual hingga 75% serta memastikan tidak ada pelanggan yang terlewat meskipun di luar jam kerja kantor."
        },
        "wfm-bot": {
            icon: "⚡",
            title: "WFM Telegram 24/7 Operations Bot Engine",
            subtitle: "Multi-Scheduler Cloud Engine Deployed on Railway",
            steps: [
                {
                    name: "1. Automated Cloud Cron Schedulers (Railway)",
                    desc: "Scheduler `node-cron` bekerja 24/7 melakukan background checking berkala untuk tiket Insera, WeCare, Potensi PS, FailWA, Xpro, dan FFG."
                },
                {
                    name: "2. Real-time Multi-Channel Broadcast",
                    desc: "Menyaring tiket berdasarkan Wilsus dan urgensi, kemudian menyiarkan broadcast alert otomatis ke grup Telegram teknisi dan pengawas area."
                },
                {
                    name: "3. Interactive Command & Callback Query Handlers",
                    desc: "Teknisi dapat mengecek status tiket secara interaktif lewat inline buttons (`/rekon`, `/unspec`, `/qc`, `/tiket`, `/bima`, `/mapping`)."
                },
                {
                    name: "4. Live Google Sheets Data Synchronization",
                    desc: "Sinkronisasi dua arah dengan basis data operasional WFM Google Sheet untuk pembaruan status real-time tanpa delay."
                }
            ],
            impactIcon: "⏱️",
            impactTitle: "Percepatan Dispatching & Zero Unattended Tickets",
            impactDesc: "Memangkas waktu respon tiket kritis dari hitungan jam menjadi hitungan menit, menjaga SLA pencapaian IOAN di atas 98%."
        },
        "order-dash": {
            icon: "📊",
            title: "Live Order Control & TTR Breach Alert Center",
            subtitle: "Full-Stack Web Monitoring (Flask + SQLite + DataTables + Webhooks)",
            steps: [
                {
                    name: "1. Live Data Ingestion & Audit Pipeline",
                    desc: "Mengimpor dan memvalidasi order pasang baru & gangguan ke dalam basis data SQLite berkecepatan tinggi (`orders.db`)."
                },
                {
                    name: "2. Real-Time Time to Resolve (TTR) Calculation",
                    desc: "Menghitung sisa batas waktu pengerjaan setiap order berdasarkan target SLA regional dan mengelompokkannya per sektor kerja."
                },
                {
                    name: "3. Interactive Analytics & Filter Dashboard",
                    desc: "Menampilkan visualisasi chart performa, filter dinamis status order, dan deteksi antrean tiket yang menumpuk di Wilsus tertentu."
                },
                {
                    name: "4. Proactive Breach Webhook Alerting",
                    desc: "Mengirimkan peringatan otomatis ke grup Telegram Korlap sebelum tiket melewati ambang batas durasi TTR merah."
                }
            ],
            impactIcon: "🎯",
            impactTitle: "Visibilitas 100% & Pencegahan Pelanggaran SLA",
            impactDesc: "Memberikan kendali penuh bagi manajemen untuk memantau beban 93 teknisi secara transparan dan terukur."
        },
        "scc-bot": {
            icon: "🛡️",
            title: "Automated SCC Clearance & Verification Engine",
            subtitle: "Automated Selenium Diagnostics, Screenshot Audit & Security Whitelist",
            steps: [
                {
                    name: "1. Authorized Request Validation",
                    desc: "Mengecek ID pengirim terhadap daftar whitelist keamanan (`ALLOWED_CHAT_IDS`) untuk mencegah akses tidak berwenang."
                },
                {
                    name: "2. Headless Chrome Remote Clearance",
                    desc: "Menjalankan navigasi browser Selenium otomatis ke portal Service Configuration Check (SCC) Telkom untuk memproses clearance tiket."
                },
                {
                    name: "3. Auto-Capture Proof of Clearance",
                    desc: "Mengambil screenshot hasil eksekusi (`scc_INC...png`) sebagai bukti audit forensik yang valid."
                },
                {
                    name: "4. Instant Telegram Report & Historical DB Logging",
                    desc: "Mengirim foto bukti screenshot ke pengawas lapangan dan mencatat riwayat eksekusi ke database `history.db`."
                }
            ],
            impactIcon: "⚡",
            impactTitle: "Efisiensi Clearance 10x Lipat & Audit Trail Lengkap",
            impactDesc: "Menghilangkan proses input manual berulang dan mempercepat proses aktivasi pelanggan baru."
        },
        "ibooster-bima": {
            icon: "🔮",
            title: "iBooster Bima Sync (Proactive Loss Mitigation)",
            subtitle: "Automated Batch Optical Power Diagnostics & Customer Notification",
            steps: [
                {
                    name: "1. Reading Candidate List (Google Sheets API)",
                    desc: "Mengekstrak ratusan nomor layanan internet pelanggan dari spreadsheet DATA WFM (`Data Preventif FFG`)."
                },
                {
                    name: "2. Intelligent Batch Analysis (iBooster Portal)",
                    desc: "Menyisipkan batch 100 nomor ke portal diagnosa iBooster menggunakan Selenium Chrome Debugger dan memicu kalkulasi redaman optik."
                },
                {
                    name: "3. Optical Loss Power Anomaly Detection",
                    desc: "Mendeteksi port kabel optik yang mengalami penurunan sinyal drastis (loss power) sebelum pelanggan menyadari adanya gangguan."
                },
                {
                    name: "4. WhatsApp Outreach & Telegram Dispatch",
                    desc: "Mengirim pesan notifikasi preventif ke WhatsApp pelanggan dan meneruskan balasan konfirmasi jadwal langsung ke grup teknisi."
                }
            ],
            impactIcon: "🛡️",
            impactTitle: "Mitigasi Preventif & Penurunan Angka Komplain",
            impactDesc: "Mencegah terjadinya komplain pelanggan berulang dan mengamankan indikator Field Force Guarantee (FFG)."
        },
        "exif-bot": {
            icon: "📸",
            title: "Field EXIF Inspector & GPS Verification Bot",
            subtitle: "Telegram Bot for Geospatial Metadata & QC Compliance",
            steps: [
                {
                    name: "1. Photo Ingestion & Metadata Extraction",
                    desc: "Menerima foto dokumentasi hasil instalasi/perbaikan teknisi dari lapangan dan membaca EXIF data (tag GPS, tanggal, dan model perangkat)."
                },
                {
                    name: "2. Geolocation Radius & Timestamp Validation",
                    desc: "Mencocokkan koordinat latitude/longitude foto dengan titik ODP atau rumah pelanggan yang dituju."
                },
                {
                    name: "3. EXIF Metadata Correction & Re-Injection",
                    desc: "Menggunakan library `piexif` dan `Pillow` untuk memperbaiki metadata gambar yang hilang akibat kompresi aplikasi chat."
                },
                {
                    name: "4. Quality Control Approval Stream",
                    desc: "Menghasilkan foto tervalidasi yang siap diunggah ke sistem audit Telkom tanpa risiko reject QC."
                }
            ],
            impactIcon: "✅",
            impactTitle: "Kepatuhan Audit 100% & Anti-Fraud Dokumentasi",
            impactDesc: "Menghilangkan potensi penolakan hasil uji petik (UT Online) akibat ketidaksesuaian titik koordinat foto."
        }
    };

    // Modal Elements
    const workflowModal = document.getElementById("workflow-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalIcon = document.getElementById("modal-icon");
    const modalTitle = document.getElementById("modal-title");
    const modalSubtitle = document.getElementById("modal-subtitle");
    const modalStepsContainer = document.getElementById("modal-steps-container");
    const modalImpactIcon = document.getElementById("modal-impact-icon");
    const modalImpactTitle = document.getElementById("modal-impact-title");
    const modalImpactDesc = document.getElementById("modal-impact-desc");

    const openWorkflowModal = (workflowId) => {
        const data = workflowData[workflowId];
        if (!data || !workflowModal) return;

        modalIcon.textContent = data.icon;
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalImpactIcon.textContent = data.impactIcon;
        modalImpactTitle.textContent = data.impactTitle;
        modalImpactDesc.textContent = data.impactDesc;

        modalStepsContainer.innerHTML = data.steps.map(s => `
            <div class="workflow-step-item">
                <div class="workflow-step-dot"></div>
                <div class="workflow-step-name">${s.name}</div>
                <div class="workflow-step-desc">${s.desc}</div>
            </div>
        `).join('');

        workflowModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeWorkflowModal = () => {
        if (!workflowModal) return;
        workflowModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    // Attach click listeners to cards
    autoCards.forEach(card => {
        card.addEventListener("click", function() {
            const wId = this.getAttribute("data-workflow-id");
            if (wId) openWorkflowModal(wId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeWorkflowModal);
    }

    if (workflowModal) {
        workflowModal.addEventListener("click", (e) => {
            if (e.target === workflowModal) closeWorkflowModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && workflowModal && workflowModal.classList.contains("active")) {
            closeWorkflowModal();
        }
    });

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
