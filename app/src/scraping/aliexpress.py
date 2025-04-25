from playwright.async_api import async_playwright
import re
import aiohttp
from config.globalData import data

dataSet = data

async def getExchangeRate():
    url = "https://api.exchangerate-api.com/v4/latest/LKR"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
            return data["rates"].get("USD", 1)

async def convertPriceToUsd(priceText, exchangeRate):
    priceMatch = re.search(r"([\d,]+\.?\d*)", priceText)
    if priceMatch:
        priceLkr = float(priceMatch.group(1).replace(",", ""))
        priceUsd = round(priceLkr * exchangeRate, 2)
        return f"${priceUsd}"
    return "N/A"

async def scraping(category):
    exchangeRate = await getExchangeRate()
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto(f"https://www.aliexpress.com/w/wholesale-{category.replace(' ', '-')}.html?g=y&SearchText={category.replace(' ', '-')}&sortType=total_tranpro_desc&currency=USD", timeout=60000, wait_until="networkidle")
        selectors = [
            ".hs_bw.search-item-card-wrapper-gallery",
            ".search-item-card-wrapper-gallery",
            ".search-card-item",
            ".list-items"
        ]

        for selector in selectors:
            try:
                await page.wait_for_selector(selector, timeout=10000)
                break
            except:
                continue
        else:
            raise Exception("No product container found")
        
        products = []
        items = await page.query_selector_all(".hs_bw.search-item-card-wrapper-gallery")
        for item in items[:20]:
            card = await item.query_selector(".search-card-item")
            image = await item.query_selector(".ml_bg")
            data = await card.inner_text()
            details = data.split("\n")
            
            priceLkr = details[2] if len(details) > 2 else "N/A"
            priceUsd = await convertPriceToUsd(priceLkr, exchangeRate)
            
            product = {
                "Name": details[0] if len(details) > 0 else "N/A",
                "Price": priceUsd,
                "URL": await card.get_attribute("href") if card else "N/A",
                "Image_URL": await image.get_attribute("src") if image else "N/A",
            }
            products.append(product)
            
        await browser.close()
        
        return {"Category": category, "Products": products}
    
async def initializeScraping(categories):
    results = []
    for category in categories:
        data = await scraping(category) 
        results.append(data)
    response = {
        'Result': results
    }    
    return response
