from flask import Flask, url_for, send_from_directory, request, jsonify
from flask_cors import CORS
import logging, os
from werkzeug import secure_filename
import sys
import time
import json
import subprocess

app = Flask(__name__)
CORS(app)
file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)

port = int(os.environ.get('PORT', 8000))

PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = '{}/eb-flask-app/'.format(PROJECT_HOME)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def create_new_folder(local_dir):
    newpath = local_dir
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    return newpath

@app.route('/', methods = ['GET', 'POST'])
def api_root():
    app.logger.info(PROJECT_HOME)
    if request.method == 'GET':
        a = {"server": "running like makhan ;)"}
        return jsonify(a)
    if request.method == 'POST' and request.files['file']:
        try:
            data = dict(request.form)
            # app.logger.info(app.config['UPLOAD_FOLDER'])
            file = request.files['file']
            file_name = "my_model.h5";
            print("model", file)
            print("model_name", file_name)
            create_new_folder(app.config['UPLOAD_FOLDER'])
            saved_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            # app.logger.info("saving {}".format(saved_path))
            file.save(saved_path)
            print("bash script is running")
            if data['type'] == 'image':
                out = subprocess.Popen(['sh', './eb-image-script.sh', data['api_name']],
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.STDOUT)
                out.wait()
            else:
                out = subprocess.Popen(['sh', './eb-text-script.sh', data['api_name']],
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.STDOUT)
                out.wait()
            
            print("hello")

            time.sleep(3)
            url = subprocess.Popen(['sh', './url-script.sh', data['api_name']],
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT)
            stdout, stderr = url.communicate()
            url = (stdout.split()[0]).decode('utf-8')
            print(url)
            return jsonify({"success": True, "response": url})
        
        except:
            return jsonify({"success": False, "error": "Some Error Occurred"})
        # return jsonify({"success": True})
    else:
    	return jsonify({ "success": True, "error": "Model File Not Uploaded!" })


if __name__ == '__main__':
    app.run(debug=False, port=8000)
