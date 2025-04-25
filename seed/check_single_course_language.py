import os
import sys
import json
from math import ceil

def convert_ftm_to_opds(input_file, output_dir, levels_per_page=5):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    lang_name = ftm_data.get("langname") or os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()

    # Create output directories
    os.makedirs(output_dir, exist_ok=True)
    levels_dir = os.path.join(output_dir, "levels")
    os.makedirs(levels_dir, exist_ok=True)

    # Prepare list of levels with metadata and puzzles
    level_entries = []

    for level in ftm_data.get("Levels", []):
        level_meta = level.get("LevelMeta", {})
        level_number = level_meta.get("LevelNumber")

        # Build level info with puzzle metadata
        level_item = {
            "title": f"Level {level_number}",
            "href": f"levels/level_{level_number}.json",
            "type": "application/opds+json",
            "rel": "item",
            "metadata": {
                "type": level_meta.get("LevelType", "Unknown"),
                "letterGroup": level_meta.get("LetterGroup"),
                "puzzles": [
                    {
                        "segmentNumber": puzzle.get("SegmentNumber"),
                        "prompt": puzzle.get("prompt"),
                        "targetstones": puzzle.get("targetstones"),
                        "foilstones": puzzle.get("foilstones")
                    }
                    for puzzle in level.get("Puzzles", [])
                ]
            }
        }

        level_entries.append(level_item)

        # Save each level as its own file (unchanged)
        level_opds = {
            "metadata": {
                "title": f"Level {level_number}",
                "type": level_meta.get("LevelType", "Unknown"),
                "letterGroup": level_meta.get("LetterGroup")
            },
            "links": [
                {"rel": "self", "href": f"levels/level_{level_number}.json", "type": "application/opds+json"}
            ],
            "navigation": [
                {
                    "title": f"Segment {puzzle.get('SegmentNumber')}",
                    "type": "application/json",
                    "properties": {
                        "segmentNumber": puzzle.get("SegmentNumber"),
                        "prompt": puzzle.get("prompt"),
                        "targetstones": puzzle.get("targetstones"),
                        "foilstones": puzzle.get("foilstones")
                    }
                }
                for puzzle in level.get("Puzzles", [])
            ]
        }

        level_file = os.path.join(levels_dir, f"level_{level_number}.json")
        with open(level_file, 'w', encoding='utf-8') as lf:
            json.dump(level_opds, lf, ensure_ascii=False, indent=2)

    # Paginate level entries
    total_pages = ceil(len(level_entries) / levels_per_page)
    paginated_navigation = []

    for page_num in range(1, total_pages + 1):
        start = (page_num - 1) * levels_per_page
        end = start + levels_per_page
        page_levels = level_entries[start:end]

        page_obj = {
            "title": f"Levels Page {page_num}",
            "href": f"#page_{page_num}",
            "type": "application/opds+json",
            "rel": "page",
            "navigation": page_levels,
            "links": [
                {"rel": "self", "href": f"#page_{page_num}"}
            ] + (
                [{"rel": "prev", "href": f"#page_{page_num - 1}"}] if page_num > 1 else []
            ) + (
                [{"rel": "next", "href": f"#page_{page_num + 1}"}] if page_num < total_pages else []
            )
        }

        paginated_navigation.append(page_obj)

    # Main course.json structure
    ftm_group = {
        "metadata": {
            "title": ftm_data.get("title"),
            "language": lang_name,
            "version": f"{ftm_data.get('majversion')}.{ftm_data.get('minversion')}",
            "direction": "rtl" if ftm_data.get("RightToLeft", False) else "ltr"
        },
        "links": [
            {"rel": "self", "href": "course.json", "type": "application/opds+json"}
        ],
        "groups": [
            {
                "metadata": {
                    "title": "Feed The Monster Levels (Paginated)"
                },
                "navigation": paginated_navigation
            }
        ],
        "resources": {
            "feedback": {
                "texts": ftm_data.get("FeedbackTexts"),
                "audios": ftm_data.get("FeedbackAudios")
            },
            "otherAudios": ftm_data.get("OtherAudios")
        }
    }

    # Save course.json
    course_file = os.path.join(output_dir, "course.json")
    with open(course_file, 'w', encoding='utf-8') as cf:
        json.dump(ftm_group, cf, ensure_ascii=False, indent=2)

    print(f"Paginated OPDS course.json created at: {course_file}")

if __name__ == "__main__":
        convert_ftm_to_opds(sys.argv[1], sys.argv[2])
