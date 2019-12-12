from PIL import Image
import sys

name = sys.argv[1]

out = 'new_' + name

Image.open(name).save(out, format='png')