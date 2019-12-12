from PIL import Image, ImageOps
import sys
import os 

name = sys.argv[1]

out = 'new_' + name

im = Image.open(name)
ImageOps.invert(im).save(out, format=im.format)
