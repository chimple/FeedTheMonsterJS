import os
import sys
import json

def convert_ftm_to_opds(input_file, output_dir):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    lang_name = ftm_data.get("langname") or os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()

    # Create output directories
    os.makedirs(output_dir, exist_ok=True)
    levels_dir = os.path.join(output_dir, "levels")
    os.makedirs(levels_dir, exist_ok=True)

    # Prepare OPDS main structure
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
                    "title": "Feed The Monster Levels"
                },
                "navigation": []
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

    # Navigation group inside the group
    nav_group = ftm_group["groups"][0]["navigation"]

    for level in ftm_data.get("Levels", []):
        level_meta = level.get("LevelMeta", {})
        level_number = level_meta.get("LevelNumber")

        # Add to navigation
        nav_group.append({
            "title": f"Level {level_number}",
            "href": f"levels/level_{level_number}.json",
            "type": "application/opds+json",
            "rel": "item"
        })

        # Prepare level in OPDS format
        level_opds = {
            "metadata": {
                "title": f"Level {level_number}",
                "type": level_meta.get("LevelType", "Unknown"),
                "letterGroup": level_meta.get("LetterGroup")
            },
            "links": [
                {"rel": "self", "href": f"levels/level_{level_number}.json", "type": "application/opds+json"}
            ],
            "navigation": []
        }

        for puzzle in level.get("Puzzles", []):
            level_opds["navigation"].append({
                "title": f"Segment {puzzle.get('SegmentNumber')}",
                "type": "application/json",
                "properties": {
                    "segmentNumber": puzzle.get("SegmentNumber"),
                    "prompt": puzzle.get("prompt"),
                    "targetstones": puzzle.get("targetstones"),
                    "foilstones": puzzle.get("foilstones")
                }
            })

        # Save each level as OPDS-compliant JSON
        level_file = os.path.join(levels_dir, f"level_{level_number}.json")
        with open(level_file, 'w', encoding='utf-8') as lf:
            json.dump(level_opds, lf, ensure_ascii=False, indent=2)

    # Save main course.json
    course_file = os.path.join(output_dir, "course.json")
    with open(course_file, 'w', encoding='utf-8') as cf:
        json.dump(ftm_group, cf, ensure_ascii=False, indent=2)

    print(f"OPDS course.json created at: {course_file}")

if __name__ == "__main__":
        convert_ftm_to_opds(sys.argv[1], sys.argv[2])