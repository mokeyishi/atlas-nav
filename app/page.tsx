"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, Github, Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { categories, CategoryId, sites } from "@/data/sites";

type Theme = "light" | "dark";

export default function Home() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("atlas-favorites");
    const storedTheme = localStorage.getItem("atlas-theme") as Theme | null;
    if (stored) setFavorites(JSON.parse(stored));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("atlas-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredSites = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return sites.filter((site) => {
      const matchesCategory = category === "all" || site.category === category;
      const haystack = [site.name, site.description, ...site.tags].join(" ").toLowerCase();
      return matchesCategory && (!keyword || haystack.includes(keyword));
    });
  }, [category, query]);

  const featured = sites.filter((site) => site.featured);
  const currentLabel = categories.find((item) => item.id === category)?.label;

  const chooseCategory = (id: CategoryId) => {
    setCategory(id);
    setMenuOpen(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("atlas-favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <a className="brand" href="#top" aria-label="Atlas 首页">
            <span className="brand-orbit"><span /></span>
            <span>ATLAS</span>
          </a>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(false)} aria-label="关闭菜单"><X size={19} /></button>
        </div>

        <nav className="category-nav" aria-label="网站分类">
          <span className="eyebrow nav-label">你的收藏夹</span>
          {categories.map((item) => {
            const count = item.id === "all" ? sites.length : sites.filter((site) => site.category === item.id).length;
            return (
              <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => chooseCategory(item.id)}>
                <span className="nav-glyph">{item.glyph}</span>
                <span>{item.label}</span>
                <span className="nav-count">{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <Sparkles size={17} />
          <p><strong>保持好奇。</strong><br />互联网仍有许多好东西。</p>
        </div>
        <div className="sidebar-footer">24 个站点 · 6 个分类</div>
      </aside>

      {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="关闭菜单" />}

      <main id="top" className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="打开菜单"><Menu size={20} /></button>
          <div className="search-wrap">
            <Search size={18} />
            <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索网站、描述或标签…" aria-label="搜索收藏" />
            {query ? <button onClick={() => setQuery("")} aria-label="清空搜索"><X size={16} /></button> : <kbd>/</kbd>}
          </div>
          <div className="top-actions">
            <a className="icon-button" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <button className="icon-button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="切换主题">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        <div className="content-wrap">
          {!query && category === "all" && (
            <>
              <section className="hero">
                <div>
                  <span className="eyebrow">PERSONAL INTERNET INDEX · 2026</span>
                  <h1>把互联网的好东西，<br /><em>放在手边。</em></h1>
                  <p>一张为好奇心绘制的私人地图。收集工具、灵感与知识，也给偶然的发现留一点空间。</p>
                </div>
                <div className="hero-compass" aria-hidden="true">
                  <span className="ring ring-one" /><span className="ring ring-two" />
                  <span className="needle">↗</span><small>EXPLORE</small>
                </div>
              </section>

              <section className="featured-section">
                <div className="section-heading">
                  <div><span className="eyebrow">EDITOR&apos;S SHELF</span><h2>本周精选</h2></div>
                  <span className="muted">值得慢慢逛的 4 个地方</span>
                </div>
                <div className="featured-grid">
                  {featured.map((site, index) => (
                    <a className={`featured-card card-${index + 1}`} href={site.url} target="_blank" rel="noreferrer" key={site.id} style={{ "--accent": site.accent } as React.CSSProperties}>
                      <div className="featured-top"><span className="site-mark">{site.mark}</span><ArrowUpRight size={18} /></div>
                      <div><span className="card-index">0{index + 1}</span><h3>{site.name}</h3><p>{site.description}</p></div>
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="library-section">
            <div className="section-heading library-heading">
              <div><span className="eyebrow">THE LIBRARY</span><h2>{query ? `“${query}” 的结果` : currentLabel}</h2></div>
              <span className="result-count">{filteredSites.length.toString().padStart(2, "0")} SITES</span>
            </div>

            {filteredSites.length ? (
              <div className="site-grid">
                {filteredSites.map((site) => {
                  const isFavorite = favorites.includes(site.id);
                  return (
                    <article className="site-card" key={site.id}>
                      <div className="site-card-top">
                        <a className="site-icon" href={site.url} target="_blank" rel="noreferrer" style={{ "--accent": site.accent } as React.CSSProperties}>{site.mark}</a>
                        <button className={`bookmark-button ${isFavorite ? "saved" : ""}`} onClick={() => toggleFavorite(site.id)} aria-label={isFavorite ? "取消收藏" : "收藏网站"}>
                          <Bookmark size={17} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <a className="site-info" href={site.url} target="_blank" rel="noreferrer">
                        <div className="site-title-row"><h3>{site.name}</h3><ArrowUpRight size={16} /></div>
                        <p>{site.description}</p>
                      </a>
                      <div className="tag-row">{site.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><span>⌕</span><h3>这张地图上还没有标记</h3><p>换个关键词，或者去其他分类看看。</p><button onClick={() => { setQuery(""); setCategory("all"); }}>返回全部收藏</button></div>
            )}
          </section>

          <footer><span>ATLAS / PERSONAL INTERNET INDEX</span><span>为好奇心留一条路 · {new Date().getFullYear()}</span></footer>
        </div>
      </main>
    </div>
  );
}
