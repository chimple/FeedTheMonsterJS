import json
import os

def replace_audio_urls(obj, audio_files_set):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, str):
                stripped_value = value.strip()
                if stripped_value.startswith("https://feedthemonster.curiouscontent.org/"):
                    filename = os.path.basename(stripped_value)
                    if filename in audio_files_set:
                        relative_url = stripped_value.replace("https://feedthemonster.curiouscontent.org/", "")
                        obj[key] = relative_url
                else:
                    replace_audio_urls(value, audio_files_set)
            else:
                replace_audio_urls(value, audio_files_set)
    elif isinstance(obj, list):
        for i in range(len(obj)):
            if isinstance(obj[i], str):
                stripped_value = obj[i].strip()
                if stripped_value.startswith("https://feedthemonster.curiouscontent.org/"):
                    filename = os.path.basename(stripped_value)
                    if filename in audio_files_set:
                        obj[i] = stripped_value.replace("https://feedthemonster.curiouscontent.org/", "")
                else:
                    replace_audio_urls(obj[i], audio_files_set)
            else:
                replace_audio_urls(obj[i], audio_files_set)

def process_language_folder(language_folder, base_lang_path):
    base_path = os.path.join(base_lang_path, language_folder)
    file_path = os.path.join(base_path, f"ftm_{language_folder}.json")
    audios_folder = os.path.join(base_path, "audios")

    if not os.path.isfile(file_path):
        print(f"File {file_path} not found. Skipping...")
        return

    if not os.path.isdir(audios_folder):
        print(f"Audio folder {audios_folder} not found. Skipping...")
        return

    audio_files_set = set(os.listdir(audios_folder))

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    replace_audio_urls(data, audio_files_set)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Updated URLs in {file_path}")

def main():
    base_lang_path = "../lang"
    language = input("Enter the language (e.g., english), or press Enter for all: ").strip().lower()

    if language:
        process_language_folder(language, base_lang_path)
    else:
        # Process all language folders
        for folder_name in os.listdir(base_lang_path):
            folder_path = os.path.join(base_lang_path, folder_name)
            if os.path.isdir(folder_path):
                process_language_folder(folder_name, base_lang_path)

if __name__ == "__main__":
    main()
