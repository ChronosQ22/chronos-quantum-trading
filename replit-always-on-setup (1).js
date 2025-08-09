// Replit Always-On Workaround for 24/7 Trading
// This script optimizes your Replit workspace to stay active continuously

const fs = require('fs');
const path = require('path');

class ReplitAlwaysOnSetup {
    constructor() {
        this.setupComplete = false;
        this.pingInterval = 4 * 60 * 1000; // 4 minutes (under Replit's 5-minute timeout)
        this.lastActivity = new Date();
        
        console.log('🚀 REPLIT ALWAYS-ON SETUP INITIALIZED');
        console.log('⚡ Keeping workspace active for 24/7 trading');
    }

    startKeepActive() {
        // Method 1: Regular HTTP self-ping
        setInterval(() => {
            this.performSelfPing();
        }, this.pingInterval);

        // Method 2: File system activity
        setInterval(() => {
            this.createActivityFile();
        }, 2 * 60 * 1000); // Every 2 minutes

        // Method 3: Console activity
        setInterval(() => {
            this.logActivity();
        }, 60 * 1000); // Every minute

        console.log('✅ REPLIT ALWAYS-ON: All keep-active methods started');
        console.log('🧠 Your trading engines will now run continuously');
    }

    performSelfPing() {
        const http = require('http');
        const url = `http://localhost:${process.env.PORT || 5000}/health`;
        
        http.get(url, (res) => {
            if (res.statusCode === 200) {
                this.lastActivity = new Date();
                console.log('💓 WORKSPACE PING: Keeping Replit active');
            }
        }).on('error', (err) => {
            console.log('⚠️ Self-ping failed, but system continues running');
        });
    }

    createActivityFile() {
        const activityPath = path.join(__dirname, '.activity');
        const timestamp = new Date().toISOString();
        
        fs.writeFileSync(activityPath, `Active: ${timestamp}\nTrading: CONTINUOUS\n`);
        
        // Clean up old activity file after writing new one
        setTimeout(() => {
            if (fs.existsSync(activityPath)) {
                fs.unlinkSync(activityPath);
            }
        }, 30000); // Delete after 30 seconds
    }

    logActivity() {
        const uptime = Math.floor(process.uptime());
        console.log(`⚡ WORKSPACE ACTIVE: ${uptime}s uptime, Trading engines operational`);
    }

    getStatus() {
        return {
            active: true,
            lastActivity: this.lastActivity,
            uptime: process.uptime(),
            method: 'REPLIT_ALWAYS_ON_WORKAROUND'
        };
    }
}

// Auto-start if this file is run directly
if (require.main === module) {
    const alwaysOn = new ReplitAlwaysOnSetup();
    alwaysOn.startKeepActive();
}

module.exports = ReplitAlwaysOnSetup;