from PIL import Image
import sys
import os

name = sys.argv[1]
size = (int(sys.argv[2]),int(sys.argv[3]))
data = (int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6]),int(sys.argv[7]),int(sys.argv[8]),int(sys.argv[9]),int(sys.argv[10]),int(sys.argv[11]))

im = Image.open(name)
im.transform(size, PERSPECTIVE, data).save(name, format=im.format)