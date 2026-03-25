from playwright.sync_api import sync_playwright
from pathlib import Path

styles_dir = Path(__file__).parent / "origin-gallery" / "styles"
out_dir = Path(__file__).parent / "origin-gallery" / "douyin-gallery"
out_dir.mkdir(exist_ok=True)

# 精选15个视觉风格各异的页面
pages = [
    "origin-acid-festival",
    "origin-artdeco-wedding",
    "origin-bauhaus-weather",
    "origin-brutalist-resume",
    "origin-celestial-stargazing",
    "origin-cyber404",
    "origin-gothic-escape",
    "origin-guochao-product",
    "origin-marble-perfume",
    "origin-noir-movie",
    "origin-pixel-yearreview",
    "origin-ukiyoe-fortune",
    "origin-vaporwave-launch",
    "origin-watercolor-charity",
    "origin-zen-yoga",
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    # 1080x1920 竖屏，适合抖音
    page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)

    for i, name in enumerate(pages, 1):
        html_file = styles_dir / f"{name}.html"
        page.goto(f"file://{html_file.resolve()}", wait_until="networkidle")
        page.wait_for_timeout(1000)  # 等待动画加载
        out_file = out_dir / f"{i:02d}-{name.replace('origin-', '')}.png"
        page.screenshot(path=str(out_file))
        print(f"[{i}/15] {out_file.name}")

    browser.close()
    print(f"\nDone! All screenshots saved to {out_dir}")
