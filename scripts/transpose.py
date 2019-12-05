from PIL import Image,ImageFilter
import sys
import os

name = sys.argv[1]
side = sys.argv[2]

im = Image.open(name)

if side == 'x':
    im.transpose(Image.FLIP_LEFT_RIGHT).save(name, format=im.format)

if side == 'y':
    im.transpose(Image.FLIP_TOP_BOTTOM).save(name, format=im.format)

if side == 'xy':
    im.transpose(Image.FLIP_LEFT_RIGHT).transpose(Image.FLIP_TOP_BOTTOM).save(name, format=im.format)

