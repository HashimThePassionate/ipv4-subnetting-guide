// IPv4 Subnetting Calculator
// Interactive educational tool for learning subnetting

document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive elements
    initializeSubnetCalculator();
    initializeAnimations();
    initializeIPValidator();
    initializeBinaryConverter();
});

function initializeSubnetCalculator() {
    const calculator = document.getElementById('subnet-calculator');
    if (!calculator) return;

    const hostsInput = document.getElementById('hosts-needed');
    const calculateBtn = document.getElementById('calculate-subnet');
    const resultsDiv = document.getElementById('calculator-results');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const hostsNeeded = parseInt(hostsInput.value);
            if (isNaN(hostsNeeded) || hostsNeeded < 1) {
                resultsDiv.innerHTML = '<p class="error">Please enter a valid number of hosts (1 or greater).</p>';
                return;
            }

            const results = calculateSubnet(hostsNeeded);
            displayResults(results, resultsDiv);
        });
    }

    // Real-time calculation on input change
    if (hostsInput) {
        hostsInput.addEventListener('input', function() {
            const hostsNeeded = parseInt(this.value);
            if (!isNaN(hostsNeeded) && hostsNeeded > 0) {
                const results = calculateSubnet(hostsNeeded);
                displayResults(results, resultsDiv);
            }
        });
    }
}

// New function: IP Address Validator
function initializeIPValidator() {
    const validatorSection = document.getElementById('ip-validator');
    if (!validatorSection) return;

    const ipInput = document.getElementById('ip-address-input');
    const validateBtn = document.getElementById('validate-ip');
    const validationResult = document.getElementById('validation-result');

    if (validateBtn && ipInput) {
        validateBtn.addEventListener('click', function() {
            const ip = ipInput.value.trim();
            const result = validateIPAddress(ip);
            displayValidationResult(result, validationResult);
        });

        ipInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validateBtn.click();
            }
        });
    }
}

function validateIPAddress(ip) {
    const octets = ip.split('.');
    
    if (octets.length !== 4) {
        return { valid: false, message: 'IP address must have exactly 4 octets.' };
    }

    for (let i = 0; i < octets.length; i++) {
        const octet = parseInt(octets[i]);
        if (isNaN(octet) || octet < 0 || octet > 255) {
            return { valid: false, message: `Octet ${i + 1} is invalid. Must be 0-255.` };
        }
    }

    // Determine class
    const firstOctet = parseInt(octets[0]);
    let ipClass = '';
    let type = 'Public';

    if (firstOctet >= 1 && firstOctet <= 126) {
        ipClass = 'A';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        ipClass = 'B';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        ipClass = 'C';
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        ipClass = 'D (Multicast)';
    } else {
        ipClass = 'E (Experimental)';
    }

    // Check if private
    if ((firstOctet === 10) ||
        (firstOctet === 172 && parseInt(octets[1]) >= 16 && parseInt(octets[1]) <= 31) ||
        (firstOctet === 192 && parseInt(octets[1]) === 168)) {
        type = 'Private';
    }

    return { 
        valid: true, 
        ip: ip,
        class: ipClass, 
        type: type,
        binary: octets.map(o => parseInt(o).toString(2).padStart(8, '0')).join('.')
    };
}

function displayValidationResult(result, container) {
    if (!result.valid) {
        container.innerHTML = `<div class="validation-error">❌ ${result.message}</div>`;
        return;
    }

    container.innerHTML = `
        <div class="validation-success">
            <h5>✅ Valid IP Address</h5>
            <div class="ip-details">
                <div class="ip-detail-item">
                    <strong>IP Address:</strong> ${result.ip}
                </div>
                <div class="ip-detail-item">
                    <strong>Class:</strong> ${result.class}
                </div>
                <div class="ip-detail-item">
                    <strong>Type:</strong> ${result.type}
                </div>
                <div class="ip-detail-item">
                    <strong>Binary:</strong> <code>${result.binary}</code>
                </div>
            </div>
        </div>
    `;
}

// New function: Binary Converter
function initializeBinaryConverter() {
    const converterSection = document.getElementById('binary-converter');
    if (!converterSection) return;

    const decimalInput = document.getElementById('decimal-input');
    const binaryOutput = document.getElementById('binary-output');

    if (decimalInput && binaryOutput) {
        decimalInput.addEventListener('input', function() {
            const decimal = parseInt(this.value);
            if (!isNaN(decimal) && decimal >= 0 && decimal <= 255) {
                const binary = decimal.toString(2).padStart(8, '0');
                binaryOutput.innerHTML = `
                    <div class="binary-conversion">
                        <div class="conversion-row">
                            <span class="conversion-label">Decimal:</span>
                            <span class="conversion-value">${decimal}</span>
                        </div>
                        <div class="conversion-row">
                            <span class="conversion-label">Binary:</span>
                            <span class="conversion-value binary-display">${binary}</span>
                        </div>
                        <div class="binary-breakdown">
                            ${binary.split('').map((bit, idx) => 
                                `<span class="bit-value ${bit === '1' ? 'active' : ''}">${bit} (2<sup>${7-idx}</sup> = ${bit === '1' ? Math.pow(2, 7-idx) : 0})</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            } else {
                binaryOutput.innerHTML = '<p class="error">Enter a number between 0 and 255</p>';
            }
        });
    }
}

function calculateSubnet(hostsNeeded) {
    // Calculate required host bits
    let hostBits = Math.ceil(Math.log2(hostsNeeded + 2)); // +2 for network and broadcast
    let networkBits = 32 - hostBits;
    
    // Ensure minimum subnet size
    if (hostBits < 2) hostBits = 2;
    if (networkBits > 30) networkBits = 30;
    
    let totalIPs = Math.pow(2, hostBits);
    let usableIPs = totalIPs - 2;
    
    // Calculate subnet mask
    let subnetMask = calculateSubnetMask(networkBits);
    
    return {
        hostsNeeded: hostsNeeded,
        hostBits: hostBits,
        networkBits: networkBits,
        totalIPs: totalIPs,
        usableIPs: usableIPs,
        subnetMask: subnetMask,
        cidr: '/' + networkBits
    };
}

function calculateSubnetMask(networkBits) {
    let mask = [];
    
    for (let i = 0; i < 4; i++) {
        let octetBits = Math.min(8, Math.max(0, networkBits - (i * 8)));
        let octetValue = 0;
        
        for (let j = 7; j >= 8 - octetBits; j--) {
            octetValue += Math.pow(2, j);
        }
        
        mask.push(octetValue);
    }
    
    return mask.join('.');
}

function displayResults(results, container) {
    const html = `
        <div class="calculator-result">
            <h5>Calculation Results</h5>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">Hosts Needed:</span>
                    <span class="result-value">${results.hostsNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Usable IPs:</span>
                    <span class="result-value">${results.usableIPs}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total IPs:</span>
                    <span class="result-value">${results.totalIPs}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Host Bits:</span>
                    <span class="result-value">${results.hostBits}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Network Bits:</span>
                    <span class="result-value">${results.networkBits}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Subnet Mask:</span>
                    <span class="result-value">${results.subnetMask}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">CIDR Notation:</span>
                    <span class="result-value">${results.cidr}</span>
                </div>
            </div>
            <div class="result-formula">
                <p><strong>Formula Used:</strong></p>
                <p>Host Bits = ceil(log₂(${results.hostsNeeded} + 2)) = ${results.hostBits}</p>
                <p>Usable IPs = 2^${results.hostBits} - 2 = ${results.usableIPs}</p>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function initializeAnimations() {
    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav item
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe visual elements
    const visualElements = document.querySelectorAll(
        '.subnet-allocation-visual, .vlsm-visualization, .binary-visualization, .address-comparison'
    );
    
    visualElements.forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });

    // Animate usage bars
    animateUsageBars();
}

function animateUsageBars() {
    const usageFills = document.querySelectorAll('.usage-fill');
    
    usageFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 500);
    });
}

// Utility function to highlight code sections
function highlightCode(selector) {
    const codeElements = document.querySelectorAll(selector);
    
    codeElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('highlighted');
            setTimeout(() => {
                this.classList.remove('highlighted');
            }, 2000);
        });
    });
}

// Initialize code highlighting
document.addEventListener('DOMContentLoaded', function() {
    highlightCode('code, .binary-octet, .vlsm-block');
});