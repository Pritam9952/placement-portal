from flask import Flask, request, jsonify
import spacy
from pdfminer.high_level import extract_text

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

skills_list = ["python", "java", "sql", "react", "node", "mongodb", "html", "css"]

@app.route("/parse", methods=["POST"])
def parse_resume():
    try:
        file = request.files["resume"]

        print("File received:", file.filename)

        # ✅ FIXED LINE
        text = extract_text(file.stream)

        if not text:
            return jsonify({"skills": []})

        doc = nlp(text.lower())

        found_skills = []
        for token in doc:
            if token.text in skills_list:
                found_skills.append(token.text)

        return jsonify({
            "skills": list(set(found_skills))
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8000)