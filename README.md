# Cassey Hathcock — Portfolio

A dark-themed, responsive React portfolio for Senior Nuclear Engineer Cassey Hathcock.

---

## 🖥️ STEP-BY-STEP SETUP GUIDE

---

### STEP 1 — Install VS Code

1. Go to **https://code.visualstudio.com**
2. Click **Download for Windows** (or Mac/Linux)
3. Run the installer and follow the prompts
4. Once installed, open VS Code

**Recommended VS Code Extensions (install these from the Extensions panel on the left sidebar):**
- **ES7+ React/Redux/React-Native snippets** — for React shortcuts
- **Prettier - Code formatter** — auto-formats your code
- **vscode-icons** — nicer file icons

---

### STEP 2 — Install Node.js

Node.js is required to run the development server and build the project.

1. Go to **https://nodejs.org**
2. Download the **LTS** version (e.g. 20.x or 22.x)
3. Run the installer — keep all defaults, click Next through everything
4. To verify it installed correctly, open a **Terminal** in VS Code:
   - Menu → View → Terminal (or press `` Ctrl + ` ``)
   - Type: `node --version` → should show something like `v20.18.0`
   - Type: `npm --version` → should show something like `10.8.2`

---

### STEP 3 — Get the Portfolio Files

You have two options:

**Option A — Download the zip (simplest):**
1. Download the portfolio folder provided
2. Unzip it somewhere easy to find (e.g. your Desktop or Documents)

**Option B — Create manually:**
1. Create a new folder called `cassey-portfolio` anywhere on your computer
2. Place all the provided files inside it, maintaining this structure:
   ```
   cassey-portfolio/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── .gitignore
   └── src/
       ├── main.jsx
       └── App.jsx
   ```

---

### STEP 4 — Open the Project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Navigate to and select your `cassey-portfolio` folder
4. Click **Select Folder**

You should now see all the files listed in the sidebar on the left.

---

### STEP 5 — Install Dependencies

1. In VS Code, open the Terminal: **View → Terminal** or `` Ctrl + ` ``
2. Make sure you are inside the project folder. The terminal should show the path ending in `cassey-portfolio`. If not, type:
   ```
   cd path/to/cassey-portfolio
   ```
3. Type this command and press Enter:
   ```
   npm install
   ```
4. Wait for it to finish (you'll see a `node_modules` folder appear in the sidebar)

---

### STEP 6 — Run the Development Server

1. In the terminal, type:
   ```
   npm run dev
   ```
2. You should see output like:
   ```
   VITE v6.x.x  ready in 300ms
   ➜  Local:   http://localhost:5173/
   ```
3. Open your browser and go to **http://localhost:5173**
4. 🎉 Your portfolio is running locally!

---

### STEP 7 — Add Your Images

The portfolio has placeholder slots for images. Here's how to add them:

1. Inside your project folder, create an `images` folder inside `public/`:
   ```
   cassey-portfolio/
   └── public/
       └── images/
           ├── profile.jpg    ← Hero section profile photo
           ├── about.jpg      ← About section photo
           ├── project1.jpg   ← Project 1 image
           ├── project2.jpg   ← Project 2 image
           ├── project3.jpg   ← Project 3 image
           └── project4.jpg   ← Project 4 image
   ```

2. Open `src/App.jsx` in VS Code

3. **For the hero profile photo** — find this line (around line 220):
   ```jsx
   {false ? (
   ```
   Change `false` to `true` and make sure the src is correct:
   ```jsx
   {true ? (
     <img src="/images/profile.jpg" alt="Cassey Hathcock" />
   ```

4. **For the about section photo** — find this line (around line 240):
   ```jsx
   {false ? (
     <img className="about-img" src="/images/cassey-about.jpg" ...
   ```
   Change `false` to `true` and update the src:
   ```jsx
   {true ? (
     <img className="about-img" src="/images/about.jpg" ...
   ```

5. **For project images** — find the `PROJECTS` array near the top of `App.jsx`:
   ```js
   const PROJECTS = [
     {
       title: "Advanced Reactor Kinetics Modeling",
       image: null,   ← change null to "/images/project1.jpg"
     },
     ...
   ```

6. Save the file (`Ctrl + S`) — the browser will refresh automatically!

---

### STEP 8 — Customize Content

All content is at the top of `src/App.jsx`:

- **`SKILLS` array** — add/remove/adjust skill names and levels (0–100)
- **`PROJECTS` array** — edit project titles, descriptions, and tags
- **Contact info** — search for `casseyhath@outlook.com` and update as needed

---

## 🚀 DEPLOYING TO VERCEL (Free)

### Before Deploying — Create a GitHub Account & Upload Code

#### A. Install Git
1. Go to **https://git-scm.com/downloads**
2. Download and install for your OS (keep all defaults)
3. Verify: in VS Code terminal type `git --version`

#### B. Create a GitHub Account
1. Go to **https://github.com**
2. Click **Sign up** and create a free account

#### C. Create a GitHub Repository
1. Once logged in, click the **+** icon → **New repository**
2. Name it: `cassey-portfolio`
3. Leave it **Public**
4. Do NOT check "Add README" (we already have files)
5. Click **Create repository**
6. GitHub will show you setup commands — copy the ones for "push existing repository"

#### D. Push Your Code to GitHub
In the VS Code terminal:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cassey-portfolio.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username.

---

### Deploy on Vercel

1. Go to **https://vercel.com**
2. Click **Sign Up** → choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub
4. On the Vercel dashboard, click **Add New → Project**
5. Find your `cassey-portfolio` repository and click **Import**
6. Vercel auto-detects it's a Vite/React project — keep all default settings
7. Click **Deploy**
8. Wait ~60 seconds...
9. 🎉 Your portfolio is LIVE at something like: `https://cassey-portfolio.vercel.app`

**That's it!** Vercel will automatically re-deploy every time you push changes to GitHub.

---

## 📝 Making Updates After Deployment

1. Edit files in VS Code
2. In the terminal:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```
3. Vercel automatically detects the push and re-deploys within ~60 seconds

---

## 📁 File Structure

```
cassey-portfolio/
├── public/
│   └── images/          ← Put your photos here
├── src/
│   ├── App.jsx          ← Main component (edit content here)
│   └── main.jsx         ← Entry point (don't edit)
├── index.html           ← HTML shell (don't edit)
├── package.json         ← Project config (don't edit)
├── vite.config.js       ← Build config (don't edit)
└── .gitignore           ← Git ignore rules (don't edit)
```

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Re-install Node.js from nodejs.org |
| Port 5173 already in use | Stop other processes or use `npm run dev -- --port 3000` |
| Images not showing | Make sure files are in `public/images/` and paths start with `/images/` |
| White screen | Open browser console (F12) and check for errors |
| Vercel build failed | Check that `npm run build` works locally first |
