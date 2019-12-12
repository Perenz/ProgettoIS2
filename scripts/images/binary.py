from PIL import Image,ImageFilter
import sys
import os

name = sys.argv[1]
threshold = int(sys.argv[2])

out = 'new_' + name

im = Image.open(name)
Image.eval(im.convert('L'), (lambda x: 255 if x > threshold else 0)).save(out, format=im.format)
