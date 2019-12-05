from PIL import Image
import sys
import os

name = sys.argv[1]
size = int(sys.argv[2])

im = Image.open(name)
im.resize(size).save(name, format=im.format)