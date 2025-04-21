import os
import sys
import json
import zipfile

def convert_ftm_to_opds(input_file):
    # Load the input JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        ftm_data = json.load(f)

    # Get language name
    lang_name = ftm_data.get("langname")
    if not lang_name:
        lang_name = os.path.basename(input_file).split("_")[-1].split(".")[0].capitalize()

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

    # Create output folder
    output_folder = os.path.join("public", "assets", "course", lang_folder)
    os.makedirs(output_folder, exist_ok=True)

    # Save course.json
    course_json_path = os.path.join(output_folder, "course.json")
    with open(course_json_path, 'w', encoding='utf-8') as f:
        json.dump(course, f, ensure_ascii=False, indent=2)

    print(f"Successfully created course.json at: {course_json_path}")

    # Create .opdf by zipping the entire course folder
    opdf_path = os.path.join(output_folder, f"{lang_folder}.opdf")
    create_opdf(output_folder, opdf_path)

def create_opdf(folder_path, output_opdf_path):
    with zipfile.ZipFile(output_opdf_path, 'w', zipfile.ZIP_DEFLATED) as opdf:
        for root, _, files in os.walk(folder_path):
            for file in files:
                if file.endswith(".opdf"):
                    continue  # Avoid adding the opdf file inside itself
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, folder_path)
                opdf.write(file_path, arcname=arcname)
    print(f"Created OPDF package at: {output_opdf_path}")

# ---- Run the script from terminal ----
if __name__ == "__main__":
    convert_ftm_to_opds(sys.argv[1])
