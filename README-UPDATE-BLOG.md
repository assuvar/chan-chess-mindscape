# Chan Chess Club — How to Add a Blog Post

This guide explains how to add new blog posts to the Chan Chess Club website.

## Quick Start (Git Workflow)

### 1. Clone the Repository

```bash
git clone git@github.com:your-org/chan-chess-club.git
cd chan-chess-club
```

### 2. Create a New Branch

```bash
git checkout -b blog/add-my-post
```

### 3. Add Your Blog Post

Create a new markdown file in the `content/posts/` directory with the following format:

**File name:** `content/posts/YYYY-MM-DD-post-title.md`

**Example:** `content/posts/2025-10-27-chess-concentration.md`

**File content structure:**

```markdown
---
title: "How Chess Builds Concentration in Children"
date: 2025-10-27
author: "Chan Chess Club"
coverImage: /static/img/posts/2025-10-27/cover.jpg
readTime: "5 min read"
excerpt: "Discover how regular chess practice can significantly improve focus and concentration in young learners."
---

## Introduction

Your blog post content goes here in standard markdown format...

![Description of image](/static/img/posts/2025-10-27/image1.jpg)

More content...

![Another image](/static/img/posts/2025-10-27/image2.jpg)

## Conclusion

Final thoughts...
```

### 4. Add Images (Maximum 2 per post)

Create a folder for your post's images:

```bash
mkdir -p public/static/img/posts/2025-10-27
```

Add your two images:
- `public/static/img/posts/2025-10-27/cover.jpg` (cover/hero image)
- `public/static/img/posts/2025-10-27/image1.jpg` (in-post image)

**Image guidelines:**
- Maximum 2 images per blog post
- Recommended size: 1200x800px for cover, 800x600px for in-post images
- Format: JPG or PNG
- Keep file sizes under 500KB for fast loading

### 5. Commit and Push

```bash
git add content/posts/2025-10-27-my-post.md
git add public/static/img/posts/2025-10-27/*
git commit -m "feat(blog): add post 'How Chess Builds Concentration'"
git push origin blog/add-my-post
```

### 6. Create Pull Request

1. Go to your GitHub repository
2. Click "Pull Requests"
3. Click "New Pull Request"
4. Select your branch (`blog/add-my-post`)
5. Add a description
6. Click "Create Pull Request"
7. After review and merge, the post will be automatically deployed

## Quick Command Reference

```bash
# Clone repository
git clone git@github.com:your-org/chan-chess-club.git
cd chan-chess-club

# Create new branch
git checkout -b blog/add-my-post

# Add files
git add content/posts/2025-10-27-my-post.md
git add public/static/img/posts/2025-10-27/*

# Commit changes
git commit -m "feat(blog): add new monthly post"

# Push to GitHub
git push origin blog/add-my-post
```

## Blog Post Template

Save this as a template for future posts:

```markdown
---
title: "Your Post Title Here"
date: YYYY-MM-DD
author: "Chan Chess Club"
coverImage: /static/img/posts/YYYY-MM-DD/cover.jpg
readTime: "X min read"
excerpt: "Brief 1-2 sentence description of your post that appears in the blog listing."
---

## Introduction

Your opening paragraph...

## Main Content

![Image description](/static/img/posts/YYYY-MM-DD/image1.jpg)

Your content continues...

## Conclusion

Final thoughts...
```

## Important Notes

- **Date Format:** Always use YYYY-MM-DD (e.g., 2025-10-27)
- **File Names:** Use lowercase and hyphens (e.g., `chess-concentration.md`)
- **Image Limit:** Maximum 2 images per blog post
- **Image Paths:** Always start with `/static/img/posts/`
- **Commit Messages:** Use format `feat(blog): brief description`

## Need Help?

If you encounter any issues:
1. Check that your markdown file has the correct frontmatter
2. Verify image paths are correct
3. Ensure images are in the correct folder
4. Contact the development team for assistance

## Automated Deployment

Once your pull request is merged to `main`:
- Changes are automatically deployed to the live website
- Blog post will appear on the /blog page
- No manual deployment needed

---

For questions or issues, contact: chanchessclub64@gmail.com
