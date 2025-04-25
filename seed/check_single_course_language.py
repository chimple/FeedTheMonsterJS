import os
import sys
import json

def convert_ftm_to_opds(input_file, output_dir):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    # Create output directories
    os.makedirs(output_dir, exist_ok=True)
    levels_dir = os.path.join(output_dir, "levels")
    os.makedirs(levels_dir, exist_ok=True)

    # Create Main Menu group for course.json
    main_menu_group = {
        "metadata": {
            "title": "Main Menu"
        },
        "navigation": []
    }

    # Get all levels
    all_levels = ftm_data.get("Levels", [])

    for level in all_levels:
        level_meta = level.get("LevelMeta", {})
        level_number = level_meta.get("LevelNumber")
        puzzles = level.get("Puzzles", [])

        # Add entry to course.json Main Menu
        main_menu_group["navigation"].append({
            "title": f"Level {level_number}",
            "href": f"levels/level_{level_number}.json",
            "type": "application/opds+json",
            "rel": "item"
        })

        # Embed puzzle data inside metadata
        level_metadata = {
            "title": f"Level {level_number}",
            "type": level_meta.get("LevelType", "Unknown"),
            "letterGroup": level_meta.get("LetterGroup"),
            "numberOfItems": len(puzzles),
            "itemsPerPage": len(puzzles),
            "currentPage": 1,
            "segments": []
        }

        for puzzle in puzzles:
            level_metadata["segments"].append({
                "segmentNumber": puzzle.get("SegmentNumber"),
                "prompt": puzzle.get("prompt"),
                "targetstones": puzzle.get("targetstones"),
                "foilstones": puzzle.get("foilstones")
            })

        # Create level OPDS structure (no navigation)
        level_opds = {
            "metadata": level_metadata,
            "links": [
                {
                    "rel": "self",
                    "href": f"levels/level_{level_number}.json",
                    "type": "application/opds+json"
                }
            ]
        }

        # Write level file
        level_file = os.path.join(levels_dir, f"level_{level_number}.json")
        with open(level_file, 'w', encoding='utf-8') as lf:
            json.dump(level_opds, lf, ensure_ascii=False, indent=2)

    # Create course.json
    course_data = {
        "metadata": {
            "title": ftm_data.get("title")
        },
        "links": [
            {
                "rel": "self",
                "href": "course.json",
                "type": "application/opds+json"
            }
        ],
        "groups": [main_menu_group]
    }

    course_file = os.path.join(output_dir, "course.json")
    with open(course_file, 'w', encoding='utf-8') as cf:
        json.dump(course_data, cf, ensure_ascii=False, indent=2)

    print(f"OPDS course.json created at: {course_file}")

if __name__ == "__main__":
    convert_ftm_to_opds(sys.argv[1], sys.argv[2])
