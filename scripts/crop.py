from PIL import Image
import sys
import os

name = sys.argv[1]
left = int(sys.argv[2])
upper = int(sys.argv[3])
right = int(sys.argv[4])
lower = int(sys.argv[5])

im = Image.open(name)
im.crop((left,upper,right,lower)).save(name, format=im.format)