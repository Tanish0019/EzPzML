import os
import glob

ORIG_INPUT_DATASET = "food-11"
 
BASE_PATH = "hot-dog-not-hot-dog" #Get input folder

TRAIN = "train" #Get Train folder
TEST = "test" #Get Test folder
VAL = "seefood\\test" #Get Validation folder
try:
	CLASSES = list(os.walk(os.path.join(BASE_PATH,TRAIN)))[0][1]#["hot_dog","not_hot_dog"]
except:
	CLASSES = []
BATCH_SIZE = 32
 
MODEL_PATH = os.path.sep.join(["output", "food11.model"])
 
UNFROZEN_PLOT_PATH = os.path.sep.join(["output", "unfrozen.png"])
WARMUP_PLOT_PATH = os.path.sep.join(["output", "warmup.png"])