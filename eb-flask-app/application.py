import os
import json
import cv2
import sys
import tensorflow as tf
from tensorflow.keras.models import load_model
from werkzeug import secure_filename
from flask_cors import CORS
from flask import Flask, url_for, send_from_directory, request, jsonify
import numpy as np

application = Flask(__name__)

CORS(application)

PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = '{}/uploads/'.format(PROJECT_HOME)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
	
model = load_model('./my_model.h5')

def create_new_folder(local_dir):
    newpath = local_dir
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    return newpath

@application.route('/', methods=["GET", "POST"])
def api_root():
    if request.method == 'GET':
        try:
            return jsonify({"Status": "EzPzML has successfully deployed our model. Make a POST request to this url to get started!"})
        except:
            return jsonify({"success": False, "error": "Internal Server Error"})
    
    elif request.method == 'POST' and request.files['file']:
        try:
            img = request.files['file']
            img_name = secure_filename(img.filename)
            create_new_folder(application.config['UPLOAD_FOLDER'])
            saved_path = os.path.join(application.config['UPLOAD_FOLDER'], img_name)
            img.save(saved_path)
            mat = cv2.imread(saved_path, 0)
            mat = cv2.resize(mat, (28, 28))
            mat = mat / 1.0
            mat = mat.reshape(1, 28, 28, 1)
            model_output = model.predict(mat)
            prediction = model_output.argmax()
            return jsonify({"success": True, "class": str(prediction), "output": model_output.tolist()})

        except:
            return jsonify({"success": False, "error": "Internal Server Error"})    

    else:
    	return jsonify({"success": False, "error": "internal server error"})

if __name__ == "__main__":
    # application.debug = True
    application.run()