"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Bookmark, Github, Moon, Search, Sun, X } from "lucide-react";
import { categories, CategoryId, Site, sites } from "@/data/sites";

type Theme = "light" | "dark";
type SiteCategory = Exclude<CategoryId, "all">;

const categoryMeta: Record<SiteCategory, { description: string; color: string; icon: string }> = {
  design: { description: "界面、字体、配色与设计系统参考。", color: "#8a72d8", icon: "◐" },
  ai: { description: "对话、搜索与创作型人工智能工具。", color: "#2e9bb7", icon: "✦" },
  dev: { description: "写代码、查文档与发布产品的工具箱。", color: "#477a68", icon: "⌁" },
  inspiration: { description: "从视觉世界里打捞意外的好点子。", color: "#58b96a", icon: "◎" },
  productivity: { description: "让工作更顺手，让注意力留给重要的事。", color: "#d78b36", icon: "✓" },
  knowledge: { description: "值得阅读、订阅、标注和反复回看的内容。", color: "#e16e49", icon: "≋" },
};

function faviconSources(url: string) {
  try {
    const parsed = new URL(url);
    return [
      `${parsed.origin}/favicon.ico`,
      `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=64`,
    ];
  } catch {
    return [];
  }
}

function Favicon({ site }: { site: Site }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = useMemo(() => faviconSources(site.url), [site.url]);

  useEffect(() => setSourceIndex(0), [site.url]);

  if (sourceIndex >= sources.length) {
    return <span className="favicon-fallback" style={{ "--site-accent": site.accent } as React.CSSProperties}>{site.mark}</span>;
  }

  return (
    <span className="favicon-shell">
      {/* External favicon hosts vary by site, so a native img with a two-step fallback is intentional. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sources[sourceIndex]}
        alt=""
        width="22"
        height="22"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setSourceIndex((index) => index + 1)}
      />
    </span>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>("light");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("atlas-favorites");
    const storedTheme = localStorage.getItem("atlas-theme") as Theme | null;
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("atlas-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const keyword = query.trim().toLowerCase();
  const boardCategories = useMemo(() => {
    return categories
      .filter((category): category is typeof category & { id: SiteCategory } => category.id !== "all")
      .filter((category) => activeCategory === "all" || category.id === activeCategory)
      .map((category) => ({
        ...category,
        sites: sites.filter((site) => {
          if (site.category !== category.id) return false;
          if (!keyword) return true;
          return [site.name, site.description, ...site.tags].join(" ").toLowerCase().includes(keyword);
        }),
      }))
      .filter((category) => category.sites.length > 0);
  }, [activeCategory, keyword]);

  const resultCount = boardCategories.reduce((total, category) => total + category.sites.length, 0);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("atlas-favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <main id="top" className="board-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Atlas 首页">
          <span className="brand-orbit"><span /></span>
          <span>ATLAS</span>
        </a>

        <div className="search-wrap">
          <Search size={18} />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索网站、描述或标签…"
            aria-label="搜索收藏"
          />
          {query ? <button onClick={() => setQuery("")} aria-label="清空搜索"><X size={16} /></button> : <kbd>/</kbd>}
        </div>

        <div className="top-actions">
          <a className="icon-button" href="https://github.com/mokeyishi/atlas-nav" target="_blank" rel="noreferrer" aria-label="GitHub 仓库"><Github size={18} /></a>
          <button className="icon-button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="切换主题">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <div className="page-wrap">
        <section className="intro">
          <div>
            <span className="eyebrow">PERSONAL INTERNET INDEX · {new Date().getFullYear()}</span>
            <h1>我的互联网收藏</h1>
            <p>把常用工具、灵感和知识，整齐放进一张随时可查的地图。</p>
          </div>
          <div className="intro-stats" aria-label="收藏统计">
            <span><strong>{sites.length}</strong> 个网站</span>
            <span><strong>{categories.length - 1}</strong> 个分类</span>
            <span><strong>{favorites.length}</strong> 个星标</span>
          </div>
        </section>

        <nav className="filter-bar" aria-label="分类筛选">
          {categories.map((category) => {
            const count = category.id === "all" ? sites.length : sites.filter((site) => site.category === category.id).length;
            return (
              <button key={category.id} className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)}>
                <span>{category.glyph}</span>{category.label}<small>{count}</small>
              </button>
            );
          })}
        </nav>

        {(query || activeCategory !== "all") && (
          <div className="result-row">
            <span>{query ? `“${query}”` : categories.find((item) => item.id === activeCategory)?.label}</span>
            <strong>{resultCount} 个结果</strong>
          </div>
        )}

        {boardCategories.length > 0 ? (
          <section className={`category-board ${activeCategory !== "all" ? "is-filtered" : ""} ${query ? "has-search" : ""}`} aria-label="网站分类看板">
            {boardCategories.map((category) => {
              const meta = categoryMeta[category.id];
              return (
                <article
                  id={`category-${category.id}`}
                  className={`category-panel panel-${category.id}`}
                  style={{ "--panel-accent": meta.color } as React.CSSProperties}
                  key={category.id}
                >
                  <header className="panel-header">
                    <div className="panel-title">
                      <span className="panel-icon">{meta.icon}</span>
                      <div><h2>{category.label}</h2><small>{category.sites.length.toString().padStart(2, "0")} SITES</small></div>
                    </div>
                    <div className="panel-rule"><span /></div>
                    <p>{meta.description}</p>
                  </header>

                  <ol className="site-list">
                    {category.sites.map((site, index) => {
                      const isFavorite = favorites.includes(site.id);
                      return (
                        <li key={site.id}>
                          <span className="site-rank">{index + 1}.</span>
                          <a href={site.url} target="_blank" rel="noreferrer" title={site.description}>
                            <Favicon site={site} />
                            <span className="site-name">{site.name}</span>
                            {site.tags[0] && <span className="site-tag">{site.tags[0]}</span>}
                          </a>
                          <button className={`mini-bookmark ${isFavorite ? "saved" : ""}`} onClick={() => toggleFavorite(site.id)} aria-label={isFavorite ? `取消收藏 ${site.name}` : `收藏 ${site.name}`}>
                            <Bookmark size={14} fill={isFavorite ? "currentColor" : "none"} />
                          </button>
                        </li>
                      );
                    })}
                  </ol>

                  <a className="panel-footer" href={`#category-${category.id}`} onClick={(event) => { event.preventDefault(); setActiveCategory(category.id); }}>
                    查看全部 {category.sites.length} 个网站 <ArrowRight size={17} />
                  </a>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="empty-state">
            <span>⌕</span><h2>没有找到相关网站</h2><p>换个关键词，或者返回全部收藏看看。</p>
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }}>返回全部收藏</button>
          </section>
        )}

        <footer className="page-footer"><span>ATLAS / PERSONAL INTERNET INDEX</span><span>图标自动读取 · 数据集中管理 · Vercel Ready</span></footer>
      </div>
    </main>
  );
}
