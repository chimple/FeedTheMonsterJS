# running script -- python new_ftm_language_creation\convert_single_course_language.py lang/english/ftm_english.json public/assets/en
import os
import sys
import json

def convert_ftm_to_opds(input_file, output_dir):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    # Determine language name
    lang_name = ftm_data.get("langname") or os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()
    lang_folder = lang_name.strip().lower()

    # Prepare OPDS main structure
    opds_data = {
        "metadata": {
            "title": ftm_data.get("title"),
            "language": lang_name,
            "version": f"{ftm_data.get('majversion')}.{ftm_data.get('minversion')}",
            "direction": "rtl" if ftm_data.get("RightToLeft", False) else "ltr"
        },
        "links": [
            {"rel": "self", "href": "course.json", "type": "application/opds+json"},
        ],
        "groups": [],  # ✅ Using groups instead of flat navigation
        
         "resources": {
            "feedback": {
                "texts": ftm_data.get("FeedbackTexts"),
                "audios": ftm_data.get("FeedbackAudios")
            },
            "otherAudios": ftm_data.get("OtherAudios")
        },
    }

    # Levels directory
    levels_dir = os.path.join(output_dir, "levels")
    os.makedirs(levels_dir, exist_ok=True)

    # Group for FTM Levels
    ftm_group = {
        "metadata": {
            "title": "FTM Levels"
        },
        "navigation": []
    }

    for level in ftm_data.get("Levels", []):
        level_meta = level.get("LevelMeta", {})
        level_number = level_meta.get("LevelNumber")

        # Add level to navigation group
        ftm_group["navigation"].append({
            "title": f"Level {level_number}",
            "href": f"levels/level_{level_number}.json",
            "type": level_meta.get("LevelType"),
            "rel": "item"
        })

        # Build level JSON file
        level_content = {
            "level": level_number,
            "type": level_meta.get("LevelType"),
            "letterGroup": level_meta.get("LetterGroup"),
            "puzzles": []
        }

        for puzzle in level.get("Puzzles", []):
            level_content["puzzles"].append({
                "segmentNumber": puzzle.get("SegmentNumber"),
                "prompt": puzzle.get("prompt"),
                "targetstones": puzzle.get("targetstones"),
                "foilstones": puzzle.get("foilstones")
            })

        # Write level file
        level_path = os.path.join(levels_dir, f"level_{level_number}.json")
        with open(level_path, 'w', encoding='utf-8') as lf:
            json.dump(level_content, lf, ensure_ascii=False, indent=2)

    # Append level group to OPDS
    opds_data["groups"].append(ftm_group)

    # Save main course.json
    os.makedirs(output_dir, exist_ok=True)
    course_json_path = os.path.join(output_dir, "course.json")
    with open(course_json_path, 'w', encoding='utf-8') as cf:
        json.dump(opds_data, cf, ensure_ascii=False, indent=2)

    print(f"OPDS course.json created at: {course_json_path}")

# Usage
if __name__ == "__main__":
        convert_ftm_to_opds(sys.argv[1], sys.argv[2])
