from PIL import Image
import sys
import os

name = sys.argv[1]
box = int(sys.argv[2])

im = Image.open(name)
im.crop(box).save(name, format=im.format)