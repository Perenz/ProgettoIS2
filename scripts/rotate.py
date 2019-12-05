from PIL import Image, ImageFilter
import sys
import os

name = sys.argv[1]
angle = int(sys.argv[2])

im = Image.open(name)
im.rotate(angle).save(name, format=im.format)
