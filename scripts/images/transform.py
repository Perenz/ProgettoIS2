from PIL import Image
import sys
import os

name = sys.argv[1]
width = int(sys.argv[2])
height = int(sys.argv[3])
a = int(sys.argv[4])
b = int(sys.argv[5])
c = int(sys.argv[6])
d = int(sys.argv[7])
e = int(sys.argv[8])
f = int(sys.argv[9])
g = int(sys.argv[10])
h = int(sys.argv[11])

out = 'new_' + name

im = Image.open(name)
im.transform((width, height), Image.PERSPECTIVE, (a,b,c,d,e,f,g,h)).save(out, format=im.format)