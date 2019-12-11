from PIL import Image
import sys

name = sys.argv[1]
Image.open(name).save(name, format='png')