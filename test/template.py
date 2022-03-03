from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#template code to be adapted. Taken from https://betterprogramming.pub/the-beginners-guide-to-automating-websites-and-tests-with-selenium-ac48b2fd33ec

# get the google driver
driver = webdriver.Chrome('C:/Users/oscar/Dropbox/Semester 3/Colic Web App/Version11/test/chromedriver.exe')

#test website url
driver.get("http://www.python.org")

#assert we have the right website by matching value with title attribute
assert "Python" in driver.title

#find element with name 'q' - can also find by class, id but not recommended
elem = driver.find_element_by_name("q")

#clear the element - it is a search box
elem.clear()

#write inside the element - the search bar
elem.send_keys("pycon")

#hit return to submit infomation
elem.send_keys(Keys.RETURN)

#assert that we dont get an error - strange logic but its how selenium works
assert "No results found." not in driver.page_source

#close the test browser
driver.quit()