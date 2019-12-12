from PIL import Image, ImageFilter
import sys
import os

name = sys.argv[1]

out = 'new_' + name

im = Image.open(name)
im.convert('L').save(out, format=im.format)
