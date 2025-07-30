import requests
from bs4 import BeautifulSoup
import os

# Base URL of the website
BASE_URL = "https://sensualsagas.substack.com"

# Function to get the content of a single story
def scrape_story(story_url):
    response = requests.get(story_url)
    if response.status_code != 200:
        print(f"Failed to retrieve story: {story_url}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    # Extract story title
    title_tag = soup.find("h1")
    title = title_tag.text.strip() if title_tag else "Untitled"

    # Extract story content
    content_div = soup.find("div", class_="post-body")
    if not content_div:
        print(f"Failed to extract content for: {story_url}")
        return None

    content = "\n".join([p.text.strip() for p in content_div.find_all("p")])

    return {"title": title, "content": content}

# Function to scrape all stories from the main page
def scrape_all_stories():
    page_url = BASE_URL
    stories = []

    while page_url:
        print(f"Scraping page: {page_url}")
        response = requests.get(page_url)
        if response.status_code != 200:
            print(f"Failed to retrieve page: {page_url}")
            break

        soup = BeautifulSoup(response.text, "html.parser")

        # Extract all story links
        story_links = [
            a["href"] for a in soup.find_all("a", class_="post-preview-title") if "href" in a.attrs
        ]

        # Scrape each story
        for story_link in story_links:
            story_url = story_link if story_link.startswith("http") else f"{BASE_URL}{story_link}"
            story_data = scrape_story(story_url)
            if story_data:
                stories.append(story_data)

        # Check for pagination and next page
        next_page = soup.find("a", {"aria-label": "next"})
        page_url = next_page["href"] if next_page else None

    return stories

# Save scraped stories to text files
def save_stories_to_files(stories, output_folder="stories"):
    os.makedirs(output_folder, exist_ok=True)

    for story in stories:
        title = story["title"].replace(" ", "_").replace("/", "-")
        file_path = os.path.join(output_folder, f"{title}.txt")
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(story["content"])
        print(f"Saved: {file_path}")

# Main execution
if __name__ == "__main__":
    all_stories = scrape_all_stories()
    if all_stories:
        save_stories_to_files(all_stories)
    print("Scraping complete!")
