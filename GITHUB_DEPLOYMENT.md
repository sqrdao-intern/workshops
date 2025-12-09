# GitHub Deployment Instructions

This guide will help you deploy this workshops collection to GitHub.

## Prerequisites

- A GitHub account
- Git installed and configured on your local machine
- SSH key set up with GitHub (recommended) or HTTPS credentials

## Step 1: Create a New GitHub Repository

1. **Go to GitHub**: Navigate to [https://github.com/new](https://github.com/new)

2. **Repository Settings**:
   - **Repository name**: `workshops` (or your preferred name)
   - **Description**: "AI-powered prototyping and blockchain development workshops for Lisk and Solana ecosystems"
   - **Visibility**: Choose Public or Private based on your preference
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Click "Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you instructions. Use one of the following methods:

### Option A: Using SSH (Recommended)

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/workshops.git

# Verify the remote was added
git remote -v
```

### Option B: Using HTTPS

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/workshops.git

# Verify the remote was added
git remote -v
```

## Step 3: Push to GitHub

```bash
# Push the main branch to GitHub
git push -u origin main
```

If you encounter authentication issues:
- For SSH: Make sure your SSH key is added to your GitHub account
- For HTTPS: You may need to use a Personal Access Token instead of a password

## Step 4: Verify Deployment

1. **Check GitHub**: Visit your repository page on GitHub
   - URL format: `https://github.com/YOUR_USERNAME/workshops`

2. **Verify Files**: Ensure all files are present:
   - README.md should be visible
   - All workshop directories should be present
   - .gitignore should be working (node_modules should not be visible)

## Optional: Set Up GitHub Pages (for Static Workshops)

If you want to host the HTML workshop files on GitHub Pages:

1. **Go to Repository Settings**: Click "Settings" in your repository
2. **Navigate to Pages**: Click "Pages" in the left sidebar
3. **Configure Source**:
   - Source: Deploy from a branch
   - Branch: `main` (or `gh-pages` if you create one)
   - Folder: `/ (root)` or specific workshop folder
4. **Save**: Your workshops will be available at:
   - `https://YOUR_USERNAME.github.io/workshops/`

## Troubleshooting

### Issue: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin git@github.com:YOUR_USERNAME/workshops.git
```

### Issue: Authentication failed
- **SSH**: Ensure your SSH key is in `~/.ssh/id_rsa.pub` and added to GitHub
- **HTTPS**: Use a Personal Access Token instead of password
  - Generate token: GitHub Settings → Developer settings → Personal access tokens

### Issue: Large file uploads
If you have large files (images, etc.), they should be fine. If you encounter issues:
```bash
# Check file sizes
find . -type f -size +50M

# Consider using Git LFS for very large files
git lfs install
git lfs track "*.jpg"
git lfs track "*.png"
```

## Next Steps

After deployment:

1. **Add Topics/Tags**: Add relevant topics to your repository (e.g., `lisk`, `solana`, `blockchain`, `ai`, `workshop`)
2. **Update README**: Customize the README.md with your specific information
3. **Set Up Actions** (Optional): Consider adding GitHub Actions for CI/CD
4. **Invite Collaborators**: If working with a team, add collaborators in repository settings

## Repository Structure on GitHub

Your repository structure will be:
```
workshops/
├── README.md
├── .gitignore
├── GITHUB_DEPLOYMENT.md
├── AI workshop Lisk/
├── AI workshop Solana/
├── Solana Camp workshop/
├── lisk-builder-challenge-ai-workshop/
├── lisk-builder-challenge-gtm-workshop/
└── lisk-demo/
    ├── nft-app/
    ├── nft-hardhat/
    └── nft-webapp/
```

## Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Pages Documentation](https://docs.github.com/pages)

---

**Note**: Remember to never commit sensitive information like API keys, private keys, or passwords. Use environment variables and `.env` files (which are already in .gitignore).

