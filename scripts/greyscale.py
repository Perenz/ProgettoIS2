from PIL import Image, ImageFilter
import sys
import os

name = sys.argv[1]

im = Image.open(name)
im.convert('L').save(name, format=im.format)
