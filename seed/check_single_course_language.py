# python seed\convert_single_course_language.py lang/english/ftm_english.json public/assets/en
import os
import sys
import json

def convert_ftm_to_opds(input_file, output_dir, items_per_page=10):
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    lang_name = ftm_data.get("langname") or os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()
    os.makedirs(output_dir, exist_ok=True)
    levels_dir = os.path.join(output_dir, "levels")
    os.makedirs(levels_dir, exist_ok=True)

    levels = ftm_data.get("Levels", [])
    total_levels = len(levels)
    total_pages = (total_levels + items_per_page - 1) // items_per_page

    # Generate paginated level navigation files
    for page_num in range(total_pages):
        start = page_num * items_per_page
        end = start + items_per_page
        levels_page = levels[start:end]

        navigation = []
        for level in levels_page:
            level_meta = level.get("LevelMeta", {})
            level_number = level_meta.get("LevelNumber")

            navigation.append({
                "title": f"Level {level_number}",
                "href": f"levels/level_{level_number}.json",
                "type": "application/opds+json",
                "rel": "item"
            })

            # Create level JSON file
            level_opds = {
                "metadata": {
                    "title": f"Level {level_number}",
                    "type": level_meta.get("LevelType", "Unknown"),
                    "letterGroup": level_meta.get("LetterGroup"),
                    "puzzles": level.get("Puzzles", [])
                },
                "links": [
                    {
                        "rel": "self",
                        "href": f"levels/level_{level_number}.json",
                        "type": "application/opds+json"
                    }
                ]
            }
            level_file = os.path.join(levels_dir, f"level_{level_number}.json")
            with open(level_file, 'w', encoding='utf-8') as lf:
                json.dump(level_opds, lf, ensure_ascii=False, indent=2)

        # Page metadata
        page_data = {
            "metadata": {
                "title": "Paginated feed",
                "numberOfItems": total_levels,
                "itemsPerPage": items_per_page,
                "currentPage": page_num + 1
            },
            "links": [
                {
                    "rel": "self",
                    "href": f"levels/page_{page_num + 1}.json",
                    "type": "application/opds+json"
                }
            ],
            "navigation": navigation
        }

        if page_num > 0:
            page_data["links"].append({
                "rel": "prev",
                "href": f"levels/page_{page_num}.json",
                "type": "application/opds+json",
                "title": "Previous Page"
            })
        if page_num < total_pages - 1:
            page_data["links"].append({
                "rel": "next",
                "href": f"levels/page_{page_num + 2}.json",
                "type": "application/opds+json",
                "title": "Next Page"
            })

        page_file = os.path.join(levels_dir, f"page_{page_num + 1}.json")
        with open(page_file, 'w', encoding='utf-8') as pf:
            json.dump(page_data, pf, ensure_ascii=False, indent=2)

    # Save course.json file
    course_data = {
        "metadata": {
            "title": ftm_data.get("title"),
            "language": lang_name,
            "version": f"{ftm_data.get('majversion')}.{ftm_data.get('minversion')}",
            "direction": "rtl" if ftm_data.get("RightToLeft", False) else "ltr"
        },
        "links": [
            {
                "rel": "self",
                "href": "course.json",
                "type": "application/opds+json"
            }
        ],
        "groups": [
            {
                "metadata": {
                    "title": "Feed The Monster Levels"
                },
                "navigation": [
                    {
                        "title": "Levels (Page 1)",
                        "href": "levels/page_1.json",
                        "type": "application/opds+json",
                        "rel": "collection"
                    }
                ]
            }
        ]
    }

    course_file = os.path.join(output_dir, "course.json")
    with open(course_file, 'w', encoding='utf-8') as cf:
        json.dump(course_data, cf, ensure_ascii=False, indent=2)

    print(f"OPDS course.json created at: {course_file}")

if __name__ == "__main__":
        convert_ftm_to_opds(sys.argv[1], sys.argv[2])
