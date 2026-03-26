// Blog Manager
class BlogManager {
    constructor() {
        this.blogContainer = document.getElementById('blog-container');
        this.blogLoading = document.getElementById('blog-loading');
        this.blogSection = document.getElementById('blog');
        this.posts = [];
        this.currentLanguage = 'pt';
        this.init();
    }

    init() {
        document.addEventListener('languageChanged', (event) => {
            this.currentLanguage = event.detail.language;
            this.renderPosts();
        });

        const checkI18n = setInterval(() => {
            if (window.i18n) {
                clearInterval(checkI18n);
                this.currentLanguage = window.i18n.currentLang || 'pt';
                this.loadPosts();
            }
        }, 100);
    }

    async loadPosts() {
        if (!this.blogContainer) return;
        this.showLoading();

        try {
            const response = await fetch('data/blog/index.json');
            const blogData = await response.json();
            this.posts = blogData.posts || [];
            this.renderPosts();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.blogContainer.innerHTML = '';
        } finally {
            this.hideLoading();
        }
    }

    getText(post, field) {
        const data = post[field];
        if (!data) return '';
        return data[this.currentLanguage] || data.pt || '';
    }

    createPostCard(post) {
        const title = this.getText(post, 'title');
        const summary = this.getText(post, 'summary');
        const youtubeId = post.youtube_id;
        const hasVideo = Boolean(youtubeId && post.youtube_url);
        const thumbnail = hasVideo ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
        const readLabel = window.i18n ? window.i18n.getText('blog.featured.read') : 'Ler artigo';
        const watchLabel = window.i18n ? window.i18n.getText('blog.featured.watch') : 'Assistir no YouTube';

        return `
            <article class="blog-card">
                <a class="blog-card-media" href="${post.article_url}">
                    ${hasVideo
                        ? `<img src="${thumbnail}" alt="${title}" loading="lazy">`
                        : `<div class="blog-card-media-placeholder"><i class="fas fa-newspaper"></i></div>`
                    }
                </a>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${title}</h3>
                    <p class="blog-card-summary">${summary}</p>
                    <div class="hero-buttons">
                        <a class="btn btn-primary" href="${post.article_url}">${readLabel}</a>
                        ${hasVideo
                            ? `<a class="btn btn-outline" href="${post.youtube_url}" target="_blank" rel="noopener noreferrer">${watchLabel}</a>`
                            : ''
                        }
                    </div>
                </div>
            </article>
        `;
    }

    renderPosts() {
        if (!this.blogContainer) return;
        if (!this.posts.length) {
            if (this.blogSection) this.blogSection.style.display = 'none';
            return;
        }

        if (this.blogSection) this.blogSection.style.display = 'block';
        this.blogContainer.innerHTML = `
            <div class="blog-grid">
                ${this.posts.map((post) => this.createPostCard(post)).join('')}
            </div>
        `;
    }

    showLoading() {
        if (this.blogLoading) this.blogLoading.style.display = 'block';
        if (this.blogContainer) this.blogContainer.style.display = 'none';
    }

    hideLoading() {
        if (this.blogLoading) this.blogLoading.style.display = 'none';
        if (this.blogContainer) this.blogContainer.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});
