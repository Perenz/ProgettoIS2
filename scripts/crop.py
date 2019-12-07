from PIL import Image
import sys
import os

name = sys.argv[1]
box = (int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]))

im = Image.open(name)
im.crop(box).save(name, format=im.format)