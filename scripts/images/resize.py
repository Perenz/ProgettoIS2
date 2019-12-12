from PIL import Image
import sys
import os

name = sys.argv[1]
width = int(sys.argv[2])
height = int(sys.argv[3])

out = 'new_' + name

im = Image.open(name)
im.resize((width, height)).save(out, format=im.format)