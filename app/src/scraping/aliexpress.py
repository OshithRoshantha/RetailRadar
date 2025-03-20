from playwright.async_api import async_playwright
import pandas as pd

async def scraping(category):
    async with async_playwright as p:
        browser = await p.chromium.launch(True)
        page = await browser.new_page()
        
        await page.goto(f"https://www.aliexpress.com/w/wholesale-{category.replace(' ', '-')}.html?g=y&SearchText={category.replace(' ', '-')}&sortType=total_tranpro_desc")
        await page.wait_for_selector(".hs_bw.search-item-card-wrapper-gallery")
        
        products = []
        items = await page.query_selector_all(".hs_bw.search-item-card-wrapper-gallery")
        for item in items[:20]:
            card = await item.query_selector(".search-card-item")
            image = await item.query_selector(".ml_bg")
            data = await card.inner_text()
            details = data.split("\n")
            
            product = {
                "Name": details[0] if len(details) > 0 else "N/A",
                "Price": details[2] if len(details) > 2 else "N/A",
                "URL": await data.get_attribute("href") if data else "N/A",
                "Image_URL": await image.get_attribute("src") if image else "N/A",
            }
            products.append(product)
            
        await browser.close()
        
        return {"Category": category, "Products": products}