from PIL import Image, ImageOps
import sys
import os 

name = sys.argv[1]

im = Image.open(name)
ImageOps.invert(im).save(name, format=im.format)
