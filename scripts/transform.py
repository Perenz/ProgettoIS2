from PIL import Image
import sys
import os

name = sys.argv[1]
size = int(sys.argv[2])
data = int(sys.argv[3])

im = Image.open(name)
im.transform(size, PERSPECTIVE, data).save(name, format=im.format)