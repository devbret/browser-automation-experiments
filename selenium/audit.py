from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep

driver = webdriver.Chrome()

driver.get("https://example.com")

sleep(2)

try:
    headline = driver.find_element(By.TAG_NAME, "h1")
    print("Headline on page:", headline.text)
except Exception as e:
    print("Could not find headline:", e)

driver.quit()