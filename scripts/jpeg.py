from PIL import Image
import sys

name = sys.argv[1]
Image.open(name).convert('RGB').save(name, format='jpeg')