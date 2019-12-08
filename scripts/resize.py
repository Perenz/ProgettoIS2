from PIL import Image
import sys
import os

name = sys.argv[1]
width = int(sys.argv[2])
height = int(sys.argv[3])

im = Image.open(name)
im.resize((width, height)).save(name, format=im.format)