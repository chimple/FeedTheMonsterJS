# running script => python new_ftm_language_creation\convert_single_course_language.py lang/english/ftm_english.json public/assets/en
import os
import sys
import json
import zipfile

def convert_ftm_to_opds(input_file, output_dir):
    # Load input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    # Language name
    lang_name = ftm_data.get("langname") or os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()
    lang_folder = lang_name.strip().lower()

    # Create output folder
    os.makedirs(output_dir, exist_ok=True)

    # Prepare OPDS root structure
    opds_data = {
        "metadata": {
            "title": ftm_data.get("title"),
            "language": lang_name,
            "version": f"{ftm_data.get('majversion')}.{ftm_data.get('minversion')}",
            "direction": "rtl" if ftm_data.get("RightToLeft", False) else "ltr"
        },
        "links": [
            {"rel": "self", "href": "course.json", "type": "application/opds+json"}
        ],
        "navigation": [],
        "resources": {
            "feedback": {
                "texts": ftm_data.get("FeedbackTexts"),
                "audios": ftm_data.get("FeedbackAudios")
            },
            "otherAudios": ftm_data.get("OtherAudios")
        }
    }

    # Add lessons directly into navigation
    for level in ftm_data.get("Levels", []):
        level_meta = level.get("LevelMeta", {})
        level_number = level_meta.get("LevelNumber")

        lesson_data = {
            "levelNumber": level_number,
            "levelType": level_meta.get("LevelType"),
            "letterGroup": level_meta.get("LetterGroup"),
            "puzzles": []
        }

        for puzzle in level.get("Puzzles", []):
            lesson_data["puzzles"].append({
                "segmentNumber": puzzle.get("SegmentNumber"),
                "prompt": puzzle.get("prompt"),
                "targetstones": puzzle.get("targetstones"),
                "foilstones": puzzle.get("foilstones")
            })

        # Append directly in navigation
        opds_data["navigation"].append({
            "title": f"Level {level_number}",
            "content": lesson_data
        })

    # Save as course.json
    course_path = os.path.join(output_dir, "course.json")
    with open(course_path, 'w', encoding='utf-8') as f:
        json.dump(opds_data, f, ensure_ascii=False, indent=2)
    print(f"OPDS course.json with embedded levels created at: {course_path}")


# CLI usage
if __name__ == "__main__":
        convert_ftm_to_opds(sys.argv[1], sys.argv[2])
