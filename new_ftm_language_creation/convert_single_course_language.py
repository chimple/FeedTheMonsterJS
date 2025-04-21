import json
import os
import sys

# run which lang you want to convert --> python new_ftm_language_creation\convert_single_course_language.py lang/marathi/ftm_marathi.json

def convert_ftm_to_opds(input_file):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    # Get the language name (from langname or filename fallback)
    lang_name = ftm_data.get("langname")
    if not lang_name:
        # fallback: extract from filename like "ftm_marathi.json" => "marathi"
        lang_name = os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()

    # Make folder name lowercase
    lang_folder = lang_name.strip().lower()

    # Build course structure
    course = {
        "title": ftm_data.get("title"),
        "language": lang_name,
        "version": f"{ftm_data.get('majversion')}.{ftm_data.get('minversion')}",
        "direction": "rtl" if ftm_data.get("RightToLeft", False) else "ltr",
        "feedback": {
            "texts": ftm_data.get("FeedbackTexts"),
            "FeedbackAudios": ftm_data.get("FeedbackAudios")
        },
        "OtherAudios": ftm_data.get("OtherAudios"),
        "lessons": []
    }

    for level in ftm_data.get("Levels", []):
        level_meta = level.get("LevelMeta", {})
        lesson = {
            "level": level_meta.get("LevelNumber"),
            "type": level_meta.get("LevelType"),
            "letterGroup": level_meta.get("LetterGroup"),
            "puzzles": []
        }

        for puzzle in level.get("Puzzles"):
            lesson["puzzles"].append({
                "segmentNumber": puzzle.get("SegmentNumber"),
                "prompt": puzzle.get("prompt"),
                "targetstones": puzzle.get("targetstones"),
                "foilstones": puzzle.get("foilstones")
            })

        course["lessons"].append(lesson)

    # Dynamic output folder based on lang
    output_folder = os.path.join("public", "assets", "course", lang_folder)
    os.makedirs(output_folder, exist_ok=True)

    # Save course.json
    output_path = os.path.join(output_folder, "course.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(course, f, ensure_ascii=False, indent=2)

    print(f"Successfully created: {output_path}")

# ---- Run the script from terminal ----
if __name__ == "__main__":
    convert_ftm_to_opds(sys.argv[1])
